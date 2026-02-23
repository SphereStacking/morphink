<script setup lang="ts">
import DropdownRadioItemBase from '../base/ui/dropdown/DropdownRadioItemBase.vue'

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
