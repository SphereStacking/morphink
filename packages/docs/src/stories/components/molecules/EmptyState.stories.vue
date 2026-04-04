<script setup lang="ts">
import { EmptyState, Button } from '@morphink/ui'
import { defineMeta } from 'sb-addon-vue-csf'

const { Story } = defineMeta({
  title: 'Components/Molecules/EmptyState',
  component: EmptyState,
  tags: ['autodocs'],
  argTypes: {
    title: { control: 'text' },
    description: { control: 'text' },
  },
})
</script>

<template>
  <Story
    name="Default"
    :args="{
      title: 'No results found',
      description: 'Try adjusting your search or filter to find what you are looking for.',
    }"
  >
    <template #template="{ args }">
      <EmptyState v-bind="args" />
    </template>
  </Story>

  <Story
    name="WithAction"
    :args="{ title: 'No items yet', description: 'Get started by creating your first item.' }"
  >
    <template #template="{ args }">
      <EmptyState v-bind="args">
        <template #action>
          <Button tone="primary">Create New Item</Button>
        </template>
      </EmptyState>
    </template>
  </Story>

  <Story
    name="WithIcon"
    :args="{
      title: 'No files uploaded',
      description: 'Drag and drop files here or click the button below.',
    }"
  >
    <template #template="{ args }">
      <EmptyState v-bind="args">
        <template #icon>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="48"
            height="48"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
            style="color: var(--morphink-color-muted-foreground)"
          >
            <path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z" />
          </svg>
        </template>
        <template #action>
          <Button tone="primary" variant="outline">Upload Files</Button>
        </template>
      </EmptyState>
    </template>
  </Story>
</template>
