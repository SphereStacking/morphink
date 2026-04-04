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
  <Stack gap="0" :style="{ height: '100%', background: 'var(--morphink-color-muted)' }">
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
