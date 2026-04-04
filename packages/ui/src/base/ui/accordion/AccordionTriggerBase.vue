<script setup lang="ts">
import { computed, inject, ref } from 'vue'
import { AccordionHeader, AccordionTrigger } from 'reka-ui'
import { cva } from 'class-variance-authority'
import { cn } from '../../lib/utils'
import type { AccordionSize } from '../../lib/props'
import { accordionSizeKey } from './accordionContext'
import IconChevronDown from '../icons/IconChevronDown.vue'

const triggerVariants = cva(
  cn(
    'flex w-full items-center justify-between font-medium',
    '[transition-property:background-color]',
    '[transition-duration:var(--morphink-duration-fast)]',
    '[transition-timing-function:var(--morphink-easing-standard)]',
    'hover:bg-(--morphink-color-muted-hover)',
    '[&[data-disabled]]:opacity-(--morphink-opacity-disabled)',
    '[&[data-disabled]]:cursor-not-allowed'
  ),
  {
    variants: {
      size: {
        xs: 'px-3 py-1.5 text-xs',
        sm: 'px-3 py-2 text-sm',
        md: 'px-4 py-3 text-sm',
        lg: 'px-4 py-3.5 text-base',
        xl: 'px-5 py-4 text-base',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  }
)

const size = inject(accordionSizeKey, ref('md' as AccordionSize))

const triggerClasses = computed(() => cn(triggerVariants({ size: size.value })))
</script>

<template>
  <AccordionHeader asChild>
    <AccordionTrigger :class="triggerClasses">
      <slot />
      <IconChevronDown
        class="size-4 shrink-0 [transition-property:transform] [transition-duration:var(--morphink-duration-fast)] [transition-timing-function:var(--morphink-easing-standard)] [[data-state=open]_&]:rotate-180"
      />
    </AccordionTrigger>
  </AccordionHeader>
</template>
