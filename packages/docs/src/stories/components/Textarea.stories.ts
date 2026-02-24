import { Stack, Textarea } from '@morphink/ui'
import {
  componentResize,
  componentRounded,
  componentSizes,
  componentTones,
  componentVariants,
} from '@morphink/ui'
import type { Meta, StoryObj } from '@storybook/vue3-vite'

const meta: Meta = {
  title: 'Components/Textarea',
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
type Story = StoryObj

export const Playground: Story = {
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

export const Overview: Story = {
  render: () => ({
    components: { Textarea, Stack },
    template: `
      <Stack direction="column" gap="2xl">
        <Stack direction="column" gap="md">
          <div class="text-xs font-semibold text-[var(--morphink-color-muted-foreground)]">variant</div>
          <Stack direction="column" gap="sm" style="max-width: 320px">
            <Textarea variant="outline" placeholder="Outline" />
            <Textarea variant="ghost" placeholder="Ghost" />
            <Textarea variant="soft" placeholder="Soft" />
          </Stack>
        </Stack>
        <div class="border border-[var(--morphink-color-border)]"></div>
        <Stack direction="column" gap="md">
          <div class="text-xs font-semibold text-[var(--morphink-color-muted-foreground)]">tone</div>
          <Stack direction="column" gap="sm" style="max-width: 320px">
            <Textarea tone="base" placeholder="Base" />
            <Textarea tone="primary" placeholder="Primary" />
            <Textarea tone="destructive" placeholder="Destructive" />
          </Stack>
        </Stack>
        <div class="border border-[var(--morphink-color-border)]"></div>
        <Stack direction="column" gap="md">
          <div class="text-xs font-semibold text-[var(--morphink-color-muted-foreground)]">size</div>
          <Stack direction="column" gap="sm" style="max-width: 320px">
            <Textarea size="xs" placeholder="Extra Small" />
            <Textarea size="sm" placeholder="Small" />
            <Textarea size="md" placeholder="Medium" />
            <Textarea size="lg" placeholder="Large" />
            <Textarea size="xl" placeholder="Extra Large" />
          </Stack>
        </Stack>
        <div class="border border-[var(--morphink-color-border)]"></div>
        <Stack direction="column" gap="md">
          <div class="text-xs font-semibold text-[var(--morphink-color-muted-foreground)]">states</div>
          <Stack direction="column" gap="sm" style="max-width: 320px">
            <Textarea placeholder="Default" />
            <Textarea placeholder="Disabled" disabled />
            <Textarea placeholder="Readonly" readonly model-value="Readonly value" />
          </Stack>
        </Stack>
        <div class="border border-[var(--morphink-color-border)]"></div>
        <Stack direction="column" gap="md">
          <div class="text-xs font-semibold text-[var(--morphink-color-muted-foreground)]">resize</div>
          <Stack direction="column" gap="sm" style="max-width: 320px">
            <Textarea resize="none" placeholder="No resize" />
            <Textarea resize="vertical" placeholder="Vertical resize" />
            <Textarea resize="horizontal" placeholder="Horizontal resize" />
            <Textarea resize="both" placeholder="Both resize" />
          </Stack>
        </Stack>
        <div class="border border-[var(--morphink-color-border)]"></div>
        <Stack direction="column" gap="md">
          <div class="text-xs font-semibold text-[var(--morphink-color-muted-foreground)]">soft + tone</div>
          <Stack direction="column" gap="sm" style="max-width: 320px">
            <Textarea variant="soft" tone="base" placeholder="Soft Base" />
            <Textarea variant="soft" tone="primary" placeholder="Soft Primary" />
            <Textarea variant="soft" tone="destructive" placeholder="Soft Destructive" />
          </Stack>
        </Stack>
      </Stack>
    `,
  }),
}
