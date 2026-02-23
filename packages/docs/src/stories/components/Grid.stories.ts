import { Grid, Panel, Text, Stack } from '@morphink/ui'
import type { Meta, StoryObj } from '@storybook/vue3-vite'

const meta: Meta = {
  title: 'Components/Grid',
  argTypes: {
    columns: { control: 'text' },
    gap: { control: 'text' },
  },
  args: {
    columns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '16px',
  },
}

export default meta
type Story = StoryObj

export const Playground: Story = {
  render: (args) => ({
    components: { Grid, Panel, Text, Stack },
    setup() {
      return { args }
    },
    template: `
      <Stack gap="12px">
        <Text muted>Adjust columns and gap to preview.</Text>
        <Grid :columns="args.columns" :gap="args.gap">
          <Panel><Text>Block A</Text></Panel>
          <Panel><Text>Block B</Text></Panel>
          <Panel><Text>Block C</Text></Panel>
          <Panel><Text>Block D</Text></Panel>
        </Grid>
      </Stack>
    `,
  }),
}

export const Overview: Story = {
  render: () => ({
    components: { Grid, Panel, Text },
    template: `
      <div style="display: grid; gap: 30px;">
        <div style="display: grid; gap: 12px;">
          <div class="text-xs font-semibold text-[var(--morphink-color-muted-foreground)]">default</div>
          <Grid columns="repeat(auto-fit, minmax(200px, 1fr))" gap="16px">
            <Panel><Text>Block A</Text></Panel>
            <Panel><Text>Block B</Text></Panel>
            <Panel><Text>Block C</Text></Panel>
          </Grid>
        </div>
        <div class="border border-[var(--morphink-color-border)]"></div>
        <div style="display: grid; gap: 12px;">
          <div class="text-xs font-semibold text-[var(--morphink-color-muted-foreground)]">columns</div>
          <Grid columns="repeat(2, minmax(0, 1fr))" gap="16px">
            <Panel><Text>2 cols</Text></Panel>
            <Panel><Text>2 cols</Text></Panel>
          </Grid>
          <Grid columns="repeat(3, minmax(0, 1fr))" gap="16px">
            <Panel><Text>3 cols</Text></Panel>
            <Panel><Text>3 cols</Text></Panel>
            <Panel><Text>3 cols</Text></Panel>
          </Grid>
        </div>
        <div style="display: grid; gap: 12px;">
          <div class="text-xs font-semibold text-[var(--morphink-color-muted-foreground)]">gap</div>
          <Grid columns="repeat(3, minmax(0, 1fr))" gap="8px">
            <Panel><Text>8px</Text></Panel>
            <Panel><Text>8px</Text></Panel>
            <Panel><Text>8px</Text></Panel>
          </Grid>
          <Grid columns="repeat(3, minmax(0, 1fr))" gap="24px">
            <Panel><Text>24px</Text></Panel>
            <Panel><Text>24px</Text></Panel>
            <Panel><Text>24px</Text></Panel>
          </Grid>
        </div>
      </div>
    `,
  }),
}
