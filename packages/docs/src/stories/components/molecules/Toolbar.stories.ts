import { Toolbar, Button, Stack, Text } from '@morphink/ui'
import { componentSizes, componentVariants } from '@morphink/ui'
import type { Meta, StoryObj } from '@storybook/vue3-vite'

const meta: Meta<typeof Toolbar> = {
  title: 'Components/Molecules/Toolbar',
  component: Toolbar,
  tags: ['autodocs'],
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
type Story = StoryObj<typeof Toolbar>

export const Default: Story = {
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

export const Sizes: Story = {
  render: () => ({
    components: { Toolbar, Button, Stack, Text },
    template: `
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
    `,
  }),
}

export const Variants: Story = {
  render: () => ({
    components: { Toolbar, Button, Stack, Text },
    template: `
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
    `,
  }),
}
