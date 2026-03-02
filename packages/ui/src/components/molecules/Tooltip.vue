<script setup lang="ts">
/**
 * Tooltip — hover tooltip.
 *
 * Wraps Reka UI primitive. Customize defaults or add
 * product-level features here.
 * Style variants: base/ui/tooltip/TooltipBase.vue
 */
import TooltipBase from '../../base/ui/tooltip/TooltipBase.vue'
import { useForwardPropsEmits } from 'reka-ui'
import type { TooltipRounded, TooltipShadow } from '../../base/lib/props'

const props = withDefaults(
  defineProps<{
    content?: string
    open?: boolean
    side?: 'top' | 'right' | 'bottom' | 'left'
    align?: 'start' | 'center' | 'end'
    delay?: number
    rounded?: TooltipRounded
    shadow?: TooltipShadow
  }>(),
  {
    open: undefined,
    side: 'top',
    align: 'center',
    delay: 200,
    rounded: 'md',
    shadow: 'md',
  }
)

const emit = defineEmits<{
  'update:open': [value: boolean]
}>()

const forwarded = useForwardPropsEmits(props, emit)
</script>

<template>
  <TooltipBase v-bind="forwarded">
    <slot />
    <template v-if="$slots.content" #content>
      <slot name="content" />
    </template>
  </TooltipBase>
</template>
