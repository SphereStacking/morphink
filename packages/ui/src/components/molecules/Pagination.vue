<script setup lang="ts">
/**
 * Pagination — navigation control for paginated data sets.
 *
 * Public API layer. Customize defaults here.
 * Style variants: base/ui/pagination/PaginationBase.vue
 */
import PaginationBase from '../../base/ui/pagination/PaginationBase.vue'
import type {
  PaginationRounded,
  PaginationSize,
  PaginationTone,
  PaginationVariant,
} from '../../base/lib/props'

withDefaults(
  defineProps<{
    page?: number
    defaultPage?: number
    total: number
    itemsPerPage?: number
    siblingCount?: number
    showEdges?: boolean
    size?: PaginationSize
    variant?: PaginationVariant
    tone?: PaginationTone
    rounded?: PaginationRounded
  }>(),
  {
    itemsPerPage: 10,
    siblingCount: 1,
    showEdges: true,
    size: 'md',
    variant: 'outline',
    tone: 'primary',
    rounded: 'md',
  }
)

defineEmits<{
  (e: 'update:page', value: number): void
}>()
</script>

<template>
  <PaginationBase
    :page="page"
    :default-page="defaultPage"
    :total="total"
    :items-per-page="itemsPerPage"
    :sibling-count="siblingCount"
    :show-edges="showEdges"
    :size="size"
    :variant="variant"
    :tone="tone"
    :rounded="rounded"
    @update:page="$emit('update:page', $event)"
  />
</template>
