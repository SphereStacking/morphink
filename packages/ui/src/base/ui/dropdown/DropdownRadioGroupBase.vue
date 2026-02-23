<script setup lang="ts">
import { DropdownMenuRadioGroup, useForwardPropsEmits, type AcceptableValue } from 'reka-ui'

const props = defineProps<{
  modelValue?: AcceptableValue
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: AcceptableValue): void
}>()

const forwarded = useForwardPropsEmits(props, emit)
</script>

<template>
  <DropdownMenuRadioGroup v-bind="forwarded">
    <slot />
  </DropdownMenuRadioGroup>
</template>
