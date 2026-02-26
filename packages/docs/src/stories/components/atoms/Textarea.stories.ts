import { Stack, Textarea } from '@morphink/ui'
import {
  componentResize,
  componentRounded,
  componentSizes,
  componentTones,
  componentVariants,
} from '@morphink/ui'
import type { Meta, StoryObj } from '@storybook/vue3-vite'

const meta: Meta<typeof Textarea> = {
  title: 'Components/Atoms/Textarea',
  component: Textarea,
  tags: ['autodocs'],
  argTypes: {
    variant: { control: { type: 'select' }, options: componentVariants.Textarea },
    size: { control: { type: 'select' }, options: componentSizes.Textarea },
    tone: { control: { type: 'select' }, options: componentTones.Textarea },
    rounded: { control: { type: 'select' }, options: componentRounded.Textarea },
    placeholder: { control: 'text' },
    disabled: { control: 'boolean' },
    readonly: { control: 'boolean' },
    rows: { control: { type: 'number', min: 1, max: 20 } },
    resize: { control: { type: 'select' }, options: componentResize.Textarea },
  },
  args: {
    variant: 'outline',
    size: 'md',
    tone: 'base',
    rounded: 'md',
    placeholder: 'Enter text...',
    disabled: false,
    readonly: false,
    rows: 3,
    resize: 'vertical',
  },
}

export default meta
type Story = StoryObj<typeof Textarea>

export const Default: Story = {
  render: (args) => ({
    components: { Textarea },
    setup() {
      return { args }
    },
    template: `
      <div style="max-width: 320px">
        <Textarea v-bind="args" />
      </div>
    `,
  }),
}

export const Variants: Story = {
  render: () => ({
    components: { Textarea, Stack },
    template: `
      <Stack direction="column" gap="sm" style="max-width: 320px">
        <Textarea variant="outline" placeholder="Outline" />
        <Textarea variant="ghost" placeholder="Ghost" />
        <Textarea variant="soft" placeholder="Soft" />
      </Stack>
    `,
  }),
}

export const Tones: Story = {
  render: () => ({
    components: { Textarea, Stack },
    template: `
      <Stack direction="column" gap="sm" style="max-width: 320px">
        <Textarea tone="base" placeholder="Base" />
        <Textarea tone="primary" placeholder="Primary" />
        <Textarea tone="success" placeholder="Success" />
        <Textarea tone="warning" placeholder="Warning" />
        <Textarea tone="destructive" placeholder="Destructive" />
      </Stack>
    `,
  }),
}

export const Sizes: Story = {
  render: () => ({
    components: { Textarea, Stack },
    template: `
      <Stack direction="column" gap="sm" style="max-width: 320px">
        <Textarea size="xs" placeholder="Extra Small" />
        <Textarea size="sm" placeholder="Small" />
        <Textarea size="md" placeholder="Medium" />
        <Textarea size="lg" placeholder="Large" />
        <Textarea size="xl" placeholder="Extra Large" />
      </Stack>
    `,
  }),
}

export const States: Story = {
  render: () => ({
    components: { Textarea, Stack },
    template: `
      <Stack direction="column" gap="sm" style="max-width: 320px">
        <Textarea placeholder="Default" />
        <Textarea placeholder="Disabled" disabled />
        <Textarea placeholder="Readonly" readonly model-value="Readonly value" />
      </Stack>
    `,
  }),
}

export const Resize: Story = {
  render: () => ({
    components: { Textarea, Stack },
    template: `
      <Stack direction="column" gap="sm" style="max-width: 320px">
        <Textarea resize="none" placeholder="No resize" />
        <Textarea resize="vertical" placeholder="Vertical resize" />
        <Textarea resize="horizontal" placeholder="Horizontal resize" />
        <Textarea resize="both" placeholder="Both resize" />
      </Stack>
    `,
  }),
}

export const SoftTone: Story = {
  render: () => ({
    components: { Textarea, Stack },
    template: `
      <Stack direction="column" gap="sm" style="max-width: 320px">
        <Textarea variant="soft" tone="base" placeholder="Soft Base" />
        <Textarea variant="soft" tone="primary" placeholder="Soft Primary" />
        <Textarea variant="soft" tone="success" placeholder="Soft Success" />
        <Textarea variant="soft" tone="warning" placeholder="Soft Warning" />
        <Textarea variant="soft" tone="destructive" placeholder="Soft Destructive" />
      </Stack>
    `,
  }),
}
