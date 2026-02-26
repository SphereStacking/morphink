import { Heading, Stack } from '@morphink/ui'
import type { Meta, StoryObj } from '@storybook/vue3-vite'

const meta: Meta<typeof Heading> = {
  title: 'Components/Atoms/Heading',
  component: Heading,
  tags: ['autodocs'],
  argTypes: {
    level: { control: { type: 'select' }, options: [1, 2, 3, 4, 5, 6] },
    text: { control: 'text' },
  },
  args: {
    level: 2,
    text: 'Heading Preview',
  },
}

export default meta
type Story = StoryObj<typeof Heading>

export const Default: Story = {
  render: (args) => ({
    components: { Heading },
    setup() {
      return { args }
    },
    template: `
      <Heading :level="args.level">{{ args.text }}</Heading>
    `,
  }),
}

export const Levels: Story = {
  render: () => ({
    components: { Heading, Stack },
    template: `
      <Stack gap="sm">
        <Heading :level="1">H1</Heading>
        <Heading :level="2">H2</Heading>
        <Heading :level="3">H3</Heading>
        <Heading :level="4">H4</Heading>
        <Heading :level="5">H5</Heading>
        <Heading :level="6">H6</Heading>
      </Stack>
    `,
  }),
}
