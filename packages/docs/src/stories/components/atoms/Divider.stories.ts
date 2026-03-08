import { Divider, Stack, Text } from '@morphink/ui'
import type { Meta, StoryObj } from '@storybook/vue3-vite'

const meta: Meta<typeof Divider> = {
  title: 'Components/Atoms/Divider',
  component: Divider,
  tags: ['autodocs'],
  argTypes: {
    vertical: { control: 'boolean' },
    weight: { control: 'select', options: ['none', 'default', 'strong', 'heavy'] },
  },
  args: {
    vertical: false,
    weight: 'default',
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
      <Stack :direction="args.vertical ? 'row' : 'column'" :align="args.vertical ? 'center' : undefined" gap="md">
        <Text>Section A</Text>
        <Divider v-bind="args" />
        <Text>Section B</Text>
      </Stack>
    `,
  }),
}

export const Vertical: Story = {
  render: () => ({
    components: { Divider, Stack, Text },
    template: `
      <Stack direction="row" align="center" gap="md">
        <Text>Section A</Text>
        <Divider vertical />
        <Text>Section B</Text>
      </Stack>
    `,
  }),
}

export const Weight: Story = {
  render: () => ({
    components: { Divider, Stack, Text },
    template: `
      <Stack direction="column" gap="lg">
        <Stack direction="column" gap="sm">
          <Text size="sm" color="muted">default (1px)</Text>
          <Divider weight="default" />
        </Stack>
        <Stack direction="column" gap="sm">
          <Text size="sm" color="muted">strong (2px)</Text>
          <Divider weight="strong" />
        </Stack>
        <Stack direction="column" gap="sm">
          <Text size="sm" color="muted">heavy (4px)</Text>
          <Divider weight="heavy" />
        </Stack>
      </Stack>
    `,
  }),
}
