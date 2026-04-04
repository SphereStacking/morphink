<script setup lang="ts">
/**
 * AppShell — reference implementation.
 *
 * Organism: provides the top-level layout scaffold for an application.
 * Fork and customize for your product's layout needs.
 *
 * Slots:
 *   - header: top navigation bar
 *   - sidebar: side navigation panel
 *   - default: main content area
 */
import Stack from '../atoms/Stack.vue'
import Box from '../atoms/Box.vue'

withDefaults(
  defineProps<{
    sidebarWidth?: string
    sidebarCollapsed?: boolean
  }>(),
  {
    sidebarWidth: '240px',
    sidebarCollapsed: false,
  }
)
</script>

<template>
  <Stack
    direction="row"
    gap="0"
    :style="{
      minHeight: '100vh',
      background: 'var(--morphink-color-background)',
      color: 'var(--morphink-color-foreground)',
    }"
  >
    <Box
      v-if="$slots.sidebar"
      as="aside"
      :shrink="false"
      overflowY="auto"
      overflowX="hidden"
      borderRight
      :style="{
        transition: 'width 200ms',
        width: sidebarCollapsed ? '0' : sidebarWidth,
      }"
    >
      <div v-show="!sidebarCollapsed" :style="{ height: '100%', width: sidebarWidth }">
        <slot name="sidebar" />
      </div>
    </Box>
    <Stack gap="0" grow :style="{ minWidth: 0 }">
      <Box v-if="$slots.header" as="header" :shrink="false" borderBottom>
        <slot name="header" />
      </Box>
      <Box as="main" grow>
        <slot />
      </Box>
    </Stack>
  </Stack>
</template>
