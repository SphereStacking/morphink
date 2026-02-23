<template>
  <TooltipRoot :open="open" :delay-duration="delay" @update:open="handleOpenChange">
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
  'border-(--morphink-border-width-default) border-(--morphink-color-border) bg-(--morphink-color-popover) px-2 py-1 text-[12px] text-(--morphink-color-popover-foreground)',
  {
    variants: {
      rounded: {
        none: 'rounded-none',
        sm: 'rounded-(--morphink-radius-sm)',
        md: 'rounded-(--morphink-radius-md)',
        lg: 'rounded-(--morphink-radius-lg)',
        xl: 'rounded-(--morphink-radius-xl)',
      },
      shadow: {
        none: '',
        sm: 'shadow-(--morphink-shadow-sm)',
        md: 'shadow-(--morphink-shadow-md)',
        lg: 'shadow-(--morphink-shadow-lg)',
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
