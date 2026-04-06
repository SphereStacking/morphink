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
    'focus-visible:ring-2 focus-visible:ring-(--ring-color) focus-visible:outline-hidden',
    'disabled:cursor-not-allowed disabled:opacity-(--morphink-opacity-disabled)'
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
          '[--field-color:var(--morphink-color-primary)] [--ring-color:var(--morphink-color-primary)]',
        secondary:
          '[--field-color:var(--morphink-color-secondary)] [--ring-color:var(--morphink-color-secondary)]',
        tertiary:
          '[--field-color:var(--morphink-color-tertiary)] [--ring-color:var(--morphink-color-tertiary)]',
        base: '[--field-color:var(--morphink-color-base)] [--ring-color:var(--morphink-color-ring)]',
        accent:
          '[--field-color:var(--morphink-color-accent)] [--ring-color:var(--morphink-color-accent)]',
        neutral:
          '[--field-color:var(--morphink-color-neutral)] [--ring-color:var(--morphink-color-neutral)]',
        success:
          '[--field-color:var(--morphink-color-success)] [--ring-color:var(--morphink-color-success)]',
        warning:
          '[--field-color:var(--morphink-color-warning)] [--ring-color:var(--morphink-color-warning)]',
        info: '[--field-color:var(--morphink-color-info)] [--ring-color:var(--morphink-color-info)]',
        destructive:
          '[--field-color:var(--morphink-color-destructive)] [--ring-color:var(--morphink-color-destructive)]',
      },
      size: {
        xs: 'h-(--morphink-space-28) px-(--morphink-space-8) text-[length:var(--morphink-font-size-12)]',
        sm: 'h-(--morphink-space-32) px-(--morphink-space-12) text-[length:var(--morphink-font-size-12)]',
        md: 'h-(--morphink-space-40) px-(--morphink-space-12) text-[length:var(--morphink-font-size-14)]',
        lg: 'h-(--morphink-space-48) px-(--morphink-space-16) text-[length:var(--morphink-font-size-16)]',
        xl: 'h-(--morphink-space-56) px-(--morphink-space-20) text-[length:var(--morphink-font-size-18)]',
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
    props.ariaInvalid && 'mi-shake-anim',
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
    data-morphink
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

<style scoped>
.mi-shake-anim {
  animation: mi-shake var(--morphink-motion-emphasis) both;
}

@keyframes mi-shake {
  0%,
  100% {
    transform: translateX(0);
  }
  20%,
  60% {
    transform: translateX(-4px);
  }
  40%,
  80% {
    transform: translateX(4px);
  }
}
</style>
