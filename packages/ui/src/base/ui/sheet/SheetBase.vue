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
import type { SheetRounded, SheetShadow, SheetSize } from '../../lib/props'

const sheetVariants = cva(
  cn(
    'z-modal fixed flex flex-col overflow-hidden bg-(--morphink-color-card)',
    'focus:outline-hidden'
  ),
  {
    variants: {
      side: {
        left: 'inset-y-0 left-0 [--mi-sheet-translate:-100%_0]',
        right: 'inset-y-0 right-0 [--mi-sheet-translate:100%_0]',
        top: 'inset-x-0 top-0 [--mi-sheet-translate:0_-100%]',
        bottom: 'inset-x-0 bottom-0 [--mi-sheet-translate:0_100%]',
      },
      shadow: {
        none: '',
        sm: 'shadow-(--morphink-shadow-sm)',
        md: 'shadow-(--morphink-shadow-md)',
        lg: 'shadow-(--morphink-shadow-lg)',
      },
    },
    defaultVariants: {
      side: 'right',
      shadow: 'lg',
    },
  }
)

const props = withDefaults(
  defineProps<{
    open?: boolean
    defaultOpen?: boolean
    modal?: boolean
    side?: 'left' | 'right' | 'top' | 'bottom'
    title?: string
    description?: string
    closeLabel?: string
    size?: SheetSize
    rounded?: SheetRounded
    shadow?: SheetShadow
  }>(),
  {
    modal: undefined,
    side: 'right',
    closeLabel: 'Close',
    size: 'md',
    rounded: 'none',
    shadow: 'lg',
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

const sizeClass = computed(() => {
  const isVertical = props.side === 'left' || props.side === 'right'
  const sizeMap = {
    xs: isVertical ? 'w-[280px]' : 'h-[200px]',
    sm: isVertical ? 'w-[360px]' : 'h-[280px]',
    md: isVertical ? 'w-[480px]' : 'h-[360px]',
    lg: isVertical ? 'w-[640px]' : 'h-[480px]',
    xl: isVertical ? 'w-[800px]' : 'h-[600px]',
  }
  return sizeMap[props.size ?? 'md']
})

const roundedClass = computed(() => {
  const r = props.rounded ?? 'none'
  if (r === 'none') return ''
  const tokenMap: Record<string, string> = {
    sm: 'var(--morphink-radius-sm)',
    md: 'var(--morphink-radius-md)',
    lg: 'var(--morphink-radius-lg)',
    xl: 'var(--morphink-radius-xl)',
  }
  const token = tokenMap[r]
  if (!token) return ''
  const sideRoundedMap: Record<string, string> = {
    left: `rounded-r-[${token}]`,
    right: `rounded-l-[${token}]`,
    top: `rounded-b-[${token}]`,
    bottom: `rounded-t-[${token}]`,
  }
  return sideRoundedMap[props.side ?? 'right'] ?? ''
})

const contentClass = computed(() =>
  cn(sheetVariants({ side: props.side, shadow: props.shadow }), sizeClass.value, roundedClass.value)
)
</script>

<template>
  <DialogRoot v-bind="forwarded">
    <DialogTrigger v-if="$slots.trigger" as-child>
      <slot name="trigger" />
    </DialogTrigger>
    <DialogPortal>
      <DialogOverlay
        data-morphink
        class="mi-overlay-anim z-overlay fixed inset-0 bg-(--morphink-color-scrim)"
      />
      <DialogContent data-morphink :class="contentClass" class="mi-sheet-anim">
        <div
          v-if="title || description"
          class="flex items-start justify-between gap-(--morphink-space-md) border-b border-(--morphink-color-border) p-(--morphink-space-lg)"
        >
          <div class="flex flex-col gap-(--morphink-space-xs)">
            <DialogTitle
              v-if="title"
              class="text-base font-semibold text-(--morphink-color-foreground)"
            >
              {{ title }}
            </DialogTitle>
            <DialogDescription
              v-if="description"
              class="text-[14px] leading-[1.6] text-(--morphink-color-muted-foreground)"
            >
              {{ description }}
            </DialogDescription>
          </div>
        </div>
        <div class="flex-1 overflow-y-auto p-(--morphink-space-lg)">
          <slot />
        </div>
        <div
          v-if="$slots.footer"
          class="border-t border-(--morphink-color-border) p-(--morphink-space-lg)"
        >
          <slot name="footer" />
        </div>
        <DialogClose as-child>
          <button
            class="absolute top-(--morphink-space-md) right-(--morphink-space-md) inline-flex size-9 items-center justify-center rounded-(--morphink-radius-sm) text-(--morphink-color-muted-foreground) [transition-property:background-color,color] [transition-duration:var(--morphink-duration-fast)] [transition-timing-function:var(--morphink-easing-standard)] hover:bg-(--morphink-color-muted) hover:text-(--morphink-color-foreground) focus-visible:ring-(--morphink-color-ring) focus-visible:ring-(--morphink-ring-width) focus-visible:outline-hidden"
            type="button"
            :aria-label="closeLabel"
          >
            <IconClose class="size-4" aria-hidden="true" />
          </button>
        </DialogClose>
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

@keyframes mi-sheet-in {
  from {
    translate: var(--mi-sheet-translate);
  }
}

@keyframes mi-sheet-out {
  to {
    translate: var(--mi-sheet-translate);
  }
}

.mi-overlay-anim[data-state='open'] {
  animation: mi-overlay-in var(--morphink-motion-enter) both;
}
.mi-overlay-anim[data-state='closed'] {
  animation: mi-overlay-out var(--morphink-motion-leave) 50ms forwards;
}
.mi-sheet-anim[data-state='open'] {
  animation: mi-sheet-in var(--morphink-motion-enter) both;
}
.mi-sheet-anim[data-state='closed'] {
  animation: mi-sheet-out var(--morphink-motion-leave) forwards;
}
</style>
