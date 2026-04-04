<script setup lang="ts">
/**
 * NavItem — navigation item with optional icon and badge.
 *
 * Molecule: composes Atoms (Badge) with NavItemBase into a nav link pattern.
 */
import NavItemBase from '../../base/ui/nav-item/NavItemBase.vue'
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
  <NavItemBase :active="active" :href="href || '#'" @click="handleClick($event, href)">
    <slot name="icon" />
    <span :style="{ flex: '1 1 0%' }">{{ label }}</span>
    <Badge v-if="badge != null" size="sm" variant="soft" tone="neutral">{{ badge }}</Badge>
  </NavItemBase>
</template>
