<template>
  <nav :class="classes">
    <a v-for="item in items" :key="item.label" :href="item.href" :class="itemClass(item.active)">
      {{ item.label }}
    </a>
  </nav>
</template>

<script setup lang="ts">
import { computed, useAttrs } from 'vue'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '../../lib/utils'

type NavItem = {
  label: string
  href: string
  active?: boolean
}

const props = withDefaults(
  defineProps<{
    items: NavItem[]
    size?: 'sm' | 'md'
    variant?: 'subtle' | 'solid'
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
      sm: 'gap-(--morphink-space-sm) px-(--morphink-space-sm) py-[6px] text-(length:--morphink-font-size-caption)',
      md: 'gap-(--morphink-space-md) px-(--morphink-space-md) py-(--morphink-space-sm) text-(length:--morphink-font-size-body)',
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
