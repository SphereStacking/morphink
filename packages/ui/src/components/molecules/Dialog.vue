<script setup lang="ts">
/**
 * Dialog — modal dialog overlay.
 *
 * Wraps Reka UI primitive. Customize defaults or add
 * product-level features here.
 * Style variants: base/ui/dialog/DialogBase.vue
 */
import DialogBase from '../../base/ui/dialog/DialogBase.vue'
import type { DialogRounded, DialogShadow, DialogSize } from '../../base/lib/props'

withDefaults(
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
    open: undefined,
    defaultOpen: undefined,
    size: 'md',
    closeLabel: 'Close',
    rounded: 'lg',
    shadow: 'md',
  }
)

defineEmits<{
  'update:open': [value: boolean]
}>()
</script>

<template>
  <DialogBase
    :open="open"
    :default-open="defaultOpen"
    :modal="modal"
    :title="title"
    :description="description"
    :size="size"
    :close-label="closeLabel"
    :rounded="rounded"
    :shadow="shadow"
    @update:open="$emit('update:open', $event)"
  >
    <template v-if="$slots.trigger" #trigger>
      <slot name="trigger" />
    </template>
    <slot />
    <template v-if="$slots.footer" #footer>
      <slot name="footer" />
    </template>
  </DialogBase>
</template>
