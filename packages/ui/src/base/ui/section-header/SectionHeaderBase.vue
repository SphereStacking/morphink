<script setup lang="ts">
import { computed, useAttrs } from 'vue'
import { cva } from 'class-variance-authority'
import { cn } from '../../lib/utils'

defineOptions({ inheritAttrs: false })

import type { SectionHeaderSize } from '../../lib/props'

const headerVariants = cva('flex items-center justify-between', {
  variants: {
    size: {
      xs: 'gap-(--morphink-space-sm)',
      sm: 'gap-(--morphink-space-md)',
      md: 'gap-(--morphink-space-lg)',
      lg: 'gap-(--morphink-space-xl)',
      xl: 'gap-(--morphink-space-2xl)',
    },
  },
  defaultVariants: {
    size: 'md',
  },
})

const titleVariants = cva('font-semibold', {
  variants: {
    size: {
      xs: 'text-(length:--morphink-font-size-h6)',
      sm: 'text-(length:--morphink-font-size-h5)',
      md: 'text-(length:--morphink-font-size-h4)',
      lg: 'text-(length:--morphink-font-size-h3)',
      xl: 'text-(length:--morphink-font-size-h2)',
    },
  },
  defaultVariants: {
    size: 'md',
  },
})

const props = withDefaults(
  defineProps<{
    size?: SectionHeaderSize
  }>(),
  {
    size: 'md',
  }
)

const attrs = useAttrs()
const classes = computed(() => cn(headerVariants({ size: props.size }), attrs.class))
const titleClass = computed(() => titleVariants({ size: props.size }))
</script>

<template>
  <div data-morphink :class="classes">
    <div>
      <div :class="titleClass">
        <slot name="title" />
      </div>
      <div
        v-if="$slots.subtitle"
        class="mt-1 text-(length:--morphink-font-size-caption) text-(--morphink-color-muted-foreground)"
      >
        <slot name="subtitle" />
      </div>
    </div>
    <div v-if="$slots.action">
      <slot name="action" />
    </div>
  </div>
</template>
