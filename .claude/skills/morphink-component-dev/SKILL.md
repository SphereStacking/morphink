---
name: morphink-component-dev
description: >
  morphink/ui プロジェクトのコンポーネント開発ガイド。
  新規 UI コンポーネント追加、既存コンポーネントのアーキテクチャ変更、export 更新時に使用。
  3層アーキテクチャ（Public/Base/Reka UI）、Reka UI ラッパーパターン、
  Compound Component パターン、props 体系、CSS 変数命名、export パターンをカバー。
  「新コンポーネント」「コンポーネント追加」「ファイル構造」「export 登録」
  「ドロップダウンが開かない」「props 転送バグ」「Reka UI ラッパー」
  「コンポーネント分割」「サブコンポーネント」「compound component」等でトリガー。
---

# morphink/ui コンポーネント開発

## 3層アーキテクチャ

```
Public (components/)  -->  Base (base/ui/*/)  -->  Reka UI
     薄いラッパー            CVA + ロジック         ヘッドレス a11y
```

| 層 | 場所 | 命名 | 役割 |
|---|---|---|---|
| Public | `packages/ui/src/components/` | `Button.vue` | 外部公開 API |
| Base | `packages/ui/src/base/ui/{name}/` | `ButtonBase.vue` | CVA バリアント、Reka UI 統合 |
| Props | `packages/ui/src/base/lib/props/` | `size.ts`, `variant.ts` | 共有 prop 定義 |

## 新コンポーネント チェックリスト

### 1. Props 登録

`packages/ui/src/base/lib/props/size.ts` に追加:

```ts
export const componentSizes = {
  // ... 既存
  NewComponent: ['sm', 'md', 'lg'],
} as const
export type NewComponentSize = (typeof componentSizes.NewComponent)[number]
```

`variant.ts`, `rounded.ts`, `shadow.ts` も必要に応じて同パターンで追加。

### 2. コンテキストファイル（サブコンポーネント間で状態共有する場合）

`packages/ui/src/base/ui/new-component/newComponentContext.ts` を作成:

```ts
import type { InjectionKey, Ref } from 'vue'
import type { NewComponentSize } from '../../lib/props'
export const newComponentSizeKey: InjectionKey<Ref<NewComponentSize>> = Symbol('newComponentSize')
```

### 3. Base コンポーネント

**状態管理ルート**（`open`/`modelValue` を管理）— `useForwardPropsEmits` 使用:
```vue
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

**スタイル付きコンテンツ**（CVA + provide）:
```vue
<script setup lang="ts">
import { cva } from 'class-variance-authority'
import { cn } from '../../lib/utils'
provide(sizeKey, toRef(props, 'size'))
const contentClass = computed(() => cn(contentVariants({ rounded, shadow, size })))
</script>
```

**スタイル付きアイテム**（inject size）:
```vue
<script setup lang="ts">
const size = inject(sizeKey, ref('md'))
// 注意: 以下はパターン例。実装時は対象コンポーネントの既存 Base 層を参照して値を決定すること
const sizeClasses: Record<Size, string> = {
  sm: '/* 既存コンポーネントに合わせた Tailwind クラス */',
  md: '/* トークン参照: px-(--morphink-space-sm) 等 */',
  lg: '/* 既存コンポーネントに合わせた Tailwind クラス */',
}
</script>
```

### 4. Public コンポーネント

**状態管理 props あり** — 明示的バインド（`reka-ui` を直接 import しない）:
```vue
<script setup lang="ts">
import NewComponentBase from '../base/ui/new-component/NewComponentBase.vue'
defineProps<{ open?: boolean; size?: Size }>()
defineEmits<{ (e: 'update:open', value: boolean): void }>()
</script>
<template>
  <NewComponentBase :open="open" :size="size" @update:open="$emit('update:open', $event)">
    <slot />
  </NewComponentBase>
</template>
```
Base 層が `useForwardPropsEmits` で undefined を除外するため、Public 層は直接バインドで安全。

**スタイリング props のみ** — デフォルト値付き直接バインド:
```vue
<script setup lang="ts">
import ContentBase from '../base/ui/new-component/ContentBase.vue'
withDefaults(defineProps<{ size?: Size }>(), { size: 'md' })
</script>
<template>
  <ContentBase :size="size"><slot /></ContentBase>
</template>
```

### 5. Export 追加

`packages/ui/src/index.ts` に追加:

```ts
export { default as NewComponentBase } from './base/ui/new-component/NewComponentBase.vue'
export { default as NewComponent } from './components/NewComponent.vue'
```

### 6. Storybook ストーリー

`packages/docs/src/stories/components/{atoms|molecules}/NewComponent.stories.vue` を作成。
詳細は `morphink-story` スキルを参照。

## CSS 規約

- プレフィックス: `--morphink-`
- トークン: `--morphink-color-*`, `--morphink-radius-*`, `--morphink-shadow-*`, `--morphink-space-*`
- Tailwind での使い方: `text-(--morphink-color-foreground)`, `rounded-(--morphink-radius-md)`
- Destructive: `text-(--morphink-color-destructive)`
- ホバー透過: `bg-[color-mix(in_srgb,var(--morphink-color-destructive)_8%,transparent)]`

## クラス合成

常に `cn()`（`clsx` + `tailwind-merge`）を使用:

```ts
import { cn } from '../../lib/utils'
const classes = computed(() => cn(baseClasses, conditionalClasses))
```

---

## Reka UI ラッパーパターン

### useForwardPropsEmits（最重要）

状態管理 props（`open`, `modelValue`）を持つ Reka UI コンポーネントをラップする際、optional props を直接バインドしてはならない。

**問題**: `:open="undefined"` で Reka UI が controlled モードに入り、状態更新されない。
Reka UI は値が `undefined` でも vnode props に `open` があれば controlled モードに入る。

**修正**: `useForwardPropsEmits` で未設定の optional props を除外する。

```vue
<script setup lang="ts">
import { DropdownMenuRoot, useForwardPropsEmits } from 'reka-ui'
const props = defineProps<{ open?: boolean; defaultOpen?: boolean; modal?: boolean }>()
const emit = defineEmits<{ (e: 'update:open', value: boolean): void }>()
const forwarded = useForwardPropsEmits(props, emit)
</script>
<template>
  <DropdownMenuRoot v-bind="forwarded"><slot /></DropdownMenuRoot>
</template>
```

### 適用基準

| 層 | コンポーネント種別 | 状態管理 props | useForwardPropsEmits |
|---|---|---|---|
| Base | Root (DialogRoot, DropdownMenuRoot) | `open` | 必要 |
| Base | Sub (DropdownMenuSub) | `open` | 必要 |
| Base | RadioGroup, CheckboxGroup | `modelValue` | 必要 |
| Base | Trigger, Content, Item, Separator | なし | 不要 |
| Public | すべて | — | 不要（明示的 `:prop` + `@emit`） |

### パターン選択基準

| シナリオ | パターン | 例 |
|---------|---------|-----|
| Base 層 + Root のみラップ | `useForwardPropsEmits(props, emit)` 直接 | DropdownBase, TooltipBase |
| Base 層 + Group context 連携 | `rekaProps` computed + `useForwardPropsEmits` | CheckboxBase, RadioGroupBase |
| Base 層 + 複合コンポーネント | 手動バインド（例外） | SelectBase, TabsBase |
| Public 層 | 明示的な prop バインド + emit 転送 | Dialog, Select, Tooltip |

### as-child 合成

トリガーコンポーネントで `as-child` を使い、slot の子要素に振る舞いをマージする:

```vue
<template>
  <DropdownMenuTrigger as-child><slot /></DropdownMenuTrigger>
</template>
```

### Portal パターン

Content コンポーネントは Portal でラップしてテレポート層に描画する:

```vue
<template>
  <DropdownMenuPortal>
    <DropdownMenuContent :side="side" :align="align" :side-offset="sideOffset" :class="contentClass">
      <slot />
    </DropdownMenuContent>
  </DropdownMenuPortal>
</template>
```

### デバッグチェックリスト

Reka UI ラッパーが開閉しない場合:

1. optional な状態管理 props が `undefined` で渡されていないか → `useForwardPropsEmits` を使う
2. トリガーラッパーに `as-child` が設定されているか
3. Portal が Content をラップしているか
4. DOM で `data-state="closed"` と正しい `aria-*` 属性を検査

---

## Compound Component パターン

モノリシックなコンポーネントを合成可能なサブコンポーネントに分割する。

### サブコンポーネント分解

ヘッドレスプリミティブの API からサブコンポーネントを特定する。DropdownMenu の例:

| プリミティブ | サブコンポーネント | 役割 |
|---|---|---|
| Root | Dropdown | 状態コンテナ |
| Trigger | DropdownTrigger | クリック対象（as-child） |
| Content + Portal | DropdownContent | ポップオーバーパネル（バリアント付き） |
| Item | DropdownItem | メニューアクション |
| Separator | DropdownSeparator | 区切り線 |
| Group + Label | DropdownGroup / DropdownLabel | 論理グループ |
| CheckboxItem | DropdownCheckboxItem | トグル可能な項目 |
| RadioGroup + RadioItem | DropdownRadioGroup / DropdownRadioItem | 排他選択 |
| Sub + SubTrigger + SubContent | DropdownSub / DropdownSubTrigger / DropdownSubContent | ネストメニュー |

### コンテキスト伝播

provide/inject で親から子孫にバリアント状態を共有する:

```ts
// dropdownContext.ts
import type { InjectionKey, Ref } from 'vue'
export const dropdownSizeKey: InjectionKey<Ref<DropdownSize>> = Symbol('dropdownSize')
```

**提供側**（ContentBase）: `provide(dropdownSizeKey, toRef(props, 'size'))`
**消費側**（ItemBase）: `const size = inject(dropdownSizeKey, ref('md' as DropdownSize))`

### バリアント所有権

| バリアント | 所有者 | 理由 |
|---|---|---|
| size | Content（子に provide） | 全子要素が統一的にスケール |
| rounded, shadow | Content | コンテナの外観 |
| destructive | Item | 項目ごとの振る舞い |
| disabled | Item, CheckboxItem | 項目ごとの状態 |

### スロット拡張

名前付きスロットでオプション部分を提供:

```vue
<DropdownMenuItem :class="classes">
  <span v-if="$slots.icon" class="shrink-0"><slot name="icon" /></span>
  <slot />
</DropdownMenuItem>
```

---

## 既存コンポーネント一覧

`references/component-inventory.md` を参照。
