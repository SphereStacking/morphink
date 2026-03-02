<script setup lang="ts">
defineOptions({ inheritAttrs: false })
import { computed, inject, ref, useAttrs } from 'vue'
import { CheckboxRoot, CheckboxIndicator, useForwardPropsEmits } from 'reka-ui'
import { cva } from 'class-variance-authority'
import { cn } from '../../lib/utils'
import type { CheckboxRounded, CheckboxSize, CheckboxTone, CheckboxVariant } from '../../lib/props'
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
    '[transition-property:border-color,box-shadow]',
    '[transition-duration:var(--morphink-duration-fast)]',
    '[transition-timing-function:var(--morphink-easing-standard)]',
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
          'border-(color:--ctl-color)',
          'data-[state=unchecked]:hover:bg-[color-mix(in_srgb,var(--ctl-color)_8%,transparent)]'
        ),
        solid: cn(
          'border-transparent bg-(--morphink-color-muted)',
          'data-[state=unchecked]:hover:bg-[color-mix(in_srgb,var(--ctl-color)_10%,var(--morphink-color-muted))]'
        ),
        ghost: cn(
          'border-transparent',
          'data-[state=unchecked]:hover:bg-(--morphink-color-muted)'
        ),
        soft: cn(
          'border-transparent',
          'bg-[color-mix(in_srgb,var(--ctl-color)_12%,transparent)]',
          'data-[state=unchecked]:hover:bg-[color-mix(in_srgb,var(--ctl-color)_18%,transparent)]',
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
      { variant: 'soft', tone: 'base', class: cn(
        'bg-(--morphink-color-muted)',
        'data-[state=unchecked]:hover:bg-[color-mix(in_srgb,var(--ctl-color)_18%,var(--morphink-color-muted))]'
      )},
      { variant: 'soft', tone: 'neutral', class: cn(
        'bg-(--morphink-color-muted)',
        'data-[state=unchecked]:hover:bg-[color-mix(in_srgb,var(--ctl-color)_18%,var(--morphink-color-muted))]'
      )},
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
    disabled: false,
  }
)

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean | 'indeterminate'): void
}>()

// --- Group context (inject) ---
const injectedSize = inject(checkboxSizeKey, ref('md' as CheckboxSize))
const injectedVariant = inject(checkboxVariantKey, ref('outline' as CheckboxVariant))
const injectedTone = inject(checkboxToneKey, ref('primary' as CheckboxTone))
const injectedRounded = inject(checkboxRoundedKey, ref('sm' as CheckboxRounded))
const group = inject(checkboxGroupKey, null)

const resolvedSize = computed(() => injectedSize.value !== 'md' ? injectedSize.value : props.size)
const resolvedVariant = computed(() => injectedVariant.value !== 'outline' ? injectedVariant.value : props.variant)
const resolvedTone = computed(() => injectedTone.value !== 'primary' ? injectedTone.value : props.tone)
const resolvedRounded = computed(() => injectedRounded.value !== 'sm' ? injectedRounded.value : props.rounded)

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
const emitProxy = group
  ? { 'update:modelValue': handleGroupToggle } as typeof emit
  : emit
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
        :class="iconSizes[resolvedSize]"
      >
        <polyline
          points="4 12 9 17 20 6"
          style="stroke-dasharray: 24"
          class="animate-[mi-checkmark-draw_var(--morphink-duration-normal)_var(--morphink-easing-standard)_both]"
        />
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
        :class="iconSizes[resolvedSize]"
      >
        <line x1="5" y1="12" x2="19" y2="12" />
      </svg>
    </CheckboxIndicator>
  </CheckboxRoot>
</template>
