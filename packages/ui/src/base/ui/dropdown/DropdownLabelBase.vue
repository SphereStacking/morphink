<script setup lang="ts">
import { inject, ref } from 'vue'
import { DropdownMenuLabel } from 'reka-ui'
import { cn } from '../../lib/utils'
import type { DropdownSize } from '../../lib/props'
import { dropdownSizeKey } from './dropdownContext'

const size = inject(dropdownSizeKey, ref('md' as DropdownSize))

const sizeClasses: Record<DropdownSize, string> = {
  xs: 'px-1 py-0.5 text-[9px]',
  sm: 'px-1.5 py-1 text-[10px]',
  md: 'px-(--morphink-space-sm) py-[6px] text-xs',
  lg: 'px-3 py-2 text-xs',
  xl: 'px-3.5 py-2.5 text-sm',
}
</script>

<template>
  <DropdownMenuLabel
    :class="cn('font-semibold text-(--morphink-color-muted-foreground)', sizeClasses[size])"
  >
    <slot />
  </DropdownMenuLabel>
</template>
