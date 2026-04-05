<script setup lang="ts">
defineOptions({ inheritAttrs: false })
import { computed, useAttrs } from 'vue'
import { SliderRoot, SliderTrack, SliderRange, SliderThumb, useForwardPropsEmits } from 'reka-ui'
import { cva } from 'class-variance-authority'
import { cn } from '../../lib/utils'
import type { SliderSize, SliderTone } from '../../lib/props'

const rootVariants = cva(
  'relative flex touch-none select-none items-center disabled:opacity-(--morphink-opacity-disabled) disabled:cursor-not-allowed w-full',
  {
    variants: {
      tone: {
        primary:
          '[--sld-color:var(--morphink-color-primary)] [--ring-color:var(--morphink-color-primary)]',
        secondary:
          '[--sld-color:var(--morphink-color-secondary)] [--ring-color:var(--morphink-color-secondary)]',
        tertiary:
          '[--sld-color:var(--morphink-color-tertiary)] [--ring-color:var(--morphink-color-tertiary)]',
        base: '[--sld-color:var(--morphink-color-base)] [--ring-color:var(--morphink-color-ring)]',
        accent:
          '[--sld-color:var(--morphink-color-accent)] [--ring-color:var(--morphink-color-accent)]',
        neutral:
          '[--sld-color:var(--morphink-color-neutral)] [--ring-color:var(--morphink-color-neutral)]',
        success:
          '[--sld-color:var(--morphink-color-success)] [--ring-color:var(--morphink-color-success)]',
        warning:
          '[--sld-color:var(--morphink-color-warning)] [--ring-color:var(--morphink-color-warning)]',
        info: '[--sld-color:var(--morphink-color-info)] [--ring-color:var(--morphink-color-info)]',
        destructive:
          '[--sld-color:var(--morphink-color-destructive)] [--ring-color:var(--morphink-color-destructive)]',
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
    '[transition-property:box-shadow]',
    '[transition-duration:var(--morphink-duration-fast)]',
    '[transition-timing-function:var(--morphink-easing-standard)]',
    'focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-(--ring-color) focus-visible:ring-offset-2',
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
