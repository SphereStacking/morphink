<script setup lang="ts">
/**
 * FormField — standard form field layout.
 *
 * Molecule: composes Atoms (Stack, Text) into a reusable form pattern.
 * Wrap any input Atom (Input, Select, Textarea, Checkbox) in the default slot.
 *
 * Provides scoped slot props for automatic a11y integration:
 *   <FormField label="Email" error="Required">
 *     <template #default="fieldProps">
 *       <Input v-bind="fieldProps" />
 *     </template>
 *   </FormField>
 */
import { computed, useId } from 'vue'
import Stack from '../atoms/Stack.vue'
import Text from '../atoms/Text.vue'

const props = withDefaults(
  defineProps<{
    label: string
    labelFor?: string
    error?: string
    helper?: string
    required?: boolean
  }>(),
  {
    required: false,
  }
)

const autoId = useId()
const inputId = computed(() => props.labelFor || `field-${autoId}`)
const errorId = computed(() => (props.error ? `field-${autoId}-error` : undefined))
const helperId = computed(() =>
  props.helper && !props.error ? `field-${autoId}-helper` : undefined
)
const describedBy = computed(() => errorId.value || helperId.value || undefined)

const fieldProps = computed(() => ({
  id: inputId.value,
  ariaInvalid: props.error ? true : undefined,
  ariaDescribedby: describedBy.value,
  tone: props.error ? ('destructive' as const) : undefined,
}))
</script>

<template>
  <Stack gap="xs">
    <Text as="label" variant="label" :for="inputId">
      {{ label
      }}<span
        v-if="required"
        :style="{ color: 'var(--morphink-color-destructive)' }"
        aria-hidden="true"
      >
        *</span
      >
    </Text>
    <slot v-bind="fieldProps" />
    <Text
      v-if="error"
      :id="errorId"
      variant="caption"
      :style="{ color: 'var(--morphink-color-destructive)' }"
      role="alert"
      >{{ error }}</Text
    >
    <Text v-if="helper && !error" :id="helperId" variant="caption" muted>{{ helper }}</Text>
  </Stack>
</template>
