<template>
  <button :class="classes" :disabled="disabled" type="button" v-bind="attrs">
    <slot />
  </button>
</template>

<script setup lang="ts">
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
    'border border-(--border-width-default) border-transparent transition duration-150',
    'focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-(--ring-color)'
  ),
  {
    variants: {
      variant: {
        solid: '',
        outline: 'border border-(--border-width-default)',
        ghost: 'bg-transparent',
        soft: 'border-0',
      },
      tone: {
        primary:
          'text-(--color-primary-foreground) bg-(--color-primary) border-(--color-primary) [--ring-color:var(--color-primary)]',
        secondary:
          'text-(--color-secondary-foreground) bg-(--color-secondary) border-(--color-secondary) [--ring-color:var(--color-secondary)]',
        tertiary:
          'text-(--color-tertiary-foreground) bg-(--color-tertiary) border-(--color-tertiary) [--ring-color:var(--color-tertiary)]',
        base: 'text-(--color-base-foreground) bg-(--color-base) border-(--color-base) [--ring-color:var(--color-base)]',
        accent:
          'text-(--color-accent-foreground) bg-(--color-accent) border-(--color-accent) [--ring-color:var(--color-accent)]',
        neutral:
          'text-(--color-neutral-foreground) bg-(--color-neutral) border-(--color-neutral) [--ring-color:var(--color-neutral)]',
        success:
          'text-(--color-success-foreground) bg-(--color-success) border-(--color-success) [--ring-color:var(--color-success)]',
        warning:
          'text-(--color-warning-foreground) bg-(--color-warning) border-(--color-warning) [--ring-color:var(--color-warning)]',
        info: 'text-(--color-info-foreground) bg-(--color-info) border-(--color-info) [--ring-color:var(--color-info)]',
        destructive:
          'text-(--color-destructive-foreground) bg-(--color-destructive) border-(--color-destructive) [--ring-color:var(--color-destructive)]',
      },
      size: {
        sm: 'h-8 px-3 text-xs',
        md: 'h-10 px-4 text-sm',
        lg: 'h-12 px-5 text-base',
      },
      rounded: {
        none: 'rounded-none',
        sm: 'rounded-(--radius-sm)',
        md: 'rounded-(--radius-md)',
        lg: 'rounded-(--radius-lg)',
        xl: 'rounded-(--radius-xl)',
        full: 'rounded-full',
      },
      shadow: {
        none: '',
        sm: 'shadow-(--shadow-sm)',
        md: 'shadow-(--shadow-md)',
        lg: 'shadow-(--shadow-lg)',
      },
      disabled: {
        true: 'opacity-(--opacity-disabled) cursor-not-allowed shadow-none',
        false: '',
      },
    },
    compoundVariants: [
      {
        tone: 'primary',
        variant: 'solid',
        class: 'hover:bg-(--color-primary-hover) active:bg-(--color-primary-active)',
      },
      {
        tone: 'primary',
        variant: 'outline',
        class:
          'bg-transparent text-(--color-primary) border-(color:--color-primary) hover:bg-(--color-primary-hover) hover:text-(--color-primary-foreground) hover:border-(color:--color-primary-hover) active:bg-(--color-primary-active) active:text-(--color-primary-foreground) active:border-(color:--color-primary-active)',
      },
      {
        tone: 'primary',
        variant: 'ghost',
        class:
          'bg-transparent border-transparent text-(--color-primary) hover:bg-(--color-primary) hover:text-(--color-primary-foreground) active:bg-(--color-primary-active) active:text-(--color-primary-foreground)',
      },
      {
        tone: 'primary',
        variant: 'soft',
        class:
          'bg-[color-mix(in_srgb,var(--color-primary)_12%,transparent)] text-(--color-primary) hover:bg-[color-mix(in_srgb,var(--color-primary-hover)_18%,transparent)] active:bg-[color-mix(in_srgb,var(--color-primary-active)_24%,transparent)]',
      },
      {
        tone: 'secondary',
        variant: 'solid',
        class: 'hover:bg-(--color-secondary-hover) active:bg-(--color-secondary-active)',
      },
      {
        tone: 'secondary',
        variant: 'outline',
        class:
          'bg-transparent text-(--color-secondary) border-(color:--color-secondary) hover:bg-(--color-secondary-hover) hover:text-(--color-secondary-foreground) hover:border-(color:--color-secondary-hover) active:bg-(--color-secondary-active) active:text-(--color-secondary-foreground) active:border-(color:--color-secondary-active)',
      },
      {
        tone: 'secondary',
        variant: 'ghost',
        class:
          'bg-transparent border-transparent text-(--color-secondary) hover:bg-(--color-secondary) hover:text-(--color-secondary-foreground) active:bg-(--color-secondary-active) active:text-(--color-secondary-foreground)',
      },
      {
        tone: 'secondary',
        variant: 'soft',
        class:
          'bg-[color-mix(in_srgb,var(--color-secondary)_12%,transparent)] text-(--color-secondary) hover:bg-[color-mix(in_srgb,var(--color-secondary-hover)_18%,transparent)] active:bg-[color-mix(in_srgb,var(--color-secondary-active)_24%,transparent)]',
      },
      {
        tone: 'tertiary',
        variant: 'solid',
        class: 'hover:bg-(--color-tertiary-hover) active:bg-(--color-tertiary-active)',
      },
      {
        tone: 'tertiary',
        variant: 'outline',
        class:
          'bg-transparent text-(--color-tertiary) border-(color:--color-tertiary) hover:bg-(--color-tertiary-hover) hover:text-(--color-tertiary-foreground) hover:border-(color:--color-tertiary-hover) active:bg-(--color-tertiary-active) active:text-(--color-tertiary-foreground) active:border-(color:--color-tertiary-active)',
      },
      {
        tone: 'tertiary',
        variant: 'ghost',
        class:
          'bg-transparent border-transparent text-(--color-tertiary) hover:bg-(--color-tertiary) hover:text-(--color-tertiary-foreground) active:bg-(--color-tertiary-active) active:text-(--color-tertiary-foreground)',
      },
      {
        tone: 'tertiary',
        variant: 'soft',
        class:
          'bg-[color-mix(in_srgb,var(--color-tertiary)_12%,transparent)] text-(--color-tertiary) hover:bg-[color-mix(in_srgb,var(--color-tertiary-hover)_18%,transparent)] active:bg-[color-mix(in_srgb,var(--color-tertiary-active)_24%,transparent)]',
      },
      {
        tone: 'base',
        variant: 'solid',
        class:
          'border-(color:--color-base-active) hover:bg-(--color-base-hover) active:bg-(--color-base-active)',
      },
      {
        tone: 'base',
        variant: 'outline',
        class:
          'bg-transparent text-(--color-base-foreground) border-(color:--color-base) hover:bg-(--color-base-hover) hover:border-(color:--color-base-hover) active:bg-(--color-base-active) active:border-(color:--color-base-active)',
      },
      {
        tone: 'base',
        variant: 'ghost',
        class:
          'bg-transparent border-transparent text-(--color-base-foreground) hover:bg-(--color-base) active:bg-(--color-base-active)',
      },
      {
        tone: 'base',
        variant: 'soft',
        class:
          'bg-[color-mix(in_srgb,var(--color-base-hover)_30%,transparent)] text-(--color-base-foreground) hover:bg-[color-mix(in_srgb,var(--color-base-hover)_45%,transparent)] active:bg-[color-mix(in_srgb,var(--color-base-active)_55%,transparent)]',
      },
      {
        tone: 'accent',
        variant: 'solid',
        class: 'hover:bg-(--color-accent-hover) active:bg-(--color-accent-active)',
      },
      {
        tone: 'accent',
        variant: 'outline',
        class:
          'bg-transparent text-(--color-accent) border-(color:--color-accent) hover:bg-(--color-accent-hover) hover:text-(--color-accent-foreground) hover:border-(color:--color-accent-hover) active:bg-(--color-accent-active) active:text-(--color-accent-foreground) active:border-(color:--color-accent-active)',
      },
      {
        tone: 'accent',
        variant: 'ghost',
        class:
          'bg-transparent border-transparent text-(--color-accent) hover:bg-(--color-accent) hover:text-(--color-accent-foreground) active:bg-(--color-accent-active) active:text-(--color-accent-foreground)',
      },
      {
        tone: 'accent',
        variant: 'soft',
        class:
          'bg-[color-mix(in_srgb,var(--color-accent)_12%,transparent)] text-(--color-accent) hover:bg-[color-mix(in_srgb,var(--color-accent-hover)_18%,transparent)] active:bg-[color-mix(in_srgb,var(--color-accent-active)_24%,transparent)]',
      },
      {
        tone: 'neutral',
        variant: 'solid',
        class: 'hover:bg-(--color-neutral-hover) active:bg-(--color-neutral-active)',
      },
      {
        tone: 'neutral',
        variant: 'outline',
        class:
          'bg-transparent text-(--color-neutral-foreground) border-(color:--color-neutral-foreground) hover:bg-(--color-neutral-hover) hover:text-(--color-neutral-foreground) hover:border-(color:--color-neutral-hover) active:bg-(--color-neutral-active) active:text-(--color-neutral-foreground) active:border-(color:--color-neutral-active)',
      },
      {
        tone: 'neutral',
        variant: 'ghost',
        class:
          'bg-transparent border-transparent text-(--color-neutral-foreground) hover:bg-(--color-neutral) hover:text-(--color-neutral-foreground) active:bg-(--color-neutral-active) active:text-(--color-neutral-foreground)',
      },
      {
        tone: 'neutral',
        variant: 'soft',
        class:
          'bg-(--color-muted) text-(--color-neutral-foreground) hover:bg-[color-mix(in_srgb,var(--color-neutral-hover)_16%,var(--color-muted))] active:bg-[color-mix(in_srgb,var(--color-neutral-active)_24%,var(--color-muted))]',
      },
      {
        tone: 'success',
        variant: 'solid',
        class: 'hover:bg-(--color-success-hover) active:bg-(--color-success-active)',
      },
      {
        tone: 'success',
        variant: 'outline',
        class:
          'bg-transparent text-(--color-success) border-(color:--color-success) hover:bg-(--color-success-hover) hover:text-(--color-success-foreground) hover:border-(color:--color-success-hover) active:bg-(--color-success-active) active:text-(--color-success-foreground) active:border-(color:--color-success-active)',
      },
      {
        tone: 'success',
        variant: 'ghost',
        class:
          'bg-transparent border-transparent text-(--color-success) hover:bg-(--color-success) hover:text-(--color-success-foreground) active:bg-(--color-success-active) active:text-(--color-success-foreground)',
      },
      {
        tone: 'success',
        variant: 'soft',
        class:
          'bg-[color-mix(in_srgb,var(--color-success)_12%,transparent)] text-(--color-success) hover:bg-[color-mix(in_srgb,var(--color-success-hover)_18%,transparent)] active:bg-[color-mix(in_srgb,var(--color-success-active)_24%,transparent)]',
      },
      {
        tone: 'warning',
        variant: 'solid',
        class: 'hover:bg-(--color-warning-hover) active:bg-(--color-warning-active)',
      },
      {
        tone: 'warning',
        variant: 'outline',
        class:
          'bg-transparent text-(--color-warning) border-(color:--color-warning) hover:bg-(--color-warning-hover) hover:text-(--color-warning-foreground) hover:border-(color:--color-warning-hover) active:bg-(--color-warning-active) active:text-(--color-warning-foreground) active:border-(color:--color-warning-active)',
      },
      {
        tone: 'warning',
        variant: 'ghost',
        class:
          'bg-transparent border-transparent text-(--color-warning) hover:bg-(--color-warning) hover:text-(--color-warning-foreground) active:bg-(--color-warning-active) active:text-(--color-warning-foreground)',
      },
      {
        tone: 'warning',
        variant: 'soft',
        class:
          'bg-[color-mix(in_srgb,var(--color-warning)_12%,transparent)] text-(--color-warning) hover:bg-[color-mix(in_srgb,var(--color-warning-hover)_18%,transparent)] active:bg-[color-mix(in_srgb,var(--color-warning-active)_24%,transparent)]',
      },
      {
        tone: 'info',
        variant: 'solid',
        class: 'hover:bg-(--color-info-hover) active:bg-(--color-info-active)',
      },
      {
        tone: 'info',
        variant: 'outline',
        class:
          'bg-transparent text-(--color-info) border-(color:--color-info) hover:bg-(--color-info-hover) hover:text-(--color-info-foreground) hover:border-(color:--color-info-hover) active:bg-(--color-info-active) active:text-(--color-info-foreground) active:border-(color:--color-info-active)',
      },
      {
        tone: 'info',
        variant: 'ghost',
        class:
          'bg-transparent border-transparent text-(--color-info) hover:bg-(--color-info) hover:text-(--color-info-foreground) active:bg-(--color-info-active) active:text-(--color-info-foreground)',
      },
      {
        tone: 'info',
        variant: 'soft',
        class:
          'bg-[color-mix(in_srgb,var(--color-info)_12%,transparent)] text-(--color-info) hover:bg-[color-mix(in_srgb,var(--color-info-hover)_18%,transparent)] active:bg-[color-mix(in_srgb,var(--color-info-active)_24%,transparent)]',
      },
      {
        tone: 'destructive',
        variant: 'solid',
        class:
          'hover:bg-(--color-destructive-hover) active:bg-(--color-destructive-active)',
      },
      {
        tone: 'destructive',
        variant: 'outline',
        class:
          'bg-transparent text-(--color-destructive) border-(color:--color-destructive) hover:bg-(--color-destructive-hover) hover:text-(--color-destructive-foreground) hover:border-(color:--color-destructive-hover) active:bg-(--color-destructive-active) active:text-(--color-destructive-foreground) active:border-(color:--color-destructive-active)',
      },
      {
        tone: 'destructive',
        variant: 'ghost',
        class:
          'bg-transparent border-transparent text-(--color-destructive) hover:bg-(--color-destructive) hover:text-(--color-destructive-foreground) active:bg-(--color-destructive-active) active:text-(--color-destructive-foreground)',
      },
      {
        tone: 'destructive',
        variant: 'soft',
        class:
          'bg-[color-mix(in_srgb,var(--color-destructive)_12%,transparent)] text-(--color-destructive) hover:bg-[color-mix(in_srgb,var(--color-destructive-hover)_18%,transparent)] active:bg-[color-mix(in_srgb,var(--color-destructive-active)_24%,transparent)]',
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
