<script setup lang="ts">
import { computed, inject, ref } from 'vue'
import { DropdownMenuRadioItem, DropdownMenuItemIndicator } from 'reka-ui'
import { cn } from '../../lib/utils'
import type { DropdownSize } from '../../lib/props'
import { dropdownSizeKey } from './dropdownContext'

const props = withDefaults(
  defineProps<{
    value: string
    disabled?: boolean
    textValue?: string
  }>(),
  {
    disabled: false,
  }
)

const emit = defineEmits<{
  (e: 'select', event: Event): void
}>()

const size = inject(dropdownSizeKey, ref('md' as DropdownSize))

const sizeClasses: Record<DropdownSize, string> = {
  xs: 'py-0.5 px-1 text-[10px]',
  sm: 'py-1 px-1.5 text-xs',
  md: 'py-[6px] px-(--morphink-space-sm) text-[13px]',
  lg: 'py-2 px-3 text-sm',
  xl: 'py-2.5 px-3.5 text-base',
}

const indicatorSizes: Record<DropdownSize, string> = {
  xs: 'size-2.5',
  sm: 'size-3',
  md: 'size-3.5',
  lg: 'size-4',
  xl: 'size-5',
}

const classes = computed(() =>
  cn(
    'flex items-center gap-2 rounded-(--morphink-radius-sm) outline-hidden cursor-default',
    'text-(--morphink-color-foreground) focus:bg-(--morphink-color-muted)',
    sizeClasses[size.value],
    props.disabled && 'opacity-50 pointer-events-none'
  )
)
</script>

<template>
  <DropdownMenuRadioItem
    :value="value"
    :disabled="disabled"
    :text-value="textValue"
    :class="classes"
    @select="emit('select', $event)"
  >
    <DropdownMenuItemIndicator class="shrink-0">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        :class="indicatorSizes[size]"
      >
        <circle cx="12" cy="12" r="5" />
      </svg>
    </DropdownMenuItemIndicator>
    <slot />
  </DropdownMenuRadioItem>
</template>
