<template>
  <AlertDialogBase
    :open="open"
    :on-open-change="onOpenChange"
    :title="title"
    :description="description"
    :size="size"
    :confirm-label="confirmLabel"
    :cancel-label="cancelLabel"
    :rounded="rounded"
    :shadow="shadow"
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

<script setup lang="ts">
import AlertDialogBase from '../base/ui/alert-dialog/AlertDialogBase.vue'
import type { AlertDialogRounded, AlertDialogShadow, AlertDialogSize } from '../base/lib/props'

withDefaults(
  defineProps<{
    open: boolean
    onOpenChange?: (open: boolean) => void
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
</script>
