<script setup lang="ts">
/**
 * Box — general-purpose container.
 *
 * Public API layer. Customize defaults here.
 * Style implementation: base/ui/layout/BoxBase.vue
 */
import BoxBase from '../../base/ui/layout/BoxBase.vue'
import type { SpaceToken } from '../../base/lib/props/space'

withDefaults(
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
    :grow="grow"
    :shrink="shrink"
  >
    <slot />
  </BoxBase>
</template>
