<template>
  <AlertDialogRoot :open="open" @update:open="handleOpenChange">
    <AlertDialogTrigger v-if="$slots.trigger" as-child>
      <slot name="trigger" />
    </AlertDialogTrigger>
    <AlertDialogPortal>
      <AlertDialogOverlay class="fixed inset-0 bg-[rgba(17,17,17,0.45)]" />
      <AlertDialogContent :class="contentClass">
        <div class="flex items-center justify-between gap-[var(--space-md)]">
          <AlertDialogTitle v-if="title" :class="titleClass">{{ title }}</AlertDialogTitle>
          <AlertDialogCancel as-child>
            <button class="text-[20px]" type="button" :aria-label="cancelLabel">×</button>
          </AlertDialogCancel>
        </div>
        <AlertDialogDescription
          v-if="description"
          class="text-[14px] leading-[1.6] text-[var(--color-muted-foreground)]"
        >
          {{ description }}
        </AlertDialogDescription>
        <div v-if="$slots.default">
          <slot />
        </div>
        <div v-if="$slots.footer" class="flex justify-end gap-[var(--space-sm)]">
          <slot name="footer" />
        </div>
        <div v-else class="flex justify-end gap-[var(--space-sm)]">
          <AlertDialogCancel as-child>
            <button :class="cancelClass" type="button">
              {{ cancelLabel }}
            </button>
          </AlertDialogCancel>
          <AlertDialogAction as-child>
            <button :class="actionClass" type="button">
              {{ confirmLabel }}
            </button>
          </AlertDialogAction>
        </div>
      </AlertDialogContent>
    </AlertDialogPortal>
  </AlertDialogRoot>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { cva, type VariantProps } from 'class-variance-authority'
import {
  AlertDialogRoot,
  AlertDialogTrigger,
  AlertDialogPortal,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogAction,
  AlertDialogCancel,
} from 'reka-ui'
import { cn } from '../../lib/utils'
import type { AlertDialogRounded, AlertDialogShadow, AlertDialogSize } from '../../lib/props'

const dialogVariants = cva(
  cn(
    'fixed left-1/2 top-1/2 z-10 grid -translate-x-1/2 -translate-y-1/2 border-[var(--border-width-default)] border-[var(--color-border)] bg-[var(--color-card)]'
  ),
  {
    variants: {
      size: {
        sm: 'w-[min(420px,92vw)] p-[var(--space-md)] gap-[var(--space-sm)]',
        md: 'w-[min(560px,92vw)] p-[var(--space-lg)] gap-[var(--space-md)]',
        lg: 'w-[min(720px,92vw)] p-[var(--space-xl)] gap-[var(--space-md)]',
      },
      rounded: {
        none: 'rounded-none',
        sm: 'rounded-[var(--radius-sm)]',
        md: 'rounded-[var(--radius-md)]',
        lg: 'rounded-[var(--radius-lg)]',
        xl: 'rounded-[var(--radius-xl)]',
      },
      shadow: {
        none: '',
        sm: 'shadow-[var(--shadow-sm)]',
        md: 'shadow-[var(--shadow-md)]',
        lg: 'shadow-[var(--shadow-lg)]',
      },
    },
    defaultVariants: {
      size: 'md',
      rounded: 'lg',
      shadow: 'md',
    },
  }
)

const titleVariants = cva('font-semibold', {
  variants: {
    size: {
      sm: 'text-[16px]',
      md: 'text-[18px]',
      lg: 'text-[20px]',
    },
  },
  defaultVariants: {
    size: 'md',
  },
})

type DialogVariants = VariantProps<typeof dialogVariants>
const props = withDefaults(
  defineProps<{
    open: boolean
    onOpenChange?: (open: boolean) => void
    title?: string
    description?: string
    size?: AlertDialogSize
    confirmLabel?: string
    cancelLabel?: string
    rounded?: AlertDialogRounded
    shadow?: AlertDialogShadow
  }>(),
  {
    size: 'md',
    confirmLabel: '確定',
    cancelLabel: 'キャンセル',
    rounded: 'lg',
    shadow: 'md',
  }
)

const handleOpenChange = (value: boolean) => {
  props.onOpenChange?.(value)
}

const contentClass = computed(() =>
  cn(
    dialogVariants({
      size: props.size,
      rounded: props.rounded,
      shadow: props.shadow,
    })
  )
)
const titleClass = computed(() => titleVariants({ size: props.size }))
const cancelClass =
  'inline-flex h-9 items-center justify-center rounded-[var(--radius-md)] border-[var(--border-width-default)] border-[var(--color-border)] bg-[var(--color-card)] px-3 text-[13px] text-[var(--color-foreground)]'
const actionClass =
  'inline-flex h-9 items-center justify-center rounded-[var(--radius-md)] bg-[var(--color-accent)] px-3 text-[13px] text-[var(--color-accent-foreground)]'
</script>
