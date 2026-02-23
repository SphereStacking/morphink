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
    'm-0 font-(family-name:--morphink-font-family-base) leading-(--morphink-font-line-height-body) text-(--morphink-color-foreground)'
  ),
  {
    variants: {
      variant: {
        body: 'text-(length:--morphink-font-size-body) leading-(--morphink-font-line-height-body)',
        caption: 'text-(length:--morphink-font-size-caption) leading-(--morphink-font-line-height-caption)',
        label:
          'text-(length:--morphink-font-size-label) leading-(--morphink-font-line-height-label) uppercase tracking-[0.08em]',
      },
      weight: {
        regular: 'font-(number:--morphink-font-weight-regular)',
        medium: 'font-(number:--morphink-font-weight-medium)',
        semibold: 'font-(number:--morphink-font-weight-semibold)',
        bold: 'font-(number:--morphink-font-weight-bold)',
      },
      muted: {
        true: 'text-(--morphink-color-muted-foreground)',
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
