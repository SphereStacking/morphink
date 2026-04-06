<script setup lang="ts">
import { computed, inject, ref } from 'vue'
import { DropdownMenuPortal, DropdownMenuSubContent } from 'reka-ui'
import { cva } from 'class-variance-authority'
import { cn } from '../../lib/utils'
import type { DropdownRounded, DropdownShadow, DropdownSize } from '../../lib/props'
import { dropdownSizeKey } from './dropdownContext'

const props = withDefaults(
  defineProps<{
    sideOffset?: number
    rounded?: DropdownRounded
    shadow?: DropdownShadow
  }>(),
  {
    sideOffset: 2,
    rounded: 'md',
    shadow: 'md',
  }
)

const size = inject(dropdownSizeKey, ref('md' as DropdownSize))

const contentVariants = cva(
  'z-dropdown border-(--morphink-border-width-default) border-(--morphink-color-border) bg-(--morphink-color-popover)',
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
        xs: 'p-0.5',
        sm: 'p-1',
        md: 'p-[6px]',
        lg: 'p-2',
        xl: 'p-2.5',
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
      size: size.value,
    })
  )
)
</script>

<template>
  <DropdownMenuPortal>
    <DropdownMenuSubContent
      data-morphink
      :side-offset="sideOffset"
      :class="contentClass"
      class="mi-dropdown-anim"
    >
      <slot />
    </DropdownMenuSubContent>
  </DropdownMenuPortal>
</template>

<style scoped>
@keyframes mi-dropdown-in {
  from {
    opacity: 0;
    translate: 0 -4px;
  }
}

@keyframes mi-dropdown-out {
  to {
    opacity: 0;
    translate: 0 4px;
  }
}

.mi-dropdown-anim[data-state='open'] {
  animation: mi-dropdown-in var(--morphink-motion-enter) both;
}
.mi-dropdown-anim[data-state='closed'] {
  animation: mi-dropdown-out var(--morphink-motion-leave) forwards;
}
</style>
