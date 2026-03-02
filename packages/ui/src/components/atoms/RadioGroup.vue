<script setup lang="ts">
/**
 * RadioGroup — groups Radio items with shared selection state.
 *
 * Public API layer. Customize defaults here.
 * Style variants: base/ui/radio/RadioGroupBase.vue
 */
import RadioGroupBase from '../../base/ui/radio/RadioGroupBase.vue'
import { useForwardPropsEmits } from 'reka-ui'
import type { RadioSize, RadioTone, RadioVariant } from '../../base/lib/props'

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

const forwarded = useForwardPropsEmits(props, emit)
</script>

<template>
  <RadioGroupBase v-bind="forwarded">
    <slot />
  </RadioGroupBase>
</template>
