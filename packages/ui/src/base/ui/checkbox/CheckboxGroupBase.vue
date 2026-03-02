<script setup lang="ts">
import { computed, provide, ref, toRef, watch } from 'vue'
import type { CheckboxRounded, CheckboxSize, CheckboxTone, CheckboxVariant } from '../../lib/props'
import {
  checkboxSizeKey,
  checkboxVariantKey,
  checkboxToneKey,
  checkboxRoundedKey,
  checkboxGroupKey,
} from './checkboxContext'

const props = withDefaults(
  defineProps<{
    modelValue?: string[]
    defaultValue?: string[]
    orientation?: 'horizontal' | 'vertical'
    disabled?: boolean
    size?: CheckboxSize
    variant?: CheckboxVariant
    tone?: CheckboxTone
    rounded?: CheckboxRounded
  }>(),
  {
    orientation: 'vertical',
    disabled: false,
    size: 'md',
    variant: 'outline',
    tone: 'primary',
    rounded: 'sm',
  }
)

const emit = defineEmits<{
  (e: 'update:modelValue', value: string[]): void
}>()

const internalValue = ref<string[]>(props.defaultValue ?? [])

const currentValue = computed(() =>
  props.modelValue !== undefined ? props.modelValue : internalValue.value
)

watch(
  () => props.modelValue,
  (v) => {
    if (v !== undefined) internalValue.value = v
  }
)

function toggle(value: string) {
  const current = [...currentValue.value]
  const idx = current.indexOf(value)
  if (idx === -1) {
    current.push(value)
  } else {
    current.splice(idx, 1)
  }
  internalValue.value = current
  emit('update:modelValue', current)
}

provide(checkboxSizeKey, toRef(props, 'size'))
provide(checkboxVariantKey, toRef(props, 'variant'))
provide(checkboxToneKey, toRef(props, 'tone'))
provide(checkboxRoundedKey, toRef(props, 'rounded'))
provide(checkboxGroupKey, {
  modelValue: currentValue,
  toggle,
})
</script>

<template>
  <div
    role="group"
    :class="orientation === 'horizontal' ? 'flex flex-row gap-(--morphink-space-lg)' : 'flex flex-col gap-(--morphink-space-sm)'"
  >
    <slot />
  </div>
</template>
