<template>
  <p :class="classes">
    <slot />
  </p>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '../../lib/utils'

type Variant = 'body' | 'caption' | 'label'
type Weight = 'regular' | 'medium' | 'semibold' | 'bold'

const textVariants = cva(
  cn(
    'm-0 font-[var(--font-family-base)] leading-[var(--font-line-height-body)] text-[var(--color-foreground)]'
  ),
  {
    variants: {
      variant: {
        body: 'text-[var(--font-size-body)] leading-[var(--font-line-height-body)]',
        caption: 'text-[var(--font-size-caption)] leading-[var(--font-line-height-caption)]',
        label:
          'text-[var(--font-size-label)] leading-[var(--font-line-height-label)] uppercase tracking-[0.08em]',
      },
      weight: {
        regular: 'font-[var(--font-weight-regular)]',
        medium: 'font-[var(--font-weight-medium)]',
        semibold: 'font-[var(--font-weight-semibold)]',
        bold: 'font-[var(--font-weight-bold)]',
      },
      muted: {
        true: 'text-[var(--color-muted-foreground)]',
        false: null,
      },
    },
    defaultVariants: {
      variant: 'body',
      weight: 'regular',
      muted: false,
    },
  }
)

type TextVariants = VariantProps<typeof textVariants>
const props = withDefaults(
  defineProps<{
    variant?: TextVariants['variant']
    weight?: TextVariants['weight']
    muted?: boolean
  }>(),
  {
    variant: 'body',
    weight: 'regular',
    muted: false,
  }
)

const classes = computed(() =>
  textVariants({
    variant: props.variant,
    weight: props.weight,
    muted: props.muted,
  })
)
</script>
