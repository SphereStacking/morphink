import { Button, Stack } from '@morphink/ui'
import {
  componentRounded,
  componentShadow,
  componentSizes,
  componentTones,
  componentVariants,
} from '@morphink/ui'
import type { Meta, StoryObj } from '@storybook/vue3-vite'

const meta: Meta<typeof Button> = {
  title: 'Components/Atoms/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    variant: { control: { type: 'select' }, options: componentVariants.Button },
    size: { control: { type: 'select' }, options: componentSizes.Button },
    tone: {
      control: { type: 'select' },
      options: componentTones.Button,
    },
    rounded: { control: { type: 'select' }, options: componentRounded.Button },
    shadow: { control: { type: 'select' }, options: componentShadow.Button },
    disabled: { control: 'boolean' },
    label: { control: 'text' },
  },
  args: {
    variant: 'solid',
    size: 'md',
    tone: 'base',
    rounded: 'md',
    shadow: 'md',
    disabled: false,
    label: 'Button',
  },
}

export default meta
type Story = StoryObj<typeof Button>

export const Default: Story = {
  render: (args) => ({
    components: { Button },
    setup() {
      return { args }
    },
    template: `
      <Button v-bind="args">{{ args.label }}</Button>
    `,
  }),
}

export const Variants: Story = {
  render: () => ({
    components: { Button, Stack },
    template: `
      <Stack direction="row" gap="md" align="center" wrap>
        <Button tone="primary" variant="solid">Solid</Button>
        <Button tone="primary" variant="outline">Outline</Button>
        <Button tone="primary" variant="ghost">Ghost</Button>
        <Button tone="primary" variant="soft">Soft</Button>
      </Stack>
    `,
  }),
}

export const Tones: Story = {
  render: () => ({
    components: { Button, Stack },
    template: `
      <Stack direction="column" gap="md">
        <Stack direction="row" gap="md" align="center" wrap>
          <Button tone="base">Base</Button>
          <Button tone="neutral">Neutral</Button>
        </Stack>
        <Stack direction="row" gap="md" align="center" wrap>
          <Button tone="primary">Primary</Button>
          <Button tone="secondary">Secondary</Button>
          <Button tone="tertiary">Tertiary</Button>
          <Button tone="accent">Accent</Button>
        </Stack>
        <Stack direction="row" gap="md" align="center" wrap>
          <Button tone="success">Success</Button>
          <Button tone="warning">Warning</Button>
          <Button tone="info">Info</Button>
          <Button tone="destructive">Destructive</Button>
        </Stack>
      </Stack>
    `,
  }),
}

export const Sizes: Story = {
  render: () => ({
    components: { Button, Stack },
    template: `
      <Stack direction="row" gap="md" align="center">
        <Button size="lg">Large</Button>
        <Button size="md">Medium</Button>
        <Button size="sm">Small</Button>
      </Stack>
    `,
  }),
}

export const Disabled: Story = {
  render: () => ({
    components: { Button, Stack },
    template: `
      <Stack direction="row" gap="md" align="center">
        <Button>Default</Button>
        <Button disabled>Disabled</Button>
      </Stack>
    `,
  }),
}

export const Rounded: Story = {
  render: () => ({
    components: { Button, Stack },
    template: `
      <Stack direction="row" gap="md" align="center" wrap>
        <Button rounded="sm">Rounded Sm</Button>
        <Button rounded="md">Rounded Md</Button>
        <Button rounded="full">Rounded Full</Button>
      </Stack>
    `,
  }),
}

export const Shadow: Story = {
  render: () => ({
    components: { Button, Stack },
    template: `
      <Stack direction="row" gap="md" align="center" wrap>
        <Button shadow="none">Shadow None</Button>
        <Button shadow="sm">Shadow Sm</Button>
        <Button shadow="md">Shadow Md</Button>
      </Stack>
    `,
  }),
}
