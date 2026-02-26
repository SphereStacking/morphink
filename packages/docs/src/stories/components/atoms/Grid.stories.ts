import { Grid, Panel, Text, Stack } from '@morphink/ui'
import type { Meta, StoryObj } from '@storybook/vue3-vite'

const meta: Meta<typeof Grid> = {
  title: 'Components/Atoms/Grid',
  component: Grid,
  tags: ['autodocs'],
  argTypes: {
    columns: { control: 'text' },
    minWidth: { control: 'text' },
    gap: {
      control: { type: 'select' },
      options: ['0', 'xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl'],
    },
    align: {
      control: { type: 'select' },
      options: ['start', 'center', 'end', 'stretch', 'baseline'],
    },
    justify: {
      control: { type: 'select' },
      options: ['start', 'center', 'end', 'stretch'],
    },
  },
  args: {
    columns: 'auto-fit',
    minWidth: '200px',
    gap: 'lg',
    align: 'stretch',
    justify: 'stretch',
  },
}

export default meta
type Story = StoryObj<typeof Grid>

export const Default: Story = {
  render: (args) => ({
    components: { Grid, Panel, Text, Stack },
    setup() {
      return { args }
    },
    template: `
      <Stack gap="md">
        <Text muted>Adjust columns, gap, align, justify to preview.</Text>
        <Grid
          :columns="args.columns"
          :min-width="args.minWidth"
          :gap="args.gap"
          :align="args.align"
          :justify="args.justify"
        >
          <Panel><Text>Block A</Text></Panel>
          <Panel><Text>Block B</Text></Panel>
          <Panel><Text>Block C</Text></Panel>
          <Panel><Text>Block D</Text></Panel>
        </Grid>
      </Stack>
    `,
  }),
}

export const FixedColumns: Story = {
  render: () => ({
    components: { Grid, Panel, Text, Stack },
    template: `
      <Stack gap="md">
        <Grid :columns="2" gap="lg">
          <Panel><Text>2 cols</Text></Panel>
          <Panel><Text>2 cols</Text></Panel>
        </Grid>
        <Grid :columns="3" gap="lg">
          <Panel><Text>3 cols</Text></Panel>
          <Panel><Text>3 cols</Text></Panel>
          <Panel><Text>3 cols</Text></Panel>
        </Grid>
      </Stack>
    `,
  }),
}

export const GapTokens: Story = {
  render: () => ({
    components: { Grid, Panel, Text, Stack },
    template: `
      <Stack gap="md">
        <Grid :columns="3" gap="sm">
          <Panel><Text>sm (8px)</Text></Panel>
          <Panel><Text>sm</Text></Panel>
          <Panel><Text>sm</Text></Panel>
        </Grid>
        <Grid :columns="3" gap="xl">
          <Panel><Text>xl (24px)</Text></Panel>
          <Panel><Text>xl</Text></Panel>
          <Panel><Text>xl</Text></Panel>
        </Grid>
      </Stack>
    `,
  }),
}

export const Alignment: Story = {
  render: () => ({
    components: { Grid, Panel, Text, Stack },
    template: `
      <Stack gap="md">
        <Grid :columns="3" :rows="2" gap="lg" style="height: 200px;">
          <Panel><Text>1</Text></Panel>
          <Panel><Text>2</Text></Panel>
          <Panel><Text>3</Text></Panel>
          <Panel><Text>4</Text></Panel>
          <Panel><Text>5</Text></Panel>
          <Panel><Text>6</Text></Panel>
        </Grid>
        <Grid :columns="3" gap="lg" align="center" style="height: 120px;">
          <Panel style="height: 40px;"><Text>center</Text></Panel>
          <Panel style="height: 60px;"><Text>center</Text></Panel>
          <Panel style="height: 80px;"><Text>center</Text></Panel>
        </Grid>
      </Stack>
    `,
  }),
}
