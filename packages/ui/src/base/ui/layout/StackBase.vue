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
    grow?: boolean
    padding?: SpaceToken
    paddingX?: SpaceToken
    paddingY?: SpaceToken
  }>(),
  {
    direction: 'column',
    gap: 'md',
    align: 'stretch',
    justify: 'start',
    wrap: false,
    grow: false,
  }
)

const stackStyle = computed(() => {
  const style: Record<string, string> = {
    flexDirection: props.direction,
    gap: resolveSpace(props.gap),
    alignItems: resolveAlign(props.align, false),
    justifyContent: resolveJustify(props.justify, false),
    flexWrap: props.wrap ? 'wrap' : 'nowrap',
  }
  if (props.grow) style.flex = '1 1 0%'
  if (props.padding) style.padding = resolveSpace(props.padding)
  if (props.paddingX) style.paddingInline = resolveSpace(props.paddingX)
  if (props.paddingY) style.paddingBlock = resolveSpace(props.paddingY)
  return style
})
</script>

<template>
  <div :style="stackStyle" class="flex">
    <slot />
  </div>
</template>
