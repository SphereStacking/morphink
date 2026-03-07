<script setup lang="ts">
/**
 * AlertDialog — confirmation dialog.
 *
 * Wraps Reka UI primitive. Customize defaults or add
 * product-level features here.
 * Style variants: base/ui/alert-dialog/AlertDialogBase.vue
 */
import AlertDialogBase from '../../base/ui/alert-dialog/AlertDialogBase.vue'
import type { AlertDialogRounded, AlertDialogShadow, AlertDialogSize } from '../../base/lib/props'

withDefaults(
  defineProps<{
    open?: boolean
    defaultOpen?: boolean
    title?: string
    description?: string
    size?: AlertDialogSize
    confirmLabel?: string
    cancelLabel?: string
    rounded?: AlertDialogRounded
    shadow?: AlertDialogShadow
  }>(),
  {
    size: 'md',
    confirmLabel: '確定',
    cancelLabel: 'キャンセル',
    rounded: 'lg',
    shadow: 'md',
  }
)

defineEmits<{ 'update:open': [value: boolean] }>()
</script>

<template>
  <AlertDialogBase
    :open="open"
    :default-open="defaultOpen"
    :title="title"
    :description="description"
    :size="size"
    :confirm-label="confirmLabel"
    :cancel-label="cancelLabel"
    :rounded="rounded"
    :shadow="shadow"
    @update:open="$emit('update:open', $event)"
  >
    <slot />
    <template v-if="$slots.footer" #footer>
      <slot name="footer" />
    </template>
    <template v-if="$slots.trigger" #trigger>
      <slot name="trigger" />
    </template>
  </AlertDialogBase>
</template>
