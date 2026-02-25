<script setup lang="ts">
/**
 * NavItem — navigation item with optional icon and badge.
 *
 * Molecule: composes Atoms (Stack, Text, Badge) into a nav link pattern.
 */
import Stack from '../atoms/Stack.vue'
import Text from '../atoms/Text.vue'
import Badge from '../atoms/Badge.vue'

withDefaults(
  defineProps<{
    label: string
    href?: string
    active?: boolean
    badge?: string | number
  }>(),
  {
    active: false,
  }
)

const emit = defineEmits<{
  (e: 'navigate', href: string): void
}>()

function handleClick(event: Event, href?: string) {
  if (href) {
    event.preventDefault()
    emit('navigate', href)
  }
}
</script>

<template>
  <a
    :href="href || '#'"
    :style="{
      display: 'flex',
      alignItems: 'center',
      gap: 'var(--morphink-space-sm)',
      padding: 'var(--morphink-space-sm) var(--morphink-space-md)',
      borderRadius: 'var(--morphink-radius-md)',
      textDecoration: 'none',
      cursor: 'pointer',
      transition: 'background 150ms, color 150ms',
      background: active ? 'color-mix(in srgb, var(--morphink-color-accent) 10%, transparent)' : 'transparent',
      color: active ? 'var(--morphink-color-accent)' : 'var(--morphink-color-foreground)',
    }"
    @click="handleClick($event, href)"
  >
    <slot name="icon" />
    <Text variant="label" :style="{ flex: '1 1 0%', color: 'inherit' }">{{ label }}</Text>
    <Badge v-if="badge != null" size="sm" variant="soft" tone="neutral">{{ badge }}</Badge>
  </a>
</template>
