<script setup lang="ts">
/**
 * SettingsSection — reference implementation.
 *
 * Organism: provides a settings section layout.
 * Fork and customize for your product's settings pages.
 */
import Stack from '../atoms/Stack.vue'
import SectionHeader from '../atoms/SectionHeader.vue'
import Card from '../atoms/Card.vue'
import CardBody from '../atoms/CardBody.vue'

defineProps<{
  title: string
  description?: string
}>()
</script>

<template>
  <Stack gap="md">
    <SectionHeader>
      <template #title>{{ title }}</template>
      <template v-if="description" #subtitle>{{ description }}</template>
      <template v-if="$slots.action" #action>
        <slot name="action" />
      </template>
    </SectionHeader>
    <Card>
      <CardBody>
        <slot />
      </CardBody>
    </Card>
  </Stack>
</template>
