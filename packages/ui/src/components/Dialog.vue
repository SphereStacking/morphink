<script setup lang="ts">
/**
 * Dialog — modal dialog overlay.
 *
 * Wraps Reka UI primitive. Customize defaults or add
 * product-level features here.
 * Style variants: base/ui/dialog/DialogBase.vue
 */
import DialogBase from '../base/ui/dialog/DialogBase.vue'
import type { DialogRounded, DialogShadow, DialogSize } from '../base/lib/props'

withDefaults(
  defineProps<{
    open: boolean
    onOpenChange?: (open: boolean) => void
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
</script>

<template>
  <DialogBase
    :open="open"
    :on-open-change="onOpenChange"
    :title="title"
    :description="description"
    :size="size"
    :close-label="closeLabel"
    :rounded="rounded"
    :shadow="shadow"
  >
    <slot />
    <template v-if="$slots.footer" #footer>
      <slot name="footer" />
    </template>
  </DialogBase>
</template>
