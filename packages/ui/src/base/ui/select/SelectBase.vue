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
  'inline-flex h-9 w-full items-center justify-between px-(--morphink-space-sm) text-[14px] text-(--morphink-color-foreground)',
  {
    variants: {
      variant: {
        ghost: 'bg-transparent',
        outline:
          'border-(--morphink-border-width-default) border-(--morphink-color-border) bg-(--morphink-color-input)',
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
      rounded: 'md',
    },
  }
)
const triggerClass = computed(() =>
  cn(
    triggerVariants({
      variant: props.variant,
      rounded: props.rounded,
    })
  )
)

const contentVariants = cva(
  'border-(--morphink-border-width-default) border-(--morphink-color-border) bg-(--morphink-color-popover) p-[6px]',
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
    },
    defaultVariants: {
      rounded: 'md',
      shadow: 'md',
    },
  }
)
const contentClass = computed(() =>
  cn(
    contentVariants({
      rounded: props.rounded,
      shadow: props.shadow,
    })
  )
)

const itemClass =
  'rounded-(--morphink-radius-sm) px-(--morphink-space-sm) py-[6px] text-[13px] text-(--morphink-color-foreground) focus:bg-(--morphink-color-muted) outline-hidden'
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
