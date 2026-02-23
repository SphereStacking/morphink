import { Text, Stack } from '@morphink/ui'
import type { Meta, StoryObj } from '@storybook/vue3-vite'

const meta: Meta = {
  title: 'Components/Text',
  argTypes: {
    variant: { control: { type: 'select' }, options: ['body', 'caption', 'label'] },
    weight: { control: { type: 'select' }, options: ['regular', 'medium', 'semibold', 'bold'] },
    muted: { control: 'boolean' },
    text: { control: 'text' },
  },
  args: {
    variant: 'body',
    weight: 'regular',
    muted: false,
    text: 'Body text preview',
  },
}

export default meta
type Story = StoryObj

export const Playground: Story = {
  render: (args) => ({
    components: { Text, Stack },
    setup() {
      return { args }
    },
    template: `
      <Stack gap="8px">
        <Text :variant="args.variant" :weight="args.weight" :muted="args.muted">
          {{ args.text }}
        </Text>
      </Stack>
    `,
  }),
}

export const Overview: Story = {
  render: () => ({
    components: { Text, Stack },
    template: `
      <Stack gap="30px">
        <Stack direction="column" gap="12px">
          <div class="text-xs font-semibold text-[var(--color-muted-foreground)]">default</div>
          <Text>Default text</Text>
        </Stack>
        <div class="border border-[var(--color-border)]"></div>
        <Stack direction="column" gap="12px">
          <div class="text-xs font-semibold text-[var(--color-muted-foreground)]">variant</div>
          <Stack gap="8px">
            <Text variant="body">Body</Text>
            <Text variant="caption">Caption</Text>
            <Text variant="label">Label</Text>
          </Stack>
        </Stack>
        <Stack direction="column" gap="12px">
          <div class="text-xs font-semibold text-[var(--color-muted-foreground)]">weight</div>
          <Stack gap="8px">
            <Text weight="regular">Regular</Text>
            <Text weight="medium">Medium</Text>
            <Text weight="semibold">Semibold</Text>
            <Text weight="bold">Bold</Text>
          </Stack>
        </Stack>
        <Stack direction="column" gap="12px">
          <div class="text-xs font-semibold text-[var(--color-muted-foreground)]">muted</div>
          <Stack gap="8px">
            <Text :muted="false">Muted false</Text>
            <Text muted>Muted true</Text>
          </Stack>
        </Stack>
      </Stack>
    `,
  }),
}
