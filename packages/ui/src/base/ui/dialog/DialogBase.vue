<script setup lang="ts">
import { computed } from 'vue'
import { cva } from 'class-variance-authority'
import {
  DialogRoot,
  DialogTrigger,
  DialogPortal,
  DialogOverlay,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogClose,
  useForwardPropsEmits,
} from 'reka-ui'
import { cn } from '../../lib/utils'
import IconClose from '../icons/IconClose.vue'
import type { DialogRounded, DialogShadow, DialogSize } from '../../lib/props'

const dialogVariants = cva(
  cn(
    'fixed left-1/2 top-1/2 z-10 grid -translate-x-1/2 -translate-y-1/2 border-(--morphink-border-width-default) border-(--morphink-color-border) bg-(--morphink-color-card)'
  ),
  {
    variants: {
      size: {
        xs: 'w-[min(320px,92vw)] p-(--morphink-space-sm) gap-(--morphink-space-xs)',
        sm: 'w-[min(420px,92vw)] p-(--morphink-space-md) gap-(--morphink-space-sm)',
        md: 'w-[min(560px,92vw)] p-(--morphink-space-lg) gap-(--morphink-space-md)',
        lg: 'w-[min(720px,92vw)] p-(--morphink-space-xl) gap-(--morphink-space-md)',
        xl: 'w-[min(900px,92vw)] p-(--morphink-space-2xl) gap-(--morphink-space-lg)',
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
    modal?: boolean
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

const emit = defineEmits<{
  'update:open': [value: boolean]
}>()

const rekaProps = computed(() => ({
  ...(props.open !== undefined && { open: props.open }),
  ...(props.defaultOpen !== undefined && { defaultOpen: props.defaultOpen }),
  ...(props.modal !== undefined && { modal: props.modal }),
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
</script>

<template>
  <DialogRoot v-bind="forwarded">
    <DialogTrigger v-if="$slots.trigger" as-child>
      <slot name="trigger" />
    </DialogTrigger>
    <DialogPortal>
      <DialogOverlay
        data-morphink
        class="fixed inset-0 bg-(--morphink-color-scrim) mi-overlay-anim"
      />
      <DialogContent
        data-morphink
        :class="contentClass"
        class="mi-dialog-anim"
      >
        <div class="flex items-center justify-between gap-(--morphink-space-md)">
          <DialogTitle v-if="title" :class="titleClass">{{ title }}</DialogTitle>
          <DialogClose as-child>
            <button
              class="inline-flex size-9 items-center justify-center rounded-(--morphink-radius-sm) text-(--morphink-color-muted-foreground) [transition-property:background-color,color] [transition-duration:var(--morphink-duration-fast)] [transition-timing-function:var(--morphink-easing-standard)] hover:bg-(--morphink-color-muted) hover:text-(--morphink-color-foreground) focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-(--morphink-color-ring)"
              type="button"
              :aria-label="closeLabel"
            >
              <IconClose class="size-4" aria-hidden="true" />
            </button>
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

.mi-overlay-anim[data-state="open"] {
  animation: mi-overlay-in var(--morphink-motion-enter) both;
}
.mi-overlay-anim[data-state="closed"] {
  animation: mi-overlay-out var(--morphink-motion-leave) 50ms forwards;
}

.mi-dialog-anim[data-state="open"] {
  animation: mi-dialog-in var(--morphink-motion-enter) 50ms both;
}
.mi-dialog-anim[data-state="closed"] {
  animation: mi-dialog-out var(--morphink-motion-leave) forwards;
}
</style>
