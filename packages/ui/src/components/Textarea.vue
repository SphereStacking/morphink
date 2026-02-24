<script setup lang="ts">
/**
 * Textarea — multi-line text input for forms.
 *
 * Public API layer. Customize defaults here.
 * Style variants: base/ui/textarea/TextareaBase.vue
 */
import TextareaBase from '../base/ui/textarea/TextareaBase.vue'
import type { TextareaRounded, TextareaSize, TextareaTone, TextareaVariant } from '../base/lib/props'

const props = withDefaults(
  defineProps<{
    variant?: TextareaVariant
    size?: TextareaSize
    tone?: TextareaTone
    rounded?: TextareaRounded
    disabled?: boolean
    modelValue?: string
    placeholder?: string
    readonly?: boolean
    rows?: number
    resize?: 'none' | 'vertical' | 'horizontal' | 'both'
  }>(),
  {
    variant: 'outline',
    size: 'md',
    tone: 'base',
    rounded: 'md',
    disabled: false,
    rows: 3,
    resize: 'vertical',
  }
)

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
}>()
</script>

<template>
  <TextareaBase
    :variant="props.variant"
    :size="props.size"
    :tone="props.tone"
    :rounded="props.rounded"
    :disabled="props.disabled"
    :model-value="props.modelValue"
    :placeholder="props.placeholder"
    :readonly="props.readonly"
    :rows="props.rows"
    :resize="props.resize"
    @update:model-value="emit('update:modelValue', $event)"
  />
</template>
