<script setup lang="ts">
import { computed, useAttrs } from 'vue'
import type { SpaceToken } from '../../lib/props/space'
import { resolveSpace } from '../../lib/layout-utils'
import { cn } from '../../lib/utils'

defineOptions({ inheritAttrs: false })

const props = withDefaults(
  defineProps<{
    as?: string
    padding?: SpaceToken
    paddingX?: SpaceToken
    paddingY?: SpaceToken
    overflow?: 'auto' | 'hidden' | 'scroll'
    overflowX?: 'auto' | 'hidden' | 'scroll'
    overflowY?: 'auto' | 'hidden' | 'scroll'
    height?: string
    minHeight?: string
    width?: string
    minWidth?: string
    position?: 'relative' | 'absolute' | 'fixed' | 'sticky'
    grow?: boolean
    shrink?: boolean
  }>(),
  {
    as: 'div',
    grow: false,
    shrink: true,
  }
)

const boxStyle = computed(() => {
  const style: Record<string, string> = {}
  if (props.padding) style.padding = resolveSpace(props.padding)
  if (props.paddingX) style.paddingInline = resolveSpace(props.paddingX)
  if (props.paddingY) style.paddingBlock = resolveSpace(props.paddingY)
  if (props.overflow) style.overflow = props.overflow
  if (props.overflowX) style.overflowX = props.overflowX
  if (props.overflowY) style.overflowY = props.overflowY
  if (props.height) style.height = props.height
  if (props.minHeight) style.minHeight = props.minHeight
  if (props.width) style.width = props.width
  if (props.minWidth) style.minWidth = props.minWidth
  if (props.position) style.position = props.position
  if (props.grow) style.flex = '1 1 0%'
  if (!props.shrink) style.flexShrink = '0'
  return style
})

const attrs = useAttrs()
</script>

<template>
  <component :is="as" :style="boxStyle" :class="cn(attrs.class)">
    <slot />
  </component>
</template>
