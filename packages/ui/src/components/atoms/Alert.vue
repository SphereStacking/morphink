<script setup lang="ts">
/**
 * Alert — feedback message for info, success, warning, error states.
 *
 * Public API layer. Customize defaults here.
 * Style variants: base/ui/alert/AlertBase.vue
 */
import AlertBase from '../../base/ui/alert/AlertBase.vue'
import type { AlertRounded, AlertTone, AlertVariant } from '../../base/lib/props'

withDefaults(
  defineProps<{
    variant?: AlertVariant
    tone?: AlertTone
    rounded?: AlertRounded
    dismissible?: boolean
  }>(),
  {
    variant: 'soft',
    tone: 'info',
    rounded: 'lg',
    dismissible: false,
  }
)

defineEmits<{
  (e: 'close'): void
}>()
</script>

<template>
  <AlertBase
    :variant="variant"
    :tone="tone"
    :rounded="rounded"
    :dismissible="dismissible"
    @close="$emit('close')"
  >
    <slot />
  </AlertBase>
</template>
