<template>
  <div :class="classes">
    <div v-if="$slots.header" class="px-(--space-lg) pt-(--space-lg)">
      <slot name="header" />
    </div>
    <div class="p-(--space-lg)">
      <slot />
    </div>
    <div v-if="$slots.footer" class="px-(--space-lg) pb-(--space-lg)">
      <slot name="footer" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, useAttrs } from 'vue'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '../../lib/utils'
import type { CardRounded, CardShadow, CardVariant } from '../../lib/props'

const cardVariants = cva(
  cn(
    'overflow-hidden border-(--border-width-default) border-(--color-border) bg-(--color-card)'
  ),
  {
    variants: {
      variant: {
        elevated: '',
        outline: '',
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
      variant: 'elevated',
      rounded: 'lg',
      shadow: 'md',
    },
  }
)

type CardVariants = VariantProps<typeof cardVariants>

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
    attrs.class
  )
)
</script>
