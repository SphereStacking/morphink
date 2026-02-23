<template>
  <div :style="stackStyle" class="flex">
    <slot />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = withDefaults(
  defineProps<{
    direction?: 'row' | 'column'
    gap?: string
    align?: string
    justify?: string
    wrap?: boolean
  }>(),
  {
    direction: 'column',
    gap: 'var(--morphink-space-md)',
    align: 'stretch',
    justify: 'flex-start',
    wrap: false,
  }
)

const stackStyle = computed(() => ({
  flexDirection: props.direction,
  gap: props.gap,
  alignItems: props.align,
  justifyContent: props.justify,
  flexWrap: props.wrap ? 'wrap' : 'nowrap',
}))
</script>
