<script setup lang="ts">
import GridBase from '../base/ui/layout/GridBase.vue'
import type { SpaceToken } from '../base/lib/props/space'

withDefaults(
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
</script>

<template>
  <GridBase
    :columns="columns"
    :rows="rows"
    :min-width="minWidth"
    :gap="gap"
    :row-gap="rowGap"
    :column-gap="columnGap"
    :align="align"
    :justify="justify"
  >
    <slot />
  </GridBase>
</template>
