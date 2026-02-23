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

const panelVariants = cva('p-(--space-lg)', {
  variants: {
    variant: {
      subtle:
        'bg-(--color-muted) border-(--border-width-default) border-(--color-border)',
      solid:
        'bg-(--color-card) border-(--border-width-default) border-(--color-border)',
      elevated:
        'bg-(--color-card) border-(--border-width-default) border-(--color-border)',
    },
    rounded: {
      none: 'rounded-none',
      sm: 'rounded-(--radius-sm)',
      md: 'rounded-(--radius-md)',
      lg: 'rounded-(--radius-lg)',
      xl: 'rounded-(--radius-xl)',
    },
    shadow: {
      none: '',
      sm: 'shadow-(--shadow-sm)',
      md: 'shadow-(--shadow-md)',
      lg: 'shadow-(--shadow-lg)',
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
    props.interactive ? 'transition hover:bg-(--color-muted)' : null,
    attrs.class
  )
)
</script>
