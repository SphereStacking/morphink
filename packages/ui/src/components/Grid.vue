<template>
  <GridBase :columns="columns" :gap="gap">
    <slot />
  </GridBase>
</template>

<script setup lang="ts">
import GridBase from '../base/ui/layout/GridBase.vue'

withDefaults(
  defineProps<{
    columns?: string
    gap?: string
  }>(),
  {
    columns: 'repeat(auto-fit, minmax(240px, 1fr))',
    gap: 'var(--morphink-space-lg)',
  }
)
</script>
