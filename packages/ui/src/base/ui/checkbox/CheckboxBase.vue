<script setup lang="ts">
defineOptions({ inheritAttrs: false })
import { computed, inject, ref, useAttrs } from 'vue'
import { CheckboxRoot, CheckboxIndicator, useForwardPropsEmits } from 'reka-ui'
import { cva } from 'class-variance-authority'
import { cn } from '../../lib/utils'
import IconCheck from '../icons/IconCheck.vue'
import IconMinus from '../icons/IconMinus.vue'
import type { CheckboxRounded, CheckboxSize, CheckboxTone, CheckboxVariant, CheckboxDuration, CheckboxEasing } from '../../lib/props'
import {
  checkboxSizeKey,
  checkboxVariantKey,
  checkboxToneKey,
  checkboxRoundedKey,
  checkboxGroupKey,
} from './checkboxContext'

const checkboxVariants = cva(
  cn(
    'relative inline-flex shrink-0 items-center justify-center border',
    '[transition-property:border-color,box-shadow,background-color]',
    'before:absolute before:inset-[-10px] before:content-[""]',
    'focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-(--ring-color) focus-visible:ring-offset-2',
    'disabled:opacity-(--morphink-opacity-disabled) disabled:cursor-not-allowed',
    'data-[state=checked]:border-transparent data-[state=indeterminate]:border-transparent',
    'data-[state=checked]:bg-(--ctl-color) data-[state=checked]:text-(--ctl-fg)',
    'data-[state=indeterminate]:bg-(--ctl-color) data-[state=indeterminate]:text-(--ctl-fg)'
  ),
  {
    variants: {
      variant: {
        outline: cn(
          'border-(color:--morphink-color-border)',
          'data-[state=unchecked]:hover:bg-[color-mix(in_srgb,var(--morphink-color-border)_10%,transparent)]',
          'data-[state=checked]:border-(color:--ctl-color) data-[state=checked]:bg-transparent data-[state=checked]:text-(--ctl-color)',
          'data-[state=indeterminate]:border-(color:--ctl-color) data-[state=indeterminate]:bg-transparent data-[state=indeterminate]:text-(--ctl-color)'
        ),
        solid: cn(
          'border-transparent bg-(--morphink-color-muted)',
          'data-[state=unchecked]:hover:bg-[color-mix(in_srgb,var(--ctl-color)_10%,var(--morphink-color-muted))]'
        ),
        ghost: cn('border-(--morphink-color-border)', 'data-[state=unchecked]:hover:bg-(--morphink-color-muted)'),
        soft: cn(
          'border-transparent',
          'bg-[color-mix(in_srgb,var(--ctl-color)_18%,transparent)]',
          'data-[state=unchecked]:hover:bg-[color-mix(in_srgb,var(--ctl-color)_24%,transparent)]',
          'data-[state=checked]:bg-[color-mix(in_srgb,var(--ctl-color)_65%,transparent)]',
          'data-[state=indeterminate]:bg-[color-mix(in_srgb,var(--ctl-color)_65%,transparent)]'
        ),
      },
      tone: {
        primary: cn(
          '[--ring-color:var(--morphink-color-primary)]',
          '[--ctl-color:var(--morphink-color-primary)]',
          '[--ctl-fg:var(--morphink-color-primary-foreground)]'
        ),
        secondary: cn(
          '[--ring-color:var(--morphink-color-secondary)]',
          '[--ctl-color:var(--morphink-color-secondary)]',
          '[--ctl-fg:var(--morphink-color-secondary-foreground)]'
        ),
        tertiary: cn(
          '[--ring-color:var(--morphink-color-tertiary)]',
          '[--ctl-color:var(--morphink-color-tertiary)]',
          '[--ctl-fg:var(--morphink-color-tertiary-foreground)]'
        ),
        base: cn(
          '[--ring-color:var(--morphink-color-ring)]',
          '[--ctl-color:var(--morphink-color-base)]',
          '[--ctl-fg:var(--morphink-color-base-foreground)]'
        ),
        accent: cn(
          '[--ring-color:var(--morphink-color-accent)]',
          '[--ctl-color:var(--morphink-color-accent)]',
          '[--ctl-fg:var(--morphink-color-accent-foreground)]'
        ),
        neutral: cn(
          '[--ring-color:var(--morphink-color-neutral)]',
          '[--ctl-color:var(--morphink-color-neutral)]',
          '[--ctl-fg:var(--morphink-color-neutral-foreground)]'
        ),
        success: cn(
          '[--ring-color:var(--morphink-color-success)]',
          '[--ctl-color:var(--morphink-color-success)]',
          '[--ctl-fg:var(--morphink-color-success-foreground)]'
        ),
        warning: cn(
          '[--ring-color:var(--morphink-color-warning)]',
          '[--ctl-color:var(--morphink-color-warning)]',
          '[--ctl-fg:var(--morphink-color-warning-foreground)]'
        ),
        info: cn(
          '[--ring-color:var(--morphink-color-info)]',
          '[--ctl-color:var(--morphink-color-info)]',
          '[--ctl-fg:var(--morphink-color-info-foreground)]'
        ),
        destructive: cn(
          '[--ring-color:var(--morphink-color-destructive)]',
          '[--ctl-color:var(--morphink-color-destructive)]',
          '[--ctl-fg:var(--morphink-color-destructive-foreground)]'
        ),
      },
      size: {
        xs: 'size-3.5',
        sm: 'size-4',
        md: 'size-5',
        lg: 'size-6',
        xl: 'size-7',
      },
      rounded: {
        none: 'rounded-none',
        sm: 'rounded-(--morphink-radius-sm)',
        md: 'rounded-(--morphink-radius-md)',
        full: 'rounded-full',
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
      rounded: 'sm',
    },
  }
)

const iconSizes: Record<NonNullable<CheckboxSize>, string> = {
  xs: 'size-2.5',
  sm: 'size-3',
  md: 'size-3.5',
  lg: 'size-4',
  xl: 'size-5',
}

const props = withDefaults(
  defineProps<{
    modelValue?: boolean | 'indeterminate'
    defaultValue?: boolean | 'indeterminate'
    variant?: CheckboxVariant
    tone?: CheckboxTone
    size?: CheckboxSize
    rounded?: CheckboxRounded
    duration?: CheckboxDuration
    easing?: CheckboxEasing
    disabled?: boolean
    name?: string
    value?: string
    id?: string
  }>(),
  {
    variant: 'outline',
    tone: 'primary',
    size: 'md',
    rounded: 'sm',
    duration: 'fast',
    easing: 'standard',
    disabled: false,
  }
)

const durationMap: Record<CheckboxDuration, string> = {
  instant: 'var(--morphink-duration-instant)',
  fast: 'var(--morphink-duration-fast)',
  normal: 'var(--morphink-duration-normal)',
  slow: 'var(--morphink-duration-slow)',
  slower: 'var(--morphink-duration-slower)',
}

const easingMap: Record<CheckboxEasing, string> = {
  standard: 'var(--morphink-easing-standard)',
  decelerate: 'var(--morphink-easing-decelerate)',
  accelerate: 'var(--morphink-easing-accelerate)',
  'emphasized-decelerate': 'var(--morphink-easing-emphasized-decelerate)',
  'emphasized-accelerate': 'var(--morphink-easing-emphasized-accelerate)',
  linear: 'var(--morphink-easing-linear)',
  spring: 'var(--morphink-easing-spring)',
}

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean | 'indeterminate'): void
}>()

// --- Group context (inject) ---
const injectedSize = inject(checkboxSizeKey, ref('md' as CheckboxSize))
const injectedVariant = inject(checkboxVariantKey, ref('outline' as CheckboxVariant))
const injectedTone = inject(checkboxToneKey, ref('primary' as CheckboxTone))
const injectedRounded = inject(checkboxRoundedKey, ref('sm' as CheckboxRounded))
const group = inject(checkboxGroupKey, null)

const resolvedSize = computed(() => (injectedSize.value !== 'md' ? injectedSize.value : props.size))
const resolvedVariant = computed(() =>
  injectedVariant.value !== 'outline' ? injectedVariant.value : props.variant
)
const resolvedTone = computed(() =>
  injectedTone.value !== 'primary' ? injectedTone.value : props.tone
)
const resolvedRounded = computed(() =>
  injectedRounded.value !== 'sm' ? injectedRounded.value : props.rounded
)

// When inside a group, derive checked state from the group's modelValue
const groupChecked = computed(() => {
  if (!group || !props.value) return undefined
  return group.modelValue.value.includes(props.value)
})

function handleGroupToggle(checked: boolean | 'indeterminate') {
  if (group && props.value) {
    group.toggle(props.value)
  }
  emit('update:modelValue', checked)
}

const rekaProps = computed(() => {
  // Group mode: use groupChecked as modelValue
  if (group && props.value) {
    return {
      modelValue: groupChecked.value,
      disabled: props.disabled,
      ...(props.name !== undefined && { name: props.name }),
      value: props.value,
      ...(props.id !== undefined && { id: props.id }),
    }
  }
  // Standalone mode
  return {
    ...(props.modelValue !== undefined && { modelValue: props.modelValue }),
    ...(props.defaultValue !== undefined && { defaultValue: props.defaultValue }),
    disabled: props.disabled,
    ...(props.name !== undefined && { name: props.name }),
    ...(props.value !== undefined && { value: props.value }),
    ...(props.id !== undefined && { id: props.id }),
  }
})
const emitProxy = group ? ({ 'update:modelValue': handleGroupToggle } as typeof emit) : emit
const forwarded = useForwardPropsEmits(rekaProps, emitProxy)

const attrs = useAttrs()
const classes = computed(() =>
  cn(
    checkboxVariants({
      variant: resolvedVariant.value,
      tone: resolvedTone.value,
      size: resolvedSize.value,
      rounded: resolvedRounded.value,
    }),
    attrs.class
  )
)
</script>

<template>
  <CheckboxRoot data-morphink v-bind="forwarded" :class="classes" :style="{ transitionDuration: durationMap[duration], transitionTimingFunction: easingMap[easing] }" v-slot="{ state }">
    <CheckboxIndicator class="flex items-center justify-center">
      <IconCheck
        v-if="state !== 'indeterminate'"
        :class="iconSizes[resolvedSize]"
        stroke-width="3"
        class="mi-checkmark-anim"
      />
      <IconMinus v-else :class="iconSizes[resolvedSize]" stroke-width="3" />
    </CheckboxIndicator>
  </CheckboxRoot>
</template>

<style scoped>
.mi-checkmark-anim :deep(polyline) {
  stroke-dasharray: 24;
  animation: mi-checkmark-draw var(--morphink-duration-normal) var(--morphink-easing-standard) both;
}

@keyframes mi-checkmark-draw {
  from {
    stroke-dashoffset: 24;
  }
  to {
    stroke-dashoffset: 0;
  }
}
</style>
