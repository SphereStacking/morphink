<script setup lang="ts">
/**
 * DropdownSub — nested submenu root.
 *
 * Part of Dropdown compound component.
 * Style variants: base/ui/dropdown/DropdownSubBase.vue
 */
import DropdownSubBase from '../../base/ui/dropdown/DropdownSubBase.vue'

withDefaults(
  defineProps<{
    open?: boolean
    defaultOpen?: boolean
  }>(),
  { open: undefined, defaultOpen: undefined }
)

defineEmits<{
  (e: 'update:open', value: boolean): void
}>()
</script>

<template>
  <DropdownSubBase
    :open="open"
    :default-open="defaultOpen"
    @update:open="$emit('update:open', $event)"
  >
    <slot />
  </DropdownSubBase>
</template>
