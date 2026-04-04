<script setup lang="ts">
/**
 * Box — general-purpose container.
 *
 * Public API layer. Customize defaults here.
 * Style implementation: base/ui/layout/BoxBase.vue
 */
import BoxBase from '../../base/ui/layout/BoxBase.vue'
import type { SpaceToken } from '../../base/lib/props/space'
import type { BoxRounded } from '../../base/lib/props/rounded'
import type { BorderWeight } from '../../base/lib/props/border-weight'

withDefaults(
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
</script>

<template>
  <BoxBase
    :as="as"
    :padding="padding"
    :padding-x="paddingX"
    :padding-y="paddingY"
    :overflow="overflow"
    :overflow-x="overflowX"
    :overflow-y="overflowY"
    :height="height"
    :min-height="minHeight"
    :width="width"
    :min-width="minWidth"
    :position="position"
    :top="top"
    :right="right"
    :bottom="bottom"
    :left="left"
    :inset="inset"
    :z-index="zIndex"
    :grow="grow"
    :shrink="shrink"
    :display="display"
    :align-items="alignItems"
    :justify-content="justifyContent"
    :gap="gap"
    :rounded="rounded"
    :border="border"
    :border-top="borderTop"
    :border-right="borderRight"
    :border-bottom="borderBottom"
    :border-left="borderLeft"
    :color="color"
    :background="background"
    :pointer-events="pointerEvents"
    :transform="transform"
  >
    <slot />
  </BoxBase>
</template>
