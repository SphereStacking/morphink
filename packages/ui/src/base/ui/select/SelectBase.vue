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
import type { SelectRounded, SelectShadow, SelectSize, SelectVariant } from '../../lib/props'

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
    side?: 'top' | 'right' | 'bottom' | 'left'
    align?: 'start' | 'center' | 'end'
    rounded?: SelectRounded
    shadow?: SelectShadow
  }>(),
  {
    size: 'md',
    variant: 'outline',
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
  'inline-flex w-full items-center justify-between text-(--morphink-color-foreground)',
  {
    variants: {
      variant: {
        ghost: 'bg-transparent',
        outline:
          'border-(--morphink-border-width-default) border-(--morphink-color-border) bg-(--morphink-color-input)',
      },
      size: {
        xs: 'h-7 px-2 text-xs',
        sm: 'h-8 px-3 text-xs',
        md: 'h-10 px-3 text-sm',
        lg: 'h-12 px-4 text-base',
        xl: 'h-14 px-5 text-lg',
      },
      rounded: {
        none: 'rounded-none',
        sm: 'rounded-(--morphink-radius-sm)',
        md: 'rounded-(--morphink-radius-md)',
        lg: 'rounded-(--morphink-radius-lg)',
        xl: 'rounded-(--morphink-radius-xl)',
      },
    },
    defaultVariants: {
      variant: 'outline',
      size: 'md',
      rounded: 'md',
    },
  }
)
const triggerClass = computed(() =>
  cn(
    triggerVariants({
      variant: props.variant,
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
      <SelectContent :class="contentClass" :side="side" :align="align">
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
