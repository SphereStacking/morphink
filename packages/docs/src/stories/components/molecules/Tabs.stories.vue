<script setup lang="ts">
import { ref } from 'vue'
import { Tabs, Text, Stack } from '@morphink/ui'
import { componentSizes, componentVariants } from '@morphink/ui'
import { defineMeta } from 'sb-addon-vue-csf'

const tabItems = [
  { label: 'Overview', value: 'overview' },
  { label: 'Layout', value: 'layout' },
  { label: 'Tokens', value: 'tokens' },
]

const active = ref('overview')
const activeVariant = ref('overview')
const activeSize = ref('overview')

const { Story } = defineMeta({
  title: 'Components/Molecules/Tabs',
  component: Tabs,
  tags: ['autodocs'],
  argTypes: {
    variant: { control: { type: 'select' }, options: componentVariants.Tabs },
    size: { control: { type: 'select' }, options: componentSizes.Tabs },
    modelValue: { control: 'text' },
    items: { control: 'object' },
    'update:modelValue': { action: 'update:modelValue' },
  },
  args: {
    variant: 'pill',
    size: 'md',
    modelValue: 'overview',
    items: tabItems,
  },
})
</script>

<template>
  <Story name="Default">
    <template #template="{ args }">
      <Stack gap="md">
        <Tabs
          :items="args.items"
          :model-value="active"
          :variant="args.variant"
          :size="args.size"
          @update:model-value="
            (v) => {
              active = v
            }
          "
        />
        <Text muted>Selected: {{ active }}</Text>
      </Stack>
    </template>
  </Story>

  <Story name="Variants" asChild>
    <Stack gap="md">
      <Tabs v-model="activeVariant" :items="tabItems" variant="pill" />
      <Tabs v-model="activeVariant" :items="tabItems" variant="underline" />
    </Stack>
  </Story>

  <Story name="Sizes" asChild>
    <Stack gap="md">
      <Tabs v-model="activeSize" :items="tabItems" size="sm" />
      <Tabs v-model="activeSize" :items="tabItems" size="md" />
    </Stack>
  </Story>
</template>
