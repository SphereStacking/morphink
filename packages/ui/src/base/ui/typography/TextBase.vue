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
    'm-0 font-(family-name:--font-family-base) leading-(--font-line-height-body) text-(--color-foreground)'
  ),
  {
    variants: {
      variant: {
        body: 'text-(length:--font-size-body) leading-(--font-line-height-body)',
        caption: 'text-(length:--font-size-caption) leading-(--font-line-height-caption)',
        label:
          'text-(length:--font-size-label) leading-(--font-line-height-label) uppercase tracking-[0.08em]',
      },
      weight: {
        regular: 'font-(number:--font-weight-regular)',
        medium: 'font-(number:--font-weight-medium)',
        semibold: 'font-(number:--font-weight-semibold)',
        bold: 'font-(number:--font-weight-bold)',
      },
      muted: {
        true: 'text-(--color-muted-foreground)',
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
