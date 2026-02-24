<script setup lang="ts">
import { computed, useAttrs } from 'vue'
import { CheckboxRoot, CheckboxIndicator, useForwardPropsEmits } from 'reka-ui'
import { cva } from 'class-variance-authority'
import { cn } from '../../lib/utils'
import type { CheckboxRounded, CheckboxSize, CheckboxTone } from '../../lib/props'

const checkboxVariants = cva(
  cn(
    'inline-flex shrink-0 items-center justify-center border transition duration-150',
    'border-(--morphink-color-border)',
    'focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-(--ring-color) focus-visible:ring-offset-2',
    'disabled:opacity-(--morphink-opacity-disabled) disabled:cursor-not-allowed',
    'data-[state=checked]:border-transparent data-[state=indeterminate]:border-transparent'
  ),
  {
    variants: {
      tone: {
        base: cn(
          '[--ring-color:var(--morphink-color-ring)]',
          'data-[state=checked]:bg-(--morphink-color-base) data-[state=checked]:text-(--morphink-color-base-foreground)',
          'data-[state=indeterminate]:bg-(--morphink-color-base) data-[state=indeterminate]:text-(--morphink-color-base-foreground)'
        ),
        primary: cn(
          '[--ring-color:var(--morphink-color-primary)]',
          'data-[state=checked]:bg-(--morphink-color-primary) data-[state=checked]:text-(--morphink-color-primary-foreground)',
          'data-[state=indeterminate]:bg-(--morphink-color-primary) data-[state=indeterminate]:text-(--morphink-color-primary-foreground)'
        ),
        destructive: cn(
          '[--ring-color:var(--morphink-color-destructive)]',
          'data-[state=checked]:bg-(--morphink-color-destructive) data-[state=checked]:text-(--morphink-color-destructive-foreground)',
          'data-[state=indeterminate]:bg-(--morphink-color-destructive) data-[state=indeterminate]:text-(--morphink-color-destructive-foreground)'
        ),
      },
      size: {
        sm: 'size-4',
        md: 'size-5',
        lg: 'size-6',
      },
      rounded: {
        none: 'rounded-none',
        sm: 'rounded-(--morphink-radius-sm)',
        md: 'rounded-(--morphink-radius-md)',
        full: 'rounded-full',
      },
    },
    defaultVariants: {
      tone: 'primary',
      size: 'md',
      rounded: 'sm',
    },
  }
)

const iconSizes: Record<NonNullable<CheckboxSize>, string> = {
  sm: 'size-3',
  md: 'size-3.5',
  lg: 'size-4',
}

const props = withDefaults(
  defineProps<{
    modelValue?: boolean | 'indeterminate'
    defaultValue?: boolean | 'indeterminate'
    tone?: CheckboxTone
    size?: CheckboxSize
    rounded?: CheckboxRounded
    disabled?: boolean
    name?: string
    value?: string
    id?: string
  }>(),
  {
    tone: 'primary',
    size: 'md',
    rounded: 'sm',
    disabled: false,
  }
)

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean | 'indeterminate'): void
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
const classes = computed(() =>
  cn(
    checkboxVariants({
      tone: props.tone,
      size: props.size,
      rounded: props.rounded,
    }),
    attrs.class
  )
)
</script>

<template>
  <CheckboxRoot v-bind="forwarded" :class="classes" v-slot="{ state }">
    <CheckboxIndicator class="flex items-center justify-center">
      <svg
        v-if="state !== 'indeterminate'"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="3"
        stroke-linecap="round"
        stroke-linejoin="round"
        :class="iconSizes[size]"
      >
        <polyline points="20 6 9 17 4 12" />
      </svg>
      <svg
        v-else
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="3"
        stroke-linecap="round"
        stroke-linejoin="round"
        :class="iconSizes[size]"
      >
        <line x1="5" y1="12" x2="19" y2="12" />
      </svg>
    </CheckboxIndicator>
  </CheckboxRoot>
</template>
