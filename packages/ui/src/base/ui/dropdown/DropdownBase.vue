<template>
  <DropdownMenuRoot :open="open" @update:open="handleOpenChange">
    <DropdownMenuTrigger as-child>
      <slot name="trigger" />
    </DropdownMenuTrigger>
    <DropdownMenuPortal>
      <DropdownMenuContent :side="side" :align="align" :class="contentClass">
        <slot name="content">
          <DropdownMenuItem
            v-for="item in items"
            :key="item.value"
            :disabled="item.disabled"
            :class="itemClass(item.danger)"
            @select="handleSelect(item.value)"
          >
            {{ item.label }}
          </DropdownMenuItem>
        </slot>
      </DropdownMenuContent>
    </DropdownMenuPortal>
  </DropdownMenuRoot>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import {
  DropdownMenuRoot,
  DropdownMenuTrigger,
  DropdownMenuPortal,
  DropdownMenuContent,
  DropdownMenuItem,
} from 'reka-ui'
import { cva } from 'class-variance-authority'
import { cn } from '../../lib/utils'
import type { DropdownRounded, DropdownShadow } from '../../lib/props'

type Item = {
  label: string
  value: string
  disabled?: boolean
  danger?: boolean
}

const props = withDefaults(
  defineProps<{
    items?: Item[]
    open?: boolean
    onOpenChange?: (open: boolean) => void
    onSelect?: (value: string) => void
    side?: 'top' | 'right' | 'bottom' | 'left'
    align?: 'start' | 'center' | 'end'
    rounded?: DropdownRounded
    shadow?: DropdownShadow
  }>(),
  {
    items: () => [],
    side: 'bottom',
    align: 'start',
    rounded: 'md',
    shadow: 'md',
  }
)

const handleOpenChange = (value: boolean) => {
  props.onOpenChange?.(value)
}

const handleSelect = (value: string) => {
  props.onSelect?.(value)
}

const contentVariants = cva(
  'border-[var(--border-width-default)] border-[var(--color-border)] bg-[var(--color-popover)] p-[6px]',
  {
    variants: {
      rounded: {
        none: 'rounded-none',
        sm: 'rounded-[var(--radius-sm)]',
        md: 'rounded-[var(--radius-md)]',
        lg: 'rounded-[var(--radius-lg)]',
        xl: 'rounded-[var(--radius-xl)]',
      },
      shadow: {
        none: '',
        sm: 'shadow-[var(--shadow-sm)]',
        md: 'shadow-[var(--shadow-md)]',
        lg: 'shadow-[var(--shadow-lg)]',
      },
    },
    defaultVariants: {
      rounded: 'md',
      shadow: 'md',
    },
  }
)
const contentClass = computed(() =>
  cn(
    contentVariants({
      rounded: props.rounded,
      shadow: props.shadow,
    })
  )
)

const itemClass = (danger?: boolean) =>
  danger
    ? 'rounded-[var(--radius-sm)] px-[var(--space-sm)] py-[6px] text-[13px] text-[var(--color-destructive)] focus:bg-[var(--color-muted)] outline-none'
    : 'rounded-[var(--radius-sm)] px-[var(--space-sm)] py-[6px] text-[13px] text-[var(--color-foreground)] focus:bg-[var(--color-muted)] outline-none'
</script>
