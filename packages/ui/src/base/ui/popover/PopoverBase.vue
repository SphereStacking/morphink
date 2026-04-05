<script setup lang="ts">
import { computed } from 'vue'
import {
  PopoverRoot,
  PopoverTrigger,
  PopoverContent,
  PopoverPortal,
  useForwardPropsEmits,
} from 'reka-ui'
import { cva } from 'class-variance-authority'
import { cn } from '../../lib/utils'
import type { PopoverRounded, PopoverShadow } from '../../lib/props'

const props = withDefaults(
  defineProps<{
    open?: boolean
    side?: 'top' | 'right' | 'bottom' | 'left'
    align?: 'start' | 'center' | 'end'
    rounded?: PopoverRounded
    shadow?: PopoverShadow
  }>(),
  {
    open: undefined,
    side: 'bottom',
    align: 'center',
    rounded: 'lg',
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
  'border-(--morphink-border-width-default) border-(--morphink-color-border) bg-(--morphink-color-popover) p-(--morphink-space-md)',
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

const translateMap: Record<string, string> = {
  bottom: '0 -4px',
  top: '0 4px',
  right: '-4px 0',
  left: '4px 0',
}
const popoverStyle = computed(() => ({
  '--mi-popover-translate': translateMap[props.side] ?? '0 -4px',
}))
</script>

<template>
  <PopoverRoot v-bind="forwarded">
    <PopoverTrigger as-child>
      <slot name="trigger" />
    </PopoverTrigger>
    <PopoverPortal>
      <PopoverContent
        data-morphink
        :side="side"
        :align="align"
        :class="contentClass"
        :style="popoverStyle"
        class="mi-popover-anim"
      >
        <slot name="content" />
      </PopoverContent>
    </PopoverPortal>
  </PopoverRoot>
</template>

<style scoped>
@keyframes mi-popover-in {
  from {
    opacity: 0;
    scale: 0.96;
    translate: var(--mi-popover-translate, 0 -4px);
  }
}

@keyframes mi-popover-out {
  to {
    opacity: 0;
    scale: 0.96;
    translate: var(--mi-popover-translate, 0 -4px);
  }
}

.mi-popover-anim[data-state="open"] {
  animation: mi-popover-in var(--morphink-motion-enter) both;
}
.mi-popover-anim[data-state="closed"] {
  animation: mi-popover-out var(--morphink-motion-leave) forwards;
}
</style>
