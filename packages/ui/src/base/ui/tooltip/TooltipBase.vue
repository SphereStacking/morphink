<template>
  <TooltipRoot
    :open="open"
    :delay-duration="delay"
    @update:open="handleOpenChange"
  >
    <TooltipTrigger as-child>
      <slot />
    </TooltipTrigger>
    <TooltipPortal>
      <TooltipContent :side="side" :align="align" :class="contentClass">
        <slot name="content">{{ content }}</slot>
      </TooltipContent>
    </TooltipPortal>
  </TooltipRoot>
</template>

<script setup lang="ts">
import { TooltipRoot, TooltipTrigger, TooltipContent, TooltipPortal } from 'reka-ui'
import { computed } from 'vue'
import { cva } from 'class-variance-authority'
import { cn } from '../../lib/utils'
import type { TooltipRounded, TooltipShadow } from '../../lib/props'

const props = withDefaults(
  defineProps<{
    content?: string
    open?: boolean
    onOpenChange?: (open: boolean) => void
    side?: 'top' | 'right' | 'bottom' | 'left'
    align?: 'start' | 'center' | 'end'
    delay?: number
    rounded?: TooltipRounded
    shadow?: TooltipShadow
  }>(),
  {
    side: 'top',
    align: 'center',
    delay: 200,
    rounded: 'md',
    shadow: 'md',
  }
)

const handleOpenChange = (value: boolean) => {
  props.onOpenChange?.(value)
}

const contentVariants = cva(
  'border-[var(--border-width-default)] border-[var(--color-border)] bg-[var(--color-popover)] px-2 py-1 text-[12px] text-[var(--color-popover-foreground)]',
  {
    variants: {
      rounded: {
        none: 'rounded-none',
        sm: 'rounded-[var(--radius-sm)]',
        md: 'rounded-[var(--radius-md)]',
        lg: 'rounded-[var(--radius-lg)]',
        xl: 'rounded-[var(--radius-xl)]',
      },
      shadow: {
        none: '',
        sm: 'shadow-[var(--shadow-sm)]',
        md: 'shadow-[var(--shadow-md)]',
        lg: 'shadow-[var(--shadow-lg)]',
      },
    },
    defaultVariants: {
      rounded: 'md',
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
