<script setup lang="ts">
import { computed, useAttrs } from 'vue'
import { cn } from '../../lib/utils'
import type { BorderWeight } from '../../lib/props/border-weight'

defineOptions({ inheritAttrs: false })

const props = withDefaults(
  defineProps<{
    vertical?: boolean
    weight?: BorderWeight
  }>(),
  {
    vertical: false,
    weight: 'default',
  }
)

const dividerStyle = computed(() => {
  const thickness = `var(--morphink-border-width-${props.weight})`
  if (props.vertical) {
    return { width: thickness, alignSelf: 'stretch' as const }
  }
  return { height: thickness, width: '100%' }
})

const attrs = useAttrs()
</script>

<template>
  <div :class="cn('bg-(--morphink-color-border)', attrs.class)" :style="dividerStyle" />
</template>
