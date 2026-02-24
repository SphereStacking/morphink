<script setup lang="ts">
import { computed, inject, ref } from 'vue'
import { DropdownMenuCheckboxItem, DropdownMenuItemIndicator } from 'reka-ui'
import { cn } from '../../lib/utils'
import type { DropdownSize } from '../../lib/props'
import { dropdownSizeKey } from './dropdownContext'

const props = withDefaults(
  defineProps<{
    modelValue?: boolean | 'indeterminate'
    disabled?: boolean
    textValue?: string
  }>(),
  {
    modelValue: false,
    disabled: false,
  }
)

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void
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
  <DropdownMenuCheckboxItem
    :model-value="modelValue"
    :disabled="disabled"
    :text-value="textValue"
    :class="classes"
    @update:model-value="emit('update:modelValue', $event)"
    @select="emit('select', $event)"
  >
    <DropdownMenuItemIndicator class="shrink-0">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        :class="indicatorSizes[size]"
      >
        <polyline points="20 6 9 17 4 12" />
      </svg>
    </DropdownMenuItemIndicator>
    <slot />
  </DropdownMenuCheckboxItem>
</template>
