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
    placeholder: '選択してください',
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
  'inline-flex h-9 w-full items-center justify-between px-(--space-sm) text-[14px] text-(--color-foreground)',
  {
    variants: {
      variant: {
        ghost: 'bg-transparent',
        outline:
          'border-(--border-width-default) border-(--color-border) bg-(--color-input)',
      },
      rounded: {
        none: 'rounded-none',
        sm: 'rounded-(--radius-sm)',
        md: 'rounded-(--radius-md)',
        lg: 'rounded-(--radius-lg)',
        xl: 'rounded-(--radius-xl)',
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
  'border-(--border-width-default) border-(--color-border) bg-(--color-popover) p-[6px]',
  {
    variants: {
      rounded: {
        none: 'rounded-none',
        sm: 'rounded-(--radius-sm)',
        md: 'rounded-(--radius-md)',
        lg: 'rounded-(--radius-lg)',
        xl: 'rounded-(--radius-xl)',
      },
      shadow: {
        none: '',
        sm: 'shadow-(--shadow-sm)',
        md: 'shadow-(--shadow-md)',
        lg: 'shadow-(--shadow-lg)',
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
  'rounded-(--radius-sm) px-(--space-sm) py-[6px] text-[13px] text-(--color-foreground) focus:bg-(--color-muted) outline-hidden'
</script>
