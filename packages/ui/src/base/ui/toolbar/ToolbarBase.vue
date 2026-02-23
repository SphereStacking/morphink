<template>
  <div :class="classes">
    <div class="font-semibold">
      <slot name="title" />
    </div>
    <div class="inline-flex gap-(--morphink-space-sm)">
      <slot name="actions" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, useAttrs } from 'vue'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '../../lib/utils'
import type { ToolbarSize, ToolbarVariant } from '../../lib/props'

const toolbarVariants = cva('flex items-center justify-between gap-(--morphink-space-lg)', {
  variants: {
    size: {
      sm: 'px-(--morphink-space-md) py-(--morphink-space-sm) text-(length:--morphink-font-size-caption)',
      md: 'px-(--morphink-space-lg) py-(--morphink-space-md) text-(length:--morphink-font-size-body)',
      lg: 'px-(--morphink-space-xl) py-(--morphink-space-lg) text-(length:--morphink-font-size-h5)',
    },
    variant: {
      solid:
        'bg-(--morphink-color-card) border-(--morphink-border-width-default) border-(--morphink-color-border)',
      subtle:
        'bg-(--morphink-color-muted) border-(--morphink-border-width-default) border-(--morphink-color-border)',
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
    'rounded-(--morphink-radius-lg)',
    attrs.class
  )
)
</script>
