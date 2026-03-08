<script setup lang="ts">
import { SearchInput, Stack } from '@morphink/ui'
import { defineMeta } from 'sb-addon-vue-csf'

const { Story } = defineMeta({
  title: 'Components/Molecules/SearchInput',
  component: SearchInput,
  tags: ['autodocs'],
  argTypes: {
    placeholder: { control: 'text' },
    size: { control: 'select', options: ['xs', 'sm', 'md', 'lg', 'xl'] },
  },
})
</script>

<template>
  <Story name="Default" :args="{ placeholder: 'Search...' }">
    <template #template="{ args }">
      <SearchInput v-bind="args" />
    </template>
  </Story>

  <Story name="WithValue" :args="{ modelValue: 'design tokens', placeholder: 'Search...' }">
    <template #template="{ args }">
      <SearchInput v-bind="args" />
    </template>
  </Story>

  <Story name="Sizes" asChild>
    <Stack gap="md" style="max-width: 400px">
      <SearchInput size="sm" placeholder="Small search..." />
      <SearchInput size="md" placeholder="Medium search..." />
      <SearchInput size="lg" placeholder="Large search..." />
    </Stack>
  </Story>
</template>
