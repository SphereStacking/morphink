<script setup lang="ts">
import { computed, useAttrs } from 'vue'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '../../lib/utils'

defineOptions({ inheritAttrs: false })

type Level = 1 | 2 | 3 | 4 | 5 | 6

const headingVariants = cva(
  cn(
    'm-0 font-(family-name:--morphink-font-family-base) leading-(--morphink-font-line-height-heading) text-(--morphink-color-foreground)'
  ),
  {
    variants: {
      level: {
        1: 'text-(length:--morphink-font-size-h1) font-(number:--morphink-font-weight-bold)',
        2: 'text-(length:--morphink-font-size-h2) font-(number:--morphink-font-weight-bold)',
        3: 'text-(length:--morphink-font-size-h3) font-(number:--morphink-font-weight-semibold)',
        4: 'text-(length:--morphink-font-size-h4) font-(number:--morphink-font-weight-semibold)',
        5: 'text-(length:--morphink-font-size-h5) font-(number:--morphink-font-weight-semibold)',
        6: 'text-(length:--morphink-font-size-h6) font-(number:--morphink-font-weight-semibold)',
      },
    },
    defaultVariants: {
      level: 2,
    },
  }
)

type HeadingVariants = VariantProps<typeof headingVariants>
const props = withDefaults(
  defineProps<{
    level?: HeadingVariants['level']
  }>(),
  {
    level: 2,
  }
)

const attrs = useAttrs()
const tag = computed(() => `h${props.level}`)
const classes = computed(() => cn(headingVariants({ level: props.level }), attrs.class))
</script>

<template>
  <component :is="tag" data-morphink :class="classes">
    <slot />
  </component>
</template>
