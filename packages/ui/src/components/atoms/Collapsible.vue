<script setup lang="ts">
/**
 * Collapsible — single toggle open/close content area.
 *
 * For grouped sections, use Accordion instead.
 * Style variants: base/ui/collapsible/CollapsibleBase.vue
 */
import CollapsibleBase from '../../base/ui/collapsible/CollapsibleBase.vue'
import type { CollapsibleDuration, CollapsibleEasing } from '../../base/lib/props'

withDefaults(
  defineProps<{
    open?: boolean
    defaultOpen?: boolean
    disabled?: boolean
    duration?: CollapsibleDuration
    easing?: CollapsibleEasing
  }>(),
  { open: undefined, defaultOpen: undefined, disabled: false, duration: 'normal', easing: 'standard' }
)

defineEmits<{
  (e: 'update:open', value: boolean): void
}>()
</script>

<template>
  <CollapsibleBase
    :open="open"
    :default-open="defaultOpen"
    :disabled="disabled"
    :duration="duration"
    :easing="easing"
    @update:open="$emit('update:open', $event)"
  >
    <template #trigger><slot name="trigger" /></template>
    <slot />
  </CollapsibleBase>
</template>
