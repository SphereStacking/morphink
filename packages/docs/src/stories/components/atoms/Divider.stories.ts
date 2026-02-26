import { Divider, Stack, Text } from '@morphink/ui'
import type { Meta, StoryObj } from '@storybook/vue3-vite'

const meta: Meta<typeof Divider> = {
  title: 'Components/Atoms/Divider',
  component: Divider,
  tags: ['autodocs'],
  argTypes: {
    vertical: { control: 'boolean' },
  },
  args: {
    vertical: false,
  },
}

export default meta
type Story = StoryObj<typeof Divider>

export const Default: Story = {
  render: (args) => ({
    components: { Divider, Stack, Text },
    setup() {
      return { args }
    },
    template: `
      <Stack gap="md">
        <Text>Content above</Text>
        <Divider />
        <Text muted>Content below</Text>
      </Stack>
    `,
  }),
}

export const Vertical: Story = {
  render: () => ({
    components: { Divider, Stack, Text },
    template: `
      <Stack direction="row" align="center" gap="lg">
        <Text>Left</Text>
        <Divider vertical />
        <Text>Right</Text>
      </Stack>
    `,
  }),
}
