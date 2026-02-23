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

const badgeVariants = cva(cn('inline-flex items-center font-semibold'), {
  variants: {
    size: {
      sm: 'px-2 py-0.5 text-xs',
      md: 'px-2.5 py-0.5 text-xs',
      lg: 'px-3 py-1 text-sm',
    },
    variant: {
      soft: '',
      solid: '',
      outline: 'border border-(--border-width-default) bg-transparent',
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
      sm: 'rounded-(--radius-sm)',
      md: 'rounded-(--radius-md)',
      lg: 'rounded-(--radius-lg)',
      xl: 'rounded-(--radius-xl)',
      full: 'rounded-full',
    },
  },
  compoundVariants: [
    {
      tone: 'primary',
      variant: 'soft',
      class:
        'bg-[color-mix(in_srgb,var(--color-primary)_12%,transparent)] text-(--color-primary)',
    },
    {
      tone: 'primary',
      variant: 'outline',
      class: 'text-(--color-primary) border-(color:--color-primary)',
    },
    {
      tone: 'primary',
      variant: 'ghost',
      class: 'text-(--color-primary)',
    },
    {
      tone: 'primary',
      variant: 'solid',
      class: 'bg-(--color-primary) text-(--color-primary-foreground)',
    },
    {
      tone: 'secondary',
      variant: 'soft',
      class:
        'bg-[color-mix(in_srgb,var(--color-secondary)_12%,transparent)] text-(--color-secondary)',
    },
    {
      tone: 'secondary',
      variant: 'outline',
      class: 'text-(--color-secondary) border-(color:--color-secondary)',
    },
    {
      tone: 'secondary',
      variant: 'ghost',
      class: 'text-(--color-secondary)',
    },
    {
      tone: 'secondary',
      variant: 'solid',
      class: 'bg-(--color-secondary) text-(--color-secondary-foreground)',
    },
    {
      tone: 'tertiary',
      variant: 'soft',
      class:
        'bg-[color-mix(in_srgb,var(--color-tertiary)_12%,transparent)] text-(--color-tertiary)',
    },
    {
      tone: 'tertiary',
      variant: 'outline',
      class: 'text-(--color-tertiary) border-(color:--color-tertiary)',
    },
    {
      tone: 'tertiary',
      variant: 'ghost',
      class: 'text-(--color-tertiary)',
    },
    {
      tone: 'tertiary',
      variant: 'solid',
      class: 'bg-(--color-tertiary) text-(--color-tertiary-foreground)',
    },
    {
      tone: 'base',
      variant: 'soft',
      class:
        'bg-[color-mix(in_srgb,var(--color-base-hover)_30%,transparent)] text-(--color-base-foreground) border border-(--border-width-default) border-(color:--color-base-active)',
    },
    {
      tone: 'base',
      variant: 'outline',
      class: 'text-(--color-base-foreground) border-(color:--color-base)',
    },
    {
      tone: 'base',
      variant: 'ghost',
      class: 'text-(--color-base-foreground)',
    },
    {
      tone: 'base',
      variant: 'solid',
      class:
        'bg-(--color-base) text-(--color-base-foreground) border border-(--border-width-default) border-(color:--color-base-active)',
    },
    {
      tone: 'accent',
      variant: 'soft',
      class:
        'bg-[color-mix(in_srgb,var(--color-accent)_12%,transparent)] text-(--color-accent)',
    },
    {
      tone: 'accent',
      variant: 'outline',
      class: 'text-(--color-accent) border-(color:--color-accent)',
    },
    {
      tone: 'accent',
      variant: 'ghost',
      class: 'text-(--color-accent)',
    },
    {
      tone: 'accent',
      variant: 'solid',
      class: 'bg-(--color-accent) text-(--color-accent-foreground)',
    },
    {
      tone: 'neutral',
      variant: 'soft',
      class: 'bg-(--color-muted) text-(--color-neutral-foreground)',
    },
    {
      tone: 'neutral',
      variant: 'outline',
      class:
        'text-(--color-neutral-foreground) border-(color:--color-neutral-foreground)',
    },
    {
      tone: 'neutral',
      variant: 'ghost',
      class: 'text-(--color-neutral-foreground)',
    },
    {
      tone: 'neutral',
      variant: 'solid',
      class: 'bg-(--color-neutral) text-(--color-neutral-foreground)',
    },
    {
      tone: 'success',
      variant: 'soft',
      class:
        'bg-[color-mix(in_srgb,var(--color-success)_12%,transparent)] text-(--color-success)',
    },
    {
      tone: 'success',
      variant: 'outline',
      class: 'text-(--color-success) border-(color:--color-success)',
    },
    {
      tone: 'success',
      variant: 'ghost',
      class: 'text-(--color-success)',
    },
    {
      tone: 'success',
      variant: 'solid',
      class: 'bg-(--color-success) text-(--color-success-foreground)',
    },
    {
      tone: 'warning',
      variant: 'soft',
      class:
        'bg-[color-mix(in_srgb,var(--color-warning)_12%,transparent)] text-(--color-warning)',
    },
    {
      tone: 'warning',
      variant: 'outline',
      class: 'text-(--color-warning) border-(color:--color-warning)',
    },
    {
      tone: 'warning',
      variant: 'ghost',
      class: 'text-(--color-warning)',
    },
    {
      tone: 'warning',
      variant: 'solid',
      class: 'bg-(--color-warning) text-(--color-warning-foreground)',
    },
    {
      tone: 'info',
      variant: 'soft',
      class: 'bg-[color-mix(in_srgb,var(--color-info)_12%,transparent)] text-(--color-info)',
    },
    {
      tone: 'info',
      variant: 'outline',
      class: 'text-(--color-info) border-(color:--color-info)',
    },
    {
      tone: 'info',
      variant: 'ghost',
      class: 'text-(--color-info)',
    },
    {
      tone: 'info',
      variant: 'solid',
      class: 'bg-(--color-info) text-(--color-info-foreground)',
    },
    {
      tone: 'destructive',
      variant: 'soft',
      class:
        'bg-[color-mix(in_srgb,var(--color-destructive)_12%,transparent)] text-(--color-destructive)',
    },
    {
      tone: 'destructive',
      variant: 'outline',
      class: 'text-(--color-destructive) border-(color:--color-destructive)',
    },
    {
      tone: 'destructive',
      variant: 'ghost',
      class: 'text-(--color-destructive)',
    },
    {
      tone: 'destructive',
      variant: 'solid',
      class: 'bg-(--color-destructive) text-(--color-destructive-foreground)',
    },
  ],
  defaultVariants: {
    size: 'md',
    variant: 'solid',
    tone: 'base',
    rounded: 'full',
  },
})

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
