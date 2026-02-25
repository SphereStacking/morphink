<script setup lang="ts">
/**
 * Dropdown — context menu / dropdown menu.
 *
 * Root of compound component. See Dropdown* siblings.
 * Public API layer. Customize defaults here.
 * Style variants: base/ui/dropdown/DropdownBase.vue
 */
import DropdownBase from '../../base/ui/dropdown/DropdownBase.vue'
import { useForwardPropsEmits } from 'reka-ui'

const props = defineProps<{
  open?: boolean
  defaultOpen?: boolean
  modal?: boolean
}>()

const emit = defineEmits<{
  (e: 'update:open', value: boolean): void
}>()

const forwarded = useForwardPropsEmits(props, emit)
</script>

<template>
  <DropdownBase v-bind="forwarded">
    <slot />
  </DropdownBase>
</template>
