[English](./architecture.md) | [日本語](./architecture.ja.md)

# アーキテクチャ

> これらの設計判断の背景にある思想については [CONCEPT.ja.md](../CONCEPT.ja.md) を参照。

## コンポーネント 3 層構造

```
Public (components/)  →  Base (base/ui/*/)  →  Reka UI
  プロダクト向け API      CVA スタイル定義       ヘッドレス a11y
```

| 層 | 場所 | 命名 | 役割 |
|---|---|---|---|
| Public | `packages/ui/src/components/` | `Button.vue` | 外部公開 API — Base の薄いラッパー |
| Base | `packages/ui/src/base/ui/*/` | `ButtonBase.vue` | CVA バリアント + Reka UI 統合 |
| Props | `packages/ui/src/base/lib/props/` | `variant.ts`, `size.ts` | 共通の Props 型定義 |

すべてのコンポーネントは `packages/ui/src/index.ts` から export。

### なぜ 3 層なのか

主な利点は**依存の隔離**。Reka UI が置き換わったり Tailwind に破壊的変更があっても、Base 層だけが影響を吸収する。Public API（`<Button tone="primary">`）は安定したまま。

Public 層がいま薄いラッパーなのは意図的。プロダクトレベルの設計判断（例: ラベル + エラー + ヘルパーテキストを統合した Input）を組み込む場所として設計されている。そうした判断は実際の利用から生まれるべきで、推測からではない。

## トークンパイプライン

```
Tokens Studio
  → packages/tokens/tokens/*.json (alias / semantic / semantic-dark)
  → Style Dictionary (ビルド)
  → packages/tokens/dist (css / json / ts)
  → packages/ui/src/styles/tokens.css（CSS 変数として import）
  → Tailwind コンパイル → packages/ui/dist/ui.css
  → Storybook
```

### 2 階層トークン構造

```
alias.json                  semantic.json               CSS 変数                       コンポーネント
──────────────────────────  ──────────────────────────  ────────────────────────────  ──────────────
color.primary-500:          color.primary.base:         --morphink-color-primary:     bg-(--morphink-color-primary)
  oklch(65.96% 0.21 18)      refs {color.primary-500}    resolved to oklch(...)
```

- **Alias トークン** — 生のパレット、スペーシングスケール、角丸。実装の詳細。
- **Semantic トークン** — 設計意図（`primary`、`destructive`、`muted`）。デザインシステムの共通言語。

コンポーネントは semantic トークンのみを参照する。`alias.json` を差し替えるだけでビジュアルを一新できる。

## パッケージ構成

```
packages/
  tokens/
    tokens/           # alias.json, semantic.json, semantic-dark.json
    dist/             # ビルド成果物 (css, json, ts)
  ui/
    src/base/ui/      # Base コンポーネント (*Base.vue)
    src/base/lib/     # ユーティリティ (cn, CVA バリアント, layout-utils, props)
    src/components/   # Public ラッパー (atoms, molecules, organisms)
    src/styles/       # tokens.css, base.css (モーション, キーフレーム)
    dist/ui.css       # 生成 CSS
  docs/
    src/stories/      # Storybook ストーリー
```

## Props 体系

コンポーネントは `packages/ui/src/base/lib/props/` で定義された一貫した props を共有する。

| Prop | 値 | 備考 |
|------|---|------|
| `variant` | `solid`, `outline`, `ghost`, `soft`, `subtle`, `elevated` | コンポーネントごとにサブセット |
| `size` | `xs`, `sm`, `md`, `lg`, `xl` | コンポーネントごとにサブセット |
| `tone` | `primary`, `secondary`, `tertiary`, `base`, `accent`, `neutral`, `success`, `warning`, `info`, `destructive` | Alert はサブセット |
| `rounded` | `none`, `sm`, `md`, `lg`, `xl`, `full` | Button/Badge/Avatar は `full` を含む |
| `shadow` | `none`, `sm`, `md`, `lg` | Card, Panel, Dialog 等に適用 |

### コンポーネント固有のバリアント

一部のコンポーネントは独自のバリアントセットを持つ:

- **Card**: `elevated`, `outline`, `ghost`, `soft`, `interactive`
- **Tabs**: `pill`, `underline`
- **Nav**: `subtle`, `solid`
- **Toolbar**: `solid`, `subtle`

## レイアウトコンポーネント

レイアウトコンポーネントはスペーシングを統一するために `SpaceToken` を使用:

```ts
type SpaceToken = '0' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl' | '6xl'
// xs→4px, sm→8px, md→12px, lg→16px, xl→24px, 2xl→32px, 3xl→40px, 4xl→48px, 5xl→64px, 6xl→80px
```

### Box

汎用コンテナ。padding、overflow、サイズ指定の props を持つ。

```vue
<Box padding="lg" overflow="auto" position="relative">
  コンテンツ
</Box>
```

### Grid

レスポンシブ `auto-fit`/`auto-fill` 対応の CSS Grid レイアウト。

```vue
<Grid columns="auto-fit" minWidth="240px" gap="lg" align="stretch">
  <Card>...</Card>
  <Card>...</Card>
</Grid>
```

Props: `columns`（number | `auto-fit` | `auto-fill` | string）, `rows`, `minWidth`, `gap`, `rowGap`, `columnGap`, `align`, `justify`

### Stack

要素を一列に並べる Flexbox レイアウト。

```vue
<Stack direction="row" gap="md" align="center" justify="between">
  <Button>キャンセル</Button>
  <Button tone="primary">保存</Button>
</Stack>
```

Props: `direction`, `gap`, `align`, `justify`, `wrap`, `grow`, `padding`, `paddingX`, `paddingY`

## コンポーネントパターン

### Compound Component

Card と Dropdown はサブコンポーネントを持つ compound component パターンを使用:

- **Card**: `CardHeader` / `CardBody` / `CardFooter` / `CardTitle` / `CardDescription` / `CardMedia`
- **Dropdown**: 12 サブコンポーネント（`DropdownTrigger`, `DropdownContent`, `DropdownItem`, `DropdownSeparator` 等）+ `provide`/`inject` によるサイズコンテキスト伝播

```vue
<Card variant="elevated" rounded="lg">
  <CardHeader>
    <CardTitle>タイトル</CardTitle>
    <CardDescription>説明文</CardDescription>
  </CardHeader>
  <CardBody>コンテンツ</CardBody>
  <CardFooter>
    <Button>アクション</Button>
  </CardFooter>
</Card>
```

### Reka UI ラッパーパターン

状態管理が必要な Reka UI プリミティブ（Dialog, Dropdown, Select 等）は、reka-ui の `useForwardPropsEmits` を使ってラップする。

**問題:** optional props を直接バインドすると `undefined` が渡り、Reka UI が意図せず controlled モードに入る。内部の状態管理が効かなくなる。

**解決策:**

```vue
<script setup lang="ts">
import { DropdownMenuRoot, useForwardPropsEmits } from 'reka-ui'

const props = defineProps<{
  open?: boolean
  defaultOpen?: boolean
}>()

const emit = defineEmits<{
  (e: 'update:open', value: boolean): void
}>()

const forwarded = useForwardPropsEmits(props, emit)
</script>

<template>
  <DropdownMenuRoot v-bind="forwarded">
    <slot />
  </DropdownMenuRoot>
</template>
```

`useForwardPropsEmits` は定義済みの props のみを転送オブジェクトに含める — `undefined` の値は省略されるため、利用側が明示的に値を渡すまで Reka UI は uncontrolled モードを維持する。

**このパターンが必要:** Root/Sub（`open`）、RadioGroup/CheckboxGroup（`modelValue`）
**不要:** Trigger, Content, Item, Separator（状態管理 props なし）

## CSS 変数命名規則

すべての CSS カスタムプロパティは `--morphink-` プレフィックスを使用:

| カテゴリ | パターン | 例 |
|---------|---------|---|
| カラー | `--morphink-color-{name}` | `--morphink-color-primary` |
| スペーシング | `--morphink-space-{scale}` | `--morphink-space-lg` |
| 角丸 | `--morphink-radius-{scale}` | `--morphink-radius-md` |
| シャドウ | `--morphink-shadow-{scale}` | `--morphink-shadow-lg` |
| デュレーション | `--morphink-duration-{speed}` | `--morphink-duration-fast` |
| イージング | `--morphink-easing-{name}` | `--morphink-easing-standard` |

### モーションショートハンド変数

`packages/ui/src/styles/base.css` で定義。duration と easing トークンを組み合わせる:

| 変数 | duration | easing | 用途 |
|------|----------|--------|------|
| `--morphink-motion-interaction` | fast (100ms) | standard | hover, focus, press |
| `--morphink-motion-state` | normal (200ms) | standard | open/close, toggle |
| `--morphink-motion-enter` | slow (300ms) | emphasized-decelerate | overlay, dialog 表示 |
| `--morphink-motion-leave` | normal (200ms) | emphasized-accelerate | overlay, dialog 退出 |
| `--morphink-motion-emphasis` | normal (200ms) | spring | badge, notification |
| `--morphink-motion-layout` | slow (300ms) | standard | resize, reorder |

### アクセシビリティ

`prefers-reduced-motion` はトークンレベルで処理 — すべての duration 変数が `0ms` に設定されるため、コンポーネントごとの個別対応は不要:

```css
@media (prefers-reduced-motion: reduce) {
  :root {
    --morphink-duration-fast: 0ms;
    --morphink-duration-normal: 0ms;
    --morphink-duration-slow: 0ms;
    --morphink-duration-slower: 0ms;
  }
}
```

## 設計原則

- **内部実装を公開しない** — プロダクトは Public コンポーネントのみに依存
- **依存の隔離** — Reka UI や Tailwind の差し替えは Base 層のみに影響
- **セマンティックトークンを優先** — コンポーネントは `--morphink-color-primary` を参照し、生のパレット値は使わない
- **Tailwind v4 参照構文** — `bg-(--morphink-color-primary)`、ハードコード値は使わない
- **ホバー透過** — `bg-[color-mix(in_srgb,var(--morphink-color-destructive)_8%,transparent)]`
- **クラス合成** — `cn()` = `clsx` + `tailwind-merge` でクラスの衝突なくマージ
