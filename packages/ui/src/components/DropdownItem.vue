<script setup lang="ts">
import DropdownItemBase from '../base/ui/dropdown/DropdownItemBase.vue'

withDefaults(
  defineProps<{
    disabled?: boolean
    destructive?: boolean
    textValue?: string
  }>(),
  {
    disabled: false,
    destructive: false,
  }
)

const emit = defineEmits<{
  (e: 'select', event: Event): void
}>()
</script>

<template>
  <DropdownItemBase :disabled="disabled" :destructive="destructive" :text-value="textValue" @select="emit('select', $event)">
    <template v-if="$slots.icon" #icon>
      <slot name="icon" />
    </template>
    <slot />
  </DropdownItemBase>
</template>
