<script setup lang="ts">
/**
 * Radio — single radio item within a RadioGroup.
 *
 * Public API layer. Customize defaults here.
 * Style variants: base/ui/radio/RadioBase.vue
 */
import RadioBase from '../../base/ui/radio/RadioBase.vue'

defineProps<{
  value: string
  disabled?: boolean
  id?: string
}>()
</script>

<template>
  <RadioBase :value="value" :disabled="disabled" :id="id">
    <slot />
  </RadioBase>
</template>
