<template>
  <div :class="classes">
    <slot />
  </div>
</template>

<script setup lang="ts">
import { computed, useAttrs } from 'vue'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '../../lib/utils'
import type { PanelRounded, PanelShadow, PanelVariant } from '../../lib/props'

const panelVariants = cva('p-[var(--space-lg)]', {
  variants: {
    variant: {
      subtle:
        'bg-[var(--color-muted)] border-[var(--border-width-default)] border-[var(--color-border)]',
      solid:
        'bg-[var(--color-card)] border-[var(--border-width-default)] border-[var(--color-border)]',
      elevated:
        'bg-[var(--color-card)] border-[var(--border-width-default)] border-[var(--color-border)]',
    },
    rounded: {
      none: 'rounded-none',
      sm: 'rounded-[var(--radius-sm)]',
      md: 'rounded-[var(--radius-md)]',
      lg: 'rounded-[var(--radius-lg)]',
      xl: 'rounded-[var(--radius-xl)]',
    },
    shadow: {
      none: '',
      sm: 'shadow-[var(--shadow-sm)]',
      md: 'shadow-[var(--shadow-md)]',
      lg: 'shadow-[var(--shadow-lg)]',
    },
  },
  defaultVariants: {
    variant: 'subtle',
    rounded: 'md',
    shadow: 'md',
  },
})

type PanelVariants = VariantProps<typeof panelVariants>

const props = withDefaults(
  defineProps<{
    variant?: PanelVariant
    interactive?: boolean
    rounded?: PanelRounded
    shadow?: PanelShadow
  }>(),
  {
    variant: 'subtle',
    interactive: false,
    rounded: 'md',
    shadow: 'md',
  }
)

const attrs = useAttrs()
const classes = computed(() =>
  cn(
    panelVariants({
      variant: props.variant,
      rounded: props.rounded,
      shadow: props.shadow,
    }),
    props.interactive ? 'transition hover:bg-[var(--color-muted)]' : null,
    attrs.class
  )
)
</script>
