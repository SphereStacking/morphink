<script setup lang="ts">
/**
 * CheckboxGroup — groups Checkbox items with shared selection state.
 *
 * Public API layer. Customize defaults here.
 * Style variants: base/ui/checkbox/CheckboxGroupBase.vue
 */
import CheckboxGroupBase from '../../base/ui/checkbox/CheckboxGroupBase.vue'
import type { CheckboxRounded, CheckboxSize, CheckboxTone, CheckboxVariant } from '../../base/lib/props'

const props = withDefaults(
  defineProps<{
    modelValue?: string[]
    defaultValue?: string[]
    orientation?: 'horizontal' | 'vertical'
    disabled?: boolean
    size?: CheckboxSize
    variant?: CheckboxVariant
    tone?: CheckboxTone
    rounded?: CheckboxRounded
  }>(),
  {
    orientation: 'vertical',
    disabled: false,
    size: 'md',
    variant: 'outline',
    tone: 'primary',
    rounded: 'sm',
  }
)

const emit = defineEmits<{
  (e: 'update:modelValue', value: string[]): void
}>()
</script>

<template>
  <CheckboxGroupBase
    :model-value="modelValue"
    :default-value="defaultValue"
    :orientation="orientation"
    :disabled="disabled"
    :size="size"
    :variant="variant"
    :tone="tone"
    :rounded="rounded"
    @update:model-value="emit('update:modelValue', $event)"
  >
    <slot />
  </CheckboxGroupBase>
</template>
