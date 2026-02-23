<script setup lang="ts">
import { computed, provide, toRef } from 'vue'
import { DropdownMenuPortal, DropdownMenuContent } from 'reka-ui'
import { cva } from 'class-variance-authority'
import { cn } from '../../lib/utils'
import type { DropdownRounded, DropdownShadow, DropdownSize } from '../../lib/props'
import { dropdownSizeKey } from './dropdownContext'

const props = withDefaults(
  defineProps<{
    side?: 'top' | 'right' | 'bottom' | 'left'
    align?: 'start' | 'center' | 'end'
    sideOffset?: number
    rounded?: DropdownRounded
    shadow?: DropdownShadow
    size?: DropdownSize
  }>(),
  {
    side: 'bottom',
    align: 'start',
    sideOffset: 4,
    rounded: 'md',
    shadow: 'md',
    size: 'md',
  }
)

provide(dropdownSizeKey, toRef(props, 'size'))

const contentVariants = cva(
  'border-(--morphink-border-width-default) border-(--morphink-color-border) bg-(--morphink-color-popover)',
  {
    variants: {
      rounded: {
        none: 'rounded-none',
        sm: 'rounded-(--morphink-radius-sm)',
        md: 'rounded-(--morphink-radius-md)',
        lg: 'rounded-(--morphink-radius-lg)',
        xl: 'rounded-(--morphink-radius-xl)',
      },
      shadow: {
        none: '',
        sm: 'shadow-(--morphink-shadow-sm)',
        md: 'shadow-(--morphink-shadow-md)',
        lg: 'shadow-(--morphink-shadow-lg)',
      },
      size: {
        sm: 'p-1',
        md: 'p-[6px]',
        lg: 'p-2',
      },
    },
    defaultVariants: {
      rounded: 'md',
      shadow: 'md',
      size: 'md',
    },
  }
)

const contentClass = computed(() =>
  cn(
    contentVariants({
      rounded: props.rounded,
      shadow: props.shadow,
      size: props.size,
    })
  )
)
</script>

<template>
  <DropdownMenuPortal>
    <DropdownMenuContent
      :side="side"
      :align="align"
      :side-offset="sideOffset"
      :class="contentClass"
    >
      <slot />
    </DropdownMenuContent>
  </DropdownMenuPortal>
</template>
