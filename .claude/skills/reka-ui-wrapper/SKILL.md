---
name: reka-ui-wrapper
description: Reka UI ヘッドレスプリミティブのラッパーパターン（Vue 3）。Reka UI プリミティブ（DropdownMenu, Dialog, Select, Popover 等）のラッパーコンポーネント作成・デバッグ時に使用。useForwardPropsEmits による props 転送、as-child 合成、provide/inject コンテキスト伝播、controlled/uncontrolled モード制御をカバー。「ドロップダウンが開かない」「props 転送バグ」「Reka UI ラッパー作成」等でトリガー。
---

# Reka UI ラッパーパターン

## 最重要: useForwardPropsEmits

状態管理 props（`open`, `modelValue`）を持つ Reka UI コンポーネントをラップする際、optional props を直接バインドしてはならない。`reka-ui` の `useForwardPropsEmits` を使う。

### 問題

```vue
<!-- バグ: :open="undefined" で Reka UI が controlled モードに入り、状態更新されない -->
<DropdownMenuRoot :open="open" @update:open="emit('update:open', $event)">
```

Reka UI は値が `undefined` でも vnode props に `open` があれば controlled モードに入る。外部の状態管理がなければコンポーネントは開かない。

### 修正方法

```vue
<script setup lang="ts">
import { DropdownMenuRoot, useForwardPropsEmits } from 'reka-ui'

const props = defineProps<{
  open?: boolean
  defaultOpen?: boolean
  modal?: boolean
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

`useForwardPropsEmits` は親から明示的に渡された props のみを転送する。未設定の optional props は除外され、Reka UI の uncontrolled モードが維持される。

### 適用が必要な場面

**Base 層のみ** で適用する（Public 層は明示的 prop バインド + emit 転送。`reka-ui` を直接 import しない）:

| 層 | コンポーネント種別 | 状態管理 props | useForwardPropsEmits |
|---|---|---|---|
| Base | Root (DialogRoot, DropdownMenuRoot) | `open` | 必要 |
| Base | Sub (DropdownMenuSub) | `open` | 必要 |
| Base | RadioGroup, CheckboxGroup | `modelValue` | 必要 |
| Base | Trigger, Content, Item, Separator | なし | 不要 |
| Public | すべて | — | 不要（明示的 `:prop` + `@emit`） |

### 不要な場面

- `withDefaults` で常に値があるスタイリング props（variant, size, rounded）
- スタイルのみ追加するステートレスなラッパー

## as-child 合成

トリガーコンポーネントで `as-child` を使い、slot の子要素に振る舞いをマージする:

```vue
<template>
  <DropdownMenuTrigger as-child>
    <slot />
  </DropdownMenuTrigger>
</template>
```

利用者は任意の要素をトリガーとして渡せる。Reka UI が `aria-*` 属性とイベントハンドラを付与する。

## Portal パターン

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

## provide/inject コンテキスト

親から子孫に状態（例: `size`）を共有する:

```ts
// context.ts
import type { InjectionKey, Ref } from 'vue'
export const sizeKey: InjectionKey<Ref<SomeSize>> = Symbol('size')

// ContentBase.vue — 提供
provide(sizeKey, toRef(props, 'size'))

// ItemBase.vue — 注入（フォールバック付き）
const size = inject(sizeKey, ref('md' as SomeSize))
```

## デバッグチェックリスト

Reka UI ラッパーが開閉しない場合:

1. optional な状態管理 props（`open`, `modelValue`）が `undefined` で渡されていないか確認 → `useForwardPropsEmits` を使う
2. トリガーラッパーに `as-child` が設定されているか確認
3. Portal が Content をラップしているか確認
4. DOM で `data-state="closed"` と正しい `aria-*` 属性を検査 → あれば Reka UI は正しく接続されているが状態管理に問題がある
