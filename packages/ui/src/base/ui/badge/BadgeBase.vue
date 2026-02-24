<script setup lang="ts">
defineOptions({ inheritAttrs: false })
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
      outline: 'border border-(--morphink-border-width-default) bg-transparent',
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
      sm: 'rounded-(--morphink-radius-sm)',
      md: 'rounded-(--morphink-radius-md)',
      lg: 'rounded-(--morphink-radius-lg)',
      xl: 'rounded-(--morphink-radius-xl)',
      full: 'rounded-full',
    },
  },
  compoundVariants: [
    {
      tone: 'primary',
      variant: 'soft',
      class:
        'bg-[color-mix(in_srgb,var(--morphink-color-primary)_12%,transparent)] text-(--morphink-color-primary)',
    },
    {
      tone: 'primary',
      variant: 'outline',
      class: 'text-(--morphink-color-primary) border-(color:--morphink-color-primary)',
    },
    {
      tone: 'primary',
      variant: 'ghost',
      class: 'text-(--morphink-color-primary)',
    },
    {
      tone: 'primary',
      variant: 'solid',
      class: 'bg-(--morphink-color-primary) text-(--morphink-color-primary-foreground)',
    },
    {
      tone: 'secondary',
      variant: 'soft',
      class:
        'bg-[color-mix(in_srgb,var(--morphink-color-secondary)_12%,transparent)] text-(--morphink-color-secondary)',
    },
    {
      tone: 'secondary',
      variant: 'outline',
      class: 'text-(--morphink-color-secondary) border-(color:--morphink-color-secondary)',
    },
    {
      tone: 'secondary',
      variant: 'ghost',
      class: 'text-(--morphink-color-secondary)',
    },
    {
      tone: 'secondary',
      variant: 'solid',
      class: 'bg-(--morphink-color-secondary) text-(--morphink-color-secondary-foreground)',
    },
    {
      tone: 'tertiary',
      variant: 'soft',
      class:
        'bg-[color-mix(in_srgb,var(--morphink-color-tertiary)_12%,transparent)] text-(--morphink-color-tertiary)',
    },
    {
      tone: 'tertiary',
      variant: 'outline',
      class: 'text-(--morphink-color-tertiary) border-(color:--morphink-color-tertiary)',
    },
    {
      tone: 'tertiary',
      variant: 'ghost',
      class: 'text-(--morphink-color-tertiary)',
    },
    {
      tone: 'tertiary',
      variant: 'solid',
      class: 'bg-(--morphink-color-tertiary) text-(--morphink-color-tertiary-foreground)',
    },
    {
      tone: 'base',
      variant: 'soft',
      class:
        'bg-[color-mix(in_srgb,var(--morphink-color-base-hover)_30%,transparent)] text-(--morphink-color-base-foreground) border border-(--morphink-border-width-default) border-(color:--morphink-color-base-active)',
    },
    {
      tone: 'base',
      variant: 'outline',
      class: 'text-(--morphink-color-base-foreground) border-(color:--morphink-color-base)',
    },
    {
      tone: 'base',
      variant: 'ghost',
      class: 'text-(--morphink-color-base-foreground)',
    },
    {
      tone: 'base',
      variant: 'solid',
      class:
        'bg-(--morphink-color-base) text-(--morphink-color-base-foreground) border border-(--morphink-border-width-default) border-(color:--morphink-color-base-active)',
    },
    {
      tone: 'accent',
      variant: 'soft',
      class:
        'bg-[color-mix(in_srgb,var(--morphink-color-accent)_12%,transparent)] text-(--morphink-color-accent)',
    },
    {
      tone: 'accent',
      variant: 'outline',
      class: 'text-(--morphink-color-accent) border-(color:--morphink-color-accent)',
    },
    {
      tone: 'accent',
      variant: 'ghost',
      class: 'text-(--morphink-color-accent)',
    },
    {
      tone: 'accent',
      variant: 'solid',
      class: 'bg-(--morphink-color-accent) text-(--morphink-color-accent-foreground)',
    },
    {
      tone: 'neutral',
      variant: 'soft',
      class: 'bg-(--morphink-color-muted) text-(--morphink-color-neutral-foreground)',
    },
    {
      tone: 'neutral',
      variant: 'outline',
      class:
        'text-(--morphink-color-neutral-foreground) border-(color:--morphink-color-neutral-foreground)',
    },
    {
      tone: 'neutral',
      variant: 'ghost',
      class: 'text-(--morphink-color-neutral-foreground)',
    },
    {
      tone: 'neutral',
      variant: 'solid',
      class: 'bg-(--morphink-color-neutral) text-(--morphink-color-neutral-foreground)',
    },
    {
      tone: 'success',
      variant: 'soft',
      class:
        'bg-[color-mix(in_srgb,var(--morphink-color-success)_12%,transparent)] text-(--morphink-color-success)',
    },
    {
      tone: 'success',
      variant: 'outline',
      class: 'text-(--morphink-color-success) border-(color:--morphink-color-success)',
    },
    {
      tone: 'success',
      variant: 'ghost',
      class: 'text-(--morphink-color-success)',
    },
    {
      tone: 'success',
      variant: 'solid',
      class: 'bg-(--morphink-color-success) text-(--morphink-color-success-foreground)',
    },
    {
      tone: 'warning',
      variant: 'soft',
      class:
        'bg-[color-mix(in_srgb,var(--morphink-color-warning)_12%,transparent)] text-(--morphink-color-warning)',
    },
    {
      tone: 'warning',
      variant: 'outline',
      class: 'text-(--morphink-color-warning) border-(color:--morphink-color-warning)',
    },
    {
      tone: 'warning',
      variant: 'ghost',
      class: 'text-(--morphink-color-warning)',
    },
    {
      tone: 'warning',
      variant: 'solid',
      class: 'bg-(--morphink-color-warning) text-(--morphink-color-warning-foreground)',
    },
    {
      tone: 'info',
      variant: 'soft',
      class: 'bg-[color-mix(in_srgb,var(--morphink-color-info)_12%,transparent)] text-(--morphink-color-info)',
    },
    {
      tone: 'info',
      variant: 'outline',
      class: 'text-(--morphink-color-info) border-(color:--morphink-color-info)',
    },
    {
      tone: 'info',
      variant: 'ghost',
      class: 'text-(--morphink-color-info)',
    },
    {
      tone: 'info',
      variant: 'solid',
      class: 'bg-(--morphink-color-info) text-(--morphink-color-info-foreground)',
    },
    {
      tone: 'destructive',
      variant: 'soft',
      class:
        'bg-[color-mix(in_srgb,var(--morphink-color-destructive)_12%,transparent)] text-(--morphink-color-destructive)',
    },
    {
      tone: 'destructive',
      variant: 'outline',
      class: 'text-(--morphink-color-destructive) border-(color:--morphink-color-destructive)',
    },
    {
      tone: 'destructive',
      variant: 'ghost',
      class: 'text-(--morphink-color-destructive)',
    },
    {
      tone: 'destructive',
      variant: 'solid',
      class: 'bg-(--morphink-color-destructive) text-(--morphink-color-destructive-foreground)',
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

<template>
  <span :class="classes" v-bind="attrs">
    <slot />
  </span>
</template>
