<script setup lang="ts">
/**
 * Switch — toggle control for boolean options.
 *
 * Public API layer. Customize defaults here.
 * Style variants: base/ui/switch/SwitchBase.vue
 */
import SwitchBase from '../../base/ui/switch/SwitchBase.vue'
import type { SwitchSize, SwitchTone, SwitchVariant } from '../../base/lib/props'

withDefaults(
  defineProps<{
    modelValue?: boolean
    defaultValue?: boolean
    variant?: SwitchVariant
    tone?: SwitchTone
    size?: SwitchSize
    disabled?: boolean
    name?: string
    value?: string
    id?: string
  }>(),
  {
    variant: 'solid',
    tone: 'primary',
    size: 'md',
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
    :disabled="disabled"
    :name="name"
    :value="value"
    :id="id"
    @update:model-value="$emit('update:modelValue', $event)"
  />
</template>
