<script setup lang="ts">
import { ToastViewport } from 'reka-ui'
import { cn } from '../../lib/utils'

withDefaults(
  defineProps<{
    position?:
      | 'top-right'
      | 'top-left'
      | 'bottom-right'
      | 'bottom-left'
      | 'top-center'
      | 'bottom-center'
  }>(),
  {
    position: 'bottom-right',
  }
)

const positionClasses: Record<string, string> = {
  'top-right': 'top-0 right-0',
  'top-left': 'top-0 left-0',
  'bottom-right': 'bottom-0 right-0',
  'bottom-left': 'bottom-0 left-0',
  'top-center': 'top-0 left-1/2 -translate-x-1/2',
  'bottom-center': 'bottom-0 left-1/2 -translate-x-1/2',
}
</script>

<template>
  <ToastViewport
    data-morphink
    :class="
      cn(
        'fixed z-toast flex max-h-screen w-[min(420px,100vw)] flex-col-reverse gap-(--morphink-space-sm) p-(--morphink-space-lg)',
        positionClasses[position]
      )
    "
  />
</template>
