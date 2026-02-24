<script setup lang="ts">
/**
 * Divider — visual separator.
 *
 * Public API layer. Customize defaults here.
 * Style variants: base/ui/divider/DividerBase.vue
 */
import DividerBase from '../base/ui/divider/DividerBase.vue'

withDefaults(
  defineProps<{
    vertical?: boolean
  }>(),
  {
    vertical: false,
  }
)
</script>

<template>
  <DividerBase :vertical="vertical" />
</template>
