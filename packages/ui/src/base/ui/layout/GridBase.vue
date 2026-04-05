<script setup lang="ts">
import { computed, useAttrs } from 'vue'
import type { SpaceToken } from '../../lib/props/space'
import {
  resolveColumns,
  resolveRows,
  resolveSpace,
  resolveAlign,
  resolveJustify,
} from '../../lib/layout-utils'
import { cn } from '../../lib/utils'

defineOptions({ inheritAttrs: false })

const props = withDefaults(
  defineProps<{
    columns?: number | 'auto-fit' | 'auto-fill' | string
    rows?: number | string
    minWidth?: string
    gap?: SpaceToken | string
    rowGap?: SpaceToken | string
    columnGap?: SpaceToken | string
    align?: 'start' | 'center' | 'end' | 'stretch' | 'baseline'
    justify?: 'start' | 'center' | 'end' | 'stretch'
  }>(),
  {
    columns: 'auto-fit',
    minWidth: '240px',
    gap: 'lg',
    align: 'stretch',
    justify: 'stretch',
  }
)

const gridStyle = computed(() => {
  const style: Record<string, string> = {
    gridTemplateColumns: resolveColumns(props.columns, props.minWidth),
    alignItems: resolveAlign(props.align, true),
    justifyItems: resolveJustify(props.justify, true),
  }

  if (props.rows != null) {
    style.gridTemplateRows = resolveRows(props.rows)
  }

  if (props.rowGap != null || props.columnGap != null) {
    if (props.rowGap != null) style.rowGap = resolveSpace(props.rowGap)
    if (props.columnGap != null) style.columnGap = resolveSpace(props.columnGap)
  } else {
    style.gap = resolveSpace(props.gap)
  }

  return style
})

const attrs = useAttrs()
</script>

<template>
  <div
    data-morphink
    v-bind="{ ...attrs, class: undefined, style: undefined }"
    :style="[gridStyle, attrs.style]"
    :class="cn('grid', attrs.class)"
  >
    <slot />
  </div>
</template>
