<script setup lang="ts">
/**
 * DropdownRadioItem — exclusive selection item.
 *
 * Part of Dropdown compound component.
 * Style variants: base/ui/dropdown/DropdownRadioItemBase.vue
 */
import DropdownRadioItemBase from '../../base/ui/dropdown/DropdownRadioItemBase.vue'
import { useForwardPropsEmits } from 'reka-ui'

const props = withDefaults(
  defineProps<{
    value: string
    disabled?: boolean
    textValue?: string
  }>(),
  {
    disabled: false,
  }
)

const emit = defineEmits<{
  (e: 'select', event: Event): void
}>()

const forwarded = useForwardPropsEmits(props, emit)
</script>

<template>
  <DropdownRadioItemBase v-bind="forwarded">
    <slot />
  </DropdownRadioItemBase>
</template>
