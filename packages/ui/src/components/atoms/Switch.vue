<script setup lang="ts">
/**
 * Switch — toggle control for boolean options.
 *
 * Public API layer. Customize defaults here.
 * Style variants: base/ui/switch/SwitchBase.vue
 */
import SwitchBase from '../../base/ui/switch/SwitchBase.vue'
import type { SwitchSize, SwitchTone, SwitchVariant, SwitchDuration, SwitchEasing } from '../../base/lib/props'

withDefaults(
  defineProps<{
    modelValue?: boolean
    defaultValue?: boolean
    variant?: SwitchVariant
    tone?: SwitchTone
    size?: SwitchSize
    duration?: SwitchDuration
    easing?: SwitchEasing
    disabled?: boolean
    name?: string
    value?: string
    id?: string
  }>(),
  {
    variant: 'solid',
    tone: 'primary',
    size: 'md',
    duration: 'normal',
    easing: 'standard',
    disabled: false,
  }
)

defineEmits<{
  (e: 'update:modelValue', value: boolean): void
}>()
</script>

<template>
  <SwitchBase
    :model-value="modelValue"
    :default-value="defaultValue"
    :variant="variant"
    :tone="tone"
    :size="size"
    :duration="duration"
    :easing="easing"
    :disabled="disabled"
    :name="name"
    :value="value"
    :id="id"
    @update:model-value="$emit('update:modelValue', $event)"
  />
</template>
