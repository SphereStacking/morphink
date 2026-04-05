<script setup lang="ts">
defineOptions({ inheritAttrs: false })
import { computed, ref, useAttrs } from 'vue'
import { cva } from 'class-variance-authority'
import { cn } from '../../lib/utils'
import IconClose from '../icons/IconClose.vue'
import type { AlertRounded, AlertTone, AlertVariant } from '../../lib/props'

const alertVariants = cva(
  cn(
    'relative w-full px-(--morphink-space-lg) py-(--morphink-space-md) flex gap-(--morphink-space-sm)'
  ),
  {
    variants: {
      variant: {
        solid: 'bg-(--alert-color) text-(--alert-fg)',
        outline: cn(
          'border border-(--morphink-border-width-default) bg-transparent',
          'text-(--alert-accent) border-(color:--alert-color)'
        ),
        soft: 'bg-[color-mix(in_srgb,var(--alert-color)_12%,transparent)] text-(--alert-accent)',
      },
      tone: {
        info: cn(
          '[--alert-color:var(--morphink-color-info)]',
          '[--alert-fg:var(--morphink-color-info-foreground)]',
          '[--alert-accent:var(--morphink-color-info)]'
        ),
        success: cn(
          '[--alert-color:var(--morphink-color-success)]',
          '[--alert-fg:var(--morphink-color-success-foreground)]',
          '[--alert-accent:var(--morphink-color-success)]'
        ),
        warning: cn(
          '[--alert-color:var(--morphink-color-warning)]',
          '[--alert-fg:var(--morphink-color-warning-foreground)]',
          '[--alert-accent:var(--morphink-color-warning)]'
        ),
        destructive: cn(
          '[--alert-color:var(--morphink-color-destructive)]',
          '[--alert-fg:var(--morphink-color-destructive-foreground)]',
          '[--alert-accent:var(--morphink-color-destructive)]'
        ),
        neutral: cn(
          '[--alert-color:var(--morphink-color-neutral)]',
          '[--alert-fg:var(--morphink-color-neutral-foreground)]',
          '[--alert-accent:var(--morphink-color-neutral-foreground)]'
        ),
      },
      rounded: {
        none: 'rounded-none',
        sm: 'rounded-(--morphink-radius-sm)',
        md: 'rounded-(--morphink-radius-md)',
        lg: 'rounded-(--morphink-radius-lg)',
        xl: 'rounded-(--morphink-radius-xl)',
      },
    },
    compoundVariants: [
      {
        tone: 'neutral',
        variant: 'solid',
        class:
          'border border-(--morphink-border-width-default) border-(color:--morphink-color-neutral-foreground)',
      },
      {
        tone: 'neutral',
        variant: 'soft',
        class: 'bg-(--morphink-color-muted) [--alert-accent:var(--morphink-color-foreground)]',
      },
      {
        tone: 'neutral',
        variant: 'outline',
        class: '[--alert-accent:var(--morphink-color-foreground)]',
      },
    ],
    defaultVariants: {
      variant: 'soft',
      tone: 'info',
      rounded: 'lg',
    },
  }
)

const props = withDefaults(
  defineProps<{
    variant?: AlertVariant
    tone?: AlertTone
    rounded?: AlertRounded
    dismissible?: boolean
  }>(),
  {
    variant: 'soft',
    tone: 'info',
    rounded: 'lg',
    dismissible: false,
  }
)

const emit = defineEmits<{
  (e: 'close'): void
}>()

const dismissed = ref(false)

function handleClose() {
  dismissed.value = true
  emit('close')
}

const attrs = useAttrs()
const classes = computed(() =>
  cn(
    alertVariants({
      variant: props.variant,
      tone: props.tone,
      rounded: props.rounded,
    }),
    dismissed.value && 'mi-alert-dismiss-anim',
    attrs.class
  )
)
</script>

<template>
  <div v-if="!dismissed" data-morphink role="alert" :class="classes" v-bind="attrs">
    <div class="flex-1 min-w-0">
      <slot />
    </div>
    <button
      v-if="dismissible"
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
      @click="handleClose"
    >
      <IconClose class="size-4" />
    </button>
  </div>
</template>

<style scoped>
.mi-alert-dismiss-anim {
  animation: mi-alert-dismiss var(--morphink-motion-leave) forwards;
}

@keyframes mi-alert-dismiss {
  to {
    opacity: 0;
    scale: 0.98;
  }
}
</style>
