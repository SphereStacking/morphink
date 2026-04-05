---
globs:
  - packages/ui/src/**/*.vue
---

# 禁止: コンポーネント構造

| # | 禁止 | 代替 |
|---|------|------|
| 1 | Public 層で `reka-ui` を直接 import | Base コンポーネント経由 |
| 2 | `index.ts` export 漏れ | `packages/ui/src/index.ts` に追加 |

# 禁止: アクセシビリティ

| # | 禁止 | 代替 |
|---|------|------|
| 3 | `outline: none` without focus ring | `--ring-color` + focus ring スタイル |
| 4 | `tabindex` > 0 | `tabindex="0"` or `-1` のみ |
| 5 | `aria-label` なしのアイコンボタン | `aria-label` を必ず付与 |
| 6 | フォーカストラップなしの Dialog / Sheet | Reka UI の Dialog が自動提供 |
| 7 | `prefers-reduced-motion` 無視 | Motion トークンが自動対応 |
| 8 | ラベルなしのフォーム入力 | `<label>` を関連付ける |
| 9 | エラー表示を色のみで伝達 | ボーダー色 + アイコン + テキストの 3 点セット |
