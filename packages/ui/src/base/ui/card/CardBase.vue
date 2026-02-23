<template>
  <div :class="classes">
    <div v-if="$slots.header" class="px-[var(--space-lg)] pt-[var(--space-lg)]">
      <slot name="header" />
    </div>
    <div class="p-[var(--space-lg)]">
      <slot />
    </div>
    <div v-if="$slots.footer" class="px-[var(--space-lg)] pb-[var(--space-lg)]">
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
    'overflow-hidden border-[var(--border-width-default)] border-[var(--color-border)] bg-[var(--color-card)]'
  ),
  {
    variants: {
      variant: {
        elevated: '',
        outline: '',
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
