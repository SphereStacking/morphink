import { Heading, Text, Stack } from '@morphink/ui'
import type { Meta, StoryObj } from '@storybook/vue3-vite'

const meta: Meta = {
  title: 'Components/Atoms/Typography',
  tags: ['autodocs'],
  argTypes: {
    headingLevel: { control: { type: 'select' }, options: [1, 2, 3, 4, 5, 6] },
    variant: { control: { type: 'select' }, options: ['body', 'caption', 'label'] },
    weight: { control: { type: 'select' }, options: ['regular', 'medium', 'semibold', 'bold'] },
    muted: { control: 'boolean' },
    text: { control: 'text' },
  },
  args: {
    headingLevel: 3,
    variant: 'body',
    weight: 'regular',
    muted: false,
    text: 'Text preview',
  },
}

export default meta
type Story = StoryObj

export const Default: Story = {
  render: (args) => ({
    components: { Heading, Text, Stack },
    setup() {
      return { args }
    },
    template: `
      <Stack gap="md">
        <Heading :level="args.headingLevel">Heading Preview</Heading>
        <Text :variant="args.variant" :weight="args.weight" :muted="args.muted">{{ args.text }}</Text>
      </Stack>
    `,
  }),
}

export const HeadingLevels: Story = {
  render: () => ({
    components: { Heading, Text, Stack },
    template: `
      <Stack gap="sm">
        <Heading :level="1">H1</Heading>
        <Heading :level="2">H2</Heading>
        <Heading :level="3">H3</Heading>
        <Heading :level="4">H4</Heading>
      </Stack>
    `,
  }),
}

export const TextVariants: Story = {
  render: () => ({
    components: { Heading, Text, Stack },
    template: `
      <Stack gap="sm">
        <Text variant="body">Body</Text>
        <Text variant="caption">Caption</Text>
        <Text variant="label">Label</Text>
      </Stack>
    `,
  }),
}

export const WeightsAndMuted: Story = {
  render: () => ({
    components: { Heading, Text, Stack },
    template: `
      <Stack gap="sm">
        <Text weight="regular">Regular</Text>
        <Text weight="medium">Medium</Text>
        <Text weight="semibold">Semibold</Text>
        <Text weight="bold">Bold</Text>
        <Text :muted="false">Muted false</Text>
        <Text muted>Muted true</Text>
      </Stack>
    `,
  }),
}
