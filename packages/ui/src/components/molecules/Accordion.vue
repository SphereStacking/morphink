<script setup lang="ts">
import AccordionBase from '../../base/ui/accordion/AccordionBase.vue'
import type { AccordionSize, AccordionVariant } from '../../base/lib/props'

withDefaults(
  defineProps<{
    type?: 'single' | 'multiple'
    modelValue?: string | string[]
    defaultValue?: string | string[]
    collapsible?: boolean
    disabled?: boolean
    size?: AccordionSize
    variant?: AccordionVariant
  }>(),
  {
    type: 'single',
    collapsible: true,
    size: 'md',
    variant: 'outline',
  }
)

defineEmits<{
  (e: 'update:modelValue', value: string | string[]): void
}>()
</script>

<template>
  <AccordionBase
    :type="type"
    :model-value="modelValue"
    :default-value="defaultValue"
    :collapsible="collapsible"
    :disabled="disabled"
    :size="size"
    :variant="variant"
    @update:model-value="$emit('update:modelValue', $event)"
  >
    <slot />
  </AccordionBase>
</template>
