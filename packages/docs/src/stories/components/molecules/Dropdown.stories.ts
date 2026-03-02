import {
  Dropdown,
  DropdownTrigger,
  DropdownContent,
  DropdownItem,
  DropdownSeparator,
  DropdownGroup,
  DropdownLabel,
  DropdownCheckboxItem,
  DropdownRadioGroup,
  DropdownRadioItem,
  DropdownSub,
  DropdownSubTrigger,
  DropdownSubContent,
  Button,
  Stack,
  Text,
  componentRounded,
  componentShadow,
  componentSizes,
} from '@morphink/ui'
import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { ref } from 'vue'

const meta: Meta<typeof Dropdown> = {
  title: 'Components/Molecules/Dropdown',
  component: Dropdown,
  tags: ['autodocs'],
  argTypes: {
    side: { control: { type: 'select' }, options: ['top', 'right', 'bottom', 'left'] },
    align: { control: { type: 'select' }, options: ['start', 'center', 'end'] },
    rounded: { control: { type: 'select' }, options: componentRounded.Dropdown },
    shadow: { control: { type: 'select' }, options: componentShadow.Dropdown },
    size: { control: { type: 'select' }, options: componentSizes.Dropdown },
  },
  args: {
    side: 'bottom',
    align: 'start',
    rounded: 'md',
    shadow: 'md',
    size: 'md',
  },
}

export default meta
type Story = StoryObj<typeof Dropdown>

export const Playground: Story = {
  render: (args) => ({
    components: {
      Dropdown,
      DropdownTrigger,
      DropdownContent,
      DropdownItem,
      DropdownSeparator,
      Button,
      Stack,
      Text,
    },
    setup() {
      return { args }
    },
    template: `
      <Stack gap="md">
        <Text muted>Click to open the menu.</Text>
        <Dropdown>
          <DropdownTrigger>
            <Button size="sm" variant="outline">Menu</Button>
          </DropdownTrigger>
          <DropdownContent :side="args.side" :align="args.align" :rounded="args.rounded" :shadow="args.shadow" :size="args.size">
            <DropdownItem>Edit</DropdownItem>
            <DropdownItem>Duplicate</DropdownItem>
            <DropdownSeparator />
            <DropdownItem destructive>Delete</DropdownItem>
          </DropdownContent>
        </Dropdown>
      </Stack>
    `,
  }),
}

export const WithIcons: Story = {
  render: () => ({
    components: {
      Dropdown,
      DropdownTrigger,
      DropdownContent,
      DropdownItem,
      DropdownSeparator,
      DropdownGroup,
      DropdownLabel,
      Button,
      Stack,
    },
    template: `
      <Stack gap="md">
        <Dropdown>
          <DropdownTrigger>
            <Button size="sm" variant="outline">Actions</Button>
          </DropdownTrigger>
          <DropdownContent>
            <DropdownGroup>
              <DropdownLabel>Edit</DropdownLabel>
              <DropdownItem>
                <template #icon>
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/></svg>
                </template>
                Edit
              </DropdownItem>
              <DropdownItem>
                <template #icon>
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>
                </template>
                Duplicate
              </DropdownItem>
            </DropdownGroup>
            <DropdownSeparator />
            <DropdownItem destructive>
              <template #icon>
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/></svg>
              </template>
              Delete
            </DropdownItem>
          </DropdownContent>
        </Dropdown>
      </Stack>
    `,
  }),
}

export const WithCheckbox: Story = {
  render: () => ({
    components: {
      Dropdown,
      DropdownTrigger,
      DropdownContent,
      DropdownItem,
      DropdownSeparator,
      DropdownCheckboxItem,
      DropdownRadioGroup,
      DropdownRadioItem,
      DropdownLabel,
      Button,
      Stack,
    },
    setup() {
      const showStatusBar = ref(true)
      const showActivityBar = ref(false)
      const showPanel = ref(true)
      const theme = ref('system')
      return { showStatusBar, showActivityBar, showPanel, theme }
    },
    template: `
      <Stack gap="md">
        <Dropdown>
          <DropdownTrigger>
            <Button size="sm" variant="outline">View</Button>
          </DropdownTrigger>
          <DropdownContent>
            <DropdownLabel>Appearance</DropdownLabel>
            <DropdownCheckboxItem v-model="showStatusBar">Status Bar</DropdownCheckboxItem>
            <DropdownCheckboxItem v-model="showActivityBar">Activity Bar</DropdownCheckboxItem>
            <DropdownCheckboxItem v-model="showPanel">Panel</DropdownCheckboxItem>
            <DropdownSeparator />
            <DropdownLabel>Theme</DropdownLabel>
            <DropdownRadioGroup v-model="theme">
              <DropdownRadioItem value="light">Light</DropdownRadioItem>
              <DropdownRadioItem value="dark">Dark</DropdownRadioItem>
              <DropdownRadioItem value="system">System</DropdownRadioItem>
            </DropdownRadioGroup>
          </DropdownContent>
        </Dropdown>
      </Stack>
    `,
  }),
}

export const WithSubMenu: Story = {
  render: () => ({
    components: {
      Dropdown,
      DropdownTrigger,
      DropdownContent,
      DropdownItem,
      DropdownSeparator,
      DropdownSub,
      DropdownSubTrigger,
      DropdownSubContent,
      Button,
      Stack,
    },
    template: `
      <Stack gap="md">
        <Dropdown>
          <DropdownTrigger>
            <Button size="sm" variant="outline">Options</Button>
          </DropdownTrigger>
          <DropdownContent>
            <DropdownItem>New File</DropdownItem>
            <DropdownItem>Open File</DropdownItem>
            <DropdownSeparator />
            <DropdownSub>
              <DropdownSubTrigger>Share</DropdownSubTrigger>
              <DropdownSubContent>
                <DropdownItem>Copy Link</DropdownItem>
                <DropdownItem>Email</DropdownItem>
                <DropdownItem>Message</DropdownItem>
              </DropdownSubContent>
            </DropdownSub>
            <DropdownSub>
              <DropdownSubTrigger>Export</DropdownSubTrigger>
              <DropdownSubContent>
                <DropdownItem>PDF</DropdownItem>
                <DropdownItem>CSV</DropdownItem>
                <DropdownItem>JSON</DropdownItem>
              </DropdownSubContent>
            </DropdownSub>
            <DropdownSeparator />
            <DropdownItem destructive>Delete</DropdownItem>
          </DropdownContent>
        </Dropdown>
      </Stack>
    `,
  }),
}

export const Sizes: Story = {
  render: () => ({
    components: {
      Dropdown,
      DropdownTrigger,
      DropdownContent,
      DropdownItem,
      DropdownSeparator,
      Button,
      Stack,
      Text,
    },
    template: `
      <Stack direction="row" gap="xl" align="start" wrap>
        <Stack direction="column" gap="sm" align="start">
          <Text variant="caption" muted>sm</Text>
          <Dropdown>
            <DropdownTrigger>
              <Button size="sm" variant="outline">Small</Button>
            </DropdownTrigger>
            <DropdownContent size="sm">
              <DropdownItem>Edit</DropdownItem>
              <DropdownItem>Duplicate</DropdownItem>
              <DropdownSeparator />
              <DropdownItem destructive>Delete</DropdownItem>
            </DropdownContent>
          </Dropdown>
        </Stack>
        <Stack direction="column" gap="sm" align="start">
          <Text variant="caption" muted>md (default)</Text>
          <Dropdown>
            <DropdownTrigger>
              <Button size="sm" variant="outline">Medium</Button>
            </DropdownTrigger>
            <DropdownContent size="md">
              <DropdownItem>Edit</DropdownItem>
              <DropdownItem>Duplicate</DropdownItem>
              <DropdownSeparator />
              <DropdownItem destructive>Delete</DropdownItem>
            </DropdownContent>
          </Dropdown>
        </Stack>
        <Stack direction="column" gap="sm" align="start">
          <Text variant="caption" muted>lg</Text>
          <Dropdown>
            <DropdownTrigger>
              <Button size="sm" variant="outline">Large</Button>
            </DropdownTrigger>
            <DropdownContent size="lg">
              <DropdownItem>Edit</DropdownItem>
              <DropdownItem>Duplicate</DropdownItem>
              <DropdownSeparator />
              <DropdownItem destructive>Delete</DropdownItem>
            </DropdownContent>
          </Dropdown>
        </Stack>
      </Stack>
    `,
  }),
}
