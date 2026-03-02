<script setup lang="ts">
/**
 * Popover — click-triggered floating panel.
 *
 * Wraps Reka UI primitive. Customize defaults or add
 * product-level features here.
 * Style variants: base/ui/popover/PopoverBase.vue
 */
import PopoverBase from '../../base/ui/popover/PopoverBase.vue'
import { useForwardPropsEmits } from 'reka-ui'
import type { PopoverRounded, PopoverShadow } from '../../base/lib/props'

const props = withDefaults(
  defineProps<{
    open?: boolean
    side?: 'top' | 'right' | 'bottom' | 'left'
    align?: 'start' | 'center' | 'end'
    rounded?: PopoverRounded
    shadow?: PopoverShadow
  }>(),
  {
    open: undefined,
    side: 'bottom',
    align: 'center',
    rounded: 'lg',
    shadow: 'md',
  }
)

const emit = defineEmits<{
  'update:open': [value: boolean]
}>()

const forwarded = useForwardPropsEmits(props, emit)
</script>

<template>
  <PopoverBase v-bind="forwarded">
    <template #trigger>
      <slot name="trigger" />
    </template>
    <template #content>
      <slot name="content" />
    </template>
  </PopoverBase>
</template>
