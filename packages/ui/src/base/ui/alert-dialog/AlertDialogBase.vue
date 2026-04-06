<script setup lang="ts">
import { computed } from 'vue'
import { cva } from 'class-variance-authority'
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
  useForwardPropsEmits,
} from 'reka-ui'
import IconClose from '../icons/IconClose.vue'
import { cn } from '../../lib/utils'
import type { AlertDialogRounded, AlertDialogShadow, AlertDialogSize } from '../../lib/props'

const dialogVariants = cva(
  cn(
    'fixed top-1/2 left-1/2 z-modal grid -translate-x-1/2 -translate-y-1/2 border-(--morphink-border-width-default) border-(--morphink-color-border) bg-(--morphink-color-card)'
  ),
  {
    variants: {
      size: {
        xs: 'w-[min(320px,92vw)] gap-(--morphink-space-xs) p-(--morphink-space-sm)',
        sm: 'w-[min(420px,92vw)] gap-(--morphink-space-sm) p-(--morphink-space-md)',
        md: 'w-[min(560px,92vw)] gap-(--morphink-space-md) p-(--morphink-space-lg)',
        lg: 'w-[min(720px,92vw)] gap-(--morphink-space-md) p-(--morphink-space-xl)',
        xl: 'w-[min(900px,92vw)] gap-(--morphink-space-lg) p-(--morphink-space-2xl)',
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
      xs: 'text-[14px]',
      sm: 'text-[16px]',
      md: 'text-[18px]',
      lg: 'text-[20px]',
      xl: 'text-[24px]',
    },
  },
  defaultVariants: {
    size: 'md',
  },
})

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
    confirmLabel: 'Confirm',
    cancelLabel: 'Cancel',
    rounded: 'lg',
    shadow: 'md',
  }
)

const emit = defineEmits<{
  'update:open': [value: boolean]
}>()

const rekaProps = computed(() => ({
  ...(props.open !== undefined && { open: props.open }),
  ...(props.defaultOpen !== undefined && { defaultOpen: props.defaultOpen }),
}))
const forwarded = useForwardPropsEmits(rekaProps, emit)

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
const buttonSizeMap: Record<string, string> = {
  xs: 'h-7 px-2 text-xs',
  sm: 'h-8 px-3 text-xs',
  md: 'h-9 px-3 text-[13px]',
  lg: 'h-10 px-4 text-sm',
  xl: 'h-11 px-5 text-base',
}
const cancelClass = computed(() =>
  cn(
    'inline-flex items-center justify-center rounded-(--morphink-radius-md) border-(--morphink-border-width-default) border-(--morphink-color-border) bg-(--morphink-color-card) text-(--morphink-color-foreground) [transition-property:background-color,color,border-color] [transition-duration:var(--morphink-duration-fast)] [transition-timing-function:var(--morphink-easing-standard)] hover:bg-(--morphink-color-muted) focus-visible:ring-(--morphink-ring-width) focus-visible:ring-(--morphink-color-ring) focus-visible:outline-hidden',
    buttonSizeMap[props.size ?? 'md']
  )
)
const actionClass = computed(() =>
  cn(
    'inline-flex items-center justify-center rounded-(--morphink-radius-md) bg-(--morphink-color-accent) text-(--morphink-color-accent-foreground) [transition-property:background-color,color] [transition-duration:var(--morphink-duration-fast)] [transition-timing-function:var(--morphink-easing-standard)] hover:bg-(--morphink-color-accent-hover) focus-visible:ring-(--morphink-ring-width) focus-visible:ring-(--morphink-color-accent) focus-visible:outline-hidden',
    buttonSizeMap[props.size ?? 'md']
  )
)
</script>

<template>
  <AlertDialogRoot v-bind="forwarded">
    <AlertDialogTrigger v-if="$slots.trigger" as-child>
      <slot name="trigger" />
    </AlertDialogTrigger>
    <AlertDialogPortal>
      <AlertDialogOverlay
        data-morphink
        class="mi-overlay-anim fixed inset-0 z-overlay bg-(--morphink-color-scrim)"
      />
      <AlertDialogContent data-morphink :class="contentClass" class="mi-dialog-anim">
        <div class="flex items-center justify-between gap-(--morphink-space-md)">
          <AlertDialogTitle v-if="title" :class="titleClass">{{ title }}</AlertDialogTitle>
          <AlertDialogCancel as-child>
            <button
              class="inline-flex size-9 items-center justify-center rounded-(--morphink-radius-sm) text-(--morphink-color-muted-foreground) [transition-property:background-color,color] [transition-duration:var(--morphink-duration-fast)] [transition-timing-function:var(--morphink-easing-standard)] hover:bg-(--morphink-color-muted) hover:text-(--morphink-color-foreground) focus-visible:ring-(--morphink-ring-width) focus-visible:ring-(--morphink-color-ring) focus-visible:outline-hidden"
              type="button"
              :aria-label="cancelLabel"
            >
              <IconClose class="size-4" aria-hidden="true" />
            </button>
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

<style scoped>
@keyframes mi-overlay-in {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
@keyframes mi-overlay-out {
  to {
    opacity: 0;
  }
}
@keyframes mi-dialog-in {
  from {
    opacity: 0;
    scale: 0.95;
    transform: translateY(8px);
  }
}
@keyframes mi-dialog-out {
  to {
    opacity: 0;
    scale: 0.95;
    transform: translateY(8px);
  }
}
.mi-overlay-anim[data-state='open'] {
  animation: mi-overlay-in var(--morphink-motion-enter) both;
}
.mi-overlay-anim[data-state='closed'] {
  animation: mi-overlay-out var(--morphink-motion-leave) 50ms forwards;
}
.mi-dialog-anim[data-state='open'] {
  animation: mi-dialog-in var(--morphink-motion-enter) 50ms both;
}
.mi-dialog-anim[data-state='closed'] {
  animation: mi-dialog-out var(--morphink-motion-leave) forwards;
}
</style>
