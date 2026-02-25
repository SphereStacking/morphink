import { DataTable } from '@morphink/ui'
import type { Meta, StoryObj } from '@storybook/vue3-vite'

const sampleColumns = [
  { key: 'name', label: 'Name' },
  { key: 'email', label: 'Email' },
  { key: 'role', label: 'Role' },
  { key: 'status', label: 'Status' },
]

const sampleRows = [
  { name: 'Alice Johnson', email: 'alice@example.com', role: 'Admin', status: 'Active' },
  { name: 'Bob Smith', email: 'bob@example.com', role: 'Editor', status: 'Active' },
  { name: 'Carol White', email: 'carol@example.com', role: 'Viewer', status: 'Inactive' },
  { name: 'David Brown', email: 'david@example.com', role: 'Editor', status: 'Active' },
  { name: 'Eva Green', email: 'eva@example.com', role: 'Admin', status: 'Active' },
  { name: 'Frank Lee', email: 'frank@example.com', role: 'Viewer', status: 'Inactive' },
  { name: 'Grace Kim', email: 'grace@example.com', role: 'Editor', status: 'Active' },
  { name: 'Henry Wang', email: 'henry@example.com', role: 'Viewer', status: 'Active' },
  { name: 'Iris Chen', email: 'iris@example.com', role: 'Admin', status: 'Active' },
  { name: 'Jack Davis', email: 'jack@example.com', role: 'Editor', status: 'Inactive' },
  { name: 'Karen Lopez', email: 'karen@example.com', role: 'Viewer', status: 'Active' },
  { name: 'Leo Martinez', email: 'leo@example.com', role: 'Admin', status: 'Active' },
]

const meta: Meta<typeof DataTable> = {
  title: 'Components/Organisms/DataTable',
  component: DataTable,
  tags: ['autodocs'],
  argTypes: {
    searchable: { control: 'boolean' },
    pageSize: { control: 'number' },
    density: { control: 'select', options: ['comfortable', 'compact'] },
    striped: { control: 'boolean' },
  },
}

export default meta
type Story = StoryObj<typeof DataTable>

export const Default: Story = {
  args: {
    columns: sampleColumns,
    rows: sampleRows,
    pageSize: 5,
  },
}

export const WithSearch: Story = {
  args: {
    columns: sampleColumns,
    rows: sampleRows,
    searchable: true,
    pageSize: 5,
  },
}

export const Empty: Story = {
  args: {
    columns: sampleColumns,
    rows: [],
    searchable: true,
    emptyTitle: 'No users found',
    emptyDescription: 'Try adjusting your search or add a new user.',
  },
}
