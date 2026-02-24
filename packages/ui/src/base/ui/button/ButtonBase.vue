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
    'border border-(--morphink-border-width-default) border-transparent transition duration-150',
    'focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-(--ring-color)'
  ),
  {
    variants: {
      variant: {
        solid: '',
        outline: 'border border-(--morphink-border-width-default)',
        ghost: 'bg-transparent',
        soft: 'border-0',
      },
      tone: {
        primary:
          'text-(--morphink-color-primary-foreground) bg-(--morphink-color-primary) border-(--morphink-color-primary) [--ring-color:var(--morphink-color-primary)]',
        secondary:
          'text-(--morphink-color-secondary-foreground) bg-(--morphink-color-secondary) border-(--morphink-color-secondary) [--ring-color:var(--morphink-color-secondary)]',
        tertiary:
          'text-(--morphink-color-tertiary-foreground) bg-(--morphink-color-tertiary) border-(--morphink-color-tertiary) [--ring-color:var(--morphink-color-tertiary)]',
        base: 'text-(--morphink-color-base-foreground) bg-(--morphink-color-base) border-(--morphink-color-base) [--ring-color:var(--morphink-color-base)]',
        accent:
          'text-(--morphink-color-accent-foreground) bg-(--morphink-color-accent) border-(--morphink-color-accent) [--ring-color:var(--morphink-color-accent)]',
        neutral:
          'text-(--morphink-color-neutral-foreground) bg-(--morphink-color-neutral) border-(--morphink-color-neutral) [--ring-color:var(--morphink-color-neutral)]',
        success:
          'text-(--morphink-color-success-foreground) bg-(--morphink-color-success) border-(--morphink-color-success) [--ring-color:var(--morphink-color-success)]',
        warning:
          'text-(--morphink-color-warning-foreground) bg-(--morphink-color-warning) border-(--morphink-color-warning) [--ring-color:var(--morphink-color-warning)]',
        info: 'text-(--morphink-color-info-foreground) bg-(--morphink-color-info) border-(--morphink-color-info) [--ring-color:var(--morphink-color-info)]',
        destructive:
          'text-(--morphink-color-destructive-foreground) bg-(--morphink-color-destructive) border-(--morphink-color-destructive) [--ring-color:var(--morphink-color-destructive)]',
      },
      size: {
        sm: 'h-8 px-3 text-xs',
        md: 'h-10 px-4 text-sm',
        lg: 'h-12 px-5 text-base',
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
        true: 'opacity-(--morphink-opacity-disabled) cursor-not-allowed shadow-none',
        false: '',
      },
    },
    compoundVariants: [
      {
        tone: 'primary',
        variant: 'solid',
        class: 'hover:bg-(--morphink-color-primary-hover) active:bg-(--morphink-color-primary-active)',
      },
      {
        tone: 'primary',
        variant: 'outline',
        class:
          'bg-transparent text-(--morphink-color-primary) border-(color:--morphink-color-primary) hover:bg-(--morphink-color-primary-hover) hover:text-(--morphink-color-primary-foreground) hover:border-(color:--morphink-color-primary-hover) active:bg-(--morphink-color-primary-active) active:text-(--morphink-color-primary-foreground) active:border-(color:--morphink-color-primary-active)',
      },
      {
        tone: 'primary',
        variant: 'ghost',
        class:
          'bg-transparent border-transparent text-(--morphink-color-primary) hover:bg-(--morphink-color-primary) hover:text-(--morphink-color-primary-foreground) active:bg-(--morphink-color-primary-active) active:text-(--morphink-color-primary-foreground)',
      },
      {
        tone: 'primary',
        variant: 'soft',
        class:
          'bg-[color-mix(in_srgb,var(--morphink-color-primary)_12%,transparent)] text-(--morphink-color-primary) hover:bg-[color-mix(in_srgb,var(--morphink-color-primary-hover)_18%,transparent)] active:bg-[color-mix(in_srgb,var(--morphink-color-primary-active)_24%,transparent)]',
      },
      {
        tone: 'secondary',
        variant: 'solid',
        class: 'hover:bg-(--morphink-color-secondary-hover) active:bg-(--morphink-color-secondary-active)',
      },
      {
        tone: 'secondary',
        variant: 'outline',
        class:
          'bg-transparent text-(--morphink-color-secondary) border-(color:--morphink-color-secondary) hover:bg-(--morphink-color-secondary-hover) hover:text-(--morphink-color-secondary-foreground) hover:border-(color:--morphink-color-secondary-hover) active:bg-(--morphink-color-secondary-active) active:text-(--morphink-color-secondary-foreground) active:border-(color:--morphink-color-secondary-active)',
      },
      {
        tone: 'secondary',
        variant: 'ghost',
        class:
          'bg-transparent border-transparent text-(--morphink-color-secondary) hover:bg-(--morphink-color-secondary) hover:text-(--morphink-color-secondary-foreground) active:bg-(--morphink-color-secondary-active) active:text-(--morphink-color-secondary-foreground)',
      },
      {
        tone: 'secondary',
        variant: 'soft',
        class:
          'bg-[color-mix(in_srgb,var(--morphink-color-secondary)_12%,transparent)] text-(--morphink-color-secondary) hover:bg-[color-mix(in_srgb,var(--morphink-color-secondary-hover)_18%,transparent)] active:bg-[color-mix(in_srgb,var(--morphink-color-secondary-active)_24%,transparent)]',
      },
      {
        tone: 'tertiary',
        variant: 'solid',
        class: 'hover:bg-(--morphink-color-tertiary-hover) active:bg-(--morphink-color-tertiary-active)',
      },
      {
        tone: 'tertiary',
        variant: 'outline',
        class:
          'bg-transparent text-(--morphink-color-tertiary) border-(color:--morphink-color-tertiary) hover:bg-(--morphink-color-tertiary-hover) hover:text-(--morphink-color-tertiary-foreground) hover:border-(color:--morphink-color-tertiary-hover) active:bg-(--morphink-color-tertiary-active) active:text-(--morphink-color-tertiary-foreground) active:border-(color:--morphink-color-tertiary-active)',
      },
      {
        tone: 'tertiary',
        variant: 'ghost',
        class:
          'bg-transparent border-transparent text-(--morphink-color-tertiary) hover:bg-(--morphink-color-tertiary) hover:text-(--morphink-color-tertiary-foreground) active:bg-(--morphink-color-tertiary-active) active:text-(--morphink-color-tertiary-foreground)',
      },
      {
        tone: 'tertiary',
        variant: 'soft',
        class:
          'bg-[color-mix(in_srgb,var(--morphink-color-tertiary)_12%,transparent)] text-(--morphink-color-tertiary) hover:bg-[color-mix(in_srgb,var(--morphink-color-tertiary-hover)_18%,transparent)] active:bg-[color-mix(in_srgb,var(--morphink-color-tertiary-active)_24%,transparent)]',
      },
      {
        tone: 'base',
        variant: 'solid',
        class:
          'hover:bg-(--morphink-color-base-hover) active:bg-(--morphink-color-base-active)',
      },
      {
        tone: 'base',
        variant: 'outline',
        class:
          'bg-transparent text-(--morphink-color-base-foreground) border-(color:--morphink-color-base) hover:bg-(--morphink-color-base-hover) hover:border-(color:--morphink-color-base-hover) active:bg-(--morphink-color-base-active) active:border-(color:--morphink-color-base-active)',
      },
      {
        tone: 'base',
        variant: 'ghost',
        class:
          'bg-transparent border-transparent text-(--morphink-color-base-foreground) hover:bg-(--morphink-color-base) active:bg-(--morphink-color-base-active)',
      },
      {
        tone: 'base',
        variant: 'soft',
        class:
          'bg-[color-mix(in_srgb,var(--morphink-color-base-hover)_30%,transparent)] text-(--morphink-color-base-foreground) hover:bg-[color-mix(in_srgb,var(--morphink-color-base-hover)_45%,transparent)] active:bg-[color-mix(in_srgb,var(--morphink-color-base-active)_55%,transparent)]',
      },
      {
        tone: 'accent',
        variant: 'solid',
        class: 'hover:bg-(--morphink-color-accent-hover) active:bg-(--morphink-color-accent-active)',
      },
      {
        tone: 'accent',
        variant: 'outline',
        class:
          'bg-transparent text-(--morphink-color-accent) border-(color:--morphink-color-accent) hover:bg-(--morphink-color-accent-hover) hover:text-(--morphink-color-accent-foreground) hover:border-(color:--morphink-color-accent-hover) active:bg-(--morphink-color-accent-active) active:text-(--morphink-color-accent-foreground) active:border-(color:--morphink-color-accent-active)',
      },
      {
        tone: 'accent',
        variant: 'ghost',
        class:
          'bg-transparent border-transparent text-(--morphink-color-accent) hover:bg-(--morphink-color-accent) hover:text-(--morphink-color-accent-foreground) active:bg-(--morphink-color-accent-active) active:text-(--morphink-color-accent-foreground)',
      },
      {
        tone: 'accent',
        variant: 'soft',
        class:
          'bg-[color-mix(in_srgb,var(--morphink-color-accent)_12%,transparent)] text-(--morphink-color-accent) hover:bg-[color-mix(in_srgb,var(--morphink-color-accent-hover)_18%,transparent)] active:bg-[color-mix(in_srgb,var(--morphink-color-accent-active)_24%,transparent)]',
      },
      {
        tone: 'neutral',
        variant: 'solid',
        class: 'hover:bg-(--morphink-color-neutral-hover) active:bg-(--morphink-color-neutral-active)',
      },
      {
        tone: 'neutral',
        variant: 'outline',
        class:
          'bg-transparent text-(--morphink-color-neutral-foreground) border-(color:--morphink-color-neutral-foreground) hover:bg-(--morphink-color-neutral-hover) hover:text-(--morphink-color-neutral-foreground) hover:border-(color:--morphink-color-neutral-hover) active:bg-(--morphink-color-neutral-active) active:text-(--morphink-color-neutral-foreground) active:border-(color:--morphink-color-neutral-active)',
      },
      {
        tone: 'neutral',
        variant: 'ghost',
        class:
          'bg-transparent border-transparent text-(--morphink-color-neutral-foreground) hover:bg-(--morphink-color-neutral) hover:text-(--morphink-color-neutral-foreground) active:bg-(--morphink-color-neutral-active) active:text-(--morphink-color-neutral-foreground)',
      },
      {
        tone: 'neutral',
        variant: 'soft',
        class:
          'bg-(--morphink-color-muted) text-(--morphink-color-neutral-foreground) hover:bg-[color-mix(in_srgb,var(--morphink-color-neutral-hover)_16%,var(--morphink-color-muted))] active:bg-[color-mix(in_srgb,var(--morphink-color-neutral-active)_24%,var(--morphink-color-muted))]',
      },
      {
        tone: 'success',
        variant: 'solid',
        class: 'hover:bg-(--morphink-color-success-hover) active:bg-(--morphink-color-success-active)',
      },
      {
        tone: 'success',
        variant: 'outline',
        class:
          'bg-transparent text-(--morphink-color-success) border-(color:--morphink-color-success) hover:bg-(--morphink-color-success-hover) hover:text-(--morphink-color-success-foreground) hover:border-(color:--morphink-color-success-hover) active:bg-(--morphink-color-success-active) active:text-(--morphink-color-success-foreground) active:border-(color:--morphink-color-success-active)',
      },
      {
        tone: 'success',
        variant: 'ghost',
        class:
          'bg-transparent border-transparent text-(--morphink-color-success) hover:bg-(--morphink-color-success) hover:text-(--morphink-color-success-foreground) active:bg-(--morphink-color-success-active) active:text-(--morphink-color-success-foreground)',
      },
      {
        tone: 'success',
        variant: 'soft',
        class:
          'bg-[color-mix(in_srgb,var(--morphink-color-success)_12%,transparent)] text-(--morphink-color-success) hover:bg-[color-mix(in_srgb,var(--morphink-color-success-hover)_18%,transparent)] active:bg-[color-mix(in_srgb,var(--morphink-color-success-active)_24%,transparent)]',
      },
      {
        tone: 'warning',
        variant: 'solid',
        class: 'hover:bg-(--morphink-color-warning-hover) active:bg-(--morphink-color-warning-active)',
      },
      {
        tone: 'warning',
        variant: 'outline',
        class:
          'bg-transparent text-(--morphink-color-warning) border-(color:--morphink-color-warning) hover:bg-(--morphink-color-warning-hover) hover:text-(--morphink-color-warning-foreground) hover:border-(color:--morphink-color-warning-hover) active:bg-(--morphink-color-warning-active) active:text-(--morphink-color-warning-foreground) active:border-(color:--morphink-color-warning-active)',
      },
      {
        tone: 'warning',
        variant: 'ghost',
        class:
          'bg-transparent border-transparent text-(--morphink-color-warning) hover:bg-(--morphink-color-warning) hover:text-(--morphink-color-warning-foreground) active:bg-(--morphink-color-warning-active) active:text-(--morphink-color-warning-foreground)',
      },
      {
        tone: 'warning',
        variant: 'soft',
        class:
          'bg-[color-mix(in_srgb,var(--morphink-color-warning)_12%,transparent)] text-(--morphink-color-warning) hover:bg-[color-mix(in_srgb,var(--morphink-color-warning-hover)_18%,transparent)] active:bg-[color-mix(in_srgb,var(--morphink-color-warning-active)_24%,transparent)]',
      },
      {
        tone: 'info',
        variant: 'solid',
        class: 'hover:bg-(--morphink-color-info-hover) active:bg-(--morphink-color-info-active)',
      },
      {
        tone: 'info',
        variant: 'outline',
        class:
          'bg-transparent text-(--morphink-color-info) border-(color:--morphink-color-info) hover:bg-(--morphink-color-info-hover) hover:text-(--morphink-color-info-foreground) hover:border-(color:--morphink-color-info-hover) active:bg-(--morphink-color-info-active) active:text-(--morphink-color-info-foreground) active:border-(color:--morphink-color-info-active)',
      },
      {
        tone: 'info',
        variant: 'ghost',
        class:
          'bg-transparent border-transparent text-(--morphink-color-info) hover:bg-(--morphink-color-info) hover:text-(--morphink-color-info-foreground) active:bg-(--morphink-color-info-active) active:text-(--morphink-color-info-foreground)',
      },
      {
        tone: 'info',
        variant: 'soft',
        class:
          'bg-[color-mix(in_srgb,var(--morphink-color-info)_12%,transparent)] text-(--morphink-color-info) hover:bg-[color-mix(in_srgb,var(--morphink-color-info-hover)_18%,transparent)] active:bg-[color-mix(in_srgb,var(--morphink-color-info-active)_24%,transparent)]',
      },
      {
        tone: 'destructive',
        variant: 'solid',
        class:
          'hover:bg-(--morphink-color-destructive-hover) active:bg-(--morphink-color-destructive-active)',
      },
      {
        tone: 'destructive',
        variant: 'outline',
        class:
          'bg-transparent text-(--morphink-color-destructive) border-(color:--morphink-color-destructive) hover:bg-(--morphink-color-destructive-hover) hover:text-(--morphink-color-destructive-foreground) hover:border-(color:--morphink-color-destructive-hover) active:bg-(--morphink-color-destructive-active) active:text-(--morphink-color-destructive-foreground) active:border-(color:--morphink-color-destructive-active)',
      },
      {
        tone: 'destructive',
        variant: 'ghost',
        class:
          'bg-transparent border-transparent text-(--morphink-color-destructive) hover:bg-(--morphink-color-destructive) hover:text-(--morphink-color-destructive-foreground) active:bg-(--morphink-color-destructive-active) active:text-(--morphink-color-destructive-foreground)',
      },
      {
        tone: 'destructive',
        variant: 'soft',
        class:
          'bg-[color-mix(in_srgb,var(--morphink-color-destructive)_12%,transparent)] text-(--morphink-color-destructive) hover:bg-[color-mix(in_srgb,var(--morphink-color-destructive-hover)_18%,transparent)] active:bg-[color-mix(in_srgb,var(--morphink-color-destructive-active)_24%,transparent)]',
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
