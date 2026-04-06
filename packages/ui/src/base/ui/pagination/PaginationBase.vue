<script setup lang="ts">
defineOptions({ inheritAttrs: false })
import { computed, useAttrs } from 'vue'
import {
  PaginationRoot,
  PaginationList,
  PaginationListItem,
  PaginationFirst,
  PaginationPrev,
  PaginationNext,
  PaginationLast,
  PaginationEllipsis,
  useForwardPropsEmits,
} from 'reka-ui'
import { cva } from 'class-variance-authority'
import { cn } from '../../lib/utils'
import type {
  PaginationRounded,
  PaginationSize,
  PaginationTone,
  PaginationVariant,
} from '../../lib/props'
import IconChevronLeft from '../icons/IconChevronLeft.vue'
import IconChevronRight from '../icons/IconChevronRight.vue'
import IconChevronsLeft from '../icons/IconChevronsLeft.vue'
import IconChevronsRight from '../icons/IconChevronsRight.vue'

const buttonVariants = cva(
  cn(
    'inline-flex cursor-pointer items-center justify-center',
    '[transition-property:background-color,border-color,color]',
    '[transition-duration:var(--morphink-duration-fast)]',
    '[transition-timing-function:var(--morphink-easing-standard)]',
    'focus-visible:ring-2 focus-visible:ring-(--ring-color) focus-visible:ring-offset-1 focus-visible:outline-hidden',
    'disabled:cursor-not-allowed disabled:opacity-(--morphink-opacity-disabled)'
  ),
  {
    variants: {
      size: {
        xs: 'size-6 text-xs',
        sm: 'size-7 text-xs',
        md: 'size-8 text-sm',
        lg: 'size-9 text-sm',
        xl: 'size-10 text-base',
      },
      variant: {
        outline: 'border border-(--morphink-color-border) hover:bg-(--morphink-color-muted)',
        soft: cn(
          'bg-(--morphink-color-muted)',
          'hover:bg-[color-mix(in_srgb,var(--pgn-color)_8%,var(--morphink-color-muted))]'
        ),
      },
      tone: {
        primary: cn(
          '[--pgn-color:var(--morphink-color-primary)]',
          '[--ring-color:var(--morphink-color-primary)]'
        ),
        secondary: cn(
          '[--pgn-color:var(--morphink-color-secondary)]',
          '[--ring-color:var(--morphink-color-secondary)]'
        ),
        tertiary: cn(
          '[--pgn-color:var(--morphink-color-tertiary)]',
          '[--ring-color:var(--morphink-color-tertiary)]'
        ),
        base: cn(
          '[--pgn-color:var(--morphink-color-base)]',
          '[--ring-color:var(--morphink-color-ring)]'
        ),
        accent: cn(
          '[--pgn-color:var(--morphink-color-accent)]',
          '[--ring-color:var(--morphink-color-accent)]'
        ),
        neutral: cn(
          '[--pgn-color:var(--morphink-color-neutral)]',
          '[--ring-color:var(--morphink-color-neutral)]'
        ),
        success: cn(
          '[--pgn-color:var(--morphink-color-success)]',
          '[--ring-color:var(--morphink-color-success)]'
        ),
        warning: cn(
          '[--pgn-color:var(--morphink-color-warning)]',
          '[--ring-color:var(--morphink-color-warning)]'
        ),
        info: cn(
          '[--pgn-color:var(--morphink-color-info)]',
          '[--ring-color:var(--morphink-color-info)]'
        ),
        destructive: cn(
          '[--pgn-color:var(--morphink-color-destructive)]',
          '[--ring-color:var(--morphink-color-destructive)]'
        ),
      },
      rounded: {
        none: 'rounded-none',
        sm: 'rounded-(--morphink-radius-sm)',
        md: 'rounded-(--morphink-radius-md)',
        lg: 'rounded-(--morphink-radius-lg)',
        xl: 'rounded-(--morphink-radius-xl)',
        full: 'rounded-full',
      },
    },
    defaultVariants: {
      size: 'md',
      variant: 'outline',
      tone: 'primary',
      rounded: 'md',
    },
  }
)

const props = withDefaults(
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

const emit = defineEmits<{
  (e: 'update:page', value: number): void
}>()

const rekaProps = computed(() => ({
  ...(props.page !== undefined && { page: props.page }),
  ...(props.defaultPage !== undefined && { defaultPage: props.defaultPage }),
  total: props.total,
  itemsPerPage: props.itemsPerPage,
  siblingCount: props.siblingCount,
  showEdges: props.showEdges,
}))

const forwarded = useForwardPropsEmits(rekaProps, emit)

const attrs = useAttrs()

const baseButtonClasses = computed(() =>
  buttonVariants({
    size: props.size,
    variant: props.variant,
    tone: props.tone,
    rounded: props.rounded,
  })
)

const pageClasses = computed(() =>
  cn(
    baseButtonClasses.value,
    'data-[selected=true]:border-transparent data-[selected=true]:bg-(--pgn-color) data-[selected=true]:text-(--morphink-color-primary-foreground) data-[selected=true]:hover:bg-(--pgn-color)'
  )
)

const navClasses = computed(() =>
  buttonVariants({
    size: props.size,
    variant: 'soft',
    tone: props.tone,
    rounded: props.rounded,
  })
)

const ellipsisClasses = computed(() =>
  cn(
    'inline-flex items-center justify-center',
    buttonVariants({ size: props.size, variant: 'soft', tone: props.tone, rounded: props.rounded })
  )
)
</script>

<template>
  <PaginationRoot data-morphink v-bind="{ ...forwarded, class: attrs.class }">
    <PaginationList v-slot="{ items }" class="flex items-center gap-1">
      <PaginationFirst :class="navClasses" :as-child="false">
        <IconChevronsLeft class="size-4" />
      </PaginationFirst>
      <PaginationPrev :class="navClasses" :as-child="false">
        <IconChevronLeft class="size-4" />
      </PaginationPrev>

      <template v-for="(item, index) in items" :key="index">
        <PaginationListItem
          v-if="item.type === 'page'"
          :value="item.value"
          :class="pageClasses"
          :as-child="false"
        >
          {{ item.value }}
        </PaginationListItem>
        <PaginationEllipsis v-else :index="index" :class="ellipsisClasses">
          ...
        </PaginationEllipsis>
      </template>

      <PaginationNext :class="navClasses" :as-child="false">
        <IconChevronRight class="size-4" />
      </PaginationNext>
      <PaginationLast :class="navClasses" :as-child="false">
        <IconChevronsRight class="size-4" />
      </PaginationLast>
    </PaginationList>
  </PaginationRoot>
</template>
