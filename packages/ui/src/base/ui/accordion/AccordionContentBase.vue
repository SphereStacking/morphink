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
    class="overflow-hidden mi-accordion-anim"
    :style="{ '--mi-acc-dur': durationMap[props.duration], '--mi-acc-ease': easingMap[props.easing] } as any"
  >
    <div :class="innerClasses">
      <slot />
    </div>
  </AccordionContent>
</template>

<style scoped>
.mi-accordion-anim[data-state="open"] {
  animation: mi-accordion-expand var(--mi-acc-dur) var(--mi-acc-ease) both;
}
.mi-accordion-anim[data-state="closed"] {
  animation: mi-accordion-collapse var(--mi-acc-dur) var(--mi-acc-ease) both;
}

@keyframes mi-accordion-expand {
  from {
    height: 0;
    opacity: 0;
  }
  to {
    height: var(--reka-collapsible-content-height);
    opacity: 1;
  }
}

@keyframes mi-accordion-collapse {
  from {
    height: var(--reka-collapsible-content-height);
    opacity: 1;
  }
  to {
    height: 0;
    opacity: 0;
  }
}
</style>
