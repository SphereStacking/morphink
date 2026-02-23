import { Divider, Stack, Text } from '@ink-ui/ui'
import type { Meta, StoryObj } from '@storybook/vue3-vite'

const meta: Meta = {
  title: 'Components/Divider',
  argTypes: {
    vertical: { control: 'boolean' },
  },
  args: {
    vertical: false,
  },
}

export default meta
type Story = StoryObj

export const Playground: Story = {
  render: (args) => ({
    components: { Divider, Stack, Text },
    setup() {
      return { args }
    },
    template: `
      <Stack v-if="!args.vertical" gap="12px">
        <Text>Preview horizontal divider.</Text>
        <Divider :vertical="args.vertical" />
        <Text muted>A line to establish section rhythm.</Text>
      </Stack>
      <Stack v-else direction="row" align="center" gap="16px">
        <Text>Left</Text>
        <Divider :vertical="args.vertical" />
        <Text>Right</Text>
      </Stack>
    `,
  }),
}

export const Overview: Story = {
  render: () => ({
    components: { Divider, Stack, Text },
    template: `
      <Stack gap="30px">
        <Stack direction="column" gap="12px">
          <div class="text-xs font-semibold text-[var(--color-muted-foreground)]">default</div>
          <Stack gap="12px">
            <Text>Content above</Text>
            <Divider />
            <Text muted>Content below</Text>
          </Stack>
        </Stack>
        <div class="border border-[var(--color-border)]"></div>
        <Stack direction="column" gap="12px">
          <div class="text-xs font-semibold text-[var(--color-muted-foreground)]">vertical</div>
          <Stack direction="row" align="center" gap="16px">
            <Text>Left</Text>
            <Divider vertical />
            <Text>Right</Text>
          </Stack>
        </Stack>
      </Stack>
    `,
  }),
}
