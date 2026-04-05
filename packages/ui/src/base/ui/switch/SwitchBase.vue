<script setup lang="ts">
defineOptions({ inheritAttrs: false })
import { computed, useAttrs } from 'vue'
import { SwitchRoot, SwitchThumb, useForwardPropsEmits } from 'reka-ui'
import { cva } from 'class-variance-authority'
import { cn } from '../../lib/utils'
import type { SwitchSize, SwitchTone, SwitchVariant } from '../../lib/props'

const switchVariants = cva(
  cn(
    'relative inline-flex shrink-0 cursor-pointer items-center rounded-full border-2',
    '[transition-property:background-color,border-color]',
    '[transition-duration:var(--morphink-duration-normal)]',
    '[transition-timing-function:var(--morphink-easing-standard)]',
    'before:absolute before:inset-[-8px] before:content-[""]',
    'focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-(--ring-color) focus-visible:ring-offset-2',
    'disabled:opacity-(--morphink-opacity-disabled) disabled:cursor-not-allowed',
    'data-[state=unchecked]:bg-(--morphink-color-muted)',
    'data-[state=checked]:border-transparent',
    'data-[state=checked]:bg-(--ctl-color)'
  ),
  {
    variants: {
      variant: {
        outline: cn(
          'border-(color:--ctl-color)',
          'data-[state=unchecked]:hover:bg-[color-mix(in_srgb,var(--ctl-color)_10%,var(--morphink-color-muted))]'
        ),
        solid: cn(
          'border-transparent',
          'data-[state=unchecked]:hover:bg-[color-mix(in_srgb,var(--ctl-color)_10%,var(--morphink-color-muted))]'
        ),
        ghost: cn(
          'border-transparent data-[state=unchecked]:bg-transparent',
          'data-[state=unchecked]:hover:bg-(--morphink-color-muted)'
        ),
        soft: cn(
          'border-transparent',
          'data-[state=unchecked]:bg-[color-mix(in_srgb,var(--ctl-color)_12%,transparent)]',
          'data-[state=unchecked]:hover:bg-[color-mix(in_srgb,var(--ctl-color)_18%,transparent)]',
          'data-[state=checked]:bg-[color-mix(in_srgb,var(--ctl-color)_65%,transparent)]'
        ),
      },
      tone: {
        primary: cn(
          '[--ring-color:var(--morphink-color-primary)]',
          '[--ctl-color:var(--morphink-color-primary)]'
        ),
        secondary: cn(
          '[--ring-color:var(--morphink-color-secondary)]',
          '[--ctl-color:var(--morphink-color-secondary)]'
        ),
        tertiary: cn(
          '[--ring-color:var(--morphink-color-tertiary)]',
          '[--ctl-color:var(--morphink-color-tertiary)]'
        ),
        base: cn(
          '[--ring-color:var(--morphink-color-ring)]',
          '[--ctl-color:var(--morphink-color-base)]'
        ),
        accent: cn(
          '[--ring-color:var(--morphink-color-accent)]',
          '[--ctl-color:var(--morphink-color-accent)]'
        ),
        neutral: cn(
          '[--ring-color:var(--morphink-color-neutral)]',
          '[--ctl-color:var(--morphink-color-neutral)]'
        ),
        success: cn(
          '[--ring-color:var(--morphink-color-success)]',
          '[--ctl-color:var(--morphink-color-success)]'
        ),
        warning: cn(
          '[--ring-color:var(--morphink-color-warning)]',
          '[--ctl-color:var(--morphink-color-warning)]'
        ),
        info: cn(
          '[--ring-color:var(--morphink-color-info)]',
          '[--ctl-color:var(--morphink-color-info)]'
        ),
        destructive: cn(
          '[--ring-color:var(--morphink-color-destructive)]',
          '[--ctl-color:var(--morphink-color-destructive)]'
        ),
      },
      size: {
        xs: 'h-4 w-7',
        sm: 'h-5 w-9',
        md: 'h-6 w-11',
        lg: 'h-7 w-[52px]',
        xl: 'h-8 w-[60px]',
      },
    },
    compoundVariants: [
      {
        variant: 'soft',
        tone: 'base',
        class: cn(
          'data-[state=unchecked]:bg-(--morphink-color-muted)',
          'data-[state=unchecked]:hover:bg-[color-mix(in_srgb,var(--ctl-color)_18%,var(--morphink-color-muted))]'
        ),
      },
      {
        variant: 'soft',
        tone: 'neutral',
        class: cn(
          'data-[state=unchecked]:bg-(--morphink-color-muted)',
          'data-[state=unchecked]:hover:bg-[color-mix(in_srgb,var(--ctl-color)_18%,var(--morphink-color-muted))]'
        ),
      },
    ],
    defaultVariants: {
      variant: 'solid',
      tone: 'primary',
      size: 'md',
    },
  }
)

const thumbVariants = cva(
  cn(
    'pointer-events-none block rounded-full bg-(--morphink-color-card) shadow-(--morphink-shadow-sm)',
    '[transition-property:translate]',
    '[transition-duration:var(--morphink-duration-normal)]',
    '[transition-timing-function:var(--morphink-easing-spring)]',
    'data-[state=unchecked]:translate-x-0'
  ),
  {
    variants: {
      size: {
        xs: 'size-3 data-[state=checked]:translate-x-3',
        sm: 'size-4 data-[state=checked]:translate-x-4',
        md: 'size-5 data-[state=checked]:translate-x-5',
        lg: 'size-6 data-[state=checked]:translate-x-6',
        xl: 'size-7 data-[state=checked]:translate-x-[28px]',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  }
)

const props = withDefaults(
  defineProps<{
    modelValue?: boolean
    defaultValue?: boolean
    variant?: SwitchVariant
    tone?: SwitchTone
    size?: SwitchSize
    disabled?: boolean
    name?: string
    value?: string
    id?: string
  }>(),
  {
    variant: 'solid',
    tone: 'primary',
    size: 'md',
    disabled: false,
  }
)

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void
}>()

const rekaProps = computed(() => ({
  ...(props.modelValue !== undefined && { modelValue: props.modelValue }),
  ...(props.defaultValue !== undefined && { defaultValue: props.defaultValue }),
  disabled: props.disabled,
  ...(props.name !== undefined && { name: props.name }),
  ...(props.value !== undefined && { value: props.value }),
  ...(props.id !== undefined && { id: props.id }),
}))

const forwarded = useForwardPropsEmits(rekaProps, emit)

const attrs = useAttrs()

const rootClasses = computed(() =>
  cn(
    switchVariants({
      variant: props.variant,
      tone: props.tone,
      size: props.size,
    }),
    attrs.class
  )
)

const thumbClasses = computed(() =>
  thumbVariants({
    size: props.size,
  })
)
</script>

<template>
  <SwitchRoot data-morphink v-bind="forwarded" :class="rootClasses">
    <SwitchThumb :class="thumbClasses" />
  </SwitchRoot>
</template>
