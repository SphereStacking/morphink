<script setup lang="ts">
/**
 * FormFieldCheckbox — checkbox with label and helper text.
 *
 * Molecule: composes Atoms (Stack, Checkbox, Text) into a checkbox form pattern.
 */
import Stack from '../atoms/Stack.vue'
import Checkbox from '../atoms/Checkbox.vue'
import Text from '../atoms/Text.vue'

const props = withDefaults(
  defineProps<{
    label: string
    modelValue?: boolean | 'indeterminate'
    helper?: string
    disabled?: boolean
  }>(),
  {
    disabled: false,
  }
)

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean | 'indeterminate'): void
}>()
</script>

<template>
  <Stack gap="xs">
    <Stack direction="row" gap="sm" align="center">
      <Checkbox
        :model-value="modelValue"
        :disabled="disabled"
        @update:model-value="emit('update:modelValue', $event)"
      />
      <Text as="label" variant="label">{{ label }}</Text>
    </Stack>
    <Text v-if="helper" variant="caption" muted>{{ helper }}</Text>
  </Stack>
</template>
