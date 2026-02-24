<script setup lang="ts">
/**
 * Textarea — multi-line text input for forms.
 *
 * Public API layer. Customize defaults here.
 * Style variants: base/ui/textarea/TextareaBase.vue
 */
import TextareaBase from '../base/ui/textarea/TextareaBase.vue'
import type { TextareaResize, TextareaRounded, TextareaSize, TextareaTone, TextareaVariant } from '../base/lib/props'

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
    resize?: TextareaResize
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
  <TextareaBase v-bind="props" @update:model-value="emit('update:modelValue', $event)" />
</template>
