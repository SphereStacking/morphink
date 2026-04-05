<script setup lang="ts">
import { computed } from 'vue'
import { cva } from 'class-variance-authority'
import { ToastRoot, ToastTitle, ToastDescription, ToastAction, ToastClose } from 'reka-ui'
import { cn } from '../../lib/utils'
import IconClose from '../icons/IconClose.vue'
import type { ToastTone, ToastVariant } from '../../lib/props'

const toastVariants = cva(
  cn(
    'group pointer-events-auto relative flex w-full items-center justify-between gap-(--morphink-space-md)',
    'overflow-hidden rounded-(--morphink-radius-lg) p-(--morphink-space-md)',
    'data-[state=open]:animate-[mi-toast-in_var(--morphink-motion-enter)_both]',
    'data-[state=closed]:animate-[mi-toast-out_var(--morphink-motion-leave)_forwards]',
    'data-[swipe=move]:translate-x-[var(--reka-toast-swipe-move-x)]',
    'data-[swipe=cancel]:translate-x-0 data-[swipe=cancel]:[transition-property:translate] data-[swipe=cancel]:[transition-duration:var(--morphink-duration-fast)] data-[swipe=cancel]:[transition-timing-function:var(--morphink-easing-spring)]',
    'data-[swipe=end]:animate-[mi-toast-out_var(--morphink-motion-leave)_forwards]'
  ),
  {
    variants: {
      variant: {
        solid: 'text-(--tst-fg)',
        outline: cn(
          'border border-(--morphink-border-width-default) bg-transparent',
          'text-(--tst-accent) border-(color:--tst-color)'
        ),
        soft: 'text-(--tst-accent)',
      },
      tone: {
        info: cn(
          '[--tst-color:var(--morphink-color-info)]',
          '[--tst-fg:var(--morphink-color-info-foreground)]',
          '[--tst-accent:var(--morphink-color-info)]'
        ),
        success: cn(
          '[--tst-color:var(--morphink-color-success)]',
          '[--tst-fg:var(--morphink-color-success-foreground)]',
          '[--tst-accent:var(--morphink-color-success)]'
        ),
        warning: cn(
          '[--tst-color:var(--morphink-color-warning)]',
          '[--tst-fg:var(--morphink-color-warning-foreground)]',
          '[--tst-accent:var(--morphink-color-warning)]'
        ),
        destructive: cn(
          '[--tst-color:var(--morphink-color-destructive)]',
          '[--tst-fg:var(--morphink-color-destructive-foreground)]',
          '[--tst-accent:var(--morphink-color-destructive)]'
        ),
        neutral: cn(
          '[--tst-color:var(--morphink-color-neutral)]',
          '[--tst-fg:var(--morphink-color-neutral-foreground)]',
          '[--tst-accent:var(--morphink-color-neutral-foreground)]'
        ),
      },
    },
    compoundVariants: [
      { variant: 'solid', class: 'bg-(--tst-color)' },
      { variant: 'soft', class: 'bg-[color-mix(in_srgb,var(--tst-color)_12%,transparent)]' },
      {
        tone: 'neutral',
        variant: 'solid',
        class:
          'border border-(--morphink-border-width-default) border-(color:--morphink-color-neutral-foreground)',
      },
      {
        tone: 'neutral',
        variant: 'soft',
        class: 'bg-(--morphink-color-muted) [--tst-accent:var(--morphink-color-foreground)]',
      },
      {
        tone: 'neutral',
        variant: 'outline',
        class: '[--tst-accent:var(--morphink-color-foreground)]',
      },
    ],
    defaultVariants: {
      variant: 'soft',
      tone: 'neutral',
    },
  }
)

const props = withDefaults(
  defineProps<{
    title?: string
    description?: string
    tone?: ToastTone
    variant?: ToastVariant
    duration?: number
    closable?: boolean
    actionLabel?: string
    open?: boolean
  }>(),
  {
    variant: 'soft',
    tone: 'neutral',
    duration: 5000,
    closable: true,
    open: true,
  }
)

defineEmits<{
  'update:open': [value: boolean]
  action: []
}>()

const rootClass = computed(() =>
  cn(
    toastVariants({
      variant: props.variant,
      tone: props.tone,
    })
  )
)
</script>

<template>
  <ToastRoot
    data-morphink
    :class="rootClass"
    :duration="duration"
    :open="open"
    @update:open="$emit('update:open', $event)"
  >
    <div class="flex-1 min-w-0 grid gap-(--morphink-space-xs)">
      <ToastTitle v-if="title" class="text-[14px] font-semibold">
        {{ title }}
      </ToastTitle>
      <ToastDescription v-if="description" class="text-[13px] opacity-80">
        {{ description }}
      </ToastDescription>
    </div>
    <div class="flex items-center gap-(--morphink-space-xs) shrink-0">
      <ToastAction v-if="actionLabel" as-child :alt-text="actionLabel">
        <button
          type="button"
          :class="
            cn(
              'inline-flex items-center justify-center rounded-(--morphink-radius-sm)',
              'h-7 px-(--morphink-space-sm) text-[13px] font-medium',
              'border border-(--morphink-border-width-default) border-current/20',
              'cursor-pointer',
              '[transition-property:background-color,opacity] [transition-duration:var(--morphink-duration-fast)] [transition-timing-function:var(--morphink-easing-standard)]',
              'hover:opacity-80'
            )
          "
          @click="$emit('action')"
        >
          {{ actionLabel }}
        </button>
      </ToastAction>
      <ToastClose v-if="closable" as-child>
        <button
          type="button"
          :class="
            cn(
              'shrink-0 inline-flex items-center justify-center rounded-(--morphink-radius-sm)',
              'size-6 cursor-pointer',
              'opacity-70 hover:opacity-100',
              '[transition-property:opacity] [transition-duration:var(--morphink-duration-fast)] [transition-timing-function:var(--morphink-easing-standard)]'
            )
          "
          aria-label="Close"
        >
          <IconClose class="size-4" />
        </button>
      </ToastClose>
    </div>
  </ToastRoot>
</template>
