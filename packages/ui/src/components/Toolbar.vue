<script setup lang="ts">
/**
 * Toolbar — horizontal action bar.
 *
 * Public API layer. Customize defaults here.
 * Style variants: base/ui/toolbar/ToolbarBase.vue
 */
import ToolbarBase from '../base/ui/toolbar/ToolbarBase.vue'
import type { ToolbarSize, ToolbarVariant } from '../base/lib/props'

withDefaults(
  defineProps<{
    size?: ToolbarSize
    variant?: ToolbarVariant
  }>(),
  {
    size: 'md',
    variant: 'solid',
  }
)
</script>

<template>
  <ToolbarBase :size="size" :variant="variant">
    <template #title>
      <slot name="title" />
    </template>
    <template #actions>
      <slot name="actions" />
    </template>
  </ToolbarBase>
</template>
