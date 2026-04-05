<script setup lang="ts">
/**
 * AppShell — reference implementation.
 *
 * Organism: provides the top-level layout scaffold for an application.
 * Fork and customize for your product's layout needs.
 *
 * Slots:
 *   - header: top navigation bar (rendered above sidebar+content)
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
    gap="0"
    :style="{
      minHeight: '100vh',
      background: 'var(--morphink-color-background)',
      color: 'var(--morphink-color-foreground)',
    }"
  >
    <Box v-if="$slots.header" as="header" :shrink="false">
      <slot name="header" />
    </Box>
    <Stack direction="row" gap="0" grow :style="{ minHeight: 0 }">
      <Box
        v-if="$slots.sidebar"
        as="aside"
        :shrink="false"
        overflowY="auto"
        overflowX="hidden"
        borderRight
        :style="{
          transitionProperty: 'width',
          transitionDuration: 'var(--morphink-duration-normal)',
          transitionTimingFunction: 'var(--morphink-easing-standard)',
          width: sidebarCollapsed ? '0' : sidebarWidth,
        }"
      >
        <div v-show="!sidebarCollapsed" :style="{ height: '100%', width: sidebarWidth }">
          <slot name="sidebar" />
        </div>
      </Box>
      <Box as="main" grow overflowY="auto" :style="{ minWidth: 0 }">
        <slot />
      </Box>
    </Stack>
  </Stack>
</template>
