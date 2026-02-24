<script setup lang="ts">
/**
 * Switch — toggle control for boolean options.
 *
 * Public API layer. Customize defaults here.
 * Style variants: base/ui/switch/SwitchBase.vue
 */
import SwitchBase from '../base/ui/switch/SwitchBase.vue'
import { useForwardPropsEmits } from 'reka-ui'
import type { SwitchSize, SwitchTone } from '../base/lib/props'

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

const forwarded = useForwardPropsEmits(props, emit)
</script>

<template>
  <SwitchBase v-bind="forwarded" />
</template>
