<script setup lang="ts">
/**
 * Tabs — tabbed content switcher.
 *
 * Wraps Reka UI primitive. Customize defaults or add
 * product-level features here.
 * Style variants: base/ui/tabs/TabsBase.vue
 */
import TabsBase from '../../base/ui/tabs/TabsBase.vue'
import { useForwardPropsEmits } from 'reka-ui'
import type { TabsSize, TabsVariant } from '../../base/lib/props'

type TabItem = {
  label: string
  value: string
}

const props = defineProps<{
  items: TabItem[]
  modelValue: string
  size?: TabsSize
  variant?: TabsVariant
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
}>()

const forwarded = useForwardPropsEmits(props, emit)
</script>

<template>
  <TabsBase v-bind="forwarded">
    <slot />
  </TabsBase>
</template>
