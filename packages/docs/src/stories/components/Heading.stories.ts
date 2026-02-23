import type { Meta, StoryObj } from '@storybook/vue3'
import { Heading, Text, Stack } from '@ink-ui/ui'

const meta: Meta = {
  title: 'Components/Heading',
  argTypes: {
    level: { control: { type: 'select' }, options: [1, 2, 3, 4, 5, 6] },
    text: { control: 'text' },
  },
  args: {
    level: 2,
    text: 'Heading Preview',
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
        <Heading :level="args.level">{{ args.text }}</Heading>
        <Text muted>Size and rhythm adjust based on level.</Text>
      </Stack>
    `,
  }),
}

export const Overview: Story = {
  render: () => ({
    components: { Heading, Stack },
    template: `
      <Stack gap="30px">
        <Stack direction="column" gap="12px">
          <div class="text-xs font-semibold text-[var(--color-muted-foreground)]">default</div>
          <Heading :level="2">Default heading</Heading>
        </Stack>
        <div class="border border-[var(--color-border)]"></div>
        <Stack direction="column" gap="12px">
          <div class="text-xs font-semibold text-[var(--color-muted-foreground)]">level</div>
          <Stack gap="8px">
            <Heading :level="1">H1</Heading>
            <Heading :level="2">H2</Heading>
            <Heading :level="3">H3</Heading>
            <Heading :level="4">H4</Heading>
            <Heading :level="5">H5</Heading>
            <Heading :level="6">H6</Heading>
          </Stack>
        </Stack>
      </Stack>
    `,
  }),
}
