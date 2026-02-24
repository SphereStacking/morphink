<script setup lang="ts">
defineOptions({ inheritAttrs: false })
import { computed, useAttrs } from 'vue'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '../../lib/utils'

type NavItem = {
  label: string
  href: string
  active?: boolean
}

import type { NavSize, NavVariant } from '../../lib/props'

const props = withDefaults(
  defineProps<{
    items: NavItem[]
    size?: NavSize
    variant?: NavVariant
  }>(),
  {
    size: 'md',
    variant: 'subtle',
  }
)

const attrs = useAttrs()
const navVariants = cva('inline-flex rounded-full', {
  variants: {
    size: {
      xs: 'gap-(--morphink-space-xs) px-(--morphink-space-xs) py-1 text-(length:--morphink-font-size-label)',
      sm: 'gap-(--morphink-space-sm) px-(--morphink-space-sm) py-[6px] text-(length:--morphink-font-size-caption)',
      md: 'gap-(--morphink-space-md) px-(--morphink-space-md) py-(--morphink-space-sm) text-(length:--morphink-font-size-body)',
      lg: 'gap-(--morphink-space-lg) px-(--morphink-space-lg) py-(--morphink-space-md) text-(length:--morphink-font-size-h5)',
      xl: 'gap-(--morphink-space-xl) px-(--morphink-space-xl) py-(--morphink-space-lg) text-(length:--morphink-font-size-h4)',
    },
    variant: {
      subtle:
        'bg-(--morphink-color-muted) border-(--morphink-border-width-default) border-(--morphink-color-border)',
      solid:
        'bg-(--morphink-color-card) border-(--morphink-border-width-default) border-(--morphink-color-border)',
    },
  },
  defaultVariants: {
    size: 'md',
    variant: 'subtle',
  },
})

type NavVariants = VariantProps<typeof navVariants>
const classes = computed(() =>
  cn(navVariants({ size: props.size, variant: props.variant }), attrs.class)
)

const itemClass = (active?: boolean) =>
  cn(
    'font-semibold transition',
    active ? 'text-(--morphink-color-accent)' : 'text-(--morphink-color-muted-foreground)',
    !active ? 'hover:text-(--morphink-color-accent)' : null
  )
</script>

<template>
  <nav :class="classes">
    <a v-for="item in items" :key="item.label" :href="item.href" :class="itemClass(item.active)">
      {{ item.label }}
    </a>
  </nav>
</template>
