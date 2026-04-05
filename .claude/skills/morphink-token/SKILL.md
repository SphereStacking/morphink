---
name: morphink-token
description: >
  morphink デザイントークンシステムの操作ガイド。
  新規トークン追加、トークンビルド、CSS 変数の参照方法、ダークテーマ対応時に使用。
  Style Dictionary + Figma Variables パイプライン、mi:* ユーティリティ生成をカバー。
  「トークン追加」「CSS 変数」「ダークテーマ」「tokens build」「mi:ユーティリティ」等でトリガー。
---

# morphink トークンシステム

> パイプライン図は `.claude/reference/token-pipeline.md` を参照。
> Motion トークン一覧は `.claude/reference/motion-tokens.md` を参照。
> CSS 変数命名は各 Base コンポーネントの CVA 定義を直接読む。

このスキルは **操作手順** に集中する。

---

## ソースファイル

| ファイル | 役割 |
|---------|------|
| `packages/tokens/tokens/primitives.json` | 基盤トークン（色スケール） |
| `packages/tokens/tokens/motion.json` | モーショントークン（duration、easing、stagger） |
| `packages/tokens/tokens/semantic.json` | ライトテーマ semantic トークン（primitives を参照） |
| `packages/tokens/tokens/semantic-dark.json` | ダークテーマ上書き |

## 生成物（編集禁止）

| 出力先 | 形式 |
|--------|------|
| `packages/tokens/dist/css/tokens.css` | CSS 変数（`:root`） |
| `packages/tokens/dist/css/tokens-dark.css` | ダークテーマ CSS（`.mi-theme[data-theme="dark"]`） |
| `packages/tokens/dist/css/tailwind-theme.css` | Tailwind `@theme` ブロック |
| `packages/tokens/dist/css/utilities.css` | mi:* ユーティリティ |
| `packages/tokens/dist/json/tokens.json` | JSON 形式 |
| `packages/tokens/dist/ts/tokens.ts` | TypeScript ES6 export |

## ビルド

```bash
pnpm --filter @morphink/tokens build
```

---

## トークン追加手順

### 1. semantic トークンの追加

`packages/tokens/tokens/semantic.json` に追加。primitive トークンを `{category.name}` 構文で参照:

```json
{
  "color": {
    "new-category": {
      "base": { "$value": "{color.primary-500}", "$type": "color" },
      "foreground": { "$value": "{color.primary-50}", "$type": "color" }
    }
  }
}
```

### 2. ダークテーマ対応

`packages/tokens/tokens/semantic-dark.json` に上書き値を追加:

```json
{
  "color": {
    "new-category": {
      "base": { "$value": "{color.primary-400}", "$type": "color" }
    }
  }
}
```

### 3. primitive トークンの追加

基盤色は `packages/tokens/tokens/primitives.json` に追加:

```json
{
  "color": {
    "new-scale-500": { "$value": "oklch(55% 0.15 250)", "$type": "color" }
  },
  "duration": {
    "new-speed": { "$value": "150", "$type": "duration" }
  }
}
```

### 4. ビルド & 確認

```bash
pnpm --filter @morphink/tokens build
# 生成された dist/css/tokens.css で --morphink-color-new-category を確認
```

---

## CSS 変数命名の自動変換ルール

Style Dictionary が自動変換:
- パス `color.primary.base` → `--morphink-color-primary`（末尾 `base` は除去）
- パス `color.primary.foreground` → `--morphink-color-primary-foreground`
- camelCase → kebab-case に自動変換

プレフィックス: `morphink`（`build.mjs` の `VAR_PREFIX` で定義）

---

## コンポーネントでの使用テンプレート

### Tailwind クラス

```html
<!-- 色 -->
<div class="bg-(--morphink-color-primary) text-(--morphink-color-primary-foreground)">

<!-- スペース -->
<div class="p-(--morphink-space-md) gap-(--morphink-space-lg)">

<!-- 角丸・影 -->
<div class="rounded-(--morphink-radius-md) shadow-(--morphink-shadow-md)">
```

### color-mix（ホバー透過）

```html
<div class="hover:bg-[color-mix(in_srgb,var(--morphink-color-primary)_8%,transparent)]">
```

### CVA 内部変数

コンポーネント Base 層の tone variant で semantic token にバインド:

```ts
const variants = cva('base-classes', {
  variants: {
    tone: {
      primary: '[--btn-color:var(--morphink-color-primary)] [--btn-fg:var(--morphink-color-primary-foreground)]',
      destructive: '[--btn-color:var(--morphink-color-destructive)] [--btn-fg:var(--morphink-color-destructive-foreground)]',
    },
  },
})
```

---

## mi:* ユーティリティ管理

### 生成プロセス

1. `packages/tokens/src/mi-utilities.css` — Tailwind v4 input（テーマ定義）
2. `packages/tokens/src/safelist.html` — 使用クラスの safelist
3. ビルド: `npx @tailwindcss/cli -i ./src/mi-utilities.css -o ./dist/css/utilities.css`
4. 後処理: `@layer` 宣言と preflight を除去

### safelist 更新

新しいユーティリティクラスを追加する場合、`packages/tokens/src/safelist.html` に該当クラスを記載してビルドに含める。

---

## トークンカテゴリ一覧

具体値はビルド出力（`packages/tokens/dist/css/tokens.css`）を参照。コード内では必ず CSS 変数名またはトークン名で参照し、数値をハードコードしない。

| カテゴリ | トークン |
|---------|---------|
| **Color** | background, foreground, card, popover, muted, border, input, ring, primary〜destructive（各 base/foreground/hover/active） |
| **Spacing** | 0, xs, sm, md, lg, xl, 2xl, 3xl, 4xl, 5xl, 6xl |
| **Radius** | none, xs, sm, md, lg, xl, full |
| **Shadow** | none, sm, md, lg |
| **Motion** | → `.claude/reference/motion-tokens.md` を参照 |
