import { AppSidebar, NavItem, Stack, Text, Heading, Divider, Button } from '@morphink/ui'
import type { Meta, StoryObj } from '@storybook/vue3-vite'

const meta: Meta<typeof AppSidebar> = {
  title: 'Components/Organisms/AppSidebar',
  component: AppSidebar,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof AppSidebar>

export const Default: Story = {
  render: () => ({
    components: { AppSidebar, NavItem, Stack, Text },
    template: `
      <div style="height: 400px; width: 240px; border: var(--morphink-border-width-default) solid var(--morphink-color-border)">
        <AppSidebar>
          <template #header>
            <Text variant="label">Navigation</Text>
          </template>
          <Stack gap="xs">
            <NavItem label="Dashboard" href="/dashboard" active />
            <NavItem label="Projects" href="/projects" badge="3" />
            <NavItem label="Team" href="/team" />
            <NavItem label="Settings" href="/settings" />
          </Stack>
        </AppSidebar>
      </div>
    `,
  }),
}

export const WithSections: Story = {
  render: () => ({
    components: { AppSidebar, NavItem, Stack, Text, Heading, Divider, Button },
    template: `
      <div style="height: 500px; width: 260px; border: var(--morphink-border-width-default) solid var(--morphink-color-border)">
        <AppSidebar>
          <template #header>
            <Heading :level="5">My App</Heading>
          </template>
          <Stack gap="lg">
            <Stack gap="xs">
              <Text variant="caption" muted>MAIN</Text>
              <NavItem label="Dashboard" href="/dashboard" active />
              <NavItem label="Analytics" href="/analytics" />
            </Stack>
            <Stack gap="xs">
              <Text variant="caption" muted>CONTENT</Text>
              <NavItem label="Posts" href="/posts" badge="12" />
              <NavItem label="Media" href="/media" />
              <NavItem label="Pages" href="/pages" />
            </Stack>
          </Stack>
          <template #footer>
            <Button variant="ghost" size="sm" :style="{ width: '100%' }">Sign Out</Button>
          </template>
        </AppSidebar>
      </div>
    `,
  }),
}
