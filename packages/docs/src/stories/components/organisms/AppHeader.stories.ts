import { AppHeader, Nav, Button, Badge } from '@morphink/ui'
import type { Meta, StoryObj } from '@storybook/vue3-vite'

const meta: Meta<typeof AppHeader> = {
  title: 'Components/Organisms/AppHeader',
  component: AppHeader,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
}

export default meta
type Story = StoryObj<typeof AppHeader>

export const Default: Story = {
  args: {
    title: 'My Application',
  },
}

export const WithNav: Story = {
  render: (args) => ({
    components: { AppHeader, Nav, Button },
    setup() { return { args } },
    template: `
      <AppHeader v-bind="args">
        <template #nav>
          <Nav :items="[{ label: 'Home', href: '/', active: true }, { label: 'Docs', href: '/docs' }, { label: 'Blog', href: '/blog' }]" size="sm" />
        </template>
        <template #actions>
          <Button size="sm" variant="outline">Sign In</Button>
        </template>
      </AppHeader>
    `,
  }),
  args: {
    title: 'morphink',
  },
}
