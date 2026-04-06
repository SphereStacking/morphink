<script setup lang="ts">
/**
 * AppSidebar — reference implementation.
 *
 * Organism: provides a sidebar navigation panel.
 * Fork and customize for your product's sidebar layout.
 *
 * Slots:
 *   - header: top area (e.g. workspace name, logo)
 *   - default: navigation items
 *   - footer: bottom area (e.g. user profile)
 */
import Stack from '../atoms/Stack.vue'
import Box from '../atoms/Box.vue'
</script>

<template>
  <Stack
    gap="0"
    :style="{
      height: '100%',
      background:
        'color-mix(in srgb, var(--morphink-color-muted) 50%, var(--morphink-color-background))',
    }"
  >
    <Box v-if="$slots.header" padding="md" borderBottom>
      <slot name="header" />
    </Box>
    <Box grow overflowY="auto" padding="md">
      <slot />
    </Box>
    <Box v-if="$slots.footer" padding="md" borderTop>
      <slot name="footer" />
    </Box>
  </Stack>
</template>
