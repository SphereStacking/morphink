<script setup lang="ts">
import {
  TooltipProvider,
  TooltipRoot,
  TooltipTrigger,
  TooltipContent,
  TooltipPortal,
  useForwardPropsEmits,
} from 'reka-ui'
import { computed } from 'vue'
import { cva } from 'class-variance-authority'
import { cn } from '../../lib/utils'
import type { TooltipRounded, TooltipShadow } from '../../lib/props'

const props = withDefaults(
  defineProps<{
    content?: string
    open?: boolean
    side?: 'top' | 'right' | 'bottom' | 'left'
    align?: 'start' | 'center' | 'end'
    delay?: number
    rounded?: TooltipRounded
    shadow?: TooltipShadow
  }>(),
  {
    open: undefined,
    side: 'top',
    align: 'center',
    delay: 200,
    rounded: 'md',
    shadow: 'md',
  }
)

const emit = defineEmits<{
  'update:open': [value: boolean]
}>()

const rekaProps = computed(() => ({
  ...(props.open !== undefined && { open: props.open }),
}))
const forwarded = useForwardPropsEmits(rekaProps, emit)

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

const translateMap: Record<string, string> = {
  bottom: '0 -4px',
  top: '0 4px',
  right: '-4px 0',
  left: '4px 0',
}
const tooltipStyle = computed(() => ({
  '--mi-popover-translate': translateMap[props.side] ?? '0 -4px',
}))
</script>

<template>
  <TooltipProvider :delay-duration="delay">
    <TooltipRoot v-bind="forwarded">
      <TooltipTrigger as-child>
        <slot />
      </TooltipTrigger>
      <TooltipPortal>
        <TooltipContent
          data-morphink
          :side="side"
          :align="align"
          :class="contentClass"
          :style="tooltipStyle"
          class="data-[state=delayed-open]:animate-[mi-popover-in_var(--morphink-duration-normal)_var(--morphink-easing-decelerate)_both] data-[state=closed]:animate-[mi-popover-out_var(--morphink-duration-fast)_var(--morphink-easing-accelerate)_forwards]"
        >
          <slot name="content">{{ content }}</slot>
        </TooltipContent>
      </TooltipPortal>
    </TooltipRoot>
  </TooltipProvider>
</template>
