<script setup lang="ts">
defineOptions({ inheritAttrs: false })
import { computed, inject, ref, useAttrs } from 'vue'
import { RadioGroupItem, RadioGroupIndicator } from 'reka-ui'
import { cva } from 'class-variance-authority'
import { cn } from '../../lib/utils'
import type {
  RadioSize,
  RadioTone,
  RadioVariant,
  RadioDuration,
  RadioEasing,
} from '../../lib/props'
import {
  radioSizeKey,
  radioVariantKey,
  radioToneKey,
  radioDurationKey,
  radioEasingKey,
} from './radioContext'

const radioVariants = cva(
  cn(
    'relative inline-flex shrink-0 items-center justify-center rounded-full border',
    '[transition-property:border-color,box-shadow]',
    'before:absolute before:inset-[-10px] before:content-[""]',
    'focus-visible:ring-2 focus-visible:ring-(--ring-color) focus-visible:ring-offset-2 focus-visible:outline-hidden',
    'disabled:cursor-not-allowed disabled:opacity-(--morphink-opacity-disabled)',
    'data-[state=checked]:border-(color:--ctl-color)'
  ),
  {
    variants: {
      variant: {
        outline: cn(
          'border-(color:--morphink-color-border)',
          'data-[state=unchecked]:hover:bg-[color-mix(in_srgb,var(--morphink-color-border)_10%,transparent)]'
        ),
        solid: cn(
          'border-transparent bg-(--morphink-color-muted)',
          'data-[state=unchecked]:hover:bg-[color-mix(in_srgb,var(--ctl-color)_10%,var(--morphink-color-muted))]',
          'data-[state=checked]:bg-(--ctl-color)'
        ),
        ghost: cn(
          'border-(--morphink-color-border)',
          'data-[state=unchecked]:hover:bg-(--morphink-color-muted)'
        ),
        soft: cn(
          'border-transparent',
          'bg-[color-mix(in_srgb,var(--ctl-color)_18%,transparent)]',
          'data-[state=unchecked]:hover:bg-[color-mix(in_srgb,var(--ctl-color)_24%,transparent)]',
          'data-[state=checked]:bg-[color-mix(in_srgb,var(--ctl-color)_65%,transparent)]'
        ),
      },
      tone: {
        primary: cn(
          '[--ctl-color:var(--morphink-color-primary)] [--ctl-fg:var(--morphink-color-primary-foreground)] [--ring-color:var(--morphink-color-primary)]'
        ),
        secondary: cn(
          '[--ctl-color:var(--morphink-color-secondary)] [--ctl-fg:var(--morphink-color-secondary-foreground)] [--ring-color:var(--morphink-color-secondary)]'
        ),
        tertiary: cn(
          '[--ctl-color:var(--morphink-color-tertiary)] [--ctl-fg:var(--morphink-color-tertiary-foreground)] [--ring-color:var(--morphink-color-tertiary)]'
        ),
        base: cn(
          '[--ctl-color:var(--morphink-color-base)] [--ctl-fg:var(--morphink-color-base-foreground)] [--ring-color:var(--morphink-color-ring)]'
        ),
        accent: cn(
          '[--ctl-color:var(--morphink-color-accent)] [--ctl-fg:var(--morphink-color-accent-foreground)] [--ring-color:var(--morphink-color-accent)]'
        ),
        neutral: cn(
          '[--ctl-color:var(--morphink-color-neutral)] [--ctl-fg:var(--morphink-color-neutral-foreground)] [--ring-color:var(--morphink-color-neutral)]'
        ),
        success: cn(
          '[--ctl-color:var(--morphink-color-success)] [--ctl-fg:var(--morphink-color-success-foreground)] [--ring-color:var(--morphink-color-success)]'
        ),
        warning: cn(
          '[--ctl-color:var(--morphink-color-warning)] [--ctl-fg:var(--morphink-color-warning-foreground)] [--ring-color:var(--morphink-color-warning)]'
        ),
        info: cn(
          '[--ctl-color:var(--morphink-color-info)] [--ctl-fg:var(--morphink-color-info-foreground)] [--ring-color:var(--morphink-color-info)]'
        ),
        destructive: cn(
          '[--ctl-color:var(--morphink-color-destructive)] [--ctl-fg:var(--morphink-color-destructive-foreground)] [--ring-color:var(--morphink-color-destructive)]'
        ),
      },
      size: {
        xs: 'size-3.5',
        sm: 'size-4',
        md: 'size-5',
        lg: 'size-6',
        xl: 'size-7',
      },
    },
    compoundVariants: [
      {
        variant: 'soft',
        tone: 'base',
        class: cn(
          'bg-(--morphink-color-muted)',
          'data-[state=unchecked]:hover:bg-[color-mix(in_srgb,var(--ctl-color)_18%,var(--morphink-color-muted))]'
        ),
      },
      {
        variant: 'soft',
        tone: 'neutral',
        class: cn(
          'bg-(--morphink-color-muted)',
          'data-[state=unchecked]:hover:bg-[color-mix(in_srgb,var(--ctl-color)_18%,var(--morphink-color-muted))]'
        ),
      },
    ],
    defaultVariants: {
      variant: 'outline',
      tone: 'primary',
      size: 'md',
    },
  }
)

const dotSizes: Record<RadioSize, string> = {
  xs: 'size-1.5',
  sm: 'size-2',
  md: 'size-2.5',
  lg: 'size-3',
  xl: 'size-3.5',
}

const props = defineProps<{
  value: string
  disabled?: boolean
  id?: string
}>()

const injectedSize = inject(radioSizeKey, ref('md' as RadioSize))
const injectedVariant = inject(radioVariantKey, ref('outline' as RadioVariant))
const injectedTone = inject(radioToneKey, ref('primary' as RadioTone))
const injectedDuration = inject(radioDurationKey, ref('fast' as RadioDuration))
const injectedEasing = inject(radioEasingKey, ref('standard' as RadioEasing))

const resolvedSize = computed(() => injectedSize.value)
const resolvedVariant = computed(() => injectedVariant.value)
const resolvedTone = computed(() => injectedTone.value)
const resolvedDuration = computed(() => injectedDuration.value)
const resolvedEasing = computed(() => injectedEasing.value)

const durationMap: Record<RadioDuration, string> = {
  instant: 'var(--morphink-duration-instant)',
  fast: 'var(--morphink-duration-fast)',
  normal: 'var(--morphink-duration-normal)',
  slow: 'var(--morphink-duration-slow)',
  slower: 'var(--morphink-duration-slower)',
}

const easingMap: Record<RadioEasing, string> = {
  standard: 'var(--morphink-easing-standard)',
  decelerate: 'var(--morphink-easing-decelerate)',
  accelerate: 'var(--morphink-easing-accelerate)',
  'emphasized-decelerate': 'var(--morphink-easing-emphasized-decelerate)',
  'emphasized-accelerate': 'var(--morphink-easing-emphasized-accelerate)',
  linear: 'var(--morphink-easing-linear)',
  spring: 'var(--morphink-easing-spring)',
}

const attrs = useAttrs()
const classes = computed(() =>
  cn(
    radioVariants({
      variant: resolvedVariant.value,
      tone: resolvedTone.value,
      size: resolvedSize.value,
    }),
    attrs.class
  )
)
</script>

<template>
  <RadioGroupItem
    data-morphink
    :value="value"
    :disabled="disabled"
    :id="id"
    :class="classes"
    :style="{
      transitionDuration: durationMap[resolvedDuration],
      transitionTimingFunction: easingMap[resolvedEasing],
    }"
    v-bind="attrs"
  >
    <RadioGroupIndicator class="flex items-center justify-center">
      <span
        :class="
          cn(
            'block rounded-full',
            dotSizes[resolvedSize],
            resolvedVariant === 'solid' ? 'bg-(--ctl-fg)' : 'bg-(--ctl-color)',
            'mi-radio-dot-anim'
          )
        "
      />
    </RadioGroupIndicator>
  </RadioGroupItem>
</template>

<style scoped>
.mi-radio-dot-anim {
  animation: mi-radio-dot-in var(--morphink-duration-fast) var(--morphink-easing-spring) both;
}

@keyframes mi-radio-dot-in {
  from {
    transform: scale(0);
  }
  to {
    transform: scale(1);
  }
}
</style>
