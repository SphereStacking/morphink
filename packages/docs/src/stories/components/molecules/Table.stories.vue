<script setup lang="ts">
import { Table } from '@morphink/ui'
import { componentRounded } from '@morphink/ui'
import { defineMeta } from 'sb-addon-vue-csf'

const { Story } = defineMeta({
  title: 'Components/Molecules/Table',
  component: Table,
  tags: ['autodocs'],
  argTypes: {
    columns: { control: 'object' },
    rows: { control: 'object' },
    density: { control: { type: 'select' }, options: ['comfortable', 'compact'] },
    striped: { control: 'boolean' },
    hover: { control: 'boolean' },
    rounded: { control: { type: 'select' }, options: componentRounded.Table },
  },
  args: {
    columns: [
      { key: 'name', label: 'Title' },
      { key: 'status', label: 'Status' },
      { key: 'updated', label: 'Updated', align: 'right' },
    ],
    rows: [
      { name: 'Brand Core', status: 'Ready', updated: '2 days ago' },
      { name: 'Layout Grid', status: 'Draft', updated: 'Today' },
      { name: 'Dialog', status: 'Ready', updated: '1 week ago' },
    ],
    density: 'comfortable',
    striped: false,
    hover: true,
    rounded: 'md',
  },
})

const columns = [
  { key: 'name', label: 'Title' },
  { key: 'status', label: 'Status' },
  { key: 'updated', label: 'Updated', align: 'right' },
]
const rows = [
  { name: 'Brand Core', status: 'Ready', updated: '2 days ago' },
  { name: 'Layout Grid', status: 'Draft', updated: 'Today' },
  { name: 'Dialog', status: 'Ready', updated: '1 week ago' },
]
</script>

<template>
  <Story name="Default">
    <template #template="{ args }">
      <Table
        :columns="args.columns"
        :rows="args.rows"
        :density="args.density"
        :striped="args.striped"
        :hover="args.hover"
        :rounded="args.rounded"
      />
    </template>
  </Story>

  <Story name="Density" asChild>
    <div style="display: grid; gap: 12px;">
      <Table :columns="columns" :rows="rows" density="comfortable" />
      <Table :columns="columns" :rows="rows" density="compact" />
    </div>
  </Story>

  <Story name="StripedAndHover" asChild>
    <div style="display: grid; gap: 12px;">
      <Table :columns="columns" :rows="rows" :striped="false" />
      <Table :columns="columns" :rows="rows" striped />
      <Table :columns="columns" :rows="rows" :hover="false" />
      <Table :columns="columns" :rows="rows" :hover="true" />
    </div>
  </Story>

  <Story name="Rounded" asChild>
    <div style="display: grid; gap: 12px;">
      <Table :columns="columns" :rows="rows" rounded="sm" />
      <Table :columns="columns" :rows="rows" rounded="md" />
      <Table :columns="columns" :rows="rows" rounded="lg" />
    </div>
  </Story>
</template>
