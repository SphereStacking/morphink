<script setup lang="ts">
/**
 * Select — single-value selector.
 *
 * Wraps Reka UI primitive. Customize defaults or add
 * product-level features here.
 * Style variants: base/ui/select/SelectBase.vue
 */
import SelectBase from '../base/ui/select/SelectBase.vue'
import type { SelectRounded, SelectShadow, SelectSize, SelectVariant } from '../base/lib/props'

type Option = {
  label: string
  value: string | number
  disabled?: boolean
}

const props = withDefaults(
  defineProps<{
    modelValue: string | number | null
    options: Option[]
    placeholder?: string
    size?: SelectSize
    variant?: SelectVariant
    side?: 'top' | 'right' | 'bottom' | 'left'
    align?: 'start' | 'center' | 'end'
    rounded?: SelectRounded
    shadow?: SelectShadow
  }>(),
  {
    size: 'md',
    variant: 'outline',
    placeholder: 'Select...',
    side: 'bottom',
    align: 'start',
    rounded: 'md',
    shadow: 'md',
  }
)

const emit = defineEmits<{
  (e: 'update:modelValue', value: string | number | null): void
}>()

void props
</script>

<template>
  <SelectBase
    :model-value="modelValue"
    :options="options"
    :placeholder="placeholder"
    :size="size"
    :variant="variant"
    :side="side"
    :align="align"
    :rounded="rounded"
    :shadow="shadow"
    @update:model-value="emit('update:modelValue', $event)"
  />
</template>
