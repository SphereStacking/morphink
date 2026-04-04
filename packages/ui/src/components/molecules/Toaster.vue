<script setup lang="ts">
/**
 * Toaster — drop-in Toast container.
 *
 * Place once in your App root. Renders all toasts from useToast().
 * Includes ToastProvider + ToastViewport.
 */
import { ToastProvider } from 'reka-ui'
import ToastBase from '../../base/ui/toast/ToastBase.vue'
import ToastViewportBase from '../../base/ui/toast/ToastViewportBase.vue'
import { useToast } from '../../composables/useToast'
import type { ToastTone, ToastVariant } from '../../base/lib/props'

withDefaults(
  defineProps<{
    position?:
      | 'top-right'
      | 'top-left'
      | 'bottom-right'
      | 'bottom-left'
      | 'top-center'
      | 'bottom-center'
    defaultTone?: ToastTone
    defaultVariant?: ToastVariant
    swipeDirection?: 'right' | 'left' | 'up' | 'down'
  }>(),
  {
    position: 'bottom-right',
    defaultTone: 'neutral',
    defaultVariant: 'soft',
    swipeDirection: 'right',
  }
)

const { toasts, dismiss } = useToast()
</script>

<template>
  <ToastProvider :swipe-direction="swipeDirection">
    <ToastBase
      v-for="toast in toasts"
      :key="toast.id"
      :title="toast.title"
      :description="toast.description"
      :tone="toast.tone ?? defaultTone"
      :variant="toast.variant ?? defaultVariant"
      :duration="toast.duration ?? 5000"
      :action-label="toast.action?.label"
      @update:open="
        (open) => {
          if (!open) dismiss(toast.id)
        }
      "
      @action="toast.action?.onClick()"
    />
    <ToastViewportBase :position="position" />
  </ToastProvider>
</template>
