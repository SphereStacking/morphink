# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## プロジェクト概要

pnpm workspaces によるデザインシステム monorepo。Vue 3 + Tailwind CSS v4 + Figma Variables。
アーキテクチャ思想は CONCEPT.md を参照。

- `packages/tokens` — デザイントークンのソース（DTCG 形式 JSON）と Style Dictionary ビルド
- `packages/figma-plugin` — Figma Variables → DTCG JSON エクスポーター（カスタムプラグイン）
- `packages/ui` — Vue 3 UI コンポーネントライブラリ（Reka UI + CVA + tailwind-merge）
- `packages/docs` — Storybook 10（コンポーネントカタログ・ガイドライン）

## コマンド

```bash
pnpm install                              # 依存インストール
pnpm run build                            # 全パッケージビルド（tokens → css → docs）
pnpm run dev:docs                         # Storybook 起動 (localhost:6006)
pnpm run lint                             # oxlint
pnpm run format                           # oxfmt --write

# パッケージ単体
pnpm --filter @morphink/tokens build        # トークン生成 → dist/css,json,ts
pnpm --filter @morphink/ui build:css        # Tailwind コンパイル → dist/ui.css
pnpm --filter @morphink/docs dev            # Storybook dev（tokens+css ビルド込み）
pnpm --filter @morphink/docs build          # Storybook 静的ビルド
```

テストランナーは未導入。UI 確認は Storybook で行う。

## アーキテクチャ

### トークンパイプライン

```
Figma Variables → カスタムプラグイン（DTCG JSON 出力）→ packages/tokens/tokens/*.json
  → Style Dictionary → packages/tokens/dist/{css,json,ts}
  → packages/ui/src/styles/tokens.css（CSS 変数として import）
  → Tailwind コンパイル → packages/ui/dist/ui.css
  → Storybook で表示
```

### コンポーネント 3 層構造

| 層 | 場所 | 命名 | 役割 |
|---|---|---|---|
| Public/atoms | `packages/ui/src/components/atoms/` | `Button.vue` | Atom — 単体の UI プリミティブ |
| Public/molecules | `packages/ui/src/components/molecules/` | `FormField.vue` | Molecule — Atoms の組み合わせ |
| Public/organisms | `packages/ui/src/components/organisms/` | `AppShell.vue` | Organism — 参考実装（カスタマイズ前提） |
| Base | `packages/ui/src/base/ui/*/` | `ButtonBase.vue` | CVA バリアント + Reka UI 統合 |
| Props | `packages/ui/src/base/lib/props/` | `variant.ts`, `size.ts` 等 | 共有 prop 定義 |

すべて `packages/ui/src/index.ts` から export。

### Compound Component パターン

Card、Dropdown、Accordion は Compound Component パターンを使用。

- **Card**: CardHeader / CardBody / CardFooter / CardTitle / CardDescription / CardMedia
- **Dropdown**: DropdownTrigger / DropdownContent / DropdownItem / DropdownSeparator 等 12 サブコンポーネント
- **Accordion**: AccordionItem サブコンポーネント

Dropdown は provide/inject でサイズコンテキストを伝播（`dropdownContext.ts`）。
Accordion は provide/inject でサイズ・バリアントコンテキストを伝播（`accordionContext.ts`）。

### Reka UI ラッパーの必須パターン

状態管理 props（`open`, `modelValue`）を持つ Reka UI コンポーネントをラップする際、`reka-ui` の `useForwardPropsEmits` を使う。optional props を直接バインドすると `undefined` が渡り Reka UI が controlled モードに入って動作しなくなる。

```vue
<!-- 正しいパターン -->
<script setup lang="ts">
import { SomePrimitive, useForwardPropsEmits } from 'reka-ui'
const props = defineProps<{ open?: boolean }>()
const emit = defineEmits<{ (e: 'update:open', value: boolean): void }>()
const forwarded = useForwardPropsEmits(props, emit)
</script>
<template>
  <SomePrimitive v-bind="forwarded"><slot /></SomePrimitive>
</template>
```

適用が必要: Root/Sub（`open`）、RadioGroup/CheckboxGroup（`modelValue`）
不要: Trigger, Content, Item, Separator（状態管理 props なし）

#### パターン選択基準

| シナリオ | パターン | 例 |
|---------|---------|-----|
| Base 層 + Root のみラップ | `useForwardPropsEmits(props, emit)` 直接 | DropdownBase, TooltipBase, PopoverBase |
| Base 層 + Group context 連携 | `rekaProps` computed + `useForwardPropsEmits` | CheckboxBase, RadioGroupBase, SwitchBase |
| Base 層 + 複合コンポーネント | 手動バインド（例外） | SelectBase, TabsBase（style props を Root に渡さないため） |
| Public 層 | 明示的な prop バインド + emit 転送。`reka-ui` を直接 import しない | Dialog, Select, Tooltip 等すべて |

#### Public 層の `open: undefined` デフォルト

Vue 3 は Boolean 型の optional prop にデフォルト値を指定しない場合 `false` に型強制する。これにより Public 層から Base 層へ `open: false` が渡り、Reka UI が controlled モードに入って uncontrolled 動作が壊れる。

Public 層で `open?: boolean` を持つコンポーネントは `withDefaults` で `open: undefined` を明示する:

```vue
withDefaults(
  defineProps<{ open?: boolean; defaultOpen?: boolean }>(),
  { open: undefined, defaultOpen: undefined }
)
```

`open` + `defaultOpen` 両方: Collapsible, Dialog, Sheet, AlertDialog, Dropdown, DropdownSub
`open` のみ: Popover, Tooltip

### レイアウトコンポーネント

Grid と Stack は SpaceToken ベースの props API を持つ。

```ts
type SpaceToken = '0' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl' | '6xl'
// xs→4px, sm→8px, md→12px, lg→16px, xl→24px, 2xl→32px, 3xl→40px, 4xl→48px, 5xl→64px, 6xl→80px
```

- **Grid**: `columns`（number | 'auto-fit' | 'auto-fill' | string）, `rows`, `minWidth`, `gap`, `align`, `justify`
- **Stack**: `direction`, `gap`, `align`, `justify`, `wrap`

ユーティリティ: `packages/ui/src/base/lib/layout-utils.ts`

### 共通 Props 体系

| Prop | 値 |
|------|----|
| variant | solid, outline, ghost, soft, subtle, elevated（コンポーネントごとにサブセット） |
| size | xs, sm, md, lg, xl（コンポーネントごとにサブセット） |
| tone | primary, secondary, tertiary, base, accent, neutral, success, warning, info, destructive |
| rounded | none, sm, md, lg, xl, full |
| shadow | none, sm, md, lg |

### Motion トークン

MD3 / Carbon / WCAG 2.2 を参照基盤とする Motion Token System。

#### Primitive トークン（`packages/tokens/tokens/primitives.json`）

| カテゴリ | トークン | 値 |
|---|---|---|
| duration | instant / fast / normal / slow / slower | 0ms / 100ms / 200ms / 300ms / 500ms |
| easing | standard / decelerate / accelerate / emphasized-decelerate / emphasized-accelerate / linear / spring | cubic-bezier 値 / linear() |
| stagger | item / max-items | 30 / 8 |

#### Motion Shorthand 変数（`packages/ui/src/styles/base.css` 手書き）

| 変数 | duration | easing | 用途 |
|---|---|---|---|
| `--morphink-motion-interaction` | fast (100ms) | standard | hover, focus, press |
| `--morphink-motion-state` | normal (200ms) | standard | open/close, toggle |
| `--morphink-motion-enter` | slow (300ms) | emphasized-decelerate | overlay, dialog enter |
| `--morphink-motion-leave` | normal (200ms) | emphasized-accelerate | overlay, dialog exit |
| `--morphink-motion-emphasis` | normal (200ms) | spring | badge, notification |
| `--morphink-motion-layout` | slow (300ms) | standard | resize, reorder |

#### コンポーネントでの使用パターン

```html
<!-- Transition: 明示的な property + トークン参照 -->
<div class="[transition-property:background-color,color] [transition-duration:var(--morphink-duration-fast)] [transition-timing-function:var(--morphink-easing-standard)]">

<!-- Animation: Tailwind arbitrary value + shorthand 変数 -->
<div class="data-[state=open]:animate-[mi-dialog-in_var(--morphink-motion-enter)_both]">
```

#### prefers-reduced-motion

トークンベース: `@media (prefers-reduced-motion: reduce)` で duration 変数を 0ms に上書き。個別の `!important` 不要。

### CSS 変数命名規則

| レイヤー | プレフィックス | 定義元 | スコープ |
|---------|--------------|--------|---------|
| グローバルトークン | `--morphink-*` | Style Dictionary (`packages/tokens/dist/`) | `:root` |
| Motion Shorthand | `--morphink-motion-*` | `base.css` 手書き | `:root` |
| コンポーネント内部変数 | `--<abbr>-*` | CVA tone/variant で設定 | 要素 |
| ダイナミック変数 | `--mi-*` | computed style | インスタンス |
| キーフレーム名 | `mi-*` | `base.css` 手書き | グローバル |

#### コンポーネント内部変数

tone variant 内で `[--btn-color:var(--morphink-color-primary)]` の形式で semantic token にバインドする。

| プレフィックス | 対象 | 変数 |
|--------------|------|------|
| `--btn-*` | ButtonBase | color, fg, hover, active, accent |
| `--badge-*` | BadgeBase | color, fg, accent |
| `--ctl-*` | CheckboxBase, SwitchBase, RadioBase | color, fg |
| `--alert-*` | AlertBase | color, fg, accent |
| `--prog-*` | ProgressBase | color |
| `--sld-*` | SliderBase | color |
| `--pgn-*` | PaginationBase | color |
| `--tst-*` | ToastBase | color, fg, accent |
| `--ring-color` | 複数コンポーネント共通 | focus ring 色 |

新規コンポーネントでは 2〜4 文字の略称をプレフィックスとし、semantic token を参照する。

### mi:* ユーティリティ

- 位置づけ: Tailwind を内部実装に留めるための公開スタイリング API
- 原則: トークンの消費手段であり、CSS フレームワークではない
- スコープ: トークン由来のプロパティのみ（color / spacing / radius / shadow）
- スコープ外: hover / focus / display / flex / width 等（トークンと無関係）
- バリアント: レスポンシブのみ。インタラクション状態はコンポーネントの責務
- 生成元: Tailwind v4 ビルド（prefix(mi) + カスタムテーマ）
- ソース: packages/tokens/src/mi-utilities.css + safelist.html
- 出力先: packages/tokens/dist/css/utilities.css
- プレフィックス: `mi:`（Tailwind v4 バリアント記法、例: `mi:bg-primary`, `mi:p-md`）

mi:* で hover/focus が必要だと感じたら、
それはコンポーネントか props の追加を検討すべきサイン。

## コードスタイル

- Vue SFC: `<script setup lang="ts">` / `defineProps` + `withDefaults` / `defineEmits`
- import 順: Vue → サードパーティ → ローカル
- クラス合成: `cn()` (`packages/ui/src/base/lib/utils.ts`) = clsx + tailwind-merge
- スタイルバリアント: `cva` (class-variance-authority)
- CSS 変数プレフィックス: `--morphink-`
- テーマクラス: `.mi-theme` / ユーティリティクラスプレフィックス: `mi:`
- Tailwind v4 でのトークン参照: `bg-(--morphink-color-primary)`, `text-(--morphink-color-foreground)`
- ホバー透過: `bg-[color-mix(in_srgb,var(--morphink-color-destructive)_8%,transparent)]`
- semantic tokens を優先し、primitive tokens や色の直書きは避ける

## 編集してはいけないファイル（生成物）

- `packages/tokens/dist/*`
- `packages/ui/dist/ui.css`
- `packages/ui/dist/utilities.css`

## Figma MCP 連携

プロジェクトレベルで Figma MCP サーバー（`.mcp.json`）を設定済み。

### ルール

- Figma MCP の出力（React + Tailwind）はデザイン意図の表現であり、最終コードではない
- Tailwind ユーティリティクラスは morphink のトークン参照（`--morphink-*`）に置き換える
- 色・スペーシング・角丸・影は必ず semantic token を使い、ハードコードしない
- 既存コンポーネント（`packages/ui/src/components/`）を再利用し、重複実装しない
- Figma MCP が localhost ソースで画像/SVG を返した場合、そのソースを直接使用する
- アイコンパッケージを新規追加しない — アセットは Figma ペイロードに含まれる
- localhost ソースがある場合、プレースホルダーを作成しない

### 推奨フロー

1. `get_design_context` でフレームの構造化表現を取得
2. `get_screenshot` でビジュアルリファレンスを取得
3. `get_variable_defs` でトークン情報を取得
4. 取得した情報を morphink の Vue 3 + Tailwind v4 + トークン体系に変換して実装
5. Figma デザインとの 1:1 ビジュアルパリティを検証

### トークンマッピング（Figma → morphink）

Figma Variables の命名と morphink CSS 変数を対応付けて実装する。
具体的なマッピングは Figma ファイルの Variable Collection 構成に依存する。

## 主要依存

- **reka-ui** — ヘッドレス a11y コンポーネント（Dialog, Select, Dropdown, Tabs 等の基盤）
- **class-variance-authority** — スタイルバリアント定義
- **style-dictionary** + **@tokens-studio/sd-transforms** — トークンビルド（sd-transforms は baseline transform group として利用）
- **packages/figma-plugin** — Figma Variables → DTCG JSON エクスポーター
- **Storybook 10.2** — ドキュメント・ビジュアルテスト
- **oxlint** / **oxfmt** — lint・フォーマット
