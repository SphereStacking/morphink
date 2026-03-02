<script setup lang="ts">
/**
 * AppSidebar — reference implementation.
 *
 * Organism: provides a sidebar navigation panel.
 * Fork and customize for your product's sidebar layout.
 */
import Stack from '../atoms/Stack.vue'
import Box from '../atoms/Box.vue'
</script>

<template>
  <Stack gap="0" :style="{ height: '100%' }">
    <Box
      v-if="$slots.header"
      padding="md"
      :style="{
        borderBottom: 'var(--morphink-border-width-default) solid var(--morphink-color-border)',
      }"
    >
      <slot name="header" />
    </Box>
    <Box grow overflowY="auto" padding="md">
      <slot />
    </Box>
    <Box
      v-if="$slots.footer"
      padding="md"
      :style="{
        borderTop: 'var(--morphink-border-width-default) solid var(--morphink-color-border)',
      }"
    >
      <slot name="footer" />
    </Box>
  </Stack>
</template>
