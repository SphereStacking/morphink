<script setup lang="ts">
import { computed, inject, ref } from 'vue'
import { AccordionItem } from 'reka-ui'
import { cva } from 'class-variance-authority'
import { cn } from '../../lib/utils'
import type { AccordionVariant } from '../../lib/props'
import { accordionVariantKey } from './accordionContext'

const itemVariants = cva('', {
  variants: {
    variant: {
      outline: 'overflow-hidden',
      ghost: 'rounded-(--morphink-radius-md)',
      soft: 'rounded-(--morphink-radius-md) bg-(--morphink-color-muted)',
    },
  },
  defaultVariants: {
    variant: 'outline',
  },
})

defineProps<{
  value: string
  disabled?: boolean
}>()

const variant = inject(accordionVariantKey, ref('outline' as AccordionVariant))

const itemClasses = computed(() => cn(itemVariants({ variant: variant.value })))
</script>

<template>
  <AccordionItem :value="value" :disabled="disabled" :class="itemClasses">
    <slot />
  </AccordionItem>
</template>
