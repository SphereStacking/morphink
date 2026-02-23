<script setup lang="ts">
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
    placeholder: '選択してください',
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
