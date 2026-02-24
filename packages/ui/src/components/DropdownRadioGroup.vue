<script setup lang="ts">
/**
 * DropdownRadioGroup — exclusive selection group.
 *
 * Part of Dropdown compound component.
 * Style variants: base/ui/dropdown/DropdownRadioGroupBase.vue
 */
import DropdownRadioGroupBase from '../base/ui/dropdown/DropdownRadioGroupBase.vue'
import { useForwardPropsEmits, type AcceptableValue } from 'reka-ui'

const props = defineProps<{
  modelValue?: AcceptableValue
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: AcceptableValue): void
}>()

const forwarded = useForwardPropsEmits(props, emit)
</script>

<template>
  <DropdownRadioGroupBase v-bind="forwarded">
    <slot />
  </DropdownRadioGroupBase>
</template>
