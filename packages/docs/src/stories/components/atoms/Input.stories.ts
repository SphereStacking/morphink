import { Input, Stack } from '@morphink/ui'
import {
  componentRounded,
  componentSizes,
  componentTones,
  componentVariants,
} from '@morphink/ui'
import type { Meta, StoryObj } from '@storybook/vue3-vite'

const meta: Meta<typeof Input> = {
  title: 'Components/Atoms/Input',
  component: Input,
  tags: ['autodocs'],
  argTypes: {
    variant: { control: { type: 'select' }, options: componentVariants.Input },
    size: { control: { type: 'select' }, options: componentSizes.Input },
    tone: { control: { type: 'select' }, options: componentTones.Input },
    rounded: { control: { type: 'select' }, options: componentRounded.Input },
    placeholder: { control: 'text' },
    disabled: { control: 'boolean' },
    readonly: { control: 'boolean' },
    type: { control: { type: 'select' }, options: ['text', 'password', 'email', 'number', 'search', 'tel', 'url'] },
  },
  args: {
    variant: 'outline',
    size: 'md',
    tone: 'base',
    rounded: 'md',
    placeholder: 'Enter text...',
    disabled: false,
    readonly: false,
    type: 'text',
  },
}

export default meta
type Story = StoryObj<typeof Input>

export const Default: Story = {
  render: (args) => ({
    components: { Input },
    setup() {
      return { args }
    },
    template: `
      <div style="max-width: 320px">
        <Input v-bind="args" />
      </div>
    `,
  }),
}

export const Variants: Story = {
  render: () => ({
    components: { Input, Stack },
    template: `
      <Stack direction="column" gap="sm" style="max-width: 320px">
        <Input variant="outline" placeholder="Outline" />
        <Input variant="ghost" placeholder="Ghost" />
        <Input variant="soft" placeholder="Soft" />
      </Stack>
    `,
  }),
}

export const Tones: Story = {
  render: () => ({
    components: { Input, Stack },
    template: `
      <Stack direction="column" gap="sm" style="max-width: 320px">
        <Input tone="base" placeholder="Base" />
        <Input tone="primary" placeholder="Primary" />
        <Input tone="success" placeholder="Success" />
        <Input tone="warning" placeholder="Warning" />
        <Input tone="destructive" placeholder="Destructive" />
      </Stack>
    `,
  }),
}

export const Sizes: Story = {
  render: () => ({
    components: { Input, Stack },
    template: `
      <Stack direction="column" gap="sm" style="max-width: 320px">
        <Input size="xs" placeholder="Extra Small" />
        <Input size="sm" placeholder="Small" />
        <Input size="md" placeholder="Medium" />
        <Input size="lg" placeholder="Large" />
        <Input size="xl" placeholder="Extra Large" />
      </Stack>
    `,
  }),
}

export const States: Story = {
  render: () => ({
    components: { Input, Stack },
    template: `
      <Stack direction="column" gap="sm" style="max-width: 320px">
        <Input placeholder="Default" />
        <Input placeholder="Disabled" disabled />
        <Input placeholder="Readonly" readonly model-value="Readonly value" />
      </Stack>
    `,
  }),
}

export const Types: Story = {
  render: () => ({
    components: { Input, Stack },
    template: `
      <Stack direction="column" gap="sm" style="max-width: 320px">
        <Input type="text" placeholder="Text" />
        <Input type="password" placeholder="Password" />
        <Input type="email" placeholder="Email" />
        <Input type="number" placeholder="Number" />
        <Input type="search" placeholder="Search" />
      </Stack>
    `,
  }),
}

export const Rounded: Story = {
  render: () => ({
    components: { Input, Stack },
    template: `
      <Stack direction="column" gap="sm" style="max-width: 320px">
        <Input rounded="none" placeholder="None" />
        <Input rounded="sm" placeholder="Small" />
        <Input rounded="md" placeholder="Medium" />
        <Input rounded="lg" placeholder="Large" />
        <Input rounded="xl" placeholder="Extra Large" />
      </Stack>
    `,
  }),
}

export const SoftTone: Story = {
  render: () => ({
    components: { Input, Stack },
    template: `
      <Stack direction="column" gap="sm" style="max-width: 320px">
        <Input variant="soft" tone="base" placeholder="Soft Base" />
        <Input variant="soft" tone="primary" placeholder="Soft Primary" />
        <Input variant="soft" tone="success" placeholder="Soft Success" />
        <Input variant="soft" tone="warning" placeholder="Soft Warning" />
        <Input variant="soft" tone="destructive" placeholder="Soft Destructive" />
      </Stack>
    `,
  }),
}
