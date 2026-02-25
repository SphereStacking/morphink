<script setup lang="ts">
/**
 * AppHeader — reference implementation.
 *
 * Organism: provides a top navigation bar.
 * Fork and customize for your product's header layout.
 */
import Stack from '../atoms/Stack.vue'
import Heading from '../atoms/Heading.vue'

withDefaults(
  defineProps<{
    title?: string
  }>(),
  {
    title: '',
  }
)
</script>

<template>
  <Stack direction="row" gap="md" align="center" paddingX="lg" paddingY="sm"
    :style="{
      borderBottom: 'var(--morphink-border-width-default) solid var(--morphink-color-border)',
      background: 'var(--morphink-color-card)'
    }">
    <slot name="logo">
      <Heading v-if="title" :level="5">{{ title }}</Heading>
    </slot>
    <Stack direction="row" gap="sm" align="center" :style="{ marginLeft: 'auto' }">
      <slot name="nav" />
      <slot name="actions" />
    </Stack>
  </Stack>
</template>
