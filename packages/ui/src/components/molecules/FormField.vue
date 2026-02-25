<script setup lang="ts">
/**
 * FormField — standard form field layout.
 *
 * Molecule: composes Atoms (Stack, Text) into a reusable form pattern.
 * Wrap any input Atom (Input, Select, Textarea, Checkbox) in the default slot.
 */
import Stack from '../atoms/Stack.vue'
import Text from '../atoms/Text.vue'

withDefaults(
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
</script>

<template>
  <Stack gap="xs">
    <Text as="label" variant="label" :for="labelFor">
      {{ label }}<span v-if="required" :style="{ color: 'var(--morphink-color-destructive)' }" aria-hidden="true"> *</span>
    </Text>
    <slot />
    <Text v-if="error" variant="caption" :style="{ color: 'var(--morphink-color-destructive)' }">{{ error }}</Text>
    <Text v-if="helper && !error" variant="caption" muted>{{ helper }}</Text>
  </Stack>
</template>
