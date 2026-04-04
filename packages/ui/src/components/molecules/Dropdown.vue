<script setup lang="ts">
/**
 * Dropdown — context menu / dropdown menu.
 *
 * Root of compound component. See Dropdown* siblings.
 * Public API layer. Customize defaults here.
 * Style variants: base/ui/dropdown/DropdownBase.vue
 */
import DropdownBase from '../../base/ui/dropdown/DropdownBase.vue'

withDefaults(
  defineProps<{
    open?: boolean
    defaultOpen?: boolean
    modal?: boolean
  }>(),
  { open: undefined, defaultOpen: undefined }
)

defineEmits<{
  (e: 'update:open', value: boolean): void
}>()
</script>

<template>
  <DropdownBase
    :open="open"
    :default-open="defaultOpen"
    :modal="modal"
    @update:open="$emit('update:open', $event)"
  >
    <slot />
  </DropdownBase>
</template>
