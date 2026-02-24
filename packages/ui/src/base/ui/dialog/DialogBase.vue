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
    'fixed left-1/2 top-1/2 z-10 grid -translate-x-1/2 -translate-y-1/2 border-(--morphink-border-width-default) border-(--morphink-color-border) bg-(--morphink-color-card)'
  ),
  {
    variants: {
      size: {
        sm: 'w-[min(420px,92vw)] p-(--morphink-space-md) gap-(--morphink-space-sm)',
        md: 'w-[min(560px,92vw)] p-(--morphink-space-lg) gap-(--morphink-space-md)',
        lg: 'w-[min(720px,92vw)] p-(--morphink-space-xl) gap-(--morphink-space-md)',
      },
      rounded: {
        none: 'rounded-none',
        sm: 'rounded-(--morphink-radius-sm)',
        md: 'rounded-(--morphink-radius-md)',
        lg: 'rounded-(--morphink-radius-lg)',
        xl: 'rounded-(--morphink-radius-xl)',
      },
      shadow: {
        none: '',
        sm: 'shadow-(--morphink-shadow-sm)',
        md: 'shadow-(--morphink-shadow-md)',
        lg: 'shadow-(--morphink-shadow-lg)',
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
    closeLabel: 'Close',
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

<template>
  <DialogRoot :open="open" @update:open="handleOpenChange">
    <DialogTrigger v-if="$slots.trigger" as-child>
      <slot name="trigger" />
    </DialogTrigger>
    <DialogPortal>
      <DialogOverlay class="fixed inset-0 bg-(--morphink-color-scrim)" />
      <DialogContent :class="contentClass">
        <div class="flex items-center justify-between gap-(--morphink-space-md)">
          <DialogTitle v-if="title" :class="titleClass">{{ title }}</DialogTitle>
          <DialogClose as-child>
            <button class="text-[20px]" type="button" :aria-label="closeLabel">×</button>
          </DialogClose>
        </div>
        <DialogDescription
          v-if="description"
          class="text-[14px] leading-[1.6] text-(--morphink-color-muted-foreground)"
        >
          {{ description }}
        </DialogDescription>
        <div v-if="$slots.default">
          <slot />
        </div>
        <div v-if="$slots.footer" class="flex justify-end gap-(--morphink-space-sm)">
          <slot name="footer" />
        </div>
      </DialogContent>
    </DialogPortal>
  </DialogRoot>
</template>
