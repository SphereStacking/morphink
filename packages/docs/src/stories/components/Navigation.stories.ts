import { Nav, Text, Stack } from '@ink-ui/ui'
import type { Meta, StoryObj } from '@storybook/vue3-vite'

const meta: Meta = {
  title: 'Components/Navigation',
  argTypes: {
    items: { control: 'object' },
    size: { control: { type: 'select' }, options: ['sm', 'md'] },
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
      <Stack gap="12px">
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
      <Stack gap="30px">
        <Stack direction="column" gap="12px">
          <div class="text-xs font-semibold text-[var(--color-muted-foreground)]">default</div>
          <Nav :items="items" />
        </Stack>
        <div class="border border-[var(--color-border)]"></div>
        <Stack direction="column" gap="12px">
          <div class="text-xs font-semibold text-[var(--color-muted-foreground)]">size</div>
          <Stack gap="12px">
            <Nav :items="items" size="sm" />
            <Nav :items="items" size="md" />
          </Stack>
        </Stack>
        <Stack direction="column" gap="12px">
          <div class="text-xs font-semibold text-[var(--color-muted-foreground)]">variant</div>
          <Stack gap="12px">
            <Nav :items="items" variant="subtle" />
            <Nav :items="items" variant="solid" />
          </Stack>
        </Stack>
      </Stack>
    `,
  }),
}
