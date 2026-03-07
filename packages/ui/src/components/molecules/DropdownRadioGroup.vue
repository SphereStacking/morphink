<script setup lang="ts">
/**
 * DropdownRadioGroup — exclusive selection group.
 *
 * Part of Dropdown compound component.
 * Style variants: base/ui/dropdown/DropdownRadioGroupBase.vue
 */
import DropdownRadioGroupBase from '../../base/ui/dropdown/DropdownRadioGroupBase.vue'

type AcceptableValue = string | number | boolean | Record<string, unknown>

defineProps<{
  modelValue?: AcceptableValue
}>()

defineEmits<{
  (e: 'update:modelValue', value: AcceptableValue): void
}>()
</script>

<template>
  <DropdownRadioGroupBase
    :model-value="modelValue"
    @update:model-value="$emit('update:modelValue', $event)"
  >
    <slot />
  </DropdownRadioGroupBase>
</template>
