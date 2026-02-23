<template>
  <span :class="classes" v-bind="attrs">
    <slot />
  </span>
</template>

<script setup lang="ts">
import { computed, useAttrs } from 'vue'
import { cva } from 'class-variance-authority'
import { cn } from '../../lib/utils'
import type { BadgeRounded, BadgeSize, BadgeTone, BadgeVariant } from '../../lib/props'

const badgeVariants = cva(
  cn('inline-flex items-center font-semibold'),
  {
    variants: {
      size: {
        sm: 'px-2 py-0.5 text-xs',
        md: 'px-2.5 py-0.5 text-xs',
        lg: 'px-3 py-1 text-sm',
      },
      variant: {
        soft: '',
        solid: '',
        outline: 'border border-[var(--border-width-default)] bg-transparent',
        ghost: 'bg-transparent border-transparent',
      },
      tone: {
        primary: '',
        secondary: '',
        tertiary: '',
        base: '',
        accent: '',
        neutral: '',
        success: '',
        warning: '',
        info: '',
        destructive: '',
      },
      rounded: {
        none: 'rounded-none',
        sm: 'rounded-[var(--radius-sm)]',
        md: 'rounded-[var(--radius-md)]',
        lg: 'rounded-[var(--radius-lg)]',
        xl: 'rounded-[var(--radius-xl)]',
        full: 'rounded-full',
      },
    },
    compoundVariants: [
      {
        tone: 'primary',
        variant: 'soft',
        class: 'bg-[color-mix(in_srgb,var(--color-primary)_12%,transparent)] text-[var(--color-primary)]',
      },
      {
        tone: 'primary',
        variant: 'outline',
        class: 'text-[var(--color-primary)] border-[color:var(--color-primary)]',
      },
      {
        tone: 'primary',
        variant: 'ghost',
        class: 'text-[var(--color-primary)]',
      },
      {
        tone: 'primary',
        variant: 'solid',
        class: 'bg-[var(--color-primary)] text-[var(--color-primary-foreground)]',
      },
      {
        tone: 'secondary',
        variant: 'soft',
        class: 'bg-[color-mix(in_srgb,var(--color-secondary)_12%,transparent)] text-[var(--color-secondary)]',
      },
      {
        tone: 'secondary',
        variant: 'outline',
        class: 'text-[var(--color-secondary)] border-[color:var(--color-secondary)]',
      },
      {
        tone: 'secondary',
        variant: 'ghost',
        class: 'text-[var(--color-secondary)]',
      },
      {
        tone: 'secondary',
        variant: 'solid',
        class: 'bg-[var(--color-secondary)] text-[var(--color-secondary-foreground)]',
      },
      {
        tone: 'tertiary',
        variant: 'soft',
        class: 'bg-[color-mix(in_srgb,var(--color-tertiary)_12%,transparent)] text-[var(--color-tertiary)]',
      },
      {
        tone: 'tertiary',
        variant: 'outline',
        class: 'text-[var(--color-tertiary)] border-[color:var(--color-tertiary)]',
      },
      {
        tone: 'tertiary',
        variant: 'ghost',
        class: 'text-[var(--color-tertiary)]',
      },
      {
        tone: 'tertiary',
        variant: 'solid',
        class: 'bg-[var(--color-tertiary)] text-[var(--color-tertiary-foreground)]',
      },
      {
        tone: 'base',
        variant: 'soft',
        class:
          'bg-[color-mix(in_srgb,var(--color-base-hover)_30%,transparent)] text-[var(--color-base-foreground)] border border-[var(--border-width-default)] border-[color:var(--color-base-active)]',
      },
      {
        tone: 'base',
        variant: 'outline',
        class: 'text-[var(--color-base-foreground)] border-[color:var(--color-base)]',
      },
      {
        tone: 'base',
        variant: 'ghost',
        class: 'text-[var(--color-base-foreground)]',
      },
      {
        tone: 'base',
        variant: 'solid',
        class:
          'bg-[var(--color-base)] text-[var(--color-base-foreground)] border border-[var(--border-width-default)] border-[color:var(--color-base-active)]',
      },
      {
        tone: 'accent',
        variant: 'soft',
        class: 'bg-[color-mix(in_srgb,var(--color-accent)_12%,transparent)] text-[var(--color-accent)]',
      },
      {
        tone: 'accent',
        variant: 'outline',
        class: 'text-[var(--color-accent)] border-[color:var(--color-accent)]',
      },
      {
        tone: 'accent',
        variant: 'ghost',
        class: 'text-[var(--color-accent)]',
      },
      {
        tone: 'accent',
        variant: 'solid',
        class: 'bg-[var(--color-accent)] text-[var(--color-accent-foreground)]',
      },
      {
        tone: 'neutral',
        variant: 'soft',
        class: 'bg-[var(--color-muted)] text-[var(--color-neutral-foreground)]',
      },
      {
        tone: 'neutral',
        variant: 'outline',
        class: 'text-[var(--color-neutral-foreground)] border-[color:var(--color-neutral-foreground)]',
      },
      {
        tone: 'neutral',
        variant: 'ghost',
        class: 'text-[var(--color-neutral-foreground)]',
      },
      {
        tone: 'neutral',
        variant: 'solid',
        class: 'bg-[var(--color-neutral)] text-[var(--color-neutral-foreground)]',
      },
      {
        tone: 'success',
        variant: 'soft',
        class: 'bg-[color-mix(in_srgb,var(--color-success)_12%,transparent)] text-[var(--color-success)]',
      },
      {
        tone: 'success',
        variant: 'outline',
        class: 'text-[var(--color-success)] border-[color:var(--color-success)]',
      },
      {
        tone: 'success',
        variant: 'ghost',
        class: 'text-[var(--color-success)]',
      },
      {
        tone: 'success',
        variant: 'solid',
        class: 'bg-[var(--color-success)] text-[var(--color-success-foreground)]',
      },
      {
        tone: 'warning',
        variant: 'soft',
        class: 'bg-[color-mix(in_srgb,var(--color-warning)_12%,transparent)] text-[var(--color-warning)]',
      },
      {
        tone: 'warning',
        variant: 'outline',
        class: 'text-[var(--color-warning)] border-[color:var(--color-warning)]',
      },
      {
        tone: 'warning',
        variant: 'ghost',
        class: 'text-[var(--color-warning)]',
      },
      {
        tone: 'warning',
        variant: 'solid',
        class: 'bg-[var(--color-warning)] text-[var(--color-warning-foreground)]',
      },
      {
        tone: 'info',
        variant: 'soft',
        class: 'bg-[color-mix(in_srgb,var(--color-info)_12%,transparent)] text-[var(--color-info)]',
      },
      {
        tone: 'info',
        variant: 'outline',
        class: 'text-[var(--color-info)] border-[color:var(--color-info)]',
      },
      {
        tone: 'info',
        variant: 'ghost',
        class: 'text-[var(--color-info)]',
      },
      {
        tone: 'info',
        variant: 'solid',
        class: 'bg-[var(--color-info)] text-[var(--color-info-foreground)]',
      },
      {
        tone: 'destructive',
        variant: 'soft',
        class: 'bg-[color-mix(in_srgb,var(--color-destructive)_12%,transparent)] text-[var(--color-destructive)]',
      },
      {
        tone: 'destructive',
        variant: 'outline',
        class: 'text-[var(--color-destructive)] border-[color:var(--color-destructive)]',
      },
      {
        tone: 'destructive',
        variant: 'ghost',
        class: 'text-[var(--color-destructive)]',
      },
      {
        tone: 'destructive',
        variant: 'solid',
        class: 'bg-[var(--color-destructive)] text-[var(--color-destructive-foreground)]',
      },
    ],
    defaultVariants: {
      size: 'md',
      variant: 'solid',
      tone: 'base',
      rounded: 'full',
    },
  }
)

const props = withDefaults(
  defineProps<{
    size?: BadgeSize
    variant?: BadgeVariant
    tone?: BadgeTone
    rounded?: BadgeRounded
  }>(),
  {
    size: 'md',
    variant: 'solid',
    tone: 'base',
    rounded: 'full',
  }
)

const attrs = useAttrs()
const classes = computed(() =>
  cn(
    badgeVariants({
      size: props.size,
      variant: props.variant,
      tone: props.tone,
      rounded: props.rounded,
    }),
    attrs.class
  )
)
</script>
