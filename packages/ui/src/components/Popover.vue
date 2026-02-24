<script setup lang="ts">
/**
 * Popover — click-triggered floating panel.
 *
 * Wraps Reka UI primitive. Customize defaults or add
 * product-level features here.
 * Style variants: base/ui/popover/PopoverBase.vue
 */
import PopoverBase from '../base/ui/popover/PopoverBase.vue'
import type { PopoverRounded, PopoverShadow } from '../base/lib/props'

withDefaults(
  defineProps<{
    open?: boolean
    onOpenChange?: (open: boolean) => void
    side?: 'top' | 'right' | 'bottom' | 'left'
    align?: 'start' | 'center' | 'end'
    rounded?: PopoverRounded
    shadow?: PopoverShadow
  }>(),
  {
    side: 'bottom',
    align: 'center',
    rounded: 'lg',
    shadow: 'md',
  }
)
</script>

<template>
  <PopoverBase
    :open="open"
    :on-open-change="onOpenChange"
    :side="side"
    :align="align"
    :rounded="rounded"
    :shadow="shadow"
  >
    <template #trigger>
      <slot name="trigger" />
    </template>
    <template #content>
      <slot name="content" />
    </template>
  </PopoverBase>
</template>
