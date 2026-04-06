<script setup lang="ts">
defineOptions({ inheritAttrs: false })

import { computed, useAttrs } from 'vue'
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
        caption:
          'text-(length:--morphink-font-size-caption) leading-(--morphink-font-line-height-caption)',
        label:
          'text-(length:--morphink-font-size-label) leading-(--morphink-font-line-height-label) tracking-[0.08em] uppercase',
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
    as?: string
  }>(),
  {
    variant: 'body',
    weight: 'regular',
    muted: false,
    as: 'p',
  }
)

const attrs = useAttrs()
const classes = computed(() =>
  cn(
    textVariants({
      variant: props.variant,
      weight: props.weight,
      muted: props.muted,
    }),
    attrs.class as string
  )
)
</script>

<template>
  <component :is="as" data-morphink v-bind="{ ...attrs, class: undefined }" :class="classes">
    <slot />
  </component>
</template>
