import type { Meta, StoryObj } from '@storybook/vue3'
import { Table } from '@ink-ui/ui'
import { componentRounded } from '@ink-ui/ui'

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
      { key: 'name', label: 'タイトル' },
      { key: 'status', label: '状態' },
      { key: 'updated', label: '更新', align: 'right' },
    ],
    rows: [
      { name: 'ブランドコア', status: '準備完了', updated: '2日前' },
      { name: 'レイアウトグリッド', status: '下書き', updated: '今日' },
      { name: 'ダイアログ', status: '準備完了', updated: '1週間前' },
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
  render: args => ({
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
        { key: 'name', label: 'タイトル' },
        { key: 'status', label: '状態' },
        { key: 'updated', label: '更新', align: 'right' as const },
      ]
      const rows = [
        { name: 'ブランドコア', status: '準備完了', updated: '2日前' },
        { name: 'レイアウトグリッド', status: '下書き', updated: '今日' },
        { name: 'ダイアログ', status: '準備完了', updated: '1週間前' },
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
