<script setup lang="ts">
/**
 * Tabs — tabbed content switcher.
 *
 * Wraps Reka UI primitive. Customize defaults or add
 * product-level features here.
 * Style variants: base/ui/tabs/TabsBase.vue
 */
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
