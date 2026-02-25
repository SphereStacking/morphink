<script setup lang="ts">
/**
 * DropdownRadioItem — exclusive selection item.
 *
 * Part of Dropdown compound component.
 * Style variants: base/ui/dropdown/DropdownRadioItemBase.vue
 */
import DropdownRadioItemBase from '../../base/ui/dropdown/DropdownRadioItemBase.vue'

withDefaults(
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
</script>

<template>
  <DropdownRadioItemBase :value="value" :disabled="disabled" :text-value="textValue" @select="emit('select', $event)">
    <slot />
  </DropdownRadioItemBase>
</template>
