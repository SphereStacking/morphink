<script setup lang="ts">
/**
 * DropdownSubTrigger — element that opens submenu.
 *
 * Part of Dropdown compound component.
 * Style variants: base/ui/dropdown/DropdownSubTriggerBase.vue
 */
import DropdownSubTriggerBase from '../../base/ui/dropdown/DropdownSubTriggerBase.vue'

withDefaults(
  defineProps<{
    disabled?: boolean
    textValue?: string
  }>(),
  {
    disabled: false,
  }
)
</script>

<template>
  <DropdownSubTriggerBase :disabled="disabled" :text-value="textValue">
    <template v-if="$slots.icon" #icon>
      <slot name="icon" />
    </template>
    <slot />
  </DropdownSubTriggerBase>
</template>
