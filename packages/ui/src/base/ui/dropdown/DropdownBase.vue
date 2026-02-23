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
  'border-(--border-width-default) border-(--color-border) bg-(--color-popover) p-[6px]',
  {
    variants: {
      rounded: {
        none: 'rounded-none',
        sm: 'rounded-(--radius-sm)',
        md: 'rounded-(--radius-md)',
        lg: 'rounded-(--radius-lg)',
        xl: 'rounded-(--radius-xl)',
      },
      shadow: {
        none: '',
        sm: 'shadow-(--shadow-sm)',
        md: 'shadow-(--shadow-md)',
        lg: 'shadow-(--shadow-lg)',
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
    ? 'rounded-(--radius-sm) px-(--space-sm) py-[6px] text-[13px] text-(--color-destructive) focus:bg-(--color-muted) outline-hidden'
    : 'rounded-(--radius-sm) px-(--space-sm) py-[6px] text-[13px] text-(--color-foreground) focus:bg-(--color-muted) outline-hidden'
</script>
