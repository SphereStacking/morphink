<script setup lang="ts">
import { computed, useAttrs } from 'vue'
import type { SpaceToken } from '../../lib/props/space'
import type { BoxRounded } from '../../lib/props/rounded'
import type { BorderWeight } from '../../lib/props/border-weight'
import { resolveSpace } from '../../lib/layout-utils'
import { cn } from '../../lib/utils'

const roundedMap: Record<string, string> = {
  none: '0',
  sm: 'var(--morphink-radius-sm)',
  md: 'var(--morphink-radius-md)',
  lg: 'var(--morphink-radius-lg)',
  xl: 'var(--morphink-radius-xl)',
  full: '9999px',
}

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
    rounded?: BoxRounded
    border?: boolean | BorderWeight
  }>(),
  {
    as: 'div',
    grow: false,
    shrink: true,
    border: false,
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
  if (props.rounded) style.borderRadius = roundedMap[props.rounded] ?? props.rounded
  if (props.border) {
    const weight = props.border === true ? 'default' : props.border
    style.borderWidth = `var(--morphink-border-width-${weight})`
    style.borderStyle = 'solid'
    style.borderColor = 'var(--morphink-color-border)'
  }
  return style
})

const attrs = useAttrs()
</script>

<template>
  <component :is="as" :style="boxStyle" :class="cn(attrs.class)">
    <slot />
  </component>
</template>
