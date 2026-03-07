<script setup lang="ts">
/**
 * DropdownCheckboxItem — toggleable menu item.
 *
 * Part of Dropdown compound component.
 * Style variants: base/ui/dropdown/DropdownCheckboxItemBase.vue
 */
import DropdownCheckboxItemBase from '../../base/ui/dropdown/DropdownCheckboxItemBase.vue'

withDefaults(
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

defineEmits<{
  (e: 'update:modelValue', value: boolean): void
  (e: 'select', event: Event): void
}>()
</script>

<template>
  <DropdownCheckboxItemBase
    :model-value="modelValue"
    :disabled="disabled"
    :text-value="textValue"
    @update:model-value="$emit('update:modelValue', $event)"
    @select="$emit('select', $event)"
  >
    <slot />
  </DropdownCheckboxItemBase>
</template>
