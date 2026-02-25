import { Stat, Grid, Card, CardBody } from '@morphink/ui'
import type { Meta, StoryObj } from '@storybook/vue3-vite'

const meta: Meta<typeof Stat> = {
  title: 'Components/Molecules/Stat',
  component: Stat,
  tags: ['autodocs'],
  argTypes: {
    label: { control: 'text' },
    value: { control: 'text' },
    description: { control: 'text' },
    trend: { control: 'select', options: ['up', 'down', 'neutral'] },
    trendValue: { control: 'text' },
  },
}

export default meta
type Story = StoryObj<typeof Stat>

export const Default: Story = {
  args: {
    label: 'Total Revenue',
    value: '$45,231',
  },
}

export const WithTrend: Story = {
  args: {
    label: 'Monthly Active Users',
    value: '2,350',
    trend: 'up',
    trendValue: '+12.5%',
    description: 'Compared to last month',
  },
}

export const StatsGrid: Story = {
  render: () => ({
    components: { Stat, Grid, Card, CardBody },
    template: `
      <Grid :columns="4" gap="md">
        <Card><CardBody><Stat label="Revenue" value="$45,231" trend="up" trendValue="+20.1%" /></CardBody></Card>
        <Card><CardBody><Stat label="Subscriptions" value="+2,350" trend="up" trendValue="+180.1%" /></CardBody></Card>
        <Card><CardBody><Stat label="Sales" value="+12,234" trend="down" trendValue="-19%" /></CardBody></Card>
        <Card><CardBody><Stat label="Active Now" value="+573" trend="neutral" trendValue="+201" /></CardBody></Card>
      </Grid>
    `,
  }),
}
