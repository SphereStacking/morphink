<script setup lang="ts">
import { computed, provide, toRef } from 'vue'
import { AccordionRoot, useForwardPropsEmits } from 'reka-ui'
import { cva } from 'class-variance-authority'
import { cn } from '../../lib/utils'
import type { AccordionSize, AccordionVariant } from '../../lib/props'
import { accordionSizeKey, accordionVariantKey } from './accordionContext'

const accordionVariants = cva('', {
  variants: {
    variant: {
      outline:
        'divide-y divide-(--morphink-color-border) border border-(--morphink-color-border) rounded-(--morphink-radius-md)',
      ghost: 'space-y-1',
      soft: 'space-y-1',
    },
  },
  defaultVariants: {
    variant: 'outline',
  },
})

const props = withDefaults(
  defineProps<{
    type?: 'single' | 'multiple'
    modelValue?: string | string[]
    defaultValue?: string | string[]
    collapsible?: boolean
    disabled?: boolean
    size?: AccordionSize
    variant?: AccordionVariant
  }>(),
  {
    type: 'single',
    collapsible: true,
    size: 'md',
    variant: 'outline',
  }
)

const emit = defineEmits<{
  (e: 'update:modelValue', value: string | string[]): void
}>()

const rekaProps = computed(() => ({
  type: props.type,
  ...(props.modelValue !== undefined && { modelValue: props.modelValue }),
  ...(props.defaultValue !== undefined && { defaultValue: props.defaultValue }),
  collapsible: props.collapsible,
  disabled: props.disabled,
}))

const forwarded = useForwardPropsEmits(rekaProps, emit)

provide(accordionSizeKey, toRef(props, 'size'))
provide(accordionVariantKey, toRef(props, 'variant'))

const rootClasses = computed(() => cn(accordionVariants({ variant: props.variant })))
</script>

<template>
  <AccordionRoot data-morphink v-bind="forwarded" :class="rootClasses">
    <slot />
  </AccordionRoot>
</template>
