<template>
  <DialogRoot :open="open" @update:open="handleOpenChange">
    <DialogTrigger v-if="$slots.trigger" as-child>
      <slot name="trigger" />
    </DialogTrigger>
    <DialogPortal>
      <DialogOverlay class="fixed inset-0 bg-[rgba(17,17,17,0.45)]" />
      <DialogContent :class="contentClass">
        <div class="flex items-center justify-between gap-(--space-md)">
          <DialogTitle v-if="title" :class="titleClass">{{ title }}</DialogTitle>
          <DialogClose as-child>
            <button class="text-[20px]" type="button" :aria-label="closeLabel">×</button>
          </DialogClose>
        </div>
        <DialogDescription
          v-if="description"
          class="text-[14px] leading-[1.6] text-(--color-muted-foreground)"
        >
          {{ description }}
        </DialogDescription>
        <div v-if="$slots.default">
          <slot />
        </div>
        <div v-if="$slots.footer" class="flex justify-end gap-(--space-sm)">
          <slot name="footer" />
        </div>
      </DialogContent>
    </DialogPortal>
  </DialogRoot>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { cva, type VariantProps } from 'class-variance-authority'
import {
  DialogRoot,
  DialogTrigger,
  DialogPortal,
  DialogOverlay,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from 'reka-ui'
import { cn } from '../../lib/utils'
import type { DialogRounded, DialogShadow, DialogSize } from '../../lib/props'

const dialogVariants = cva(
  cn(
    'fixed left-1/2 top-1/2 z-10 grid -translate-x-1/2 -translate-y-1/2 border-(--border-width-default) border-(--color-border) bg-(--color-card)'
  ),
  {
    variants: {
      size: {
        sm: 'w-[min(420px,92vw)] p-(--space-md) gap-(--space-sm)',
        md: 'w-[min(560px,92vw)] p-(--space-lg) gap-(--space-md)',
        lg: 'w-[min(720px,92vw)] p-(--space-xl) gap-(--space-md)',
      },
      rounded: {
        none: 'rounded-none',
        sm: 'rounded-(--radius-sm)',
        md: 'rounded-(--radius-md)',
        lg: 'rounded-(--radius-lg)',
        xl: 'rounded-(--radius-xl)',
      },
      shadow: {
        none: '',
        sm: 'shadow-(--shadow-sm)',
        md: 'shadow-(--shadow-md)',
        lg: 'shadow-(--shadow-lg)',
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
    closeLabel?: string
    size?: DialogSize
    rounded?: DialogRounded
    shadow?: DialogShadow
  }>(),
  {
    size: 'md',
    closeLabel: '閉じる',
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
</script>
