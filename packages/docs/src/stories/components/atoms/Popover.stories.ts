import { Popover, Button, Stack, Text } from '@morphink/ui'
import { componentRounded, componentShadow } from '@morphink/ui'
import type { Meta, StoryObj } from '@storybook/vue3-vite'

const meta: Meta<typeof Popover> = {
  title: 'Components/Atoms/Popover',
  component: Popover,
  tags: ['autodocs'],
  argTypes: {
    side: { control: { type: 'select' }, options: ['top', 'right', 'bottom', 'left'] },
    align: { control: { type: 'select' }, options: ['start', 'center', 'end'] },
    open: { control: 'boolean' },
    rounded: { control: { type: 'select' }, options: componentRounded.Popover },
    shadow: { control: { type: 'select' }, options: componentShadow.Popover },
    onOpenChange: { action: 'onOpenChange' },
  },
  args: {
    side: 'bottom',
    align: 'center',
    open: false,
    rounded: 'lg',
    shadow: 'md',
  },
}

export default meta
type Story = StoryObj<typeof Popover>

export const Default: Story = {
  render: (args) => ({
    components: { Popover, Button, Stack, Text },
    setup() {
      return { args }
    },
    template: `
      <Stack gap="md">
        <Popover
          :side="args.side"
          :align="args.align"
          :open="args.open"
          :rounded="args.rounded"
          :shadow="args.shadow"
          :on-open-change="args.onOpenChange"
        >
          <template #trigger>
            <Button size="sm">Popover</Button>
          </template>
          <template #content>
            <Text>Displays supplementary info or actions.</Text>
          </template>
        </Popover>
      </Stack>
    `,
  }),
}

export const Sides: Story = {
  render: () => ({
    components: { Popover, Button, Stack, Text },
    template: `
      <Stack direction="row" gap="md" align="center" wrap>
        <Popover side="bottom">
          <template #trigger>
            <Button size="sm">Bottom</Button>
          </template>
          <template #content>
            <Text>Content</Text>
          </template>
        </Popover>
        <Popover side="top">
          <template #trigger>
            <Button size="sm">Top</Button>
          </template>
          <template #content>
            <Text>Content</Text>
          </template>
        </Popover>
        <Popover side="right">
          <template #trigger>
            <Button size="sm">Right</Button>
          </template>
          <template #content>
            <Text>Content</Text>
          </template>
        </Popover>
        <Popover side="left">
          <template #trigger>
            <Button size="sm">Left</Button>
          </template>
          <template #content>
            <Text>Content</Text>
          </template>
        </Popover>
      </Stack>
    `,
  }),
}

export const Align: Story = {
  render: () => ({
    components: { Popover, Button, Stack, Text },
    template: `
      <Stack direction="row" gap="md" align="center" wrap>
        <Popover align="start">
          <template #trigger>
            <Button size="sm">Start</Button>
          </template>
          <template #content>
            <Text>Content</Text>
          </template>
        </Popover>
        <Popover align="center">
          <template #trigger>
            <Button size="sm">Center</Button>
          </template>
          <template #content>
            <Text>Content</Text>
          </template>
        </Popover>
        <Popover align="end">
          <template #trigger>
            <Button size="sm">End</Button>
          </template>
          <template #content>
            <Text>Content</Text>
          </template>
        </Popover>
      </Stack>
    `,
  }),
}

export const Rounded: Story = {
  render: () => ({
    components: { Popover, Button, Stack, Text },
    template: `
      <Stack direction="row" gap="md" align="center" wrap>
        <Popover rounded="sm">
          <template #trigger>
            <Button size="sm">Rounded sm</Button>
          </template>
          <template #content>
            <Text>Content</Text>
          </template>
        </Popover>
        <Popover rounded="md">
          <template #trigger>
            <Button size="sm">Rounded md</Button>
          </template>
          <template #content>
            <Text>Content</Text>
          </template>
        </Popover>
        <Popover rounded="lg">
          <template #trigger>
            <Button size="sm">Rounded lg</Button>
          </template>
          <template #content>
            <Text>Content</Text>
          </template>
        </Popover>
      </Stack>
    `,
  }),
}

export const Shadow: Story = {
  render: () => ({
    components: { Popover, Button, Stack, Text },
    template: `
      <Stack direction="row" gap="md" align="center" wrap>
        <Popover shadow="none">
          <template #trigger>
            <Button size="sm">Shadow none</Button>
          </template>
          <template #content>
            <Text>Content</Text>
          </template>
        </Popover>
        <Popover shadow="sm">
          <template #trigger>
            <Button size="sm">Shadow sm</Button>
          </template>
          <template #content>
            <Text>Content</Text>
          </template>
        </Popover>
        <Popover shadow="md">
          <template #trigger>
            <Button size="sm">Shadow md</Button>
          </template>
          <template #content>
            <Text>Content</Text>
          </template>
        </Popover>
      </Stack>
    `,
  }),
}
