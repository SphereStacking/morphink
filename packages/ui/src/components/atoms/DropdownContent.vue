<script setup lang="ts">
/**
 * DropdownContent — floating menu container.
 *
 * Part of Dropdown compound component.
 * Style variants: base/ui/dropdown/DropdownContentBase.vue
 */
import DropdownContentBase from '../../base/ui/dropdown/DropdownContentBase.vue'
import type { DropdownRounded, DropdownShadow, DropdownSize } from '../../base/lib/props'

withDefaults(
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
</script>

<template>
  <DropdownContentBase :side="side" :align="align" :side-offset="sideOffset" :rounded="rounded" :shadow="shadow" :size="size">
    <slot />
  </DropdownContentBase>
</template>
