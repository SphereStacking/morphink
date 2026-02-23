<template>
  <component :is="tag" :class="classes">
    <slot />
  </component>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '../../lib/utils'

type Level = 1 | 2 | 3 | 4 | 5 | 6

const headingVariants = cva(
  cn(
    'm-0 font-[var(--font-family-base)] leading-[var(--font-line-height-heading)] text-[var(--color-foreground)]'
  ),
  {
    variants: {
      level: {
        1: 'text-[var(--font-size-h1)] font-[var(--font-weight-bold)]',
        2: 'text-[var(--font-size-h2)] font-[var(--font-weight-bold)]',
        3: 'text-[var(--font-size-h3)] font-[var(--font-weight-semibold)]',
        4: 'text-[var(--font-size-h4)] font-[var(--font-weight-semibold)]',
        5: 'text-[var(--font-size-h5)] font-[var(--font-weight-semibold)]',
        6: 'text-[var(--font-size-h6)] font-[var(--font-weight-semibold)]',
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

const tag = computed(() => `h${props.level}`)
const classes = computed(() => headingVariants({ level: props.level }))
</script>
