<script setup lang="ts">
defineOptions({ inheritAttrs: false })
import { computed, useAttrs } from 'vue'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '../../lib/utils'
import type { ToolbarSize, ToolbarVariant } from '../../lib/props'

const toolbarVariants = cva('flex items-center justify-between gap-(--morphink-space-lg)', {
  variants: {
    size: {
      xs: 'px-(--morphink-space-sm) py-(--morphink-space-xs) text-(length:--morphink-font-size-label)',
      sm: 'px-(--morphink-space-md) py-(--morphink-space-sm) text-(length:--morphink-font-size-caption)',
      md: 'px-(--morphink-space-lg) py-(--morphink-space-md) text-(length:--morphink-font-size-body)',
      lg: 'px-(--morphink-space-xl) py-(--morphink-space-lg) text-(length:--morphink-font-size-h5)',
      xl: 'px-(--morphink-space-2xl) py-(--morphink-space-xl) text-(length:--morphink-font-size-h4)',
    },
    variant: {
      solid:
        'border-(--morphink-border-width-default) border-(--morphink-color-border) bg-(--morphink-color-card)',
      subtle:
        'border-(--morphink-border-width-default) border-(--morphink-color-border) bg-(--morphink-color-muted)',
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

<template>
  <div data-morphink :class="classes">
    <div class="font-semibold">
      <slot name="title" />
    </div>
    <div class="inline-flex gap-(--morphink-space-sm)">
      <slot name="actions" />
    </div>
  </div>
</template>
