<script setup lang="ts">
/**
 * Checkbox — boolean or indeterminate toggle control.
 *
 * Public API layer. Customize defaults here.
 * Style variants: base/ui/checkbox/CheckboxBase.vue
 */
import CheckboxBase from '../../base/ui/checkbox/CheckboxBase.vue'
import type {
  CheckboxRounded,
  CheckboxSize,
  CheckboxTone,
  CheckboxVariant,
  CheckboxDuration,
  CheckboxEasing,
} from '../../base/lib/props'

withDefaults(
  defineProps<{
    modelValue?: boolean | 'indeterminate'
    defaultValue?: boolean | 'indeterminate'
    variant?: CheckboxVariant
    tone?: CheckboxTone
    size?: CheckboxSize
    rounded?: CheckboxRounded
    duration?: CheckboxDuration
    easing?: CheckboxEasing
    disabled?: boolean
    name?: string
    value?: string
    id?: string
  }>(),
  {
    variant: 'outline',
    tone: 'primary',
    size: 'md',
    rounded: 'sm',
    duration: 'fast',
    easing: 'standard',
    disabled: false,
  }
)

defineEmits<{
  (e: 'update:modelValue', value: boolean | 'indeterminate'): void
}>()
</script>

<template>
  <CheckboxBase
    :model-value="modelValue"
    :default-value="defaultValue"
    :variant="variant"
    :tone="tone"
    :size="size"
    :rounded="rounded"
    :duration="duration"
    :easing="easing"
    :disabled="disabled"
    :name="name"
    :value="value"
    :id="id"
    @update:model-value="$emit('update:modelValue', $event)"
  />
</template>
