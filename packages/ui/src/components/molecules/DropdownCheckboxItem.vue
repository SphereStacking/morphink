<script setup lang="ts">
/**
 * DropdownCheckboxItem — toggleable menu item.
 *
 * Part of Dropdown compound component.
 * Style variants: base/ui/dropdown/DropdownCheckboxItemBase.vue
 */
import DropdownCheckboxItemBase from '../../base/ui/dropdown/DropdownCheckboxItemBase.vue'
import { useForwardPropsEmits } from 'reka-ui'

const props = withDefaults(
  defineProps<{
    modelValue?: boolean | 'indeterminate'
    disabled?: boolean
    textValue?: string
  }>(),
  {
    modelValue: false,
    disabled: false,
  }
)

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void
  (e: 'select', event: Event): void
}>()

const forwarded = useForwardPropsEmits(props, emit)
</script>

<template>
  <DropdownCheckboxItemBase v-bind="forwarded">
    <slot />
  </DropdownCheckboxItemBase>
</template>
