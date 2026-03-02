<script setup lang="ts">
import { computed, useAttrs } from 'vue'
import { cva } from 'class-variance-authority'

defineOptions({ inheritAttrs: false })
import { cn } from '../../lib/utils'
import type { InputRounded, InputSize, InputTone, InputVariant } from '../../lib/props'

const inputVariants = cva(
  cn(
    'w-full',
    '[transition-property:border-color,box-shadow,background-color]',
    '[transition-duration:var(--morphink-duration-fast)]',
    '[transition-timing-function:var(--morphink-easing-standard)]',
    'text-(--morphink-color-foreground) placeholder:text-(--morphink-color-muted-foreground)',
    'focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-(--ring-color)',
    'disabled:opacity-(--morphink-opacity-disabled) disabled:cursor-not-allowed'
  ),
  {
    variants: {
      variant: {
        solid:
          'border border-transparent bg-[color-mix(in_srgb,var(--field-color)_12%,transparent)]',
        outline: cn(
          'border border-(--morphink-color-border) bg-(--morphink-color-input)',
          'focus-visible:border-(color:--field-color)'
        ),
        ghost: 'border border-transparent bg-transparent',
        soft: 'border border-transparent bg-[color-mix(in_srgb,var(--field-color)_12%,transparent)]',
      },
      tone: {
        primary:
          '[--ring-color:var(--morphink-color-primary)] [--field-color:var(--morphink-color-primary)]',
        secondary:
          '[--ring-color:var(--morphink-color-secondary)] [--field-color:var(--morphink-color-secondary)]',
        tertiary:
          '[--ring-color:var(--morphink-color-tertiary)] [--field-color:var(--morphink-color-tertiary)]',
        base: '[--ring-color:var(--morphink-color-ring)] [--field-color:var(--morphink-color-base)]',
        accent:
          '[--ring-color:var(--morphink-color-accent)] [--field-color:var(--morphink-color-accent)]',
        neutral:
          '[--ring-color:var(--morphink-color-neutral)] [--field-color:var(--morphink-color-neutral)]',
        success:
          '[--ring-color:var(--morphink-color-success)] [--field-color:var(--morphink-color-success)]',
        warning:
          '[--ring-color:var(--morphink-color-warning)] [--field-color:var(--morphink-color-warning)]',
        info: '[--ring-color:var(--morphink-color-info)] [--field-color:var(--morphink-color-info)]',
        destructive:
          '[--ring-color:var(--morphink-color-destructive)] [--field-color:var(--morphink-color-destructive)]',
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
      { variant: 'solid', tone: 'base', class: 'bg-(--morphink-color-muted)' },
      { variant: 'solid', tone: 'neutral', class: 'bg-(--morphink-color-muted)' },
      { variant: 'soft', tone: 'base', class: 'bg-(--morphink-color-muted)' },
      { variant: 'soft', tone: 'neutral', class: 'bg-(--morphink-color-muted)' },
      {
        variant: 'outline',
        tone: 'base',
        class: 'focus-visible:border-(color:--morphink-color-border)',
      },
      { variant: 'outline', tone: 'destructive', class: 'border-(color:--field-color)' },
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
    ariaInvalid?: boolean
    ariaDescribedby?: string
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
    props.ariaInvalid && 'animate-[mi-shake_var(--morphink-motion-emphasis)_both]',
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
    :aria-invalid="ariaInvalid || undefined"
    :aria-describedby="ariaDescribedby || undefined"
    v-bind="attrs"
    @input="onInput"
  />
</template>
