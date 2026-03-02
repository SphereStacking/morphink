<script setup lang="ts">
/**
 * EmptyState — placeholder for empty data views.
 *
 * Molecule: composes Atoms (Stack, Heading, Text) into a centered layout.
 * Use the "icon" slot for a visual, and "action" slot for a CTA button.
 */
import Stack from '../atoms/Stack.vue'
import Heading from '../atoms/Heading.vue'
import Text from '../atoms/Text.vue'

defineProps<{
  title: string
  description?: string
}>()
</script>

<template>
  <Stack gap="md" align="center" paddingY="2xl" paddingX="xl">
    <slot name="icon" />
    <Stack gap="xs" align="center">
      <Heading :level="3">{{ title }}</Heading>
      <Text v-if="description" variant="body" muted :style="{ textAlign: 'center' }">{{
        description
      }}</Text>
    </Stack>
    <slot name="action" />
  </Stack>
</template>
