<script setup lang="ts">
defineOptions({ inheritAttrs: false })
import { computed, useAttrs } from 'vue'
import { SliderRoot, SliderTrack, SliderRange, SliderThumb, useForwardPropsEmits } from 'reka-ui'
import { cva } from 'class-variance-authority'
import { cn } from '../../lib/utils'
import type { SliderSize, SliderTone } from '../../lib/props'

const rootVariants = cva(
  'relative flex w-full touch-none items-center select-none disabled:cursor-not-allowed disabled:opacity-(--morphink-opacity-disabled)',
  {
    variants: {
      tone: {
        primary:
          '[--ring-color:var(--morphink-color-primary)] [--sld-color:var(--morphink-color-primary)]',
        secondary:
          '[--ring-color:var(--morphink-color-secondary)] [--sld-color:var(--morphink-color-secondary)]',
        tertiary:
          '[--ring-color:var(--morphink-color-tertiary)] [--sld-color:var(--morphink-color-tertiary)]',
        base: '[--ring-color:var(--morphink-color-ring)] [--sld-color:var(--morphink-color-base)]',
        accent:
          '[--ring-color:var(--morphink-color-accent)] [--sld-color:var(--morphink-color-accent)]',
        neutral:
          '[--ring-color:var(--morphink-color-neutral)] [--sld-color:var(--morphink-color-neutral)]',
        success:
          '[--ring-color:var(--morphink-color-success)] [--sld-color:var(--morphink-color-success)]',
        warning:
          '[--ring-color:var(--morphink-color-warning)] [--sld-color:var(--morphink-color-warning)]',
        info: '[--ring-color:var(--morphink-color-info)] [--sld-color:var(--morphink-color-info)]',
        destructive:
          '[--ring-color:var(--morphink-color-destructive)] [--sld-color:var(--morphink-color-destructive)]',
      },
    },
    defaultVariants: {
      tone: 'primary',
    },
  }
)

const trackVariants = cva(
  'relative grow overflow-hidden rounded-full bg-(--morphink-color-muted)',
  {
    variants: {
      size: {
        xs: 'h-0.5',
        sm: 'h-1',
        md: 'h-1.5',
        lg: 'h-2',
        xl: 'h-2.5',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  }
)

const rangeVariants = cva('absolute h-full bg-(--sld-color)')

const thumbVariants = cva(
  cn(
    'block rounded-full border-2 border-(color:--sld-color) bg-(--morphink-color-card) shadow-(--morphink-shadow-sm)',
    '[transition-property:box-shadow,transform]',
    '[transition-duration:var(--morphink-duration-fast)]',
    '[transition-timing-function:var(--morphink-easing-standard)]',
    'active:scale-110 active:shadow-(--morphink-shadow-lg)',
    'focus-visible:ring-2 focus-visible:ring-(--ring-color) focus-visible:ring-offset-2 focus-visible:outline-hidden',
    'disabled:pointer-events-none'
  ),
  {
    variants: {
      size: {
        xs: 'size-3',
        sm: 'size-4',
        md: 'size-5',
        lg: 'size-6',
        xl: 'size-7',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  }
)

const props = withDefaults(
  defineProps<{
    modelValue?: number[]
    defaultValue?: number[]
    min?: number
    max?: number
    step?: number
    disabled?: boolean
    orientation?: 'horizontal' | 'vertical'
    size?: SliderSize
    tone?: SliderTone
  }>(),
  {
    min: 0,
    max: 100,
    step: 1,
    disabled: false,
    orientation: 'horizontal',
    size: 'md',
    tone: 'primary',
  }
)

const emit = defineEmits<{
  (e: 'update:modelValue', value: number[]): void
}>()

const rekaProps = computed(() => ({
  ...(props.modelValue !== undefined && { modelValue: props.modelValue }),
  ...(props.defaultValue !== undefined && { defaultValue: props.defaultValue }),
  disabled: props.disabled,
  min: props.min,
  max: props.max,
  step: props.step,
  orientation: props.orientation,
}))

const forwarded = useForwardPropsEmits(rekaProps, emit)

const attrs = useAttrs()

const rootClasses = computed(() =>
  cn(
    rootVariants({
      tone: props.tone,
    }),
    attrs.class
  )
)

const trackClasses = computed(() =>
  trackVariants({
    size: props.size,
  })
)

const rangeClasses = computed(() => rangeVariants())

const thumbClasses = computed(() =>
  thumbVariants({
    size: props.size,
  })
)
</script>

<template>
  <SliderRoot data-morphink v-bind="forwarded" :class="rootClasses">
    <SliderTrack :class="trackClasses">
      <SliderRange :class="rangeClasses" />
    </SliderTrack>
    <SliderThumb :class="thumbClasses" />
  </SliderRoot>
</template>
