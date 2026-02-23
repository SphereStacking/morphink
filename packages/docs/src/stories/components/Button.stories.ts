import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { Button, Stack } from '@ink-ui/ui'
import { componentRounded, componentShadow, componentSizes, componentTones, componentVariants } from '@ink-ui/ui'

const meta: Meta = {
  title: 'Components/Button',
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
type Story = StoryObj

export const Playground: Story = {
  render: args => ({
    components: { Button },
    setup() {
      return { args }
    },
    template: `
      <Button v-bind="args">{{ args.label }}</Button>
    `,
  }),
}

export const Overview: Story = {
  render: () => ({
    components: { Button, Stack },
    template: `
      <Stack direction="column" gap="30px">
        <Stack direction="column" gap="12px">
          <div class="text-xs font-semibold text-[var(--color-muted-foreground)]">default</div>
          <Stack direction="row" gap="12px" align="center" wrap>
            <Button>Default</Button>
          </Stack>
        </Stack>
        <div class="border border-[var(--color-border)]"></div>
        <Stack direction="column" gap="12px">
          <div class="text-xs font-semibold text-[var(--color-muted-foreground)]">variant</div>
          <Stack direction="row" gap="12px" align="center" wrap>
            <Button tone="primary" variant="solid">Solid</Button>
            <Button tone="primary" variant="outline">Outline</Button>
            <Button tone="primary" variant="ghost">Ghost</Button>
            <Button tone="primary" variant="soft">Soft</Button>
          </Stack>
        </Stack>
        <Stack direction="column" gap="12px">
          <div class="text-xs font-semibold text-[var(--color-muted-foreground)]">tone</div>
          <Stack direction="row" gap="12px" align="center" wrap>
            <Button tone="base">Base</Button>
            <Button tone="neutral">Neutral</Button>
          </Stack>
          <Stack direction="row" gap="12px" align="center" wrap>
            <Button tone="primary">Primary</Button>
            <Button tone="secondary">Secondary</Button>
            <Button tone="tertiary">Tertiary</Button>
            <Button tone="accent">Accent</Button>
          </Stack>
          <Stack direction="row" gap="12px" align="center" wrap>
            <Button tone="success">Success</Button>
            <Button tone="warning">Warning</Button>
            <Button tone="info">Info</Button>
            <Button tone="destructive">Destructive</Button>
          </Stack>
        </Stack>
        <Stack direction="column" gap="12px">
          <div class="text-xs font-semibold text-[var(--color-muted-foreground)]">size</div>
          <Stack direction="row" gap="12px" align="center">
            <Button size="lg">Large</Button>
            <Button size="md">Medium</Button>
            <Button size="sm">Small</Button>
          </Stack>
        </Stack>
        <Stack direction="column" gap="12px">
          <div class="text-xs font-semibold text-[var(--color-muted-foreground)]">disabled</div>
          <Stack direction="row" gap="12px" align="center">
            <Button>Default</Button>
            <Button disabled>Disabled</Button>
          </Stack>
        </Stack>
        <Stack direction="column" gap="12px">
          <div class="text-xs font-semibold text-[var(--color-muted-foreground)]">rounded</div>
          <Stack direction="row" gap="12px" align="center" wrap>
            <Button rounded="sm">Rounded Sm</Button>
            <Button rounded="md">Rounded Md</Button>
            <Button rounded="full">Rounded Full</Button>
          </Stack>
        </Stack>
        <Stack direction="column" gap="12px">
          <div class="text-xs font-semibold text-[var(--color-muted-foreground)]">shadow</div>
          <Stack direction="row" gap="12px" align="center" wrap>
            <Button shadow="none">Shadow None</Button>
            <Button shadow="sm">Shadow Sm</Button>
            <Button shadow="md">Shadow Md</Button>
          </Stack>
        </Stack>
      </Stack>
    `,
  }),
}
