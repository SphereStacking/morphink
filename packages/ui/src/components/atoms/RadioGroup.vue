<script setup lang="ts">
/**
 * RadioGroup — groups Radio items with shared selection state.
 *
 * Public API layer. Customize defaults here.
 * Style variants: base/ui/radio/RadioGroupBase.vue
 */
import RadioGroupBase from '../../base/ui/radio/RadioGroupBase.vue'
import type { RadioSize, RadioTone, RadioVariant, RadioDuration, RadioEasing } from '../../base/lib/props'

withDefaults(
  defineProps<{
    modelValue?: string
    defaultValue?: string
    orientation?: 'horizontal' | 'vertical'
    disabled?: boolean
    name?: string
    size?: RadioSize
    variant?: RadioVariant
    tone?: RadioTone
    duration?: RadioDuration
    easing?: RadioEasing
  }>(),
  {
    orientation: 'vertical',
    disabled: false,
    size: 'md',
    variant: 'outline',
    tone: 'primary',
    duration: 'fast',
    easing: 'standard',
  }
)

defineEmits<{
  (e: 'update:modelValue', value: string): void
}>()
</script>

<template>
  <RadioGroupBase
    :model-value="modelValue"
    :default-value="defaultValue"
    :orientation="orientation"
    :disabled="disabled"
    :name="name"
    :size="size"
    :variant="variant"
    :tone="tone"
    :duration="duration"
    :easing="easing"
    @update:model-value="$emit('update:modelValue', $event)"
  >
    <slot />
  </RadioGroupBase>
</template>
