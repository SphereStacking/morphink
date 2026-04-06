<script setup lang="ts">
defineOptions({ inheritAttrs: false })
import { computed, useAttrs } from 'vue'
import { ProgressRoot, ProgressIndicator } from 'reka-ui'
import { cva } from 'class-variance-authority'
import { cn } from '../../lib/utils'
import type {
  ProgressSize,
  ProgressTone,
  ProgressRounded,
  ProgressDuration,
  ProgressEasing,
} from '../../lib/props'

const roundedVariants = {
  none: 'rounded-none',
  sm: 'rounded-(--morphink-radius-sm)',
  md: 'rounded-(--morphink-radius-md)',
  lg: 'rounded-(--morphink-radius-lg)',
  xl: 'rounded-(--morphink-radius-xl)',
  full: 'rounded-full',
} as const

const rootVariants = cva('relative w-full overflow-hidden bg-(--morphink-color-muted)', {
  variants: {
    size: {
      xs: 'h-0.5',
      sm: 'h-1',
      md: 'h-2',
      lg: 'h-3',
      xl: 'h-4',
    },
    tone: {
      primary: '[--prog-color:var(--morphink-color-primary)]',
      secondary: '[--prog-color:var(--morphink-color-secondary)]',
      tertiary: '[--prog-color:var(--morphink-color-tertiary)]',
      base: '[--prog-color:var(--morphink-color-base)]',
      accent: '[--prog-color:var(--morphink-color-accent)]',
      neutral: '[--prog-color:var(--morphink-color-neutral)]',
      success: '[--prog-color:var(--morphink-color-success)]',
      warning: '[--prog-color:var(--morphink-color-warning)]',
      info: '[--prog-color:var(--morphink-color-info)]',
      destructive: '[--prog-color:var(--morphink-color-destructive)]',
    },
    rounded: roundedVariants,
  },
  defaultVariants: {
    size: 'md',
    tone: 'primary',
    rounded: 'full',
  },
})

const props = withDefaults(
  defineProps<{
    value?: number
    max?: number
    size?: ProgressSize
    tone?: ProgressTone
    rounded?: ProgressRounded
    duration?: ProgressDuration
    easing?: ProgressEasing
  }>(),
  {
    max: 100,
    size: 'md',
    tone: 'primary',
    rounded: 'full',
    duration: 'normal',
    easing: 'standard',
  }
)

const durationMap: Record<ProgressDuration, string> = {
  instant: 'var(--morphink-duration-instant)',
  fast: 'var(--morphink-duration-fast)',
  normal: 'var(--morphink-duration-normal)',
  slow: 'var(--morphink-duration-slow)',
  slower: 'var(--morphink-duration-slower)',
}

const easingMap: Record<ProgressEasing, string> = {
  standard: 'var(--morphink-easing-standard)',
  decelerate: 'var(--morphink-easing-decelerate)',
  accelerate: 'var(--morphink-easing-accelerate)',
  'emphasized-decelerate': 'var(--morphink-easing-emphasized-decelerate)',
  'emphasized-accelerate': 'var(--morphink-easing-emphasized-accelerate)',
  linear: 'var(--morphink-easing-linear)',
  spring: 'var(--morphink-easing-spring)',
}

const attrs = useAttrs()

const rootClasses = computed(() =>
  cn(
    rootVariants({
      size: props.size,
      tone: props.tone,
      rounded: props.rounded,
    }),
    attrs.class as string
  )
)

const isIndeterminate = computed(() => props.value === undefined)

const percentage = computed(() => {
  if (isIndeterminate.value) return 0
  return ((props.value as number) / (props.max as number)) * 100
})

const indicatorClasses = computed(() =>
  cn(
    'h-full bg-(--prog-color)',
    '[transition-property:width]',
    roundedVariants[props.rounded ?? 'full'],
    isIndeterminate.value && 'mi-progress-anim w-1/3'
  )
)

const indicatorStyle = computed(() => {
  const base = {
    transitionDuration: durationMap[props.duration],
    transitionTimingFunction: easingMap[props.easing],
  }
  if (isIndeterminate.value) return base
  return { ...base, width: `${percentage.value}%` }
})
</script>

<template>
  <ProgressRoot
    data-morphink
    v-bind="{ ...attrs, class: undefined }"
    :model-value="value"
    :max="max"
    :class="rootClasses"
  >
    <ProgressIndicator :class="indicatorClasses" :style="indicatorStyle" />
  </ProgressRoot>
</template>

<style scoped>
.mi-progress-anim {
  animation: mi-progress-indeterminate 1.5s var(--morphink-easing-standard) infinite;
}

@keyframes mi-progress-indeterminate {
  0% {
    translate: -100% 0;
  }
  100% {
    translate: 200% 0;
  }
}
</style>
