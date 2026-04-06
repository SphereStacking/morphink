# DTCG Token Manager — Figma Plugin

Figma Variables と DTCG 標準形式の JSON を双方向で同期するカスタム Figma プラグイン。

- **Export**: Figma Variables → DTCG JSON ファイルとしてダウンロード
- **Import**: DTCG JSON ファイル → Figma Variables として作成・更新

---

## 目次

1. [セットアップ](#セットアップ)
2. [Figma へのインストール（ローカル読み込み）](#figma-へのインストールローカル読み込み)
3. [Export（エクスポート）](#exportエクスポート)
4. [Import（インポート）](#importインポート)
5. [トークン更新フロー](#トークン更新フロー)
6. [Figma Variables のコレクション構造ガイドライン](#figma-variables-のコレクション構造ガイドライン)
7. [motion.json の手動更新手順](#motionjson-の手動更新手順)
8. [出力フォーマット（DTCG）](#出力フォーマットdtcg)
9. [型マッピング](#型マッピング)
10. [トラブルシューティング](#トラブルシューティング)

---

## セットアップ

```bash
# 依存インストール & プラグインビルド
pnpm --filter figma-plugin install
pnpm --filter figma-plugin build
```

ビルド成果物は `packages/figma-plugin/dist/` に生成される（`dist/code.js`, `dist/ui.html`）。

---

## Figma へのインストール（ローカル読み込み）

> Figma **デスクトップアプリ**が必要。ブラウザ版では開発プラグインを読み込めない。

1. Figma デスクトップアプリを起動する
2. 任意のファイルを開く
3. メニューバー → **Plugins** → **Development** → **Import plugin from manifest...**
4. ファイルダイアログで `packages/figma-plugin/manifest.json` を選択して開く
5. 以降は **Plugins** → **Development** → **DTCG Token Manager** からプラグインを起動できる

> プラグインを更新した場合、`pnpm --filter figma-plugin build` を再実行するだけで反映される（Figma の再インポートは不要）。

---

## Export（エクスポート）

Figma Variables を DTCG JSON としてエクスポートする。

### 手順

1. プラグインを起動 → **Export** タブを選択（デフォルト）
2. コレクション一覧が表示される
3. エクスポートするコレクション・モードのチェックボックスを選択
4. 出力ファイル名を必要に応じて編集
5. **Export JSON** をクリック → ブラウザのダウンロードとして保存される

### デフォルトのファイルマッピング

| Figma Collection | Mode         | 出力ファイル         |
| ---------------- | ------------ | -------------------- |
| Primitives       | （全モード） | `primitives.json`    |
| Semantic         | Light        | `semantic.json`      |
| Semantic         | Dark         | `semantic-dark.json` |

### 警告表示

エクスポート時に問題が検出されると警告が表示される：

- **Broken alias** — 参照先が削除された変数がある場合。Figma 側で参照を修正する必要がある

---

## Import（インポート）

DTCG JSON ファイルを Figma Variables として取り込む。新規作成と既存更新の両方に対応。

### 手順

1. プラグインを起動 → **Import** タブを選択
2. DTCG JSON ファイルをドラッグ&ドロップ（または「click to browse」でファイル選択）
3. 各ファイルに対して **Collection 名**と **Mode 名**を指定
   - ファイル名から自動推定される（例: `semantic-dark.json` → Collection: "Semantic-dark", Mode: "Dark"）
   - 既存のコレクション名を入力すると、そのコレクションに追加・更新される
4. **Import JSON** をクリック
5. 結果が表示される（created / updated / skipped の件数 + 警告）

### インポートの動作

| 状況                                        | 動作                               |
| ------------------------------------------- | ---------------------------------- |
| コレクションが存在しない                    | 新規作成                           |
| コレクションが存在する + モードが存在しない | モードを追加（プランの制限に注意） |
| 変数が存在しない                            | 新規作成                           |
| 変数が存在する + 型が一致                   | 値を更新                           |
| 変数が存在する + 型が不一致                 | スキップ + 警告                    |
| alias 参照先が見つからない                  | スキップ + 警告                    |

### 2 パスインポート

1. **Pass 1**: 非 alias トークンを作成・更新し、Figma Variables を確保
2. **Pass 2**: alias トークンの参照先を解決し、`VariableAlias` として設定

これにより、同一ファイル内の前方参照や別コレクションへの参照も正しく解決される。

---

## トークン更新フロー

Figma でトークンを変更してから PR を出すまでの標準フロー。

```
1. Figma でトークン編集
      ↓
2. プラグインで JSON をエクスポート
      ↓
3. エクスポートした JSON を packages/tokens/tokens/ に配置
      ↓
4. diff-check でトークン差分を確認
      ↓
5. Style Dictionary ビルドで CSS/TS を再生成
      ↓
6. Storybook で目視確認
      ↓
7. PR を作成してレビュー依頼
```

### 詳細手順

#### 3. JSON を配置

```bash
# ダウンロードしたファイルをトークンディレクトリに配置
cp ~/Downloads/primitives.json   packages/tokens/tokens/primitives.json
cp ~/Downloads/semantic.json     packages/tokens/tokens/semantic.json
cp ~/Downloads/semantic-dark.json packages/tokens/tokens/semantic-dark.json
```

#### 4. diff-check で差分確認

```bash
# 差分表示（color の変更は deltaE で評価）
pnpm --filter @morphink/tokens diff-check

# 閾値を変更する場合（デフォルト 1.0）
pnpm --filter @morphink/tokens diff-check -- --threshold 0.5

# 特定ディレクトリと比較する場合
pnpm --filter @morphink/tokens diff-check -- /path/to/new-tokens/
```

#### 5. ビルドと確認

```bash
# トークン CSS/TS を再生成
pnpm --filter @morphink/tokens build

# または diff-check + build をまとめて実行
pnpm --filter @morphink/tokens validate

# Storybook で目視確認
pnpm run dev:docs
```

#### 7. PR 作成

```bash
git add packages/tokens/tokens/
git commit -m "tokens: update semantic color tokens"
gh pr create
```

---

## Figma Variables のコレクション構造ガイドライン

プラグインとビルドパイプラインが正しく機能するために、Figma Variables のコレクション構造を以下の規約に従って維持すること。

### コレクション

| コレクション名           | 役割                                         | 出力ファイル         |
| ------------------------ | -------------------------------------------- | -------------------- |
| `Primitives`             | 色の原値（パレット）、スペーシング、半径など | `primitives.json`    |
| `Semantic`               | ライトモードのセマンティックトークン         | `semantic.json`      |
| `Semantic` (Dark モード) | ダークモードのセマンティックトークン         | `semantic-dark.json` |

### 命名規則

- グループ区切りは `/`（Figma の Variable グループ機能を使う）
- ケバブケース（`primary-500`, `font-size-md`）
- セマンティックトークンから Primitives への参照は `{グループ名/トークン名}` 形式（コレクション名を含めない）

例：

```
Primitives コレクション:
  color/
    primary/
      500  →  #e84c1b

Semantic コレクション（Light モード）:
  color/
    primary  →  {color/primary/500}   ← Primitives を参照
```

### モード

- `Semantic` コレクションは必ず **Light** と **Dark** の 2 モードを持つこと
- エクスポート時にモードを選択して個別にエクスポートする

---

## motion.json の手動更新手順

`packages/tokens/tokens/motion.json` は Figma Variables で管理せず、**手動で編集**する。
Motion トークンはアニメーション仕様（duration / easing / stagger）であり、Figma Variables との連携には向かないため。

### 編集手順

1. `packages/tokens/tokens/motion.json` をエディタで開く
2. DTCG 形式に従って値を編集する

```json
{
  "motion": {
    "duration": {
      "fast": {
        "$value": "100ms",
        "$type": "duration"
      }
    },
    "easing": {
      "standard": {
        "$value": "cubic-bezier(0.2, 0, 0, 1)",
        "$type": "cubicBezier"
      }
    }
  }
}
```

3. ビルドして CSS に反映する

```bash
pnpm --filter @morphink/tokens build
```

4. `packages/ui/src/styles/base.css` の Motion Shorthand 変数も必要に応じて更新する（こちらも手書き管理）

> motion.json は diff-check の対象外（`primitives.json`, `semantic.json`, `semantic-dark.json` のみ対象）。

---

## 出力フォーマット（DTCG）

[W3C Design Tokens Community Group](https://www.designtokens.org/) の仕様（v1.0 Stable, 2025.10）に準拠。

```json
{
  "color": {
    "primary-500": {
      "$value": "#e84c1b",
      "$type": "color"
    }
  },
  "space": {
    "md": {
      "$value": "12px",
      "$type": "dimension"
    }
  }
}
```

- 色は hex 形式で出力（`build.mjs` の `value/to-oklch` トランスフォームが OKLCH に変換）
- 変数参照は `{group.token-name}` 形式（DTCG ドット区切り）
- セマンティックトークンが Primitives を参照する場合、コレクション名を含めない（例: `{color.primary-500}`）

---

## 型マッピング

### Export: Figma → DTCG

| Figma resolvedType | DTCG `$type` | 判定条件                                                                                     |
| ------------------ | ------------ | -------------------------------------------------------------------------------------------- |
| `COLOR`            | `color`      | —                                                                                            |
| `FLOAT`            | `dimension`  | 変数名に `space`, `radius`, `size`, `border`, `width`, `gap`, `offset`, `font-size` 等を含む |
| `FLOAT`            | `number`     | 上記以外の FLOAT（lineHeight 含む）                                                          |
| `STRING`           | `fontFamily` | 変数名に `font-family`, `fontfamily`, `font/family` を含む                                   |
| `STRING`           | `string`     | 上記以外の STRING                                                                            |
| `BOOLEAN`          | `boolean`    | —                                                                                            |

### Import: DTCG → Figma

| DTCG `$type` | Figma resolvedType | 値の変換                       |
| ------------ | ------------------ | ------------------------------ |
| `color`      | `COLOR`            | `#RRGGBB(AA)` → RGBA (0-1)     |
| `dimension`  | `FLOAT`            | `px` サフィックスを除去 → 数値 |
| `number`     | `FLOAT`            | 文字列 → 数値                  |
| `fontFamily` | `STRING`           | そのまま                       |
| `string`     | `STRING`           | そのまま                       |
| `boolean`    | `BOOLEAN`          | `"true"` / `"false"` → boolean |

---

## トラブルシューティング

### プラグインが Figma に表示されない

**原因:** ビルドが完了していない、または manifest.json の選択を間違えている。

**対処:**

1. `pnpm --filter figma-plugin build` を実行して `dist/` が生成されていることを確認
2. Figma でインポートする際に `manifest.json`（`dist/` 内ではなく `packages/figma-plugin/manifest.json`）を選択しているか確認

---

### エクスポートした JSON が diff-check でパースエラーになる

**原因:** JSON が不正な形式で出力されている（まれに Figma の変数名に特殊文字が含まれる場合など）。

**対処:**

1. エクスポートした JSON を `jq .` コマンドで検証する
2. Figma Variables に特殊文字（`"`, `\` など）が含まれていないか確認する
3. プラグインを再ビルドして再度エクスポートを試みる

---

### diff-check で deltaE が閾値超過になる

**原因:** 意図せず色値が変化している（Figma での編集ミスやプラグインのバグなど）。

**対処:**

1. diff-check の出力で変更されたトークンのキーを確認する
2. Figma でそのトークンの値を確認し、意図した変更かどうかを判断する
3. 意図しない変更であれば Figma 側で修正して再エクスポートする
4. 意図した変更で閾値を緩めたい場合は `--threshold` オプションで調整する（CI の設定も合わせて変更すること）

---

### インポートでモード追加に失敗する

**原因:** Figma の無料プランではコレクションあたり 1 モードまでの制限がある。

**対処:**

1. 有料プラン（Professional 以上）にアップグレードする
2. または、モードごとに別コレクションとしてインポートする

---

### インポートで alias が解決できない

**原因:** 参照先のトークンが Figma に存在しない（まだインポートされていない、または名前が異なる）。

**対処:**

1. 参照先のコレクション（例: Primitives）を**先に**インポートする
2. 参照パスが DTCG ドット区切り（`{color.primary.500}`）で正しいか確認する
3. Figma 側の変数名がスラッシュ区切り（`color/primary/500`）と一致しているか確認する

---

### build.mjs がエラーで失敗する

**原因:** JSON の参照関係が壊れている（Primitives のトークンを Semantic が参照しているが、Primitives 側が削除された場合など）。

**対処:**

1. エラーメッセージ内のトークンパスを確認する
2. `primitives.json` に参照先のトークンが存在するか確認する
3. Figma で参照が正しく設定されているかを確認し、再エクスポートする

---

### Storybook でトークンが反映されない

**原因:** `build.mjs` は実行されたが、Storybook のキャッシュが古い。

**対処:**

```bash
# Storybook のキャッシュをクリアして再起動
pnpm --filter @morphink/docs dev --no-cache
```

---

## ビルド（開発者向け）

プラグイン自体のソースを変更した場合：

```bash
pnpm --filter figma-plugin build
```

`dist/code.js` と `dist/ui.html` が生成される。Figma への再インポートは不要（ファイルを更新するだけで反映）。
