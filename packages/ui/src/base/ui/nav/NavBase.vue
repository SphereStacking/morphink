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
      sm: 'gap-(--space-sm) px-(--space-sm) py-[6px] text-(length:--font-size-caption)',
      md: 'gap-(--space-md) px-(--space-md) py-(--space-sm) text-(length:--font-size-body)',
    },
    variant: {
      subtle:
        'bg-(--color-muted) border-(--border-width-default) border-(--color-border)',
      solid:
        'bg-(--color-card) border-(--border-width-default) border-(--color-border)',
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
    active ? 'text-(--color-accent)' : 'text-(--color-muted-foreground)',
    !active ? 'hover:text-(--color-accent)' : null
  )
</script>
