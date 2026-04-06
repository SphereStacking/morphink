<script setup lang="ts">
import { computed, inject, ref } from 'vue'
import { DropdownMenuSubTrigger } from 'reka-ui'
import { cn } from '../../lib/utils'
import IconChevronRight from '../icons/IconChevronRight.vue'
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
    'flex cursor-default items-center justify-between gap-2 rounded-(--morphink-radius-sm) outline-hidden',
    'text-(--morphink-color-foreground) focus:bg-(--morphink-color-muted)',
    sizeClasses[size.value],
    props.disabled && 'pointer-events-none opacity-50'
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
    <IconChevronRight
      :class="['shrink-0 text-(--morphink-color-muted-foreground)', arrowSizes[size]]"
    />
  </DropdownMenuSubTrigger>
</template>
