<script setup lang="ts">
import { computed } from 'vue'
import { cva } from 'class-variance-authority'
import {
  SelectRoot,
  SelectTrigger,
  SelectValue,
  SelectPortal,
  SelectContent,
  SelectItem,
  SelectItemText,
  SelectViewport,
} from 'reka-ui'
import { cn } from '../../lib/utils'
import type {
  SelectRounded,
  SelectShadow,
  SelectSize,
  SelectTone,
  SelectVariant,
} from '../../lib/props'

type Option = {
  label: string
  value: string | number
  disabled?: boolean
}

const props = withDefaults(
  defineProps<{
    modelValue: string | number | null
    options: Option[]
    placeholder?: string
    size?: SelectSize
    variant?: SelectVariant
    tone?: SelectTone
    side?: 'top' | 'right' | 'bottom' | 'left'
    align?: 'start' | 'center' | 'end'
    rounded?: SelectRounded
    shadow?: SelectShadow
  }>(),
  {
    size: 'md',
    variant: 'outline',
    tone: 'base',
    placeholder: 'Select...',
    side: 'bottom',
    align: 'start',
    rounded: 'md',
    shadow: 'md',
  }
)

const emit = defineEmits<{
  (e: 'update:modelValue', value: string | number | null): void
}>()

const triggerVariants = cva(
  cn(
    'inline-flex w-full items-center justify-between text-(--morphink-color-foreground)',
    '[transition-property:background-color,border-color,box-shadow]',
    '[transition-duration:var(--morphink-duration-fast)]',
    '[transition-timing-function:var(--morphink-easing-standard)]',
    'hover:bg-(--morphink-color-muted)',
    'focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-(--ring-color)'
  ),
  {
    variants: {
      variant: {
        solid:
          'border border-transparent bg-[color-mix(in_srgb,var(--field-color)_12%,transparent)]',
        outline: cn(
          'border-(--morphink-border-width-default) border-(--morphink-color-border) bg-(--morphink-color-input)',
          'focus-visible:border-(color:--field-color)'
        ),
        ghost: 'border border-transparent bg-transparent',
        soft: 'border border-transparent bg-[color-mix(in_srgb,var(--field-color)_12%,transparent)]',
      },
      tone: {
        primary:
          '[--ring-color:var(--morphink-color-primary)] [--field-color:var(--morphink-color-primary)]',
        secondary:
          '[--ring-color:var(--morphink-color-secondary)] [--field-color:var(--morphink-color-secondary)]',
        tertiary:
          '[--ring-color:var(--morphink-color-tertiary)] [--field-color:var(--morphink-color-tertiary)]',
        base: '[--ring-color:var(--morphink-color-ring)] [--field-color:var(--morphink-color-base)]',
        accent:
          '[--ring-color:var(--morphink-color-accent)] [--field-color:var(--morphink-color-accent)]',
        neutral:
          '[--ring-color:var(--morphink-color-neutral)] [--field-color:var(--morphink-color-neutral)]',
        success:
          '[--ring-color:var(--morphink-color-success)] [--field-color:var(--morphink-color-success)]',
        warning:
          '[--ring-color:var(--morphink-color-warning)] [--field-color:var(--morphink-color-warning)]',
        info: '[--ring-color:var(--morphink-color-info)] [--field-color:var(--morphink-color-info)]',
        destructive:
          '[--ring-color:var(--morphink-color-destructive)] [--field-color:var(--morphink-color-destructive)]',
      },
      size: {
        xs: 'h-(--morphink-space-28) px-(--morphink-space-8) text-[length:var(--morphink-font-size-12)]',
        sm: 'h-(--morphink-space-32) px-(--morphink-space-12) text-[length:var(--morphink-font-size-12)]',
        md: 'h-(--morphink-space-40) px-(--morphink-space-12) text-[length:var(--morphink-font-size-14)]',
        lg: 'h-(--morphink-space-48) px-(--morphink-space-16) text-[length:var(--morphink-font-size-16)]',
        xl: 'h-(--morphink-space-56) px-(--morphink-space-20) text-[length:var(--morphink-font-size-18)]',
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
      { variant: 'solid', tone: 'base', class: 'bg-(--morphink-color-muted)' },
      { variant: 'solid', tone: 'neutral', class: 'bg-(--morphink-color-muted)' },
      { variant: 'soft', tone: 'base', class: 'bg-(--morphink-color-muted)' },
      { variant: 'soft', tone: 'neutral', class: 'bg-(--morphink-color-muted)' },
      {
        variant: 'outline',
        tone: 'base',
        class: 'focus-visible:border-(color:--morphink-color-border)',
      },
      { variant: 'outline', tone: 'destructive', class: 'border-(color:--field-color)' },
    ],
    defaultVariants: {
      variant: 'outline',
      tone: 'base',
      size: 'md',
      rounded: 'md',
    },
  }
)
const triggerClass = computed(() =>
  cn(
    triggerVariants({
      variant: props.variant,
      tone: props.tone,
      size: props.size,
      rounded: props.rounded,
    })
  )
)

const contentVariants = cva(
  'border-(--morphink-border-width-default) border-(--morphink-color-border) bg-(--morphink-color-popover)',
  {
    variants: {
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
      size: {
        xs: 'p-0.5',
        sm: 'p-1',
        md: 'p-[6px]',
        lg: 'p-2',
        xl: 'p-2.5',
      },
    },
    defaultVariants: {
      rounded: 'md',
      shadow: 'md',
      size: 'md',
    },
  }
)
const contentClass = computed(() =>
  cn(
    contentVariants({
      rounded: props.rounded,
      shadow: props.shadow,
      size: props.size,
    })
  )
)

const itemSizes: Record<string, string> = {
  xs: 'px-2 py-1 text-xs',
  sm: 'px-(--morphink-space-sm) py-1 text-xs',
  md: 'px-(--morphink-space-sm) py-[6px] text-[13px]',
  lg: 'px-3 py-2 text-sm',
  xl: 'px-3.5 py-2.5 text-base',
}

const itemClass = computed(() =>
  cn(
    'rounded-(--morphink-radius-sm) text-(--morphink-color-foreground) focus:bg-(--morphink-color-muted) outline-hidden',
    itemSizes[props.size]
  )
)
</script>

<template>
  <SelectRoot :model-value="modelValue" @update:model-value="emit('update:modelValue', $event)">
    <SelectTrigger :class="triggerClass">
      <SelectValue :placeholder="placeholder" />
    </SelectTrigger>
    <SelectPortal>
      <SelectContent
        data-morphink
        :class="contentClass"
        :side="side"
        :align="align"
        class="mi-dropdown-anim"
      >
        <SelectViewport>
          <SelectItem
            v-for="option in options"
            :key="option.value"
            :value="option.value"
            :disabled="option.disabled"
            :class="itemClass"
          >
            <SelectItemText>{{ option.label }}</SelectItemText>
          </SelectItem>
        </SelectViewport>
      </SelectContent>
    </SelectPortal>
  </SelectRoot>
</template>

<style scoped>
@keyframes mi-dropdown-in {
  from {
    opacity: 0;
    translate: 0 -4px;
  }
}

@keyframes mi-dropdown-out {
  to {
    opacity: 0;
    translate: 0 4px;
  }
}

.mi-dropdown-anim[data-state="open"] {
  animation: mi-dropdown-in var(--morphink-motion-enter) both;
}
.mi-dropdown-anim[data-state="closed"] {
  animation: mi-dropdown-out var(--morphink-motion-leave) forwards;
}
</style>
