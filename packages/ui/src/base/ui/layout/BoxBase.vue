<script setup lang="ts">
import { computed, useAttrs } from 'vue'
import type { SpaceToken } from '../../lib/props/space'
import type { BoxRounded } from '../../lib/props/rounded'
import type { BorderWeight } from '../../lib/props/border-weight'
import { resolveSpace, resolveAlign, resolveJustify, resolveColor } from '../../lib/layout-utils'
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
    // Spacing
    padding?: SpaceToken
    paddingX?: SpaceToken
    paddingY?: SpaceToken
    // Overflow
    overflow?: 'auto' | 'hidden' | 'scroll'
    overflowX?: 'auto' | 'hidden' | 'scroll'
    overflowY?: 'auto' | 'hidden' | 'scroll'
    // Sizing
    height?: string
    minHeight?: string
    width?: string
    minWidth?: string
    // Positioning
    position?: 'relative' | 'absolute' | 'fixed' | 'sticky'
    top?: string
    right?: string
    bottom?: string
    left?: string
    inset?: string
    zIndex?: string | number
    // Flex
    grow?: boolean
    shrink?: boolean
    // Display & Layout
    display?: 'flex' | 'grid' | 'block' | 'inline-flex' | 'inline' | 'none'
    alignItems?: 'start' | 'center' | 'end' | 'stretch' | 'baseline'
    justifyContent?: 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly'
    gap?: SpaceToken | string
    // Visual
    rounded?: BoxRounded
    border?: boolean | BorderWeight
    borderTop?: boolean | BorderWeight
    borderRight?: boolean | BorderWeight
    borderBottom?: boolean | BorderWeight
    borderLeft?: boolean | BorderWeight
    color?: string
    background?: string
    // Interaction
    pointerEvents?: 'none' | 'auto'
    // Transform
    transform?: string
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
  // Spacing
  if (props.padding) style.padding = resolveSpace(props.padding)
  if (props.paddingX) style.paddingInline = resolveSpace(props.paddingX)
  if (props.paddingY) style.paddingBlock = resolveSpace(props.paddingY)
  // Overflow
  if (props.overflow) style.overflow = props.overflow
  if (props.overflowX) style.overflowX = props.overflowX
  if (props.overflowY) style.overflowY = props.overflowY
  // Sizing
  if (props.height) style.height = props.height
  if (props.minHeight) style.minHeight = props.minHeight
  if (props.width) style.width = props.width
  if (props.minWidth) style.minWidth = props.minWidth
  // Positioning
  if (props.position) style.position = props.position
  if (props.top != null) style.top = props.top
  if (props.right != null) style.right = props.right
  if (props.bottom != null) style.bottom = props.bottom
  if (props.left != null) style.left = props.left
  if (props.inset != null) style.inset = props.inset
  if (props.zIndex != null) style.zIndex = String(props.zIndex)
  // Flex
  if (props.grow) style.flex = '1 1 0%'
  if (!props.shrink) style.flexShrink = '0'
  // Display & Layout
  if (props.display) style.display = props.display
  if (props.alignItems) style.alignItems = resolveAlign(props.alignItems, false)
  if (props.justifyContent) style.justifyContent = resolveJustify(props.justifyContent, false)
  if (props.gap) style.gap = resolveSpace(props.gap)
  // Visual
  if (props.rounded) style.borderRadius = roundedMap[props.rounded] ?? props.rounded
  if (props.border) {
    const weight = props.border === true ? 'default' : props.border
    style.borderWidth = `var(--morphink-border-width-${weight})`
    style.borderStyle = 'solid'
    style.borderColor = 'var(--morphink-color-border)'
  }
  if (props.borderTop) {
    const w = props.borderTop === true ? 'default' : props.borderTop
    style.borderTop = `var(--morphink-border-width-${w}) solid var(--morphink-color-border)`
  }
  if (props.borderRight) {
    const w = props.borderRight === true ? 'default' : props.borderRight
    style.borderRight = `var(--morphink-border-width-${w}) solid var(--morphink-color-border)`
  }
  if (props.borderBottom) {
    const w = props.borderBottom === true ? 'default' : props.borderBottom
    style.borderBottom = `var(--morphink-border-width-${w}) solid var(--morphink-color-border)`
  }
  if (props.borderLeft) {
    const w = props.borderLeft === true ? 'default' : props.borderLeft
    style.borderLeft = `var(--morphink-border-width-${w}) solid var(--morphink-color-border)`
  }
  if (props.color) style.color = resolveColor(props.color)
  if (props.background) style.background = resolveColor(props.background)
  // Interaction
  if (props.pointerEvents) style.pointerEvents = props.pointerEvents
  // Transform
  if (props.transform) style.transform = props.transform
  return style
})

const attrs = useAttrs()
</script>

<template>
  <component
    :is="as"
    data-morphink
    v-bind="{ ...attrs, class: undefined, style: undefined }"
    :style="[boxStyle, attrs.style]"
    :class="cn(attrs.class)"
  >
    <slot />
  </component>
</template>
