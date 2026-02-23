<template>
  <div :class="classes">
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

<script setup lang="ts">
import { computed } from 'vue'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '../../lib/utils'

const headerVariants = cva('flex items-center justify-between', {
  variants: {
    size: {
      sm: 'gap-(--morphink-space-md)',
      md: 'gap-(--morphink-space-lg)',
    },
  },
  defaultVariants: {
    size: 'md',
  },
})

const titleVariants = cva('font-semibold', {
  variants: {
    size: {
      sm: 'text-(length:--morphink-font-size-h5)',
      md: 'text-(length:--morphink-font-size-h4)',
    },
  },
  defaultVariants: {
    size: 'md',
  },
})

type HeaderVariants = VariantProps<typeof headerVariants>
const props = withDefaults(
  defineProps<{
    size?: HeaderVariants['size']
  }>(),
  {
    size: 'md',
  }
)

const classes = computed(() => headerVariants({ size: props.size }))
const titleClass = computed(() => titleVariants({ size: props.size }))
</script>
