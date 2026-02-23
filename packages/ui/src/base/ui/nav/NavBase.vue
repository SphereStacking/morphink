<template>
  <nav :class="classes">
    <a
      v-for="item in items"
      :key="item.label"
      :href="item.href"
      :class="itemClass(item.active)"
    >
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
        sm: 'gap-[var(--space-sm)] px-[var(--space-sm)] py-[6px] text-[var(--font-size-caption)]',
        md: 'gap-[var(--space-md)] px-[var(--space-md)] py-[var(--space-sm)] text-[var(--font-size-body)]',
    },
    variant: {
      subtle:
        'bg-[var(--color-muted)] border-[var(--border-width-default)] border-[var(--color-border)]',
      solid:
        'bg-[var(--color-card)] border-[var(--border-width-default)] border-[var(--color-border)]',
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
    active ? 'text-[var(--color-accent)]' : 'text-[var(--color-muted-foreground)]',
    !active ? 'hover:text-[var(--color-accent)]' : null
  )
</script>
