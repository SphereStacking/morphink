import { Nav, Text, Stack } from '@morphink/ui'
import { componentSizes, componentVariants } from '@morphink/ui'
import type { Meta, StoryObj } from '@storybook/vue3-vite'

const meta: Meta<typeof Nav> = {
  title: 'Components/Molecules/Navigation',
  component: Nav,
  tags: ['autodocs'],
  argTypes: {
    items: { control: 'object' },
    size: { control: { type: 'select' }, options: componentSizes.Nav },
    variant: { control: { type: 'select' }, options: componentVariants.Nav },
  },
  args: {
    items: [
      { label: 'Discover', href: '#', active: true },
      { label: 'Ranking', href: '#' },
      { label: 'Library', href: '#' },
    ],
    size: 'md',
    variant: 'subtle',
  },
}

export default meta
type Story = StoryObj<typeof Nav>

export const Default: Story = {
  render: (args) => ({
    components: { Nav, Stack, Text },
    setup() {
      return { args }
    },
    template: `
      <Stack gap="md">
        <Text muted>Preview active and hover states.</Text>
        <Nav :items="args.items" :size="args.size" :variant="args.variant" />
      </Stack>
    `,
  }),
}

export const Variants: Story = {
  render: () => ({
    components: { Nav, Stack },
    setup() {
      const items = [
        { label: 'Discover', href: '#', active: true },
        { label: 'Ranking', href: '#' },
        { label: 'Library', href: '#' },
      ]
      return { items }
    },
    template: `
      <Stack gap="md">
        <Nav :items="items" variant="subtle" />
        <Nav :items="items" variant="solid" />
      </Stack>
    `,
  }),
}

export const Sizes: Story = {
  render: () => ({
    components: { Nav, Stack },
    setup() {
      const items = [
        { label: 'Discover', href: '#', active: true },
        { label: 'Ranking', href: '#' },
        { label: 'Library', href: '#' },
      ]
      return { items }
    },
    template: `
      <Stack gap="md">
        <Nav :items="items" size="sm" />
        <Nav :items="items" size="md" />
      </Stack>
    `,
  }),
}
