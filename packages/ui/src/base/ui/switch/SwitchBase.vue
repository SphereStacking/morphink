<script setup lang="ts">
defineOptions({ inheritAttrs: false })
import { computed, useAttrs } from 'vue'
import { SwitchRoot, SwitchThumb, useForwardPropsEmits } from 'reka-ui'
import { cva } from 'class-variance-authority'
import { cn } from '../../lib/utils'
import type { SwitchSize, SwitchTone } from '../../lib/props'

const switchVariants = cva(
  cn(
    'inline-flex shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition duration-150',
    'focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-(--ring-color) focus-visible:ring-offset-2',
    'disabled:opacity-(--morphink-opacity-disabled) disabled:cursor-not-allowed',
    'data-[state=unchecked]:bg-(--morphink-color-muted)'
  ),
  {
    variants: {
      tone: {
        base: cn(
          '[--ring-color:var(--morphink-color-ring)]',
          'data-[state=checked]:bg-(--morphink-color-base)'
        ),
        primary: cn(
          '[--ring-color:var(--morphink-color-primary)]',
          'data-[state=checked]:bg-(--morphink-color-primary)'
        ),
      },
      size: {
        sm: 'h-5 w-9',
        md: 'h-6 w-11',
        lg: 'h-7 w-[52px]',
      },
    },
    defaultVariants: {
      tone: 'primary',
      size: 'md',
    },
  }
)

const thumbVariants = cva(
  cn(
    'pointer-events-none block rounded-full bg-white shadow-(--morphink-shadow-sm) transition duration-150',
    'data-[state=unchecked]:translate-x-0'
  ),
  {
    variants: {
      size: {
        sm: 'size-4 data-[state=checked]:translate-x-4',
        md: 'size-5 data-[state=checked]:translate-x-5',
        lg: 'size-6 data-[state=checked]:translate-x-[26px]',
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
    tone?: SwitchTone
    size?: SwitchSize
    disabled?: boolean
    name?: string
    value?: string
    id?: string
  }>(),
  {
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
  <SwitchRoot v-bind="forwarded" :class="rootClasses">
    <SwitchThumb :class="thumbClasses" />
  </SwitchRoot>
</template>
