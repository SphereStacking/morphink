<template>
  <div :class="classes">
    <div class="font-semibold">
      <slot name="title" />
    </div>
    <div class="inline-flex gap-[var(--space-sm)]">
      <slot name="actions" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, useAttrs } from 'vue'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '../../lib/utils'
import type { ToolbarSize, ToolbarVariant } from '../../lib/props'

const toolbarVariants = cva(
  'flex items-center justify-between gap-[var(--space-lg)]',
  {
    variants: {
      size: {
        sm: 'px-[var(--space-md)] py-[var(--space-sm)] text-[var(--font-size-caption)]',
        md: 'px-[var(--space-lg)] py-[var(--space-md)] text-[var(--font-size-body)]',
        lg: 'px-[var(--space-xl)] py-[var(--space-lg)] text-[var(--font-size-h5)]',
      },
    variant: {
      solid:
        'bg-[var(--color-card)] border-[var(--border-width-default)] border-[var(--color-border)]',
      subtle:
        'bg-[var(--color-muted)] border-[var(--border-width-default)] border-[var(--color-border)]',
    },
    },
    defaultVariants: {
      size: 'md',
      variant: 'solid',
    },
  }
)

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
    'rounded-[var(--radius-lg)]',
    attrs.class
  )
)
</script>
