<script setup lang="ts">
/**
 * DataTable — reference implementation.
 *
 * Organism: provides a data table with search and pagination.
 * Fork and customize for your product's data display needs.
 */
import { ref, computed } from 'vue'
import Stack from '../atoms/Stack.vue'
import Table from '../atoms/Table.vue'
import Button from '../atoms/Button.vue'
import Text from '../atoms/Text.vue'
import SearchInput from '../molecules/SearchInput.vue'
import EmptyState from '../molecules/EmptyState.vue'
import type { TableRounded } from '../../base/lib/props'

type Column = {
  key: string
  label: string
  align?: 'left' | 'center' | 'right'
}

const props = withDefaults(
  defineProps<{
    columns: Column[]
    rows: Record<string, string | number>[]
    searchable?: boolean
    searchPlaceholder?: string
    pageSize?: number
    emptyTitle?: string
    emptyDescription?: string
    density?: 'comfortable' | 'compact'
    striped?: boolean
    rounded?: TableRounded
  }>(),
  {
    searchable: false,
    searchPlaceholder: 'Search...',
    pageSize: 10,
    emptyTitle: 'No data',
    density: 'comfortable',
    striped: false,
    rounded: 'md',
  }
)

const searchQuery = ref('')
const currentPage = ref(1)

const filteredRows = computed(() => {
  if (!searchQuery.value) return props.rows
  const query = searchQuery.value.toLowerCase()
  return props.rows.filter((row) =>
    props.columns.some((col) => String(row[col.key]).toLowerCase().includes(query))
  )
})

const totalPages = computed(() => Math.max(1, Math.ceil(filteredRows.value.length / props.pageSize)))

const paginatedRows = computed(() => {
  const start = (currentPage.value - 1) * props.pageSize
  return filteredRows.value.slice(start, start + props.pageSize)
})

function handleSearch(value: string) {
  searchQuery.value = value
  currentPage.value = 1
}
</script>

<template>
  <Stack gap="md">
    <SearchInput
      v-if="searchable"
      :model-value="searchQuery"
      :placeholder="searchPlaceholder"
      @update:model-value="handleSearch"
    />
    <Table
      v-if="paginatedRows.length > 0"
      :columns="columns"
      :rows="paginatedRows"
      :density="density"
      :striped="striped"
      :rounded="rounded"
    />
    <EmptyState
      v-else
      :title="emptyTitle"
      :description="emptyDescription"
    />
    <Stack v-if="totalPages > 1" direction="row" gap="sm" align="center" justify="between">
      <Button size="sm" variant="outline" :disabled="currentPage <= 1" @click="currentPage--">
        Previous
      </Button>
      <Text variant="caption" muted>Page {{ currentPage }} of {{ totalPages }}</Text>
      <Button size="sm" variant="outline" :disabled="currentPage >= totalPages" @click="currentPage++">
        Next
      </Button>
    </Stack>
  </Stack>
</template>
