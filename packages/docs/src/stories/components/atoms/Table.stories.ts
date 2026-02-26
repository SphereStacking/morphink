import { Table } from '@morphink/ui'
import { componentRounded } from '@morphink/ui'
import type { Meta, StoryObj } from '@storybook/vue3-vite'

const meta: Meta<typeof Table> = {
  title: 'Components/Atoms/Table',
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
}

export default meta
type Story = StoryObj<typeof Table>

export const Default: Story = {
  render: (args) => ({
    components: { Table },
    setup() {
      return { args }
    },
    template: `
      <Table
        :columns="args.columns"
        :rows="args.rows"
        :density="args.density"
        :striped="args.striped"
        :hover="args.hover"
        :rounded="args.rounded"
      />
    `,
  }),
}

export const Density: Story = {
  render: () => ({
    components: { Table },
    setup() {
      const columns = [
        { key: 'name', label: 'Title' },
        { key: 'status', label: 'Status' },
        { key: 'updated', label: 'Updated', align: 'right' as const },
      ]
      const rows = [
        { name: 'Brand Core', status: 'Ready', updated: '2 days ago' },
        { name: 'Layout Grid', status: 'Draft', updated: 'Today' },
        { name: 'Dialog', status: 'Ready', updated: '1 week ago' },
      ]
      return { columns, rows }
    },
    template: `
      <div style="display: grid; gap: 12px;">
        <Table :columns="columns" :rows="rows" density="comfortable" />
        <Table :columns="columns" :rows="rows" density="compact" />
      </div>
    `,
  }),
}

export const StripedAndHover: Story = {
  render: () => ({
    components: { Table },
    setup() {
      const columns = [
        { key: 'name', label: 'Title' },
        { key: 'status', label: 'Status' },
        { key: 'updated', label: 'Updated', align: 'right' as const },
      ]
      const rows = [
        { name: 'Brand Core', status: 'Ready', updated: '2 days ago' },
        { name: 'Layout Grid', status: 'Draft', updated: 'Today' },
        { name: 'Dialog', status: 'Ready', updated: '1 week ago' },
      ]
      return { columns, rows }
    },
    template: `
      <div style="display: grid; gap: 12px;">
        <Table :columns="columns" :rows="rows" :striped="false" />
        <Table :columns="columns" :rows="rows" striped />
        <Table :columns="columns" :rows="rows" :hover="false" />
        <Table :columns="columns" :rows="rows" :hover="true" />
      </div>
    `,
  }),
}

export const Rounded: Story = {
  render: () => ({
    components: { Table },
    setup() {
      const columns = [
        { key: 'name', label: 'Title' },
        { key: 'status', label: 'Status' },
        { key: 'updated', label: 'Updated', align: 'right' as const },
      ]
      const rows = [
        { name: 'Brand Core', status: 'Ready', updated: '2 days ago' },
        { name: 'Layout Grid', status: 'Draft', updated: 'Today' },
        { name: 'Dialog', status: 'Ready', updated: '1 week ago' },
      ]
      return { columns, rows }
    },
    template: `
      <div style="display: grid; gap: 12px;">
        <Table :columns="columns" :rows="rows" rounded="sm" />
        <Table :columns="columns" :rows="rows" rounded="md" />
        <Table :columns="columns" :rows="rows" rounded="lg" />
      </div>
    `,
  }),
}
