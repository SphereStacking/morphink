import { Table } from '@ink-ui/ui'
import { componentRounded } from '@ink-ui/ui'
import type { Meta, StoryObj } from '@storybook/vue3-vite'

const meta: Meta = {
  title: 'Components/Table',
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
type Story = StoryObj

export const Playground: Story = {
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

export const Overview: Story = {
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
      <div style="display: grid; gap: 30px;">
        <div style="display: grid; gap: 12px;">
          <div class="text-xs font-semibold text-[var(--color-muted-foreground)]">default</div>
          <Table :columns="columns" :rows="rows" />
        </div>
        <div class="border border-[var(--color-border)]"></div>
        <div style="display: grid; gap: 12px;">
          <div class="text-xs font-semibold text-[var(--color-muted-foreground)]">density</div>
          <div style="display: grid; gap: 12px;">
            <Table :columns="columns" :rows="rows" density="comfortable" />
            <Table :columns="columns" :rows="rows" density="compact" />
          </div>
        </div>
        <div style="display: grid; gap: 12px;">
          <div class="text-xs font-semibold text-[var(--color-muted-foreground)]">striped</div>
          <div style="display: grid; gap: 12px;">
            <Table :columns="columns" :rows="rows" :striped="false" />
            <Table :columns="columns" :rows="rows" striped />
          </div>
        </div>
        <div style="display: grid; gap: 12px;">
          <div class="text-xs font-semibold text-[var(--color-muted-foreground)]">hover</div>
          <div style="display: grid; gap: 12px;">
            <Table :columns="columns" :rows="rows" :hover="false" />
            <Table :columns="columns" :rows="rows" :hover="true" />
          </div>
        </div>
        <div style="display: grid; gap: 12px;">
          <div class="text-xs font-semibold text-[var(--color-muted-foreground)]">rounded</div>
          <div style="display: grid; gap: 12px;">
            <Table :columns="columns" :rows="rows" rounded="sm" />
            <Table :columns="columns" :rows="rows" rounded="md" />
            <Table :columns="columns" :rows="rows" rounded="lg" />
          </div>
        </div>
      </div>
    `,
  }),
}
