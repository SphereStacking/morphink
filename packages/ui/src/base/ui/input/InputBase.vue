<script setup lang="ts">
import { computed, useAttrs } from 'vue'
import { cva } from 'class-variance-authority'
import { cn } from '../../lib/utils'
import type { InputRounded, InputSize, InputTone, InputVariant } from '../../lib/props'

const inputVariants = cva(
  cn(
    'w-full transition duration-150',
    'text-(--morphink-color-foreground) placeholder:text-(--morphink-color-muted-foreground)',
    'focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-(--ring-color)',
    'disabled:opacity-(--morphink-opacity-disabled) disabled:cursor-not-allowed'
  ),
  {
    variants: {
      variant: {
        solid: 'border border-transparent bg-(--morphink-color-muted)',
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
        xs: 'h-7 px-2 text-xs',
        sm: 'h-8 px-3 text-xs',
        md: 'h-10 px-3 text-sm',
        lg: 'h-12 px-4 text-base',
        xl: 'h-14 px-5 text-lg',
      },
      rounded: {
        none: 'rounded-none',
        sm: 'rounded-(--morphink-radius-sm)',
        md: 'rounded-(--morphink-radius-md)',
        lg: 'rounded-(--morphink-radius-lg)',
        xl: 'rounded-(--morphink-radius-xl)',
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
      {
        variant: 'solid',
        tone: 'primary',
        class: 'bg-[color-mix(in_srgb,var(--morphink-color-primary)_12%,transparent)]',
      },
      {
        variant: 'solid',
        tone: 'destructive',
        class: 'bg-[color-mix(in_srgb,var(--morphink-color-destructive)_12%,transparent)]',
      },
      { variant: 'soft', tone: 'base', class: 'bg-(--morphink-color-muted)' },
      {
        variant: 'soft',
        tone: 'primary',
        class: 'bg-[color-mix(in_srgb,var(--morphink-color-primary)_12%,transparent)]',
      },
      {
        variant: 'soft',
        tone: 'destructive',
        class: 'bg-[color-mix(in_srgb,var(--morphink-color-destructive)_12%,transparent)]',
      },
    ],
    defaultVariants: {
      variant: 'outline',
      size: 'md',
      tone: 'base',
      rounded: 'md',
      disabled: false,
    },
  }
)

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

const attrs = useAttrs()
const classes = computed(() =>
  cn(
    inputVariants({
      variant: props.variant,
      size: props.size,
      tone: props.tone,
      rounded: props.rounded,
      disabled: props.disabled,
    }),
    attrs.class
  )
)

function onInput(event: Event) {
  const target = event.target as HTMLInputElement
  emit('update:modelValue', props.type === 'number' ? Number(target.value) : target.value)
}
</script>

<template>
  <input
    :class="classes"
    :value="modelValue"
    :type="type"
    :placeholder="placeholder"
    :disabled="disabled"
    :readonly="readonly"
    v-bind="attrs"
    @input="onInput"
  />
</template>
