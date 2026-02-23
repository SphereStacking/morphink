<template>
  <div :class="classes">
    <table class="w-full border-collapse text-[13px]">
      <thead>
        <tr>
          <th
            v-for="column in columns"
            :key="column.key"
            class="bg-[var(--color-muted)] px-4 py-3 font-semibold text-[var(--color-foreground)]"
            :style="alignStyle(column.align)"
          >
            {{ column.label }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(row, index) in rows"
          :key="index"
          :class="rowClass"
        >
          <td
            v-for="column in columns"
            :key="column.key"
            :class="cellClass"
            :style="alignStyle(column.align)"
          >
            {{ row[column.key] }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import { computed, useAttrs } from 'vue'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '../../lib/utils'
import type { TableRounded } from '../../lib/props'

type Column = {
  key: string
  label: string
  align?: 'left' | 'center' | 'right'
}

const props = withDefaults(
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

const attrs = useAttrs()
const tableVariants = cva(
  'w-full overflow-x-auto overflow-hidden border-[var(--border-width-default)] border-[var(--color-border)] bg-[var(--color-card)]',
  {
    variants: {
      rounded: {
        none: 'rounded-none',
        sm: 'rounded-[var(--radius-sm)]',
        md: 'rounded-[var(--radius-md)]',
        lg: 'rounded-[var(--radius-lg)]',
        xl: 'rounded-[var(--radius-xl)]',
      },
    },
    defaultVariants: {
      rounded: 'md',
    },
  }
)
const classes = computed(() => cn(tableVariants({ rounded: props.rounded }), attrs.class))

const cellVariants = cva('border-b border-[var(--color-border)] last:border-b-0', {
  variants: {
    density: {
      comfortable: 'px-4 py-3',
      compact: 'px-3 py-2',
    },
  },
  defaultVariants: {
    density: 'comfortable',
  },
})

type CellVariants = VariantProps<typeof cellVariants>
const cellClass = computed(() => cellVariants({ density: props.density as CellVariants['density'] }))

const rowClass = computed(() =>
  cn(
    props.striped ? 'odd:bg-[var(--color-muted)]' : null,
    props.hover ? 'hover:bg-[var(--color-muted)] transition' : null
  )
)

const alignStyle = (align: Column['align']) => ({
  textAlign: align || 'left',
})
</script>
