<script setup lang="ts">
/**
 * Dialog — modal dialog overlay.
 *
 * Wraps Reka UI primitive. Customize defaults or add
 * product-level features here.
 * Style variants: base/ui/dialog/DialogBase.vue
 */
import DialogBase from '../base/ui/dialog/DialogBase.vue'
import { useForwardPropsEmits } from 'reka-ui'
import type { DialogRounded, DialogShadow, DialogSize } from '../base/lib/props'

const props = withDefaults(
  defineProps<{
    open?: boolean
    defaultOpen?: boolean
    modal?: boolean
    title?: string
    description?: string
    size?: DialogSize
    closeLabel?: string
    rounded?: DialogRounded
    shadow?: DialogShadow
  }>(),
  {
    size: 'md',
    closeLabel: 'Close',
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
  <DialogBase v-bind="forwarded">
    <template v-if="$slots.trigger" #trigger>
      <slot name="trigger" />
    </template>
    <slot />
    <template v-if="$slots.footer" #footer>
      <slot name="footer" />
    </template>
  </DialogBase>
</template>
