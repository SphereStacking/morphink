<script setup lang="ts">
/**
 * Toast — notification message that appears temporarily.
 *
 * Wraps Reka UI Toast primitive. Customize defaults or add
 * product-level features here.
 * Style variants: base/ui/toast/ToastBase.vue
 */
import ToastBase from '../../base/ui/toast/ToastBase.vue'
import type { ToastTone, ToastVariant } from '../../base/lib/props'

withDefaults(
  defineProps<{
    title?: string
    description?: string
    tone?: ToastTone
    variant?: ToastVariant
    duration?: number
    closable?: boolean
    actionLabel?: string
    open?: boolean
  }>(),
  {
    variant: 'soft',
    tone: 'neutral',
    duration: 5000,
    closable: true,
    open: true,
  }
)

defineEmits<{
  'update:open': [value: boolean]
  action: []
}>()
</script>

<template>
  <ToastBase
    :title="title"
    :description="description"
    :tone="tone"
    :variant="variant"
    :duration="duration"
    :closable="closable"
    :action-label="actionLabel"
    :open="open"
    @update:open="$emit('update:open', $event)"
    @action="$emit('action')"
  />
</template>
