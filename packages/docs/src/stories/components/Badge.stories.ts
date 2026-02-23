import type { Meta, StoryObj } from '@storybook/vue3'
import { Badge, Stack } from '@ink-ui/ui'
import { componentRounded, componentSizes, componentTones, componentVariants } from '@ink-ui/ui'

const meta: Meta = {
  title: 'Components/Badge',
  argTypes: {
    tone: {
      control: { type: 'select' },
      options: componentTones.Badge,
    },
    size: { control: { type: 'select' }, options: componentSizes.Badge },
    rounded: { control: { type: 'select' }, options: componentRounded.Badge },
    variant: { control: { type: 'select' }, options: componentVariants.Badge },
    label: { control: 'text' },
  },
  args: {
    tone: 'base',
    size: 'md',
    variant: 'solid',
    rounded: 'full',
    label: 'バッジ',
  },
}

export default meta
type Story = StoryObj

export const Playground: Story = {
  render: args => ({
    components: { Badge },
    setup() {
      return { args }
    },
    template: `
      <Badge :tone="args.tone" :variant="args.variant" :rounded="args.rounded" :size="args.size">{{ args.label }}</Badge>
    `,
  }),
}

export const Overview: Story = {
  render: () => ({
    components: { Badge, Stack },
    template: `
      <Stack direction="column" gap="30px">
        <Stack direction="column" gap="12px">
          <div class="text-xs font-semibold text-[var(--color-muted-foreground)]">default</div>
          <Stack direction="row" gap="12px" align="center" wrap>
            <Badge>Default</Badge>
          </Stack>
        </Stack>
        <div class="border border-[var(--color-border)]"></div>
        <Stack direction="column" gap="12px">
          <div class="text-xs font-semibold text-[var(--color-muted-foreground)]">variant</div>
          <Stack direction="row" gap="12px" align="center" wrap>
            <Badge tone="primary" variant="solid">Solid</Badge>
            <Badge tone="primary" variant="soft">Soft</Badge>
            <Badge tone="primary" variant="outline">Outline</Badge>
            <Badge tone="primary" variant="ghost">Ghost</Badge>
          </Stack>
        </Stack>
        <Stack direction="column" gap="12px">
          <div class="text-xs font-semibold text-[var(--color-muted-foreground)]">tone</div>
          <Stack direction="row" gap="12px" align="center" wrap>
            <Badge tone="base">Base</Badge>
            <Badge tone="neutral">Neutral</Badge>
          </Stack>
          <Stack direction="row" gap="12px" align="center" wrap>
            <Badge tone="primary">Primary</Badge>
            <Badge tone="secondary">Secondary</Badge>
            <Badge tone="tertiary">Tertiary</Badge>
            <Badge tone="accent">Accent</Badge>
          </Stack>
          <Stack direction="row" gap="12px" align="center" wrap>
            <Badge tone="success">Success</Badge>
            <Badge tone="warning">Warning</Badge>
            <Badge tone="info">Info</Badge>
            <Badge tone="destructive">Destructive</Badge>
          </Stack>
        </Stack>
        <Stack direction="column" gap="12px">
          <div class="text-xs font-semibold text-[var(--color-muted-foreground)]">size</div>
          <Stack direction="row" gap="12px" align="center" wrap>
            <Badge size="lg">Large</Badge>
            <Badge size="md">Medium</Badge>
            <Badge size="sm">Small</Badge>
          </Stack>
        </Stack>
        <Stack direction="column" gap="12px">
          <div class="text-xs font-semibold text-[var(--color-muted-foreground)]">rounded</div>
          <Stack direction="row" gap="12px" align="center" wrap>
            <Badge rounded="sm">Rounded Sm</Badge>
            <Badge rounded="md">Rounded Md</Badge>
            <Badge rounded="full">Rounded Full</Badge>
          </Stack>
        </Stack>
      </Stack>
    `,
  }),
}
