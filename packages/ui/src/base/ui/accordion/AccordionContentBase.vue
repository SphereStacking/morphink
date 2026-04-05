<script setup lang="ts">
import { computed, inject, ref } from 'vue'
import { AccordionContent } from 'reka-ui'
import { cva } from 'class-variance-authority'
import { cn } from '../../lib/utils'
import type { AccordionSize, AccordionDuration, AccordionEasing } from '../../lib/props'
import { accordionSizeKey } from './accordionContext'

const innerVariants = cva('min-h-0 overflow-hidden', {
  variants: {
    size: {
      xs: 'px-3 pb-2',
      sm: 'px-3 pb-2.5',
      md: 'px-4 pb-3',
      lg: 'px-4 pb-3.5',
      xl: 'px-5 pb-4',
    },
  },
  defaultVariants: {
    size: 'md',
  },
})

const size = inject(accordionSizeKey, ref('md' as AccordionSize))

const props = withDefaults(
  defineProps<{
    duration?: AccordionDuration
    easing?: AccordionEasing
  }>(),
  {
    duration: 'normal',
    easing: 'standard',
  }
)

const durationMap: Record<AccordionDuration, string> = {
  instant: 'var(--morphink-duration-instant)',
  fast: 'var(--morphink-duration-fast)',
  normal: 'var(--morphink-duration-normal)',
  slow: 'var(--morphink-duration-slow)',
  slower: 'var(--morphink-duration-slower)',
}

const easingMap: Record<AccordionEasing, string> = {
  standard: 'var(--morphink-easing-standard)',
  decelerate: 'var(--morphink-easing-decelerate)',
  accelerate: 'var(--morphink-easing-accelerate)',
  'emphasized-decelerate': 'var(--morphink-easing-emphasized-decelerate)',
  'emphasized-accelerate': 'var(--morphink-easing-emphasized-accelerate)',
  linear: 'var(--morphink-easing-linear)',
  spring: 'var(--morphink-easing-spring)',
}

const innerClasses = computed(() => cn(innerVariants({ size: size.value })))
</script>

<template>
  <AccordionContent
    data-morphink
    class="grid data-[state=open]:grid-rows-[1fr] data-[state=closed]:grid-rows-[0fr] [transition-property:grid-template-rows]"
    :style="{ transitionDuration: durationMap[props.duration], transitionTimingFunction: easingMap[props.easing] }"
  >
    <div
      :class="innerClasses"
      class="[[data-state=closed]_&]:opacity-0 [[data-state=open]_&]:opacity-100 [transition-property:opacity]"
      :style="{ transitionDuration: durationMap[props.duration], transitionTimingFunction: easingMap[props.easing] }"
    >
      <slot />
    </div>
  </AccordionContent>
</template>
