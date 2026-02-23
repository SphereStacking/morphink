<script setup lang="ts">
import NavBase from '../base/ui/nav/NavBase.vue'

type NavItem = {
  label: string
  href: string
  active?: boolean
}

withDefaults(
  defineProps<{
    items: NavItem[]
    size?: 'sm' | 'md'
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
