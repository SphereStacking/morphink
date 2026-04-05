---
globs:
  - packages/ui/src/base/ui/**/*.vue
  - packages/ui/src/components/**/*.vue
---

# Reka UI ラッパーの必須パターン

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

## パターン選択基準

| シナリオ | パターン | 例 |
|---------|---------|-----|
| Base 層 + Root のみラップ | `useForwardPropsEmits(props, emit)` 直接 | DropdownBase, TooltipBase, PopoverBase |
| Base 層 + Group context 連携 | `rekaProps` computed + `useForwardPropsEmits` | CheckboxBase, RadioGroupBase, SwitchBase |
| Base 層 + 複合コンポーネント | 手動バインド（例外） | SelectBase, TabsBase（style props を Root に渡さないため） |
| Public 層 | 明示的な prop バインド + emit 転送。`reka-ui` を直接 import しない | Dialog, Select, Tooltip 等すべて |

## Public 層の `open: undefined` デフォルト

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
