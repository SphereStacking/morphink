<script setup lang="ts">
import { computed } from 'vue'
import type { SpaceToken } from '../../lib/props/space'
import { resolveSpace, resolveAlign, resolveJustify } from '../../lib/layout-utils'

const props = withDefaults(
  defineProps<{
    direction?: 'row' | 'column'
    gap?: SpaceToken | string
    align?: 'start' | 'center' | 'end' | 'stretch' | 'baseline'
    justify?: 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly'
    wrap?: boolean
  }>(),
  {
    direction: 'column',
    gap: 'md',
    align: 'stretch',
    justify: 'start',
    wrap: false,
  }
)

const stackStyle = computed(() => ({
  flexDirection: props.direction,
  gap: resolveSpace(props.gap),
  alignItems: resolveAlign(props.align, false),
  justifyContent: resolveJustify(props.justify, false),
  flexWrap: props.wrap ? ('wrap' as const) : ('nowrap' as const),
}))
</script>

<template>
  <div :style="stackStyle" class="flex">
    <slot />
  </div>
</template>
