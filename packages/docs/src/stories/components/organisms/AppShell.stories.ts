import { AppShell, Button, Stack, Text, Heading, Nav, Divider } from '@morphink/ui'
import type { Meta, StoryObj } from '@storybook/vue3-vite'

const meta: Meta<typeof AppShell> = {
  title: 'Components/Organisms/AppShell',
  component: AppShell,
  tags: ['autodocs'],
  argTypes: {
    sidebarWidth: { control: 'text' },
    sidebarCollapsed: { control: 'boolean' },
  },
  parameters: {
    layout: 'fullscreen',
  },
}

export default meta
type Story = StoryObj<typeof AppShell>

export const Default: Story = {
  render: (args) => ({
    components: { AppShell, Button, Stack, Text, Heading, Nav, Divider },
    setup() {
      return { args }
    },
    template: `
      <AppShell v-bind="args" style="height: 500px">
        <template #header>
          <div style="padding: var(--morphink-space-sm) var(--morphink-space-lg); display: flex; align-items: center; justify-content: space-between">
            <Heading :level="5">My App</Heading>
            <Button size="sm" variant="ghost">Sign Out</Button>
          </div>
        </template>
        <template #sidebar>
          <Nav style="padding: var(--morphink-space-md)">
            <Stack gap="xs">
              <Text variant="label" muted style="padding: var(--morphink-space-xs) var(--morphink-space-sm)">NAVIGATION</Text>
              <Button variant="ghost" size="sm" style="justify-content: flex-start">Dashboard</Button>
              <Button variant="ghost" size="sm" style="justify-content: flex-start">Projects</Button>
              <Button variant="ghost" size="sm" style="justify-content: flex-start">Settings</Button>
            </Stack>
          </Nav>
        </template>
        <div style="padding: var(--morphink-space-xl)">
          <Heading :level="2">Dashboard</Heading>
          <Text muted style="margin-top: var(--morphink-space-sm)">Welcome to your application.</Text>
        </div>
      </AppShell>
    `,
  }),
  args: {
    sidebarWidth: '240px',
    sidebarCollapsed: false,
  },
}

export const CollapsedSidebar: Story = {
  render: (args) => ({
    components: { AppShell, Heading, Text },
    setup() {
      return { args }
    },
    template: `
      <AppShell v-bind="args" style="height: 400px">
        <template #header>
          <div style="padding: var(--morphink-space-sm) var(--morphink-space-lg)">
            <Heading :level="5">My App</Heading>
          </div>
        </template>
        <template #sidebar>
          <div style="padding: var(--morphink-space-md)">Sidebar</div>
        </template>
        <div style="padding: var(--morphink-space-xl)">
          <Text>Sidebar is collapsed</Text>
        </div>
      </AppShell>
    `,
  }),
  args: {
    sidebarCollapsed: true,
  },
}

export const NoSidebar: Story = {
  render: (args) => ({
    components: { AppShell, Heading, Text },
    setup() {
      return { args }
    },
    template: `
      <AppShell v-bind="args" style="height: 400px">
        <template #header>
          <div style="padding: var(--morphink-space-sm) var(--morphink-space-lg)">
            <Heading :level="5">My App</Heading>
          </div>
        </template>
        <div style="padding: var(--morphink-space-xl)">
          <Text>No sidebar — header + content only.</Text>
        </div>
      </AppShell>
    `,
  }),
}
