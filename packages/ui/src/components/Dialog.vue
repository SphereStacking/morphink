<script setup lang="ts">
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
    closeLabel: '閉じる',
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
