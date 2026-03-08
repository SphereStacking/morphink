<script setup lang="ts">
/**
 * Divider — visual separator.
 *
 * Public API layer. Customize defaults here.
 * Style variants: base/ui/divider/DividerBase.vue
 */
import DividerBase from '../../base/ui/divider/DividerBase.vue'
import type { BorderWeight } from '../../base/lib/props/border-weight'

withDefaults(
  defineProps<{
    vertical?: boolean
    weight?: BorderWeight
  }>(),
  {
    vertical: false,
    weight: 'default',
  }
)
</script>

<template>
  <DividerBase :vertical="vertical" :weight="weight" />
</template>
