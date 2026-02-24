<script setup lang="ts">
/**
 * Input — text input field for forms.
 *
 * Public API layer. Customize defaults here.
 * Style variants: base/ui/input/InputBase.vue
 */
import InputBase from '../base/ui/input/InputBase.vue'
import type { InputRounded, InputSize, InputTone, InputVariant } from '../base/lib/props'

const props = withDefaults(
  defineProps<{
    variant?: InputVariant
    size?: InputSize
    tone?: InputTone
    rounded?: InputRounded
    disabled?: boolean
    modelValue?: string | number
    type?: string
    placeholder?: string
    readonly?: boolean
  }>(),
  {
    variant: 'outline',
    size: 'md',
    tone: 'base',
    rounded: 'md',
    disabled: false,
    type: 'text',
  }
)

const emit = defineEmits<{
  (e: 'update:modelValue', value: string | number): void
}>()
</script>

<template>
  <InputBase
    :variant="props.variant"
    :size="props.size"
    :tone="props.tone"
    :rounded="props.rounded"
    :disabled="props.disabled"
    :model-value="props.modelValue"
    :type="props.type"
    :placeholder="props.placeholder"
    :readonly="props.readonly"
    @update:model-value="emit('update:modelValue', $event)"
  />
</template>
