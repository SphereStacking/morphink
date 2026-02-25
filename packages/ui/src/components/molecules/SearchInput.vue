<script setup lang="ts">
/**
 * SearchInput — search field with icon and clear button.
 *
 * Molecule: composes Atoms (Box, Input) into a search pattern.
 */
import { computed } from 'vue'
import Box from '../atoms/Box.vue'
import Input from '../atoms/Input.vue'
import type { InputSize } from '../../base/lib/props'

const props = withDefaults(
  defineProps<{
    modelValue?: string
    placeholder?: string
    size?: InputSize
  }>(),
  {
    modelValue: '',
    placeholder: 'Search...',
    size: 'md',
  }
)

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
}>()

const hasValue = computed(() => props.modelValue && props.modelValue.length > 0)

const iconSize = computed(() => {
  const sizes: Record<string, string> = { xs: '12', sm: '14', md: '16', lg: '18', xl: '20' }
  return sizes[props.size] || '16'
})

const iconOffset = computed(() => {
  const offsets: Record<string, string> = {
    xs: 'var(--morphink-space-xs)',
    sm: 'var(--morphink-space-sm)',
    md: 'var(--morphink-space-sm)',
    lg: 'var(--morphink-space-md)',
    xl: 'var(--morphink-space-md)',
  }
  return offsets[props.size] || 'var(--morphink-space-sm)'
})
</script>

<template>
  <Box position="relative">
    <Box position="absolute"
      :style="{
        left: iconOffset,
        top: '50%',
        transform: 'translateY(-50%)',
        pointerEvents: 'none',
        color: 'var(--morphink-color-muted-foreground)',
        display: 'flex',
        alignItems: 'center'
      }">
      <svg xmlns="http://www.w3.org/2000/svg" :width="iconSize" :height="iconSize" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
    </Box>
    <Input
      :model-value="modelValue"
      :placeholder="placeholder"
      :size="size"
      :style="{ paddingLeft: `calc(${iconOffset} + ${iconSize}px + ${iconOffset})` }"
      @update:model-value="emit('update:modelValue', String($event))"
    />
    <Box v-if="hasValue" position="absolute" as="button"
      :style="{
        right: iconOffset,
        top: '50%',
        transform: 'translateY(-50%)',
        background: 'none',
        border: 'none',
        cursor: 'pointer',
        color: 'var(--morphink-color-muted-foreground)',
        display: 'flex',
        alignItems: 'center',
        padding: 0
      }"
      @click="emit('update:modelValue', '')">
      <svg xmlns="http://www.w3.org/2000/svg" :width="iconSize" :height="iconSize" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
    </Box>
  </Box>
</template>
