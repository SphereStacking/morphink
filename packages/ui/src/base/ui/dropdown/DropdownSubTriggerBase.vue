<script setup lang="ts">
import { computed, inject, ref } from 'vue'
import { DropdownMenuSubTrigger } from 'reka-ui'
import { cn } from '../../lib/utils'
import type { DropdownSize } from '../../lib/props'
import { dropdownSizeKey } from './dropdownContext'

const props = withDefaults(
  defineProps<{
    disabled?: boolean
    textValue?: string
  }>(),
  {
    disabled: false,
  }
)

const size = inject(dropdownSizeKey, ref('md' as DropdownSize))

const sizeClasses: Record<DropdownSize, string> = {
  xs: 'py-0.5 px-1 text-[10px]',
  sm: 'py-1 px-1.5 text-xs',
  md: 'py-[6px] px-(--morphink-space-sm) text-[13px]',
  lg: 'py-2 px-3 text-sm',
  xl: 'py-2.5 px-3.5 text-base',
}

const arrowSizes: Record<DropdownSize, string> = {
  xs: 'size-2.5',
  sm: 'size-3',
  md: 'size-3.5',
  lg: 'size-4',
  xl: 'size-5',
}

const classes = computed(() =>
  cn(
    'flex items-center justify-between gap-2 rounded-(--morphink-radius-sm) outline-hidden cursor-default',
    'text-(--morphink-color-foreground) focus:bg-(--morphink-color-muted)',
    sizeClasses[size.value],
    props.disabled && 'opacity-50 pointer-events-none'
  )
)
</script>

<template>
  <DropdownMenuSubTrigger :disabled="disabled" :text-value="textValue" :class="classes">
    <span class="flex items-center gap-2">
      <span v-if="$slots.icon" class="shrink-0">
        <slot name="icon" />
      </span>
      <slot />
    </span>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      :class="['shrink-0 text-(--morphink-color-muted-foreground)', arrowSizes[size]]"
    >
      <polyline points="9 18 15 12 9 6" />
    </svg>
  </DropdownMenuSubTrigger>
</template>
