<script setup lang="ts">
defineOptions({ inheritAttrs: false })
import { computed, useAttrs } from 'vue'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '../../lib/utils'
import type { PanelRounded, PanelShadow, PanelVariant } from '../../lib/props'

const panelVariants = cva('p-(--morphink-space-lg)', {
  variants: {
    variant: {
      subtle:
        'bg-(--morphink-color-muted) border-(--morphink-border-width-default) border-(--morphink-color-border)',
      solid:
        'bg-(--morphink-color-card) border-(--morphink-border-width-default) border-(--morphink-color-border)',
      elevated:
        'bg-(--morphink-color-card) border-(--morphink-border-width-default) border-(--morphink-color-border)',
    },
    rounded: {
      none: 'rounded-none',
      sm: 'rounded-(--morphink-radius-sm)',
      md: 'rounded-(--morphink-radius-md)',
      lg: 'rounded-(--morphink-radius-lg)',
      xl: 'rounded-(--morphink-radius-xl)',
    },
    shadow: {
      none: '',
      sm: 'shadow-(--morphink-shadow-sm)',
      md: 'shadow-(--morphink-shadow-md)',
      lg: 'shadow-(--morphink-shadow-lg)',
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
    props.interactive
      ? 'cursor-pointer [transition-property:background-color] [transition-duration:var(--morphink-duration-fast)] [transition-timing-function:var(--morphink-easing-standard)] hover:bg-(--morphink-color-muted)'
      : null,
    attrs.class
  )
)
</script>

<template>
  <div data-morphink :class="classes">
    <slot />
  </div>
</template>
