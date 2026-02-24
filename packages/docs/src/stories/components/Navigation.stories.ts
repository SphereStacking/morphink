import { Nav, Text, Stack } from '@morphink/ui'
import { componentSizes } from '@morphink/ui'
import type { Meta, StoryObj } from '@storybook/vue3-vite'

const meta: Meta = {
  title: 'Components/Navigation',
  argTypes: {
    items: { control: 'object' },
    size: { control: { type: 'select' }, options: componentSizes.Nav },
    variant: { control: { type: 'select' }, options: ['subtle', 'solid'] },
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
type Story = StoryObj

export const Playground: Story = {
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

export const Overview: Story = {
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
      <Stack gap="2xl">
        <Stack direction="column" gap="md">
          <div class="text-xs font-semibold text-[var(--morphink-color-muted-foreground)]">default</div>
          <Nav :items="items" />
        </Stack>
        <div class="border border-[var(--morphink-color-border)]"></div>
        <Stack direction="column" gap="md">
          <div class="text-xs font-semibold text-[var(--morphink-color-muted-foreground)]">size</div>
          <Stack gap="md">
            <Nav :items="items" size="sm" />
            <Nav :items="items" size="md" />
          </Stack>
        </Stack>
        <Stack direction="column" gap="md">
          <div class="text-xs font-semibold text-[var(--morphink-color-muted-foreground)]">variant</div>
          <Stack gap="md">
            <Nav :items="items" variant="subtle" />
            <Nav :items="items" variant="solid" />
          </Stack>
        </Stack>
      </Stack>
    `,
  }),
}
