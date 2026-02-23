import type { Meta, StoryObj } from '@storybook/vue3'
import { Heading, Text, Stack } from '@ink-ui/ui'

const meta: Meta = {
  title: 'Components/Typography',
  argTypes: {
    headingLevel: { control: { type: 'select' }, options: [1, 2, 3, 4, 5, 6] },
    variant: { control: { type: 'select' }, options: ['body', 'caption', 'label'] },
    weight: { control: { type: 'select' }, options: ['regular', 'medium', 'semibold', 'bold'] },
    muted: { control: 'boolean' },
    text: { control: 'text' },
  },
  args: {
    headingLevel: 3,
    variant: 'body',
    weight: 'regular',
    muted: false,
    text: 'Text preview',
  },
}

export default meta
type Story = StoryObj

export const Playground: Story = {
  render: args => ({
    components: { Heading, Text, Stack },
    setup() {
      return { args }
    },
    template: `
      <Stack gap="12px">
        <Heading :level="args.headingLevel">Heading Preview</Heading>
        <Text :variant="args.variant" :weight="args.weight" :muted="args.muted">{{ args.text }}</Text>
      </Stack>
    `,
  }),
}

export const Overview: Story = {
  render: () => ({
    components: { Heading, Text, Stack },
    template: `
      <Stack gap="30px">
        <Stack direction="column" gap="12px">
          <div class="text-xs font-semibold text-[var(--color-muted-foreground)]">default</div>
          <Stack gap="12px">
            <Heading :level="3">Default heading</Heading>
            <Text>Default text</Text>
          </Stack>
        </Stack>
        <div class="border border-[var(--color-border)]"></div>
        <Stack direction="column" gap="12px">
          <div class="text-xs font-semibold text-[var(--color-muted-foreground)]">headingLevel</div>
          <Stack gap="8px">
            <Heading :level="1">H1</Heading>
            <Heading :level="2">H2</Heading>
            <Heading :level="3">H3</Heading>
            <Heading :level="4">H4</Heading>
          </Stack>
        </Stack>
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
