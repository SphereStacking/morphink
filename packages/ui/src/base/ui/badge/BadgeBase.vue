<script setup lang="ts">
defineOptions({ inheritAttrs: false })
import { computed, useAttrs } from 'vue'
import { cva } from 'class-variance-authority'
import { cn } from '../../lib/utils'
import type { BadgeRounded, BadgeSize, BadgeTone, BadgeVariant } from '../../lib/props'

const badgeVariants = cva(cn('inline-flex items-center font-semibold'), {
  variants: {
    size: {
      xs: 'px-1.5 py-0 text-[10px]',
      sm: 'px-2 py-0.5 text-[length:var(--morphink-font-size-12)]',
      md: 'px-2.5 py-0.5 text-[length:var(--morphink-font-size-12)]',
      lg: 'px-3 py-1 text-[length:var(--morphink-font-size-14)]',
      xl: 'px-3.5 py-1 text-[length:var(--morphink-font-size-16)]',
    },
    variant: {
      solid: 'bg-(--badge-color) text-(--badge-fg)',
      outline: cn(
        'border border-(--morphink-border-width-default) bg-transparent',
        'border-(color:--badge-color) text-(--badge-accent)'
      ),
      ghost: 'border-transparent bg-transparent text-(--badge-accent) hover:bg-[color-mix(in_srgb,var(--badge-color)_8%,transparent)]',
      soft: 'bg-[color-mix(in_srgb,var(--badge-color)_12%,transparent)] text-(--badge-accent)',
    },
    tone: {
      primary: cn(
        '[--badge-color:var(--morphink-color-primary)]',
        '[--badge-fg:var(--morphink-color-primary-foreground)]',
        '[--badge-accent:var(--morphink-color-primary)]'
      ),
      secondary: cn(
        '[--badge-color:var(--morphink-color-secondary)]',
        '[--badge-fg:var(--morphink-color-secondary-foreground)]',
        '[--badge-accent:var(--morphink-color-secondary)]'
      ),
      tertiary: cn(
        '[--badge-color:var(--morphink-color-tertiary)]',
        '[--badge-fg:var(--morphink-color-tertiary-foreground)]',
        '[--badge-accent:var(--morphink-color-tertiary)]'
      ),
      base: cn(
        '[--badge-color:var(--morphink-color-base)]',
        '[--badge-fg:var(--morphink-color-base-foreground)]',
        '[--badge-accent:var(--morphink-color-base-foreground)]'
      ),
      accent: cn(
        '[--badge-color:var(--morphink-color-accent)]',
        '[--badge-fg:var(--morphink-color-accent-foreground)]',
        '[--badge-accent:var(--morphink-color-accent)]'
      ),
      neutral: cn(
        '[--badge-color:var(--morphink-color-neutral)]',
        '[--badge-fg:var(--morphink-color-neutral-foreground)]',
        '[--badge-accent:var(--morphink-color-neutral-foreground)]'
      ),
      success: cn(
        '[--badge-color:var(--morphink-color-success)]',
        '[--badge-fg:var(--morphink-color-success-foreground)]',
        '[--badge-accent:var(--morphink-color-success)]'
      ),
      warning: cn(
        '[--badge-color:var(--morphink-color-warning)]',
        '[--badge-fg:var(--morphink-color-warning-foreground)]',
        '[--badge-accent:var(--morphink-color-warning)]'
      ),
      info: cn(
        '[--badge-color:var(--morphink-color-info)]',
        '[--badge-fg:var(--morphink-color-info-foreground)]',
        '[--badge-accent:var(--morphink-color-info)]'
      ),
      destructive: cn(
        '[--badge-color:var(--morphink-color-destructive)]',
        '[--badge-fg:var(--morphink-color-destructive-foreground)]',
        '[--badge-accent:var(--morphink-color-destructive)]'
      ),
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
      tone: 'base',
      variant: 'solid',
      class:
        'border border-(--morphink-border-width-default) border-(color:--morphink-color-base-active)',
    },
    {
      tone: 'base',
      variant: 'soft',
      class: cn(
        'bg-[color-mix(in_srgb,var(--morphink-color-base-hover)_30%,transparent)]',
        'border border-(--morphink-border-width-default) border-(color:--morphink-color-base-active)'
      ),
    },
    {
      tone: 'neutral',
      variant: 'outline',
      class: 'border-(color:--badge-accent) [--badge-accent:var(--morphink-color-foreground)]',
    },
    {
      tone: 'neutral',
      variant: 'ghost',
      class: '[--badge-accent:var(--morphink-color-foreground)]',
    },
    {
      tone: 'neutral',
      variant: 'soft',
      class: 'bg-(--morphink-color-muted) [--badge-accent:var(--morphink-color-foreground)]',
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
  <span data-morphink :class="classes" v-bind="attrs">
    <slot />
  </span>
</template>

<style scoped>
.mi-badge-anim {
  animation: mi-badge-enter var(--morphink-motion-emphasis) both;
}

@keyframes mi-badge-enter {
  from {
    transform: scale(0);
    opacity: 0;
  }
  to {
    transform: scale(1);
    opacity: 1;
  }
}
</style>
