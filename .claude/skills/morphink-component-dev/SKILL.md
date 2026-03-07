---
name: morphink-component-dev
description: morphink/ui プロジェクトのコンポーネント開発ガイド。新規 UI コンポーネント追加、既存コンポーネントのアーキテクチャ変更、export 更新、Storybook ストーリー作成時に使用。3層アーキテクチャ（Public/Base/Reka UI）、ファイル命名規則、props 体系（variant/size/tone/rounded/shadow）、CSS 変数命名、export パターンをカバー。「新コンポーネント」「コンポーネント追加」「ファイル構造」「export 登録」等でトリガー。
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
const sizeClasses: Record<Size, string> = {
  sm: 'py-1 px-1.5 text-xs',
  md: 'py-[6px] px-(--morphink-space-sm) text-[13px]',
  lg: 'py-2 px-3 text-sm',
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

`packages/docs/src/stories/components/NewComponent.stories.ts` を作成。

標準ストーリー構成:
- **Playground**: 主要 props の argTypes コントロール
- **機能バリエーション**: アイコン、チェックボックス、ラジオ、サブメニュー等
- **Sizes**: sm/md/lg の横並び比較

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

## 既存コンポーネント一覧

`references/component-inventory.md` を参照。
