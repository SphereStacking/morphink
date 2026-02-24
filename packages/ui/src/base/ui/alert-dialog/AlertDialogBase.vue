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
    open?: boolean
    defaultOpen?: boolean
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

const emit = defineEmits<{
  'update:open': [value: boolean]
}>()

const rootProps = computed(() => {
  const result: Record<string, unknown> = {}
  if (props.open !== undefined) result.open = props.open
  if (props.defaultOpen !== undefined) result.defaultOpen = props.defaultOpen
  return result
})

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
  'inline-flex h-9 items-center justify-center rounded-(--morphink-radius-md) border-(--morphink-border-width-default) border-(--morphink-color-border) bg-(--morphink-color-card) px-3 text-[13px] text-(--morphink-color-foreground)'
const actionClass =
  'inline-flex h-9 items-center justify-center rounded-(--morphink-radius-md) bg-(--morphink-color-accent) px-3 text-[13px] text-(--morphink-color-accent-foreground)'
</script>

<template>
  <AlertDialogRoot v-bind="rootProps" @update:open="emit('update:open', $event)">
    <AlertDialogTrigger v-if="$slots.trigger" as-child>
      <slot name="trigger" />
    </AlertDialogTrigger>
    <AlertDialogPortal>
      <AlertDialogOverlay class="fixed inset-0 bg-(--morphink-color-scrim)" />
      <AlertDialogContent :class="contentClass">
        <div class="flex items-center justify-between gap-(--morphink-space-md)">
          <AlertDialogTitle v-if="title" :class="titleClass">{{ title }}</AlertDialogTitle>
          <AlertDialogCancel as-child>
            <button class="text-[20px]" type="button" :aria-label="cancelLabel">×</button>
          </AlertDialogCancel>
        </div>
        <AlertDialogDescription
          v-if="description"
          class="text-[14px] leading-[1.6] text-(--morphink-color-muted-foreground)"
        >
          {{ description }}
        </AlertDialogDescription>
        <div v-if="$slots.default">
          <slot />
        </div>
        <div v-if="$slots.footer" class="flex justify-end gap-(--morphink-space-sm)">
          <slot name="footer" />
        </div>
        <div v-else class="flex justify-end gap-(--morphink-space-sm)">
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
