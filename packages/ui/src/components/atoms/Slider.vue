<script setup lang="ts">
/**
 * Slider — range input control.
 *
 * Public API layer. Customize defaults here.
 * Style variants: base/ui/slider/SliderBase.vue
 */
import SliderBase from '../../base/ui/slider/SliderBase.vue'
import type { SliderSize, SliderTone } from '../../base/lib/props'

withDefaults(
  defineProps<{
    modelValue?: number[]
    defaultValue?: number[]
    min?: number
    max?: number
    step?: number
    disabled?: boolean
    orientation?: 'horizontal' | 'vertical'
    size?: SliderSize
    tone?: SliderTone
  }>(),
  {
    min: 0,
    max: 100,
    step: 1,
    disabled: false,
    orientation: 'horizontal',
    size: 'md',
    tone: 'primary',
  }
)

defineEmits<{
  (e: 'update:modelValue', value: number[]): void
}>()
</script>

<template>
  <SliderBase
    :model-value="modelValue"
    :default-value="defaultValue"
    :min="min"
    :max="max"
    :step="step"
    :disabled="disabled"
    :orientation="orientation"
    :size="size"
    :tone="tone"
    @update:model-value="$emit('update:modelValue', $event)"
  />
</template>
