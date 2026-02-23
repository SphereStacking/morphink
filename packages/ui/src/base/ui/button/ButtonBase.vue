<template>
  <button
    :class="classes"
    :disabled="disabled"
    type="button"
    v-bind="attrs"
  >
    <slot />
  </button>
</template>

<script setup lang="ts">
import { computed, useAttrs } from 'vue'
import { cva } from 'class-variance-authority'
import { cn } from '../../lib/utils'
import type { ButtonRounded, ButtonShadow, ButtonSize, ButtonTone, ButtonVariant } from '../../lib/props'

const buttonVariants = cva(
  cn(
    'inline-flex items-center justify-center gap-2 font-semibold',
    'border border-[var(--border-width-default)] border-transparent transition duration-150',
    'focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-[var(--ring-color)]'
  ),
  {
    variants: {
      variant: {
        solid: '',
        outline: 'border border-[var(--border-width-default)]',
        ghost: 'bg-transparent',
        soft: 'border-0',
      },
      tone: {
        primary:
          'text-[var(--color-primary-foreground)] bg-[var(--color-primary)] border-[var(--color-primary)] [--ring-color:var(--color-primary)]',
        secondary:
          'text-[var(--color-secondary-foreground)] bg-[var(--color-secondary)] border-[var(--color-secondary)] [--ring-color:var(--color-secondary)]',
        tertiary:
          'text-[var(--color-tertiary-foreground)] bg-[var(--color-tertiary)] border-[var(--color-tertiary)] [--ring-color:var(--color-tertiary)]',
        base:
          'text-[var(--color-base-foreground)] bg-[var(--color-base)] border-[var(--color-base)] [--ring-color:var(--color-base)]',
        accent:
          'text-[var(--color-accent-foreground)] bg-[var(--color-accent)] border-[var(--color-accent)] [--ring-color:var(--color-accent)]',
        neutral:
          'text-[var(--color-neutral-foreground)] bg-[var(--color-neutral)] border-[var(--color-neutral)] [--ring-color:var(--color-neutral)]',
        success:
          'text-[var(--color-success-foreground)] bg-[var(--color-success)] border-[var(--color-success)] [--ring-color:var(--color-success)]',
        warning:
          'text-[var(--color-warning-foreground)] bg-[var(--color-warning)] border-[var(--color-warning)] [--ring-color:var(--color-warning)]',
        info:
          'text-[var(--color-info-foreground)] bg-[var(--color-info)] border-[var(--color-info)] [--ring-color:var(--color-info)]',
        destructive:
          'text-[var(--color-destructive-foreground)] bg-[var(--color-destructive)] border-[var(--color-destructive)] [--ring-color:var(--color-destructive)]',
      },
      size: {
        sm: 'h-8 px-3 text-xs',
        md: 'h-10 px-4 text-sm',
        lg: 'h-12 px-5 text-base',
      },
      rounded: {
        none: 'rounded-none',
        sm: 'rounded-[var(--radius-sm)]',
        md: 'rounded-[var(--radius-md)]',
        lg: 'rounded-[var(--radius-lg)]',
        xl: 'rounded-[var(--radius-xl)]',
        full: 'rounded-full',
      },
      shadow: {
        none: '',
        sm: 'shadow-[var(--shadow-sm)]',
        md: 'shadow-[var(--shadow-md)]',
        lg: 'shadow-[var(--shadow-lg)]',
      },
      disabled: {
        true: 'opacity-[var(--opacity-disabled)] cursor-not-allowed shadow-none',
        false: '',
      },
    },
    compoundVariants: [
      {
        tone: 'primary',
        variant: 'solid',
        class: 'hover:bg-[var(--color-primary-hover)] active:bg-[var(--color-primary-active)]',
      },
      {
        tone: 'primary',
        variant: 'outline',
        class:
          'bg-transparent text-[var(--color-primary)] border-[color:var(--color-primary)] hover:bg-[var(--color-primary-hover)] hover:text-[var(--color-primary-foreground)] hover:border-[color:var(--color-primary-hover)] active:bg-[var(--color-primary-active)] active:text-[var(--color-primary-foreground)] active:border-[color:var(--color-primary-active)]',
      },
      {
        tone: 'primary',
        variant: 'ghost',
        class:
          'bg-transparent border-transparent text-[var(--color-primary)] hover:bg-[var(--color-primary)] hover:text-[var(--color-primary-foreground)] active:bg-[var(--color-primary-active)] active:text-[var(--color-primary-foreground)]',
      },
      {
        tone: 'primary',
        variant: 'soft',
        class:
          'bg-[color-mix(in_srgb,var(--color-primary)_12%,transparent)] text-[var(--color-primary)] hover:bg-[color-mix(in_srgb,var(--color-primary-hover)_18%,transparent)] active:bg-[color-mix(in_srgb,var(--color-primary-active)_24%,transparent)]',
      },
      {
        tone: 'secondary',
        variant: 'solid',
        class: 'hover:bg-[var(--color-secondary-hover)] active:bg-[var(--color-secondary-active)]',
      },
      {
        tone: 'secondary',
        variant: 'outline',
        class:
          'bg-transparent text-[var(--color-secondary)] border-[color:var(--color-secondary)] hover:bg-[var(--color-secondary-hover)] hover:text-[var(--color-secondary-foreground)] hover:border-[color:var(--color-secondary-hover)] active:bg-[var(--color-secondary-active)] active:text-[var(--color-secondary-foreground)] active:border-[color:var(--color-secondary-active)]',
      },
      {
        tone: 'secondary',
        variant: 'ghost',
        class:
          'bg-transparent border-transparent text-[var(--color-secondary)] hover:bg-[var(--color-secondary)] hover:text-[var(--color-secondary-foreground)] active:bg-[var(--color-secondary-active)] active:text-[var(--color-secondary-foreground)]',
      },
      {
        tone: 'secondary',
        variant: 'soft',
        class:
          'bg-[color-mix(in_srgb,var(--color-secondary)_12%,transparent)] text-[var(--color-secondary)] hover:bg-[color-mix(in_srgb,var(--color-secondary-hover)_18%,transparent)] active:bg-[color-mix(in_srgb,var(--color-secondary-active)_24%,transparent)]',
      },
      {
        tone: 'tertiary',
        variant: 'solid',
        class: 'hover:bg-[var(--color-tertiary-hover)] active:bg-[var(--color-tertiary-active)]',
      },
      {
        tone: 'tertiary',
        variant: 'outline',
        class:
          'bg-transparent text-[var(--color-tertiary)] border-[color:var(--color-tertiary)] hover:bg-[var(--color-tertiary-hover)] hover:text-[var(--color-tertiary-foreground)] hover:border-[color:var(--color-tertiary-hover)] active:bg-[var(--color-tertiary-active)] active:text-[var(--color-tertiary-foreground)] active:border-[color:var(--color-tertiary-active)]',
      },
      {
        tone: 'tertiary',
        variant: 'ghost',
        class:
          'bg-transparent border-transparent text-[var(--color-tertiary)] hover:bg-[var(--color-tertiary)] hover:text-[var(--color-tertiary-foreground)] active:bg-[var(--color-tertiary-active)] active:text-[var(--color-tertiary-foreground)]',
      },
      {
        tone: 'tertiary',
        variant: 'soft',
        class:
          'bg-[color-mix(in_srgb,var(--color-tertiary)_12%,transparent)] text-[var(--color-tertiary)] hover:bg-[color-mix(in_srgb,var(--color-tertiary-hover)_18%,transparent)] active:bg-[color-mix(in_srgb,var(--color-tertiary-active)_24%,transparent)]',
      },
      {
        tone: 'base',
        variant: 'solid',
        class:
          'border-[color:var(--color-base-active)] hover:bg-[var(--color-base-hover)] active:bg-[var(--color-base-active)]',
      },
      {
        tone: 'base',
        variant: 'outline',
        class:
          'bg-transparent text-[var(--color-base-foreground)] border-[color:var(--color-base)] hover:bg-[var(--color-base-hover)] hover:border-[color:var(--color-base-hover)] active:bg-[var(--color-base-active)] active:border-[color:var(--color-base-active)]',
      },
      {
        tone: 'base',
        variant: 'ghost',
        class:
          'bg-transparent border-transparent text-[var(--color-base-foreground)] hover:bg-[var(--color-base)] active:bg-[var(--color-base-active)]',
      },
      {
        tone: 'base',
        variant: 'soft',
        class:
          'bg-[color-mix(in_srgb,var(--color-base-hover)_30%,transparent)] text-[var(--color-base-foreground)] hover:bg-[color-mix(in_srgb,var(--color-base-hover)_45%,transparent)] active:bg-[color-mix(in_srgb,var(--color-base-active)_55%,transparent)]',
      },
      {
        tone: 'accent',
        variant: 'solid',
        class: 'hover:bg-[var(--color-accent-hover)] active:bg-[var(--color-accent-active)]',
      },
      {
        tone: 'accent',
        variant: 'outline',
        class:
          'bg-transparent text-[var(--color-accent)] border-[color:var(--color-accent)] hover:bg-[var(--color-accent-hover)] hover:text-[var(--color-accent-foreground)] hover:border-[color:var(--color-accent-hover)] active:bg-[var(--color-accent-active)] active:text-[var(--color-accent-foreground)] active:border-[color:var(--color-accent-active)]',
      },
      {
        tone: 'accent',
        variant: 'ghost',
        class:
          'bg-transparent border-transparent text-[var(--color-accent)] hover:bg-[var(--color-accent)] hover:text-[var(--color-accent-foreground)] active:bg-[var(--color-accent-active)] active:text-[var(--color-accent-foreground)]',
      },
      {
        tone: 'accent',
        variant: 'soft',
        class:
          'bg-[color-mix(in_srgb,var(--color-accent)_12%,transparent)] text-[var(--color-accent)] hover:bg-[color-mix(in_srgb,var(--color-accent-hover)_18%,transparent)] active:bg-[color-mix(in_srgb,var(--color-accent-active)_24%,transparent)]',
      },
      {
        tone: 'neutral',
        variant: 'solid',
        class: 'hover:bg-[var(--color-neutral-hover)] active:bg-[var(--color-neutral-active)]',
      },
      {
        tone: 'neutral',
        variant: 'outline',
        class:
          'bg-transparent text-[var(--color-neutral-foreground)] border-[color:var(--color-neutral-foreground)] hover:bg-[var(--color-neutral-hover)] hover:text-[var(--color-neutral-foreground)] hover:border-[color:var(--color-neutral-hover)] active:bg-[var(--color-neutral-active)] active:text-[var(--color-neutral-foreground)] active:border-[color:var(--color-neutral-active)]',
      },
      {
        tone: 'neutral',
        variant: 'ghost',
        class:
          'bg-transparent border-transparent text-[var(--color-neutral-foreground)] hover:bg-[var(--color-neutral)] hover:text-[var(--color-neutral-foreground)] active:bg-[var(--color-neutral-active)] active:text-[var(--color-neutral-foreground)]',
      },
      {
        tone: 'neutral',
        variant: 'soft',
        class:
          'bg-[var(--color-muted)] text-[var(--color-neutral-foreground)] hover:bg-[color-mix(in_srgb,var(--color-neutral-hover)_16%,var(--color-muted))] active:bg-[color-mix(in_srgb,var(--color-neutral-active)_24%,var(--color-muted))]',
      },
      {
        tone: 'success',
        variant: 'solid',
        class: 'hover:bg-[var(--color-success-hover)] active:bg-[var(--color-success-active)]',
      },
      {
        tone: 'success',
        variant: 'outline',
        class:
          'bg-transparent text-[var(--color-success)] border-[color:var(--color-success)] hover:bg-[var(--color-success-hover)] hover:text-[var(--color-success-foreground)] hover:border-[color:var(--color-success-hover)] active:bg-[var(--color-success-active)] active:text-[var(--color-success-foreground)] active:border-[color:var(--color-success-active)]',
      },
      {
        tone: 'success',
        variant: 'ghost',
        class:
          'bg-transparent border-transparent text-[var(--color-success)] hover:bg-[var(--color-success)] hover:text-[var(--color-success-foreground)] active:bg-[var(--color-success-active)] active:text-[var(--color-success-foreground)]',
      },
      {
        tone: 'success',
        variant: 'soft',
        class:
          'bg-[color-mix(in_srgb,var(--color-success)_12%,transparent)] text-[var(--color-success)] hover:bg-[color-mix(in_srgb,var(--color-success-hover)_18%,transparent)] active:bg-[color-mix(in_srgb,var(--color-success-active)_24%,transparent)]',
      },
      {
        tone: 'warning',
        variant: 'solid',
        class: 'hover:bg-[var(--color-warning-hover)] active:bg-[var(--color-warning-active)]',
      },
      {
        tone: 'warning',
        variant: 'outline',
        class:
          'bg-transparent text-[var(--color-warning)] border-[color:var(--color-warning)] hover:bg-[var(--color-warning-hover)] hover:text-[var(--color-warning-foreground)] hover:border-[color:var(--color-warning-hover)] active:bg-[var(--color-warning-active)] active:text-[var(--color-warning-foreground)] active:border-[color:var(--color-warning-active)]',
      },
      {
        tone: 'warning',
        variant: 'ghost',
        class:
          'bg-transparent border-transparent text-[var(--color-warning)] hover:bg-[var(--color-warning)] hover:text-[var(--color-warning-foreground)] active:bg-[var(--color-warning-active)] active:text-[var(--color-warning-foreground)]',
      },
      {
        tone: 'warning',
        variant: 'soft',
        class:
          'bg-[color-mix(in_srgb,var(--color-warning)_12%,transparent)] text-[var(--color-warning)] hover:bg-[color-mix(in_srgb,var(--color-warning-hover)_18%,transparent)] active:bg-[color-mix(in_srgb,var(--color-warning-active)_24%,transparent)]',
      },
      {
        tone: 'info',
        variant: 'solid',
        class: 'hover:bg-[var(--color-info-hover)] active:bg-[var(--color-info-active)]',
      },
      {
        tone: 'info',
        variant: 'outline',
        class:
          'bg-transparent text-[var(--color-info)] border-[color:var(--color-info)] hover:bg-[var(--color-info-hover)] hover:text-[var(--color-info-foreground)] hover:border-[color:var(--color-info-hover)] active:bg-[var(--color-info-active)] active:text-[var(--color-info-foreground)] active:border-[color:var(--color-info-active)]',
      },
      {
        tone: 'info',
        variant: 'ghost',
        class:
          'bg-transparent border-transparent text-[var(--color-info)] hover:bg-[var(--color-info)] hover:text-[var(--color-info-foreground)] active:bg-[var(--color-info-active)] active:text-[var(--color-info-foreground)]',
      },
      {
        tone: 'info',
        variant: 'soft',
        class:
          'bg-[color-mix(in_srgb,var(--color-info)_12%,transparent)] text-[var(--color-info)] hover:bg-[color-mix(in_srgb,var(--color-info-hover)_18%,transparent)] active:bg-[color-mix(in_srgb,var(--color-info-active)_24%,transparent)]',
      },
      {
        tone: 'destructive',
        variant: 'solid',
        class: 'hover:bg-[var(--color-destructive-hover)] active:bg-[var(--color-destructive-active)]',
      },
      {
        tone: 'destructive',
        variant: 'outline',
        class:
          'bg-transparent text-[var(--color-destructive)] border-[color:var(--color-destructive)] hover:bg-[var(--color-destructive-hover)] hover:text-[var(--color-destructive-foreground)] hover:border-[color:var(--color-destructive-hover)] active:bg-[var(--color-destructive-active)] active:text-[var(--color-destructive-foreground)] active:border-[color:var(--color-destructive-active)]',
      },
      {
        tone: 'destructive',
        variant: 'ghost',
        class:
          'bg-transparent border-transparent text-[var(--color-destructive)] hover:bg-[var(--color-destructive)] hover:text-[var(--color-destructive-foreground)] active:bg-[var(--color-destructive-active)] active:text-[var(--color-destructive-foreground)]',
      },
      {
        tone: 'destructive',
        variant: 'soft',
        class:
          'bg-[color-mix(in_srgb,var(--color-destructive)_12%,transparent)] text-[var(--color-destructive)] hover:bg-[color-mix(in_srgb,var(--color-destructive-hover)_18%,transparent)] active:bg-[color-mix(in_srgb,var(--color-destructive-active)_24%,transparent)]',
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
