#!/bin/bash
# morphink コンポーネントルール自動検証フック
# PostToolUse (Edit|Write) で実行される
#
# チェック項目:
# 1. Public 層で reka-ui を直接 import していないか
# 2. cn() を使わずにクラスを文字列結合していないか
# 3. 新規コンポーネントが index.ts に export されているか

# jq 依存チェック
if ! command -v jq &>/dev/null; then
  echo "ERROR: validate-component-rules.sh requires 'jq' but it is not installed." >&2
  exit 2
fi

INPUT=$(cat)
if [[ -z "$INPUT" ]]; then
  exit 0
fi

FILE_PATH=$(echo "$INPUT" | jq -r '.tool_input.file_path // empty')

# ファイルパスがなければスキップ
if [[ -z "$FILE_PATH" ]]; then
  exit 0
fi
if [[ ! -f "$FILE_PATH" ]]; then
  echo "WARNING: validate-component-rules.sh: file does not exist: $FILE_PATH" >&2
  exit 0
fi

# .vue 以外はスキップ（このフックはコンポーネントルールのみ検証）
if [[ ! "$FILE_PATH" =~ \.vue$ ]]; then
  exit 0
fi

PROJECT_DIR="${CLAUDE_PROJECT_DIR:-$(echo "$INPUT" | jq -r '.cwd // empty')}"
if [[ -z "$PROJECT_DIR" ]]; then
  echo "WARNING: validate-component-rules.sh: could not determine PROJECT_DIR. Export checks will be skipped." >&2
fi
ERRORS=()

# export チェック関数
check_export() {
  local component_name=$1
  local index_file="$PROJECT_DIR/packages/ui/src/index.ts"
  if [[ -n "$PROJECT_DIR" && -f "$index_file" ]]; then
    if ! grep -q "$component_name" "$index_file" 2>/dev/null; then
      ERRORS+=("⚠️ export 漏れ: $component_name が packages/ui/src/index.ts に export されていません。追加を忘れずに。")
    fi
  fi
}

# --- ルール 1: Public 層で reka-ui を直接 import ---
if [[ "$FILE_PATH" =~ packages/ui/src/components/.*\.vue$ ]]; then
  if grep -qE "from ['\"]reka-ui['\"]|import .+ from ['\"]reka-ui" "$FILE_PATH" 2>/dev/null; then
    ERRORS+=("❌ ルール違反: Public 層で reka-ui を直接 import しています。Base コンポーネント経由で使用してください。")
  fi
fi

# --- ルール 2: cn() を使わずクラスを文字列結合 ---
if [[ "$FILE_PATH" =~ packages/ui/src/.*\.vue$ ]]; then
  # テンプレートリテラルや + でクラス結合しているパターンを検出
  # ただし cn() 内部での使用は除外
  if grep -qE '(:class="`[^`]*\$\{|:class="[^"]*\+)' "$FILE_PATH" 2>/dev/null; then
    # cn() が import されているか確認
    if ! grep -qE "import.*cn.*from|import.*\{.*cn.*\}" "$FILE_PATH" 2>/dev/null; then
      ERRORS+=("⚠️ ルール警告: クラス結合に cn() を使用してください。文字列結合はバグの原因になります。")
    fi
  fi
fi

# --- ルール 3: 新規 Vue コンポーネントが index.ts に export されているか ---
if [[ "$FILE_PATH" =~ packages/ui/src/components/.*\.vue$ ]]; then
  check_export "$(basename "$FILE_PATH" .vue)"
fi

if [[ "$FILE_PATH" =~ packages/ui/src/base/ui/.*\.vue$ ]]; then
  check_export "$(basename "$FILE_PATH" .vue)"
fi

# --- 結果出力 ---
if [[ ${#ERRORS[@]} -gt 0 ]]; then
  REASON=$(printf '%s\n' "${ERRORS[@]}")
  # ルール1（reka-ui import）はブロック、それ以外は警告
  if printf '%s\n' "${ERRORS[@]}" | grep -q "❌"; then
    echo "$REASON" >&2
    exit 2
  else
    # 警告のみ: additionalContext として Claude に伝える
    jq -n --arg reason "$REASON" '{
      "hookSpecificOutput": {
        "hookEventName": "PostToolUse",
        "additionalContext": $reason
      }
    }'
    exit 0
  fi
fi

exit 0
