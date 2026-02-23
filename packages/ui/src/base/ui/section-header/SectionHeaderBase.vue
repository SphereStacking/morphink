<template>
  <div :class="classes">
    <div>
      <div :class="titleClass">
        <slot name="title" />
      </div>
      <div v-if="$slots.subtitle" class="mt-1 text-[var(--font-size-caption)] text-[var(--color-muted-foreground)]">
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
      sm: 'gap-[var(--space-md)]',
      md: 'gap-[var(--space-lg)]',
    },
  },
  defaultVariants: {
    size: 'md',
  },
})

const titleVariants = cva('font-semibold', {
  variants: {
    size: {
        sm: 'text-[var(--font-size-h5)]',
        md: 'text-[var(--font-size-h4)]',
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
