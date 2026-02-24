<script setup lang="ts">
/**
 * Nav — navigation container.
 *
 * Public API layer. Customize defaults here.
 * Style variants: base/ui/nav/NavBase.vue
 */
import NavBase from '../base/ui/nav/NavBase.vue'
import type { NavSize } from '../base/lib/props'

type NavItem = {
  label: string
  href: string
  active?: boolean
}

withDefaults(
  defineProps<{
    items: NavItem[]
    size?: NavSize
    variant?: 'subtle' | 'solid'
  }>(),
  {
    size: 'md',
    variant: 'subtle',
  }
)
</script>

<template>
  <NavBase :items="items" :size="size" :variant="variant" />
</template>
