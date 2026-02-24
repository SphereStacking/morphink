<script setup lang="ts">
defineOptions({ inheritAttrs: false })
import { computed, useAttrs } from 'vue'
import { cva } from 'class-variance-authority'
import { cn } from '../../lib/utils'
import type { CardRounded, CardShadow, CardVariant } from '../../lib/props'

const cardVariants = cva(
  cn(
    'overflow-hidden border-(--morphink-border-width-default) bg-(--morphink-color-card)'
  ),
  {
    variants: {
      variant: {
        elevated: 'border-(--morphink-color-border)',
        outline: 'border-(--morphink-color-border) shadow-none',
        ghost:
          'border-transparent bg-transparent hover:bg-(--morphink-color-muted)',
        soft: 'border-transparent bg-(--morphink-color-muted)',
        interactive:
          'border-(--morphink-color-border) cursor-pointer transition-shadow hover:shadow-(--morphink-shadow-lg)',
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
      variant: 'elevated',
      rounded: 'lg',
      shadow: 'md',
    },
  }
)

const props = withDefaults(
  defineProps<{
    variant?: CardVariant
    rounded?: CardRounded
    shadow?: CardShadow
  }>(),
  {
    variant: 'elevated',
    rounded: 'lg',
    shadow: 'md',
  }
)

const attrs = useAttrs()
const classes = computed(() =>
  cn(
    cardVariants({
      variant: props.variant,
      rounded: props.rounded,
      shadow: props.shadow,
    }),
    attrs.class as string
  )
)
</script>

<template>
  <div :class="classes">
    <slot />
  </div>
</template>
