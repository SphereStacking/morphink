<script setup lang="ts">
defineOptions({ inheritAttrs: false })
import { computed, useAttrs } from 'vue'
import { cva } from 'class-variance-authority'
import { cn } from '../../lib/utils'
import type {
  ButtonRounded,
  ButtonShadow,
  ButtonSize,
  ButtonTone,
  ButtonVariant,
} from '../../lib/props'

const buttonVariants = cva(
  cn(
    'inline-flex items-center justify-center gap-2 font-semibold',
    'border border-(--morphink-border-width-default) border-transparent',
    '[transition-property:background-color,color,border-color,box-shadow,opacity,translate,scale]',
    '[transition-duration:var(--morphink-duration-fast)]',
    '[transition-timing-function:var(--morphink-easing-standard)]',
    'focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-(--ring-color)'
  ),
  {
    variants: {
      variant: {
        solid: cn(
          'bg-(--btn-color) text-(--btn-fg)',
          'hover:bg-(--btn-hover) hover:-translate-y-px',
          'active:bg-(--btn-active) active:scale-[0.98] active:translate-y-0'
        ),
        outline: cn(
          'bg-transparent border border-(--morphink-border-width-default)',
          'text-(--btn-accent) border-(color:--btn-color)',
          'hover:bg-(--btn-hover) hover:text-(--btn-fg) hover:border-(color:--btn-hover) hover:-translate-y-px',
          'active:bg-(--btn-active) active:text-(--btn-fg) active:border-(color:--btn-active) active:scale-[0.98] active:translate-y-0'
        ),
        ghost: cn(
          'bg-transparent border-transparent text-(--btn-accent)',
          'hover:bg-(--btn-color) hover:text-(--btn-fg) hover:scale-[1.02]',
          'active:bg-(--btn-active) active:text-(--btn-fg) active:scale-[0.98]'
        ),
        soft: cn(
          'border-0',
          'bg-[color-mix(in_srgb,var(--btn-color)_12%,transparent)] text-(--btn-accent)',
          'hover:bg-[color-mix(in_srgb,var(--btn-hover)_18%,transparent)] hover:scale-[1.02]',
          'active:bg-[color-mix(in_srgb,var(--btn-active)_24%,transparent)] active:scale-[0.98]'
        ),
      },
      tone: {
        primary: cn(
          '[--btn-color:var(--morphink-color-primary)] [--btn-fg:var(--morphink-color-primary-foreground)]',
          '[--btn-hover:var(--morphink-color-primary-hover)] [--btn-active:var(--morphink-color-primary-active)]',
          '[--ring-color:var(--morphink-color-primary)] [--btn-accent:var(--morphink-color-primary)]'
        ),
        secondary: cn(
          '[--btn-color:var(--morphink-color-secondary)] [--btn-fg:var(--morphink-color-secondary-foreground)]',
          '[--btn-hover:var(--morphink-color-secondary-hover)] [--btn-active:var(--morphink-color-secondary-active)]',
          '[--ring-color:var(--morphink-color-secondary)] [--btn-accent:var(--morphink-color-secondary)]'
        ),
        tertiary: cn(
          '[--btn-color:var(--morphink-color-tertiary)] [--btn-fg:var(--morphink-color-tertiary-foreground)]',
          '[--btn-hover:var(--morphink-color-tertiary-hover)] [--btn-active:var(--morphink-color-tertiary-active)]',
          '[--ring-color:var(--morphink-color-tertiary)] [--btn-accent:var(--morphink-color-tertiary)]'
        ),
        base: cn(
          '[--btn-color:var(--morphink-color-base)] [--btn-fg:var(--morphink-color-base-foreground)]',
          '[--btn-hover:var(--morphink-color-base-hover)] [--btn-active:var(--morphink-color-base-active)]',
          '[--ring-color:var(--morphink-color-base)] [--btn-accent:var(--morphink-color-base-foreground)]'
        ),
        accent: cn(
          '[--btn-color:var(--morphink-color-accent)] [--btn-fg:var(--morphink-color-accent-foreground)]',
          '[--btn-hover:var(--morphink-color-accent-hover)] [--btn-active:var(--morphink-color-accent-active)]',
          '[--ring-color:var(--morphink-color-accent)] [--btn-accent:var(--morphink-color-accent)]'
        ),
        neutral: cn(
          '[--btn-color:var(--morphink-color-neutral)] [--btn-fg:var(--morphink-color-neutral-foreground)]',
          '[--btn-hover:var(--morphink-color-neutral-hover)] [--btn-active:var(--morphink-color-neutral-active)]',
          '[--ring-color:var(--morphink-color-neutral)] [--btn-accent:var(--morphink-color-neutral-foreground)]'
        ),
        success: cn(
          '[--btn-color:var(--morphink-color-success)] [--btn-fg:var(--morphink-color-success-foreground)]',
          '[--btn-hover:var(--morphink-color-success-hover)] [--btn-active:var(--morphink-color-success-active)]',
          '[--ring-color:var(--morphink-color-success)] [--btn-accent:var(--morphink-color-success)]'
        ),
        warning: cn(
          '[--btn-color:var(--morphink-color-warning)] [--btn-fg:var(--morphink-color-warning-foreground)]',
          '[--btn-hover:var(--morphink-color-warning-hover)] [--btn-active:var(--morphink-color-warning-active)]',
          '[--ring-color:var(--morphink-color-warning)] [--btn-accent:var(--morphink-color-warning)]'
        ),
        info: cn(
          '[--btn-color:var(--morphink-color-info)] [--btn-fg:var(--morphink-color-info-foreground)]',
          '[--btn-hover:var(--morphink-color-info-hover)] [--btn-active:var(--morphink-color-info-active)]',
          '[--ring-color:var(--morphink-color-info)] [--btn-accent:var(--morphink-color-info)]'
        ),
        destructive: cn(
          '[--btn-color:var(--morphink-color-destructive)] [--btn-fg:var(--morphink-color-destructive-foreground)]',
          '[--btn-hover:var(--morphink-color-destructive-hover)] [--btn-active:var(--morphink-color-destructive-active)]',
          '[--ring-color:var(--morphink-color-destructive)] [--btn-accent:var(--morphink-color-destructive)]'
        ),
      },
      size: {
        xs: 'h-(--morphink-space-28) px-(--morphink-space-8) text-[length:var(--morphink-font-size-12)]',
        sm: 'h-(--morphink-space-32) px-(--morphink-space-12) text-[length:var(--morphink-font-size-12)]',
        md: 'h-(--morphink-space-40) px-(--morphink-space-16) text-[length:var(--morphink-font-size-14)]',
        lg: 'h-(--morphink-space-48) px-(--morphink-space-20) text-[length:var(--morphink-font-size-16)]',
        xl: 'h-(--morphink-space-56) px-(--morphink-space-24) text-[length:var(--morphink-font-size-18)]',
      },
      rounded: {
        none: 'rounded-none',
        sm: 'rounded-(--morphink-radius-sm)',
        md: 'rounded-(--morphink-radius-md)',
        lg: 'rounded-(--morphink-radius-lg)',
        xl: 'rounded-(--morphink-radius-xl)',
        full: 'rounded-full',
      },
      shadow: {
        none: '',
        sm: 'shadow-(--morphink-shadow-sm)',
        md: 'shadow-(--morphink-shadow-md)',
        lg: 'shadow-(--morphink-shadow-lg)',
      },
      disabled: {
        true: 'opacity-(--morphink-opacity-disabled) cursor-not-allowed pointer-events-none shadow-none',
        false: '',
      },
    },
    compoundVariants: [
      {
        tone: 'neutral',
        variant: 'outline',
        class: 'border-(color:--btn-accent)',
      },
      {
        tone: 'base',
        variant: 'soft',
        class: cn(
          'bg-[color-mix(in_srgb,var(--btn-hover)_30%,transparent)]',
          'hover:bg-[color-mix(in_srgb,var(--btn-hover)_45%,transparent)]',
          'active:bg-[color-mix(in_srgb,var(--btn-active)_55%,transparent)]'
        ),
      },
      {
        tone: 'neutral',
        variant: 'soft',
        class: cn(
          'bg-(--morphink-color-muted)',
          'hover:bg-[color-mix(in_srgb,var(--btn-hover)_16%,var(--morphink-color-muted))]',
          'active:bg-[color-mix(in_srgb,var(--btn-active)_24%,var(--morphink-color-muted))]'
        ),
      },
    ],
    defaultVariants: {
      variant: 'solid',
      size: 'md',
      tone: 'base',
      rounded: 'md',
      shadow: 'md',
      disabled: false,
    },
  }
)

const props = withDefaults(
  defineProps<{
    variant?: ButtonVariant
    size?: ButtonSize
    tone?: ButtonTone
    rounded?: ButtonRounded
    shadow?: ButtonShadow
    disabled?: boolean
  }>(),
  {
    variant: 'solid',
    size: 'md',
    tone: 'base',
    rounded: 'md',
    shadow: 'md',
    disabled: false,
  }
)

const attrs = useAttrs()
const classes = computed(() =>
  cn(
    buttonVariants({
      variant: props.variant,
      size: props.size,
      tone: props.tone,
      rounded: props.rounded,
      shadow: props.shadow,
      disabled: props.disabled,
    }),
    attrs.class
  )
)
</script>

<template>
  <button :class="classes" :disabled="disabled" type="button" v-bind="attrs">
    <slot />
  </button>
</template>
