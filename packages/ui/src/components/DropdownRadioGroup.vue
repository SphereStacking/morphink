<script setup lang="ts">
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
