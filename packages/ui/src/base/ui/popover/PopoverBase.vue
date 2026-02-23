<template>
  <PopoverRoot :open="open" @update:open="handleOpenChange">
    <PopoverTrigger as-child>
      <slot name="trigger" />
    </PopoverTrigger>
    <PopoverPortal>
      <PopoverContent :side="side" :align="align" :class="contentClass">
        <slot name="content" />
      </PopoverContent>
    </PopoverPortal>
  </PopoverRoot>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { PopoverRoot, PopoverTrigger, PopoverContent, PopoverPortal } from 'reka-ui'
import { cva } from 'class-variance-authority'
import { cn } from '../../lib/utils'
import type { PopoverRounded, PopoverShadow } from '../../lib/props'

const props = withDefaults(
  defineProps<{
    open?: boolean
    onOpenChange?: (open: boolean) => void
    side?: 'top' | 'right' | 'bottom' | 'left'
    align?: 'start' | 'center' | 'end'
    rounded?: PopoverRounded
    shadow?: PopoverShadow
  }>(),
  {
    side: 'bottom',
    align: 'center',
    rounded: 'lg',
    shadow: 'md',
  }
)

const handleOpenChange = (value: boolean) => {
  props.onOpenChange?.(value)
}

const contentVariants = cva(
  'border-(--border-width-default) border-(--color-border) bg-(--color-popover) p-(--space-md)',
  {
    variants: {
      rounded: {
        none: 'rounded-none',
        sm: 'rounded-(--radius-sm)',
        md: 'rounded-(--radius-md)',
        lg: 'rounded-(--radius-lg)',
        xl: 'rounded-(--radius-xl)',
      },
      shadow: {
        none: '',
        sm: 'shadow-(--shadow-sm)',
        md: 'shadow-(--shadow-md)',
        lg: 'shadow-(--shadow-lg)',
      },
    },
    defaultVariants: {
      rounded: 'lg',
      shadow: 'md',
    },
  }
)
const contentClass = computed(() =>
  cn(
    contentVariants({
      rounded: props.rounded,
      shadow: props.shadow,
    })
  )
)
</script>
