import { Text, Stack } from '@morphink/ui'
import type { Meta, StoryObj } from '@storybook/vue3-vite'

const meta: Meta<typeof Text> = {
  title: 'Components/Atoms/Text',
  component: Text,
  tags: ['autodocs'],
  argTypes: {
    variant: { control: { type: 'select' }, options: ['body', 'caption', 'label'] },
    weight: { control: { type: 'select' }, options: ['regular', 'medium', 'semibold', 'bold'] },
    muted: { control: 'boolean' },
    text: { control: 'text' },
  },
  args: {
    variant: 'body',
    weight: 'regular',
    muted: false,
    text: 'Body text preview',
  },
}

export default meta
type Story = StoryObj<typeof Text>

export const Default: Story = {
  render: (args) => ({
    components: { Text },
    setup() {
      return { args }
    },
    template: `
      <Text :variant="args.variant" :weight="args.weight" :muted="args.muted">
        {{ args.text }}
      </Text>
    `,
  }),
}

export const Variants: Story = {
  render: () => ({
    components: { Text, Stack },
    template: `
      <Stack gap="sm">
        <Text variant="body">Body</Text>
        <Text variant="caption">Caption</Text>
        <Text variant="label">Label</Text>
      </Stack>
    `,
  }),
}

export const Weights: Story = {
  render: () => ({
    components: { Text, Stack },
    template: `
      <Stack gap="sm">
        <Text weight="regular">Regular</Text>
        <Text weight="medium">Medium</Text>
        <Text weight="semibold">Semibold</Text>
        <Text weight="bold">Bold</Text>
      </Stack>
    `,
  }),
}

export const Muted: Story = {
  render: () => ({
    components: { Text, Stack },
    template: `
      <Stack gap="sm">
        <Text :muted="false">Muted false</Text>
        <Text muted>Muted true</Text>
      </Stack>
    `,
  }),
}
