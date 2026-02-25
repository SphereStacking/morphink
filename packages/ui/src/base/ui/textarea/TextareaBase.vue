<script setup lang="ts">
defineOptions({ inheritAttrs: false })
import { computed, useAttrs } from 'vue'
import { cva } from 'class-variance-authority'
import { cn } from '../../lib/utils'
import type { TextareaResize, TextareaRounded, TextareaSize, TextareaTone, TextareaVariant } from '../../lib/props'

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
        solid: 'border border-transparent bg-[color-mix(in_srgb,var(--field-color)_12%,transparent)]',
        outline: cn(
          'border border-(--morphink-color-border) bg-(--morphink-color-input)',
          'focus-visible:border-(color:--field-color)'
        ),
        ghost: 'border border-transparent bg-transparent',
        soft: 'border border-transparent bg-[color-mix(in_srgb,var(--field-color)_12%,transparent)]',
      },
      tone: {
        primary: '[--ring-color:var(--morphink-color-primary)] [--field-color:var(--morphink-color-primary)]',
        secondary: '[--ring-color:var(--morphink-color-secondary)] [--field-color:var(--morphink-color-secondary)]',
        tertiary: '[--ring-color:var(--morphink-color-tertiary)] [--field-color:var(--morphink-color-tertiary)]',
        base: '[--ring-color:var(--morphink-color-ring)] [--field-color:var(--morphink-color-base)]',
        accent: '[--ring-color:var(--morphink-color-accent)] [--field-color:var(--morphink-color-accent)]',
        neutral: '[--ring-color:var(--morphink-color-neutral)] [--field-color:var(--morphink-color-neutral)]',
        success: '[--ring-color:var(--morphink-color-success)] [--field-color:var(--morphink-color-success)]',
        warning: '[--ring-color:var(--morphink-color-warning)] [--field-color:var(--morphink-color-warning)]',
        info: '[--ring-color:var(--morphink-color-info)] [--field-color:var(--morphink-color-info)]',
        destructive: '[--ring-color:var(--morphink-color-destructive)] [--field-color:var(--morphink-color-destructive)]',
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
      { variant: 'solid', tone: 'base', class: 'bg-(--morphink-color-muted)' },
      { variant: 'solid', tone: 'neutral', class: 'bg-(--morphink-color-muted)' },
      { variant: 'soft', tone: 'base', class: 'bg-(--morphink-color-muted)' },
      { variant: 'soft', tone: 'neutral', class: 'bg-(--morphink-color-muted)' },
      { variant: 'outline', tone: 'base', class: 'focus-visible:border-(color:--morphink-color-border)' },
      { variant: 'outline', tone: 'destructive', class: 'border-(color:--field-color)' },
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
    resize?: TextareaResize
    ariaInvalid?: boolean
    ariaDescribedby?: string
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
    :aria-invalid="ariaInvalid || undefined"
    :aria-describedby="ariaDescribedby || undefined"
    v-bind="attrs"
    @input="onInput"
  />
</template>
