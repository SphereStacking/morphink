<script setup lang="ts">
/**
 * AppHeader — reference implementation.
 *
 * Organism: provides a sticky top navigation bar with frosted-glass backdrop.
 * Fork and customize for your product's header layout.
 *
 * Slots:
 *   - logo: brand logo / title area (defaults to Heading with title prop)
 *   - nav: navigation links
 *   - actions: right-aligned action buttons / avatar
 */
import Stack from '../atoms/Stack.vue'
import Heading from '../atoms/Heading.vue'

withDefaults(
  defineProps<{
    title?: string
    sticky?: boolean
  }>(),
  {
    title: '',
    sticky: true,
  }
)
</script>

<template>
  <Stack
    direction="row"
    gap="md"
    align="center"
    paddingX="lg"
    paddingY="sm"
    :style="{
      position: sticky ? 'sticky' : 'relative',
      top: sticky ? '0' : undefined,
      zIndex: sticky ? '10' : undefined,
      background: 'color-mix(in srgb, var(--morphink-color-card) 85%, transparent)',
      backdropFilter: 'blur(12px)',
      WebkitBackdropFilter: 'blur(12px)',
      borderBottom: 'var(--morphink-border-width-default) solid var(--morphink-color-border)',
      minHeight: '3rem',
    }"
  >
    <slot name="logo">
      <Heading v-if="title" :level="5" :style="{ whiteSpace: 'nowrap' }">{{ title }}</Heading>
    </slot>
    <Stack direction="row" gap="sm" align="center" :style="{ marginLeft: 'auto' }">
      <slot name="nav" />
      <slot name="actions" />
    </Stack>
  </Stack>
</template>
