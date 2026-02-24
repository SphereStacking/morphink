import { Toolbar, Button, Stack, Text } from '@morphink/ui'
import { componentSizes, componentVariants } from '@morphink/ui'
import type { Meta, StoryObj } from '@storybook/vue3-vite'

const meta: Meta = {
  title: 'Components/Toolbar',
  argTypes: {
    size: { control: { type: 'select' }, options: componentSizes.Toolbar },
    variant: { control: { type: 'select' }, options: componentVariants.Toolbar },
    title: { control: 'text' },
  },
  args: {
    size: 'md',
    variant: 'solid',
    title: 'Toolbar',
  },
}

export default meta
type Story = StoryObj

export const Playground: Story = {
  render: (args) => ({
    components: { Toolbar, Button, Stack, Text },
    setup() {
      return { args }
    },
    template: `
      <Stack gap="md">
        <Toolbar :size="args.size" :variant="args.variant">
          <template #title>
            <Text weight="semibold">{{ args.title }}</Text>
          </template>
          <template #actions>
            <Button size="sm" variant="ghost">Search</Button>
            <Button size="sm">Add</Button>
          </template>
        </Toolbar>
      </Stack>
    `,
  }),
}

export const Overview: Story = {
  render: () => ({
    components: { Toolbar, Button, Stack, Text },
    template: `
      <Stack gap="2xl">
        <Stack direction="column" gap="md">
          <div class="text-xs font-semibold text-[var(--morphink-color-muted-foreground)]">default</div>
          <Toolbar>
            <template #title>
              <Text weight="semibold">Default</Text>
            </template>
            <template #actions>
              <Button size="sm" variant="ghost">Search</Button>
              <Button size="sm">Add</Button>
            </template>
          </Toolbar>
        </Stack>
        <div class="border border-[var(--morphink-color-border)]"></div>
        <Stack direction="column" gap="md">
          <div class="text-xs font-semibold text-[var(--morphink-color-muted-foreground)]">size</div>
          <Stack gap="md">
            <Toolbar size="sm">
              <template #title>
                <Text weight="semibold">Small</Text>
              </template>
              <template #actions>
                <Button size="sm" variant="ghost">Search</Button>
                <Button size="sm">Add</Button>
              </template>
            </Toolbar>
            <Toolbar size="md">
              <template #title>
                <Text weight="semibold">Medium</Text>
              </template>
              <template #actions>
                <Button size="sm" variant="ghost">Search</Button>
                <Button size="sm">Add</Button>
              </template>
            </Toolbar>
            <Toolbar size="lg">
              <template #title>
                <Text weight="semibold">Large</Text>
              </template>
              <template #actions>
                <Button size="sm" variant="ghost">Search</Button>
                <Button size="sm">Add</Button>
              </template>
            </Toolbar>
          </Stack>
        </Stack>
        <Stack direction="column" gap="md">
          <div class="text-xs font-semibold text-[var(--morphink-color-muted-foreground)]">variant</div>
          <Stack gap="md">
            <Toolbar variant="solid">
              <template #title>
                <Text weight="semibold">Solid</Text>
              </template>
              <template #actions>
                <Button size="sm" variant="ghost">Search</Button>
                <Button size="sm">Add</Button>
              </template>
            </Toolbar>
            <Toolbar variant="subtle">
              <template #title>
                <Text weight="semibold">Subtle</Text>
              </template>
              <template #actions>
                <Button size="sm" variant="ghost">Search</Button>
                <Button size="sm">Add</Button>
              </template>
            </Toolbar>
          </Stack>
        </Stack>
      </Stack>
    `,
  }),
}
