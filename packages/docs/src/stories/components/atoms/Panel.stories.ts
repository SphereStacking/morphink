import { Panel, Stack, Text, Button } from '@morphink/ui'
import { componentRounded, componentShadow, componentVariants } from '@morphink/ui'
import type { Meta, StoryObj } from '@storybook/vue3-vite'

const meta: Meta<typeof Panel> = {
  title: 'Components/Atoms/Panel',
  component: Panel,
  tags: ['autodocs'],
  argTypes: {
    variant: { control: { type: 'select' }, options: componentVariants.Panel },
    interactive: { control: 'boolean' },
    body: { control: 'text' },
    rounded: { control: { type: 'select' }, options: componentRounded.Panel },
    shadow: { control: { type: 'select' }, options: componentShadow.Panel },
  },
  args: {
    variant: 'subtle',
    interactive: false,
    rounded: 'md',
    shadow: 'md',
    body: 'Use Panel to organize information blocks.',
  },
}

export default meta
type Story = StoryObj<typeof Panel>

export const Default: Story = {
  render: (args) => ({
    components: { Panel, Stack, Text, Button },
    setup() {
      return { args }
    },
    template: `
      <Stack gap="md">
        <Panel :variant="args.variant" :interactive="args.interactive" :rounded="args.rounded" :shadow="args.shadow">
          <Text>{{ args.body }}</Text>
          <Button size="sm" variant="ghost" style="margin-top: 8px;">Action</Button>
        </Panel>
      </Stack>
    `,
  }),
}

export const Variants: Story = {
  render: () => ({
    components: { Panel, Stack, Text },
    template: `
      <Stack gap="md">
        <Panel variant="subtle">
          <Text muted>Subtle panel</Text>
        </Panel>
        <Panel variant="solid">
          <Text>Solid panel</Text>
        </Panel>
        <Panel variant="elevated">
          <Text>Elevated panel</Text>
        </Panel>
      </Stack>
    `,
  }),
}

export const Interactive: Story = {
  render: () => ({
    components: { Panel, Stack, Text, Button },
    template: `
      <Stack gap="md">
        <Panel>
          <Text muted>Not interactive</Text>
        </Panel>
        <Panel interactive>
          <Text>Interactive</Text>
          <Button size="sm" variant="ghost" style="margin-top: 8px;">Action</Button>
        </Panel>
      </Stack>
    `,
  }),
}

export const RoundedAndShadow: Story = {
  render: () => ({
    components: { Panel, Stack, Text },
    template: `
      <Stack gap="md">
        <Panel rounded="sm">
          <Text>Rounded sm</Text>
        </Panel>
        <Panel rounded="md">
          <Text>Rounded md</Text>
        </Panel>
        <Panel rounded="lg">
          <Text>Rounded lg</Text>
        </Panel>
        <Panel shadow="none">
          <Text>Shadow none</Text>
        </Panel>
        <Panel shadow="sm">
          <Text>Shadow sm</Text>
        </Panel>
        <Panel shadow="md">
          <Text>Shadow md</Text>
        </Panel>
      </Stack>
    `,
  }),
}
