<script setup lang="ts">
import { computed, provide, toRef } from 'vue'
import { RadioGroupRoot, useForwardPropsEmits } from 'reka-ui'
import type { RadioSize, RadioTone, RadioVariant } from '../../lib/props'
import { radioSizeKey, radioVariantKey, radioToneKey } from './radioContext'

const props = withDefaults(
  defineProps<{
    modelValue?: string
    defaultValue?: string
    orientation?: 'horizontal' | 'vertical'
    disabled?: boolean
    name?: string
    size?: RadioSize
    variant?: RadioVariant
    tone?: RadioTone
  }>(),
  {
    orientation: 'vertical',
    disabled: false,
    size: 'md',
    variant: 'outline',
    tone: 'primary',
  }
)

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
}>()

const rekaProps = computed(() => ({
  ...(props.modelValue !== undefined && { modelValue: props.modelValue }),
  ...(props.defaultValue !== undefined && { defaultValue: props.defaultValue }),
  orientation: props.orientation,
  disabled: props.disabled,
  ...(props.name !== undefined && { name: props.name }),
}))
const forwarded = useForwardPropsEmits(rekaProps, emit)

provide(radioSizeKey, toRef(props, 'size'))
provide(radioVariantKey, toRef(props, 'variant'))
provide(radioToneKey, toRef(props, 'tone'))
</script>

<template>
  <RadioGroupRoot
    v-bind="forwarded"
    :class="orientation === 'horizontal' ? 'flex flex-row gap-(--morphink-space-lg)' : 'flex flex-col gap-(--morphink-space-sm)'"
  >
    <slot />
  </RadioGroupRoot>
</template>
