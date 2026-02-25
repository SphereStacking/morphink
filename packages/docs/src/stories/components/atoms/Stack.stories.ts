import { Stack, Panel, Text } from '@morphink/ui'
import type { Meta, StoryObj } from '@storybook/vue3-vite'

const meta: Meta = {
  title: 'Components/Atoms/Stack',
  argTypes: {
    direction: { control: { type: 'select' }, options: ['row', 'column'] },
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
      options: ['start', 'center', 'end', 'between', 'around', 'evenly'],
    },
    wrap: { control: 'boolean' },
  },
  args: {
    direction: 'row',
    gap: 'md',
    align: 'center',
    justify: 'start',
    wrap: true,
  },
}

export default meta
type Story = StoryObj

export const Playground: Story = {
  render: (args) => ({
    components: { Stack, Panel, Text },
    setup() {
      return { args }
    },
    template: `
      <div style="max-width: 420px;">
        <Stack
          :direction="args.direction"
          :gap="args.gap"
          :align="args.align"
          :justify="args.justify"
          :wrap="args.wrap"
        >
          <Panel style="min-width: 120px;"><Text>Card A</Text></Panel>
          <Panel style="min-width: 120px;"><Text>Card B</Text></Panel>
          <Panel style="min-width: 120px;"><Text>Card C</Text></Panel>
        </Stack>
      </div>
    `,
  }),
}

export const Overview: Story = {
  render: () => ({
    components: { Stack, Panel, Text },
    template: `
      <Stack gap="xl">
        <Stack gap="md">
          <div class="text-xs font-semibold text-[var(--morphink-color-muted-foreground)]">default</div>
          <Stack gap="md">
            <Panel><Text>Item A</Text></Panel>
            <Panel><Text>Item B</Text></Panel>
          </Stack>
        </Stack>

        <div class="border border-[var(--morphink-color-border)]"></div>

        <Stack gap="md">
          <div class="text-xs font-semibold text-[var(--morphink-color-muted-foreground)]">direction</div>
          <Stack direction="row" gap="md">
            <Panel><Text>Row A</Text></Panel>
            <Panel><Text>Row B</Text></Panel>
          </Stack>
          <Stack direction="column" gap="md">
            <Panel><Text>Column A</Text></Panel>
            <Panel><Text>Column B</Text></Panel>
          </Stack>
        </Stack>

        <Stack gap="md">
          <div class="text-xs font-semibold text-[var(--morphink-color-muted-foreground)]">gap tokens</div>
          <Stack direction="row" gap="sm">
            <Panel><Text>sm (8px)</Text></Panel>
            <Panel><Text>sm</Text></Panel>
          </Stack>
          <Stack direction="row" gap="xl">
            <Panel><Text>xl (24px)</Text></Panel>
            <Panel><Text>xl</Text></Panel>
          </Stack>
        </Stack>

        <Stack gap="md">
          <div class="text-xs font-semibold text-[var(--morphink-color-muted-foreground)]">align</div>
          <div style="height: 80px;">
            <Stack direction="row" gap="md" align="start" style="height: 80px;">
              <Panel style="height: 40px;"><Text>Start</Text></Panel>
              <Panel style="height: 60px;"><Text>Start</Text></Panel>
            </Stack>
          </div>
          <div style="height: 80px;">
            <Stack direction="row" gap="md" align="center" style="height: 80px;">
              <Panel style="height: 40px;"><Text>Center</Text></Panel>
              <Panel style="height: 60px;"><Text>Center</Text></Panel>
            </Stack>
          </div>
          <div style="height: 80px;">
            <Stack direction="row" gap="md" align="end" style="height: 80px;">
              <Panel style="height: 40px;"><Text>End</Text></Panel>
              <Panel style="height: 60px;"><Text>End</Text></Panel>
            </Stack>
          </div>
        </Stack>

        <Stack gap="md">
          <div class="text-xs font-semibold text-[var(--morphink-color-muted-foreground)]">justify</div>
          <Stack direction="row" gap="md" justify="start">
            <Panel><Text>Start</Text></Panel>
            <Panel><Text>Start</Text></Panel>
          </Stack>
          <Stack direction="row" gap="md" justify="center">
            <Panel><Text>Center</Text></Panel>
            <Panel><Text>Center</Text></Panel>
          </Stack>
          <Stack direction="row" gap="md" justify="between">
            <Panel><Text>Between</Text></Panel>
            <Panel><Text>Between</Text></Panel>
          </Stack>
        </Stack>

        <Stack gap="md">
          <div class="text-xs font-semibold text-[var(--morphink-color-muted-foreground)]">wrap</div>
          <Stack direction="row" gap="md" wrap>
            <Panel style="min-width: 160px;"><Text>Wrap A</Text></Panel>
            <Panel style="min-width: 160px;"><Text>Wrap B</Text></Panel>
            <Panel style="min-width: 160px;"><Text>Wrap C</Text></Panel>
          </Stack>
        </Stack>
      </Stack>
    `,
  }),
}
