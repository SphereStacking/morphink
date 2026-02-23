import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { Popover, Button, Stack, Text } from '@ink-ui/ui'
import { componentRounded, componentShadow } from '@ink-ui/ui'

const meta: Meta = {
  title: 'Components/Popover',
  argTypes: {
    side: { control: { type: 'select' }, options: ['top', 'right', 'bottom', 'left'] },
    align: { control: { type: 'select' }, options: ['start', 'center', 'end'] },
    open: { control: 'boolean' },
    rounded: { control: { type: 'select' }, options: componentRounded.Popover },
    shadow: { control: { type: 'select' }, options: componentShadow.Popover },
    onOpenChange: { action: 'onOpenChange' },
  },
  args: {
    side: 'bottom',
    align: 'center',
    open: false,
    rounded: 'lg',
    shadow: 'md',
  },
}

export default meta
type Story = StoryObj

export const Playground: Story = {
  render: args => ({
    components: { Popover, Button, Stack, Text },
    setup() {
      return { args }
    },
    template: `
      <Stack gap="12px">
        <Popover
          :side="args.side"
          :align="args.align"
          :open="args.open"
          :rounded="args.rounded"
          :shadow="args.shadow"
          :on-open-change="args.onOpenChange"
        >
          <template #trigger>
            <Button size="sm">Popover</Button>
          </template>
          <template #content>
            <Text>Displays supplementary info or actions.</Text>
          </template>
        </Popover>
      </Stack>
    `,
  }),
}

export const Overview: Story = {
  render: () => ({
    components: { Popover, Button, Stack, Text },
    template: `
      <Stack gap="30px">
        <Stack direction="column" gap="12px">
          <div class="text-xs font-semibold text-[var(--color-muted-foreground)]">default</div>
          <Stack gap="12px">
            <Popover>
              <template #trigger>
                <Button size="sm">Default</Button>
              </template>
              <template #content>
                <Text>Content</Text>
              </template>
            </Popover>
          </Stack>
        </Stack>
        <div class="border border-[var(--color-border)]"></div>
        <Stack direction="column" gap="12px">
          <div class="text-xs font-semibold text-[var(--color-muted-foreground)]">open</div>
          <Stack direction="row" gap="12px" align="center" wrap>
            <Popover :open="false">
              <template #trigger>
                <Button size="sm">Closed</Button>
              </template>
              <template #content>
                <Text>Content</Text>
              </template>
            </Popover>
            <Popover :open="true">
              <template #trigger>
                <Button size="sm">Open</Button>
              </template>
              <template #content>
                <Text>Content</Text>
              </template>
            </Popover>
          </Stack>
        </Stack>
        <Stack direction="column" gap="12px">
          <div class="text-xs font-semibold text-[var(--color-muted-foreground)]">side</div>
          <Stack direction="row" gap="12px" align="center" wrap>
            <Popover side="bottom">
              <template #trigger>
                <Button size="sm">Bottom</Button>
              </template>
              <template #content>
                <Text>Content</Text>
              </template>
            </Popover>
            <Popover side="top">
              <template #trigger>
                <Button size="sm">Top</Button>
              </template>
              <template #content>
                <Text>Content</Text>
              </template>
            </Popover>
            <Popover side="right">
              <template #trigger>
                <Button size="sm">Right</Button>
              </template>
              <template #content>
                <Text>Content</Text>
              </template>
            </Popover>
            <Popover side="left">
              <template #trigger>
                <Button size="sm">Left</Button>
              </template>
              <template #content>
                <Text>Content</Text>
              </template>
            </Popover>
          </Stack>
        </Stack>
        <Stack direction="column" gap="12px">
          <div class="text-xs font-semibold text-[var(--color-muted-foreground)]">align</div>
          <Stack direction="row" gap="12px" align="center" wrap>
            <Popover align="start">
              <template #trigger>
                <Button size="sm">Start</Button>
              </template>
              <template #content>
                <Text>Content</Text>
              </template>
            </Popover>
            <Popover align="center">
              <template #trigger>
                <Button size="sm">Center</Button>
              </template>
              <template #content>
                <Text>Content</Text>
              </template>
            </Popover>
            <Popover align="end">
              <template #trigger>
                <Button size="sm">End</Button>
              </template>
              <template #content>
                <Text>Content</Text>
              </template>
            </Popover>
          </Stack>
        </Stack>
        <Stack direction="column" gap="12px">
          <div class="text-xs font-semibold text-[var(--color-muted-foreground)]">rounded</div>
          <Stack direction="row" gap="12px" align="center" wrap>
            <Popover rounded="sm">
              <template #trigger>
                <Button size="sm">Rounded sm</Button>
              </template>
              <template #content>
                <Text>Content</Text>
              </template>
            </Popover>
            <Popover rounded="md">
              <template #trigger>
                <Button size="sm">Rounded md</Button>
              </template>
              <template #content>
                <Text>Content</Text>
              </template>
            </Popover>
            <Popover rounded="lg">
              <template #trigger>
                <Button size="sm">Rounded lg</Button>
              </template>
              <template #content>
                <Text>Content</Text>
              </template>
            </Popover>
          </Stack>
        </Stack>
        <Stack direction="column" gap="12px">
          <div class="text-xs font-semibold text-[var(--color-muted-foreground)]">shadow</div>
          <Stack direction="row" gap="12px" align="center" wrap>
            <Popover shadow="none">
              <template #trigger>
                <Button size="sm">Shadow none</Button>
              </template>
              <template #content>
                <Text>Content</Text>
              </template>
            </Popover>
            <Popover shadow="sm">
              <template #trigger>
                <Button size="sm">Shadow sm</Button>
              </template>
              <template #content>
                <Text>Content</Text>
              </template>
            </Popover>
            <Popover shadow="md">
              <template #trigger>
                <Button size="sm">Shadow md</Button>
              </template>
              <template #content>
                <Text>Content</Text>
              </template>
            </Popover>
          </Stack>
        </Stack>
      </Stack>
    `,
  }),
}
