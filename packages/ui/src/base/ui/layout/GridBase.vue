<template>
  <div :style="gridStyle" class="grid">
    <slot />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = withDefaults(
  defineProps<{
    columns?: string
    gap?: string
  }>(),
  {
    columns: 'repeat(auto-fit, minmax(240px, 1fr))',
    gap: 'var(--space-lg)',
  }
)

const gridStyle = computed(() => ({
  gridTemplateColumns: props.columns,
  gap: props.gap,
}))
</script>
