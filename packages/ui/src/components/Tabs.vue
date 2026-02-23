<template>
  <TabsBase
    :items="items"
    :model-value="modelValue"
    :size="size"
    :variant="variant"
    @update:model-value="emit('update:modelValue', $event)"
  >
    <slot />
  </TabsBase>
</template>

<script setup lang="ts">
import TabsBase from '../base/ui/tabs/TabsBase.vue'

type TabItem = {
  label: string
  value: string
}

defineProps<{
  items: TabItem[]
  modelValue: string
  size?: 'sm' | 'md'
  variant?: 'pill' | 'underline'
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
}>()
</script>
