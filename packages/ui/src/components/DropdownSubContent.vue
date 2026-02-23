<script setup lang="ts">
import DropdownSubContentBase from '../base/ui/dropdown/DropdownSubContentBase.vue'
import type { DropdownRounded, DropdownShadow } from '../base/lib/props'

withDefaults(
  defineProps<{
    sideOffset?: number
    rounded?: DropdownRounded
    shadow?: DropdownShadow
  }>(),
  {
    sideOffset: 2,
    rounded: 'md',
    shadow: 'md',
  }
)
</script>

<template>
  <DropdownSubContentBase :side-offset="sideOffset" :rounded="rounded" :shadow="shadow">
    <slot />
  </DropdownSubContentBase>
</template>
