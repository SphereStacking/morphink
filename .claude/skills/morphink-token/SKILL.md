---
name: morphink-token
description: >
  morphink デザイントークンシステムの操作ガイド。
  新規トークン追加、トークンビルド、CSS 変数の参照方法、ダークテーマ対応時に使用。
  Style Dictionary + Tokens Studio パイプライン、mi:* ユーティリティ生成をカバー。
  「トークン追加」「CSS 変数」「ダークテーマ」「tokens build」「mi:ユーティリティ」等でトリガー。
---

# morphink トークンシステム

## パイプライン概要

```
Tokens Studio JSON → Style Dictionary → CSS/JSON/TS → Tailwind テーマ → UI コンポーネント
```

### ソースファイル

| ファイル | 役割 |
|---------|------|
| `packages/tokens/tokens/alias.json` | 基盤トークン（色スケール、duration、easing、stagger） |
| `packages/tokens/tokens/semantic.json` | ライトテーマ semantic トークン（alias を参照） |
| `packages/tokens/tokens/semantic-dark.json` | ダークテーマ上書き |

### 生成物（編集禁止）

| 出力先 | 形式 |
|--------|------|
| `packages/tokens/dist/css/tokens.css` | CSS 変数（`:root`） |
| `packages/tokens/dist/css/tokens-dark.css` | ダークテーマ CSS（`.mi-theme[data-theme="dark"]`） |
| `packages/tokens/dist/css/tailwind-theme.css` | Tailwind `@theme` ブロック |
| `packages/tokens/dist/css/utilities.css` | mi:* ユーティリティ |
| `packages/tokens/dist/json/tokens.json` | JSON 形式 |
| `packages/tokens/dist/ts/tokens.ts` | TypeScript ES6 export |

### ビルドコマンド

```bash
pnpm --filter @morphink/tokens build
```

## トークン追加手順

### 1. semantic トークンの追加

`packages/tokens/tokens/semantic.json` に追加。alias トークンを `{category.name}` 構文で参照:

```json
{
  "color": {
    "new-category": {
      "base": { "value": "{color.primary-500}", "type": "color" },
      "foreground": { "value": "{color.primary-50}", "type": "color" }
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
      "base": { "value": "{color.primary-400}", "type": "color" }
    }
  }
}
```

### 3. alias トークンの追加

基盤色やモーショントークンは `packages/tokens/tokens/alias.json` に追加:

```json
{
  "color": {
    "new-scale-500": { "value": "oklch(55% 0.15 250)", "type": "color" }
  },
  "duration": {
    "new-speed": { "value": "150", "type": "duration" }
  }
}
```

### 4. ビルド & 確認

```bash
pnpm --filter @morphink/tokens build
# 生成された dist/css/tokens.css で --morphink-color-new-category を確認
```

## CSS 変数命名

Style Dictionary が自動変換:
- パス `color.primary.base` → `--morphink-color-primary`（末尾 `base` は除去）
- パス `color.primary.foreground` → `--morphink-color-primary-foreground`
- camelCase → kebab-case に自動変換

プレフィックス: `morphink`（`build.mjs` の `VAR_PREFIX` で定義）

## コンポーネントでの使用

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

## mi:* ユーティリティ

### 概要

- 位置づけ: Tailwind を内部実装に留めるための公開スタイリング API
- プレフィックス: `mi:`（Tailwind v4 prefix）
- スコープ: トークン由来のプロパティのみ（color / spacing / radius / shadow）
- スコープ外: hover / focus / display / flex / width 等

### 使用例

```html
<div class="mi:bg-primary mi:text-primary-foreground mi:p-md mi:rounded-md mi:shadow-md">
```

### レスポンシブバリアント

```html
<div class="mi:p-sm md:mi:p-lg">
```

### 生成プロセス

1. `packages/tokens/src/mi-utilities.css` — Tailwind v4 input（テーマ定義）
2. `packages/tokens/src/safelist.html` — 使用クラスの safelist
3. ビルド: `npx @tailwindcss/cli -i ./src/mi-utilities.css -o ./dist/css/utilities.css`
4. 後処理: `@layer` 宣言と preflight を除去

### safelist 更新

新しいユーティリティクラスを追加する場合、`packages/tokens/src/safelist.html` に該当クラスを記載してビルドに含める。

## トークンカテゴリ一覧

具体値はビルド出力（`packages/tokens/dist/css/tokens.css`）を参照。コード内では必ず CSS 変数名またはトークン名で参照し、数値をハードコードしない。

### Color

background, foreground, card, popover, muted, border, input, ring,
primary, secondary, tertiary, base, accent, neutral, success, warning, info, destructive
（各 tone に base / foreground / hover / active サブトークンあり）

### Spacing (SpaceToken)

`0`, `xs`, `sm`, `md`, `lg`, `xl`, `2xl`, `3xl`, `4xl`, `5xl`, `6xl`

参照: `var(--morphink-space-md)` / Tailwind: `p-(--morphink-space-md)` / mi: `mi:p-md`

### Radius

none, xs, sm, md, lg, xl, full

### Shadow

none, sm, md, lg

### Motion（alias トークン）

| カテゴリ | トークン名 |
|---------|-----------|
| duration | instant, fast, normal, slow, slower |
| easing | standard, decelerate, accelerate, emphasized-decelerate, emphasized-accelerate, linear, spring |
| stagger | item, max-items |

参照: `var(--morphink-duration-fast)`, `var(--morphink-easing-standard)`
