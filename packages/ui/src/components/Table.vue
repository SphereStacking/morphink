<script setup lang="ts">
/**
 * Table — data table.
 *
 * Public API layer. Customize defaults here.
 * Style variants: base/ui/table/TableBase.vue
 */
import TableBase from '../base/ui/table/TableBase.vue'
import type { TableRounded } from '../base/lib/props'

type Column = {
  key: string
  label: string
  align?: 'left' | 'center' | 'right'
}

withDefaults(
  defineProps<{
    columns: Column[]
    rows: Record<string, string | number>[]
    density?: 'comfortable' | 'compact'
    striped?: boolean
    hover?: boolean
    rounded?: TableRounded
  }>(),
  {
    density: 'comfortable',
    striped: false,
    hover: true,
    rounded: 'md',
  }
)
</script>

<template>
  <TableBase
    :columns="columns"
    :rows="rows"
    :density="density"
    :striped="striped"
    :hover="hover"
    :rounded="rounded"
  />
</template>
