<template>
  <div :class="classes">
    <div class="font-semibold">
      <slot name="title" />
    </div>
    <div class="inline-flex gap-(--space-sm)">
      <slot name="actions" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, useAttrs } from 'vue'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '../../lib/utils'
import type { ToolbarSize, ToolbarVariant } from '../../lib/props'

const toolbarVariants = cva('flex items-center justify-between gap-(--space-lg)', {
  variants: {
    size: {
      sm: 'px-(--space-md) py-(--space-sm) text-(length:--font-size-caption)',
      md: 'px-(--space-lg) py-(--space-md) text-(length:--font-size-body)',
      lg: 'px-(--space-xl) py-(--space-lg) text-(length:--font-size-h5)',
    },
    variant: {
      solid:
        'bg-(--color-card) border-(--border-width-default) border-(--color-border)',
      subtle:
        'bg-(--color-muted) border-(--border-width-default) border-(--color-border)',
    },
  },
  defaultVariants: {
    size: 'md',
    variant: 'solid',
  },
})

type ToolbarVariants = VariantProps<typeof toolbarVariants>

const props = withDefaults(
  defineProps<{
    size?: ToolbarSize
    variant?: ToolbarVariant
  }>(),
  {
    size: 'md',
    variant: 'solid',
  }
)

const attrs = useAttrs()
const classes = computed(() =>
  cn(
    toolbarVariants({ size: props.size, variant: props.variant }),
    'rounded-(--radius-lg)',
    attrs.class
  )
)
</script>
