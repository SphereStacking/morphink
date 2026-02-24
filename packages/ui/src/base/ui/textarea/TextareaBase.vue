<script setup lang="ts">
import { computed, useAttrs } from 'vue'
import { cva } from 'class-variance-authority'
import { cn } from '../../lib/utils'
import type { TextareaRounded, TextareaSize, TextareaTone, TextareaVariant } from '../../lib/props'

const textareaVariants = cva(
  cn(
    'w-full transition duration-150',
    'text-(--morphink-color-foreground) placeholder:text-(--morphink-color-muted-foreground)',
    'focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-(--ring-color)',
    'disabled:opacity-(--morphink-opacity-disabled) disabled:cursor-not-allowed'
  ),
  {
    variants: {
      variant: {
        outline: 'border border-(--morphink-color-border) bg-(--morphink-color-input)',
        ghost: 'border border-transparent bg-transparent',
        soft: 'border border-transparent',
      },
      tone: {
        base: '[--ring-color:var(--morphink-color-ring)]',
        primary: '[--ring-color:var(--morphink-color-primary)]',
        destructive: '[--ring-color:var(--morphink-color-destructive)]',
      },
      size: {
        xs: 'px-2 py-1.5 text-xs',
        sm: 'px-3 py-2 text-xs',
        md: 'px-3 py-2 text-sm',
        lg: 'px-4 py-3 text-base',
        xl: 'px-5 py-3 text-lg',
      },
      rounded: {
        none: 'rounded-none',
        sm: 'rounded-(--morphink-radius-sm)',
        md: 'rounded-(--morphink-radius-md)',
        lg: 'rounded-(--morphink-radius-lg)',
        xl: 'rounded-(--morphink-radius-xl)',
      },
      resize: {
        none: 'resize-none',
        vertical: 'resize-y',
        horizontal: 'resize-x',
        both: 'resize',
      },
      disabled: {
        true: '',
        false: '',
      },
    },
    compoundVariants: [
      { variant: 'outline', tone: 'primary', class: 'focus-visible:border-(color:--morphink-color-primary)' },
      {
        variant: 'outline',
        tone: 'destructive',
        class: 'border-(color:--morphink-color-destructive) focus-visible:border-(color:--morphink-color-destructive)',
      },
      { variant: 'soft', tone: 'base', class: 'bg-(--morphink-color-muted)' },
      {
        variant: 'soft',
        tone: 'primary',
        class: 'bg-[color-mix(in_srgb,var(--morphink-color-primary)_8%,transparent)]',
      },
      {
        variant: 'soft',
        tone: 'destructive',
        class: 'bg-[color-mix(in_srgb,var(--morphink-color-destructive)_8%,transparent)]',
      },
    ],
    defaultVariants: {
      variant: 'outline',
      size: 'md',
      tone: 'base',
      rounded: 'md',
      resize: 'vertical',
      disabled: false,
    },
  }
)

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

const attrs = useAttrs()
const classes = computed(() =>
  cn(
    textareaVariants({
      variant: props.variant,
      size: props.size,
      tone: props.tone,
      rounded: props.rounded,
      resize: props.resize,
      disabled: props.disabled,
    }),
    attrs.class
  )
)

function onInput(event: Event) {
  const target = event.target as HTMLTextAreaElement
  emit('update:modelValue', target.value)
}
</script>

<template>
  <textarea
    :class="classes"
    :value="modelValue"
    :placeholder="placeholder"
    :disabled="disabled"
    :readonly="readonly"
    :rows="rows"
    v-bind="attrs"
    @input="onInput"
  />
</template>
