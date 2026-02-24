<script setup lang="ts">
/**
 * Checkbox — boolean or indeterminate toggle control.
 *
 * Public API layer. Customize defaults here.
 * Style variants: base/ui/checkbox/CheckboxBase.vue
 */
import CheckboxBase from '../base/ui/checkbox/CheckboxBase.vue'
import { useForwardPropsEmits } from 'reka-ui'
import type { CheckboxRounded, CheckboxSize, CheckboxTone, CheckboxVariant } from '../base/lib/props'

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

const forwarded = useForwardPropsEmits(props, emit)
</script>

<template>
  <CheckboxBase v-bind="forwarded" />
</template>
