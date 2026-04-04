<script setup lang="ts">
import { computed, inject, ref } from 'vue'
import { AccordionContent } from 'reka-ui'
import { cva } from 'class-variance-authority'
import { cn } from '../../lib/utils'
import type { AccordionSize } from '../../lib/props'
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

const innerClasses = computed(() => cn(innerVariants({ size: size.value })))
</script>

<template>
  <AccordionContent
    class="grid data-[state=open]:grid-rows-[1fr] data-[state=closed]:grid-rows-[0fr] [transition-property:grid-template-rows] [transition-duration:var(--morphink-duration-normal)] [transition-timing-function:var(--morphink-easing-standard)]"
  >
    <div :class="innerClasses">
      <slot />
    </div>
  </AccordionContent>
</template>
