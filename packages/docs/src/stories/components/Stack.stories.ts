import { Stack, Panel, Text } from '@ink-ui/ui'
import type { Meta, StoryObj } from '@storybook/vue3-vite'

const meta: Meta = {
  title: 'Components/Stack',
  argTypes: {
    direction: { control: { type: 'select' }, options: ['row', 'column'] },
    gap: { control: 'text' },
    align: {
      control: { type: 'select' },
      options: ['stretch', 'flex-start', 'center', 'flex-end'],
    },
    justify: {
      control: { type: 'select' },
      options: ['flex-start', 'center', 'flex-end', 'space-between', 'space-around'],
    },
    wrap: { control: 'boolean' },
  },
  args: {
    direction: 'row',
    gap: '12px',
    align: 'center',
    justify: 'flex-start',
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
      <div style="display: grid; gap: 30px;">
        <div style="display: grid; gap: 12px;">
          <div class="text-xs font-semibold text-[var(--color-muted-foreground)]">default</div>
          <Stack gap="12px">
            <Panel><Text>Item A</Text></Panel>
            <Panel><Text>Item B</Text></Panel>
          </Stack>
        </div>
        <div class="border border-[var(--color-border)]"></div>
        <div style="display: grid; gap: 12px;">
          <div class="text-xs font-semibold text-[var(--color-muted-foreground)]">direction</div>
          <Stack direction="row" gap="12px">
            <Panel><Text>Row A</Text></Panel>
            <Panel><Text>Row B</Text></Panel>
          </Stack>
          <Stack direction="column" gap="12px">
            <Panel><Text>Column A</Text></Panel>
            <Panel><Text>Column B</Text></Panel>
          </Stack>
        </div>
        <div style="display: grid; gap: 12px;">
          <div class="text-xs font-semibold text-[var(--color-muted-foreground)]">gap</div>
          <Stack direction="row" gap="8px">
            <Panel><Text>8px</Text></Panel>
            <Panel><Text>8px</Text></Panel>
          </Stack>
          <Stack direction="row" gap="20px">
            <Panel><Text>20px</Text></Panel>
            <Panel><Text>20px</Text></Panel>
          </Stack>
        </div>
        <div style="display: grid; gap: 12px;">
          <div class="text-xs font-semibold text-[var(--color-muted-foreground)]">align</div>
          <div style="height: 80px;">
            <Stack direction="row" gap="12px" align="flex-start" style="height: 80px;">
              <Panel style="height: 40px;"><Text>Start</Text></Panel>
              <Panel style="height: 60px;"><Text>Start</Text></Panel>
            </Stack>
          </div>
          <div style="height: 80px;">
            <Stack direction="row" gap="12px" align="center" style="height: 80px;">
              <Panel style="height: 40px;"><Text>Center</Text></Panel>
              <Panel style="height: 60px;"><Text>Center</Text></Panel>
            </Stack>
          </div>
          <div style="height: 80px;">
            <Stack direction="row" gap="12px" align="flex-end" style="height: 80px;">
              <Panel style="height: 40px;"><Text>End</Text></Panel>
              <Panel style="height: 60px;"><Text>End</Text></Panel>
            </Stack>
          </div>
        </div>
        <div style="display: grid; gap: 12px;">
          <div class="text-xs font-semibold text-[var(--color-muted-foreground)]">justify</div>
          <Stack direction="row" gap="12px" justify="flex-start">
            <Panel><Text>Start</Text></Panel>
            <Panel><Text>Start</Text></Panel>
          </Stack>
          <Stack direction="row" gap="12px" justify="center">
            <Panel><Text>Center</Text></Panel>
            <Panel><Text>Center</Text></Panel>
          </Stack>
          <Stack direction="row" gap="12px" justify="space-between">
            <Panel><Text>Between</Text></Panel>
            <Panel><Text>Between</Text></Panel>
          </Stack>
        </div>
        <div style="display: grid; gap: 12px;">
          <div class="text-xs font-semibold text-[var(--color-muted-foreground)]">wrap</div>
          <Stack direction="row" gap="12px" wrap>
            <Panel style="min-width: 160px;"><Text>Wrap A</Text></Panel>
            <Panel style="min-width: 160px;"><Text>Wrap B</Text></Panel>
            <Panel style="min-width: 160px;"><Text>Wrap C</Text></Panel>
          </Stack>
        </div>
      </div>
    `,
  }),
}
