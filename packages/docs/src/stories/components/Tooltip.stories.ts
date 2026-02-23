import { Tooltip, Button, Stack, Text } from '@morphink/ui'
import { componentRounded, componentShadow } from '@morphink/ui'
import type { Meta, StoryObj } from '@storybook/vue3-vite'

const meta: Meta = {
  title: 'Components/Tooltip',
  argTypes: {
    content: { control: 'text' },
    side: { control: { type: 'select' }, options: ['top', 'right', 'bottom', 'left'] },
    align: { control: { type: 'select' }, options: ['start', 'center', 'end'] },
    delay: { control: 'number' },
    open: { control: 'boolean' },
    rounded: { control: { type: 'select' }, options: componentRounded.Tooltip },
    shadow: { control: { type: 'select' }, options: componentShadow.Tooltip },
    onOpenChange: { action: 'onOpenChange' },
  },
  args: {
    content: 'Supplementary info',
    side: 'top',
    align: 'center',
    delay: 200,
    open: false,
    rounded: 'md',
    shadow: 'md',
  },
}

export default meta
type Story = StoryObj

export const Playground: Story = {
  render: (args) => ({
    components: { Tooltip, Button, Stack, Text },
    setup() {
      return { args }
    },
    template: `
      <Stack gap="12px">
        <Text muted>Shown on hover or focus.</Text>
        <Tooltip
          :content="args.content"
          :side="args.side"
          :align="args.align"
          :delay="args.delay"
          :open="args.open"
          :rounded="args.rounded"
          :shadow="args.shadow"
          :on-open-change="args.onOpenChange"
        >
          <Button size="sm">Tooltip</Button>
        </Tooltip>
      </Stack>
    `,
  }),
}

export const Overview: Story = {
  render: () => ({
    components: { Tooltip, Button, Stack, Text },
    template: `
      <Stack gap="30px">
        <Stack direction="column" gap="12px">
          <div class="text-xs font-semibold text-[var(--color-muted-foreground)]">default</div>
          <Stack gap="12px">
            <Tooltip content="Content">
              <Button size="sm">Default</Button>
            </Tooltip>
          </Stack>
        </Stack>
        <div class="border border-[var(--color-border)]"></div>
        <Stack direction="column" gap="12px">
          <div class="text-xs font-semibold text-[var(--color-muted-foreground)]">open</div>
          <Stack direction="row" gap="12px" align="center" wrap>
            <Tooltip content="Closed" :open="false">
              <Button size="sm">Closed</Button>
            </Tooltip>
            <Tooltip content="Open" :open="true">
              <Button size="sm">Open</Button>
            </Tooltip>
          </Stack>
        </Stack>
        <Stack direction="column" gap="12px">
          <div class="text-xs font-semibold text-[var(--color-muted-foreground)]">side</div>
          <Stack direction="row" gap="12px" align="center" wrap>
            <Tooltip content="Bottom" side="bottom">
              <Button size="sm">Bottom</Button>
            </Tooltip>
            <Tooltip content="Top" side="top">
              <Button size="sm">Top</Button>
            </Tooltip>
            <Tooltip content="Right" side="right">
              <Button size="sm">Right</Button>
            </Tooltip>
            <Tooltip content="Left" side="left">
              <Button size="sm">Left</Button>
            </Tooltip>
          </Stack>
        </Stack>
        <Stack direction="column" gap="12px">
          <div class="text-xs font-semibold text-[var(--color-muted-foreground)]">align</div>
          <Stack direction="row" gap="12px" align="center" wrap>
            <Tooltip content="Start" align="start">
              <Button size="sm">Start</Button>
            </Tooltip>
            <Tooltip content="Center" align="center">
              <Button size="sm">Center</Button>
            </Tooltip>
            <Tooltip content="End" align="end">
              <Button size="sm">End</Button>
            </Tooltip>
          </Stack>
        </Stack>
        <Stack direction="column" gap="12px">
          <div class="text-xs font-semibold text-[var(--color-muted-foreground)]">delay</div>
          <Stack direction="row" gap="12px" align="center" wrap>
            <Tooltip content="0ms" :delay="0">
              <Button size="sm">0ms</Button>
            </Tooltip>
            <Tooltip content="200ms" :delay="200">
              <Button size="sm">200ms</Button>
            </Tooltip>
            <Tooltip content="500ms" :delay="500">
              <Button size="sm">500ms</Button>
            </Tooltip>
          </Stack>
        </Stack>
        <Stack direction="column" gap="12px">
          <div class="text-xs font-semibold text-[var(--color-muted-foreground)]">rounded</div>
          <Stack direction="row" gap="12px" align="center" wrap>
            <Tooltip content="Rounded sm" rounded="sm">
              <Button size="sm">Rounded sm</Button>
            </Tooltip>
            <Tooltip content="Rounded md" rounded="md">
              <Button size="sm">Rounded md</Button>
            </Tooltip>
            <Tooltip content="Rounded lg" rounded="lg">
              <Button size="sm">Rounded lg</Button>
            </Tooltip>
          </Stack>
        </Stack>
        <Stack direction="column" gap="12px">
          <div class="text-xs font-semibold text-[var(--color-muted-foreground)]">shadow</div>
          <Stack direction="row" gap="12px" align="center" wrap>
            <Tooltip content="Shadow none" shadow="none">
              <Button size="sm">Shadow none</Button>
            </Tooltip>
            <Tooltip content="Shadow sm" shadow="sm">
              <Button size="sm">Shadow sm</Button>
            </Tooltip>
            <Tooltip content="Shadow md" shadow="md">
              <Button size="sm">Shadow md</Button>
            </Tooltip>
          </Stack>
        </Stack>
      </Stack>
    `,
  }),
}
