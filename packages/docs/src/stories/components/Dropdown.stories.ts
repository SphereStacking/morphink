import { Dropdown, Button, Stack, Text } from '@ink-ui/ui'
import { componentRounded, componentShadow } from '@ink-ui/ui'
import type { Meta, StoryObj } from '@storybook/vue3-vite'

const meta: Meta = {
  title: 'Components/Dropdown',
  argTypes: {
    items: { control: 'object' },
    side: { control: { type: 'select' }, options: ['top', 'right', 'bottom', 'left'] },
    align: { control: { type: 'select' }, options: ['start', 'center', 'end'] },
    open: { control: 'boolean' },
    rounded: { control: { type: 'select' }, options: componentRounded.Dropdown },
    shadow: { control: { type: 'select' }, options: componentShadow.Dropdown },
    onOpenChange: { action: 'onOpenChange' },
    onSelect: { action: 'onSelect' },
  },
  args: {
    items: [
      { label: 'Edit', value: 'edit' },
      { label: 'Duplicate', value: 'duplicate' },
      { label: 'Delete', value: 'delete', danger: true },
    ],
    side: 'bottom',
    align: 'start',
    open: false,
    rounded: 'md',
    shadow: 'md',
  },
}

export default meta
type Story = StoryObj

export const Playground: Story = {
  render: (args) => ({
    components: { Dropdown, Button, Stack, Text },
    setup() {
      return { args }
    },
    template: `
      <Stack gap="12px">
        <Text muted>Click to open the menu.</Text>
        <Dropdown
          :items="args.items"
          :side="args.side"
          :align="args.align"
          :open="args.open"
          :rounded="args.rounded"
          :shadow="args.shadow"
          :on-open-change="args.onOpenChange"
          :on-select="args.onSelect"
        >
          <template #trigger>
            <Button size="sm" variant="outline">Menu</Button>
          </template>
        </Dropdown>
      </Stack>
    `,
  }),
}

export const Overview: Story = {
  render: () => ({
    components: { Dropdown, Button, Stack, Text },
    setup() {
      const items = [
        { label: 'Edit', value: 'edit' },
        { label: 'Duplicate', value: 'duplicate' },
        { label: 'Delete', value: 'delete', danger: true },
      ]
      return { items }
    },
    template: `
      <Stack gap="30px">
        <Stack direction="column" gap="12px">
          <div class="text-xs font-semibold text-[var(--color-muted-foreground)]">default</div>
          <Stack gap="12px">
            <Dropdown :items="items">
              <template #trigger>
                <Button size="sm" variant="outline">Default</Button>
              </template>
            </Dropdown>
          </Stack>
        </Stack>
        <div class="border border-[var(--color-border)]"></div>
        <Stack direction="column" gap="12px">
          <div class="text-xs font-semibold text-[var(--color-muted-foreground)]">open</div>
          <Stack direction="row" gap="12px" align="center" wrap>
            <Dropdown :items="items" :open="false">
              <template #trigger>
                <Button size="sm" variant="outline">Closed</Button>
              </template>
            </Dropdown>
            <Dropdown :items="items" :open="true">
              <template #trigger>
                <Button size="sm" variant="outline">Open</Button>
              </template>
            </Dropdown>
          </Stack>
        </Stack>
        <Stack direction="column" gap="12px">
          <div class="text-xs font-semibold text-[var(--color-muted-foreground)]">side</div>
          <Stack direction="row" gap="12px" align="center" wrap>
            <Dropdown :items="items" side="bottom">
              <template #trigger>
                <Button size="sm" variant="outline">Bottom</Button>
              </template>
            </Dropdown>
            <Dropdown :items="items" side="top">
              <template #trigger>
                <Button size="sm" variant="outline">Top</Button>
              </template>
            </Dropdown>
            <Dropdown :items="items" side="right">
              <template #trigger>
                <Button size="sm" variant="outline">Right</Button>
              </template>
            </Dropdown>
            <Dropdown :items="items" side="left">
              <template #trigger>
                <Button size="sm" variant="outline">Left</Button>
              </template>
            </Dropdown>
          </Stack>
        </Stack>
        <Stack direction="column" gap="12px">
          <div class="text-xs font-semibold text-[var(--color-muted-foreground)]">align</div>
          <Stack direction="row" gap="12px" align="center" wrap>
            <Dropdown :items="items" align="start">
              <template #trigger>
                <Button size="sm" variant="outline">Start</Button>
              </template>
            </Dropdown>
            <Dropdown :items="items" align="center">
              <template #trigger>
                <Button size="sm" variant="outline">Center</Button>
              </template>
            </Dropdown>
            <Dropdown :items="items" align="end">
              <template #trigger>
                <Button size="sm" variant="outline">End</Button>
              </template>
            </Dropdown>
          </Stack>
        </Stack>
        <Stack direction="column" gap="12px">
          <div class="text-xs font-semibold text-[var(--color-muted-foreground)]">rounded</div>
          <Stack direction="row" gap="12px" align="center" wrap>
            <Dropdown :items="items" rounded="sm">
              <template #trigger>
                <Button size="sm" variant="outline">Rounded sm</Button>
              </template>
            </Dropdown>
            <Dropdown :items="items" rounded="md">
              <template #trigger>
                <Button size="sm" variant="outline">Rounded md</Button>
              </template>
            </Dropdown>
            <Dropdown :items="items" rounded="lg">
              <template #trigger>
                <Button size="sm" variant="outline">Rounded lg</Button>
              </template>
            </Dropdown>
          </Stack>
        </Stack>
        <Stack direction="column" gap="12px">
          <div class="text-xs font-semibold text-[var(--color-muted-foreground)]">shadow</div>
          <Stack direction="row" gap="12px" align="center" wrap>
            <Dropdown :items="items" shadow="none">
              <template #trigger>
                <Button size="sm" variant="outline">Shadow none</Button>
              </template>
            </Dropdown>
            <Dropdown :items="items" shadow="sm">
              <template #trigger>
                <Button size="sm" variant="outline">Shadow sm</Button>
              </template>
            </Dropdown>
            <Dropdown :items="items" shadow="md">
              <template #trigger>
                <Button size="sm" variant="outline">Shadow md</Button>
              </template>
            </Dropdown>
          </Stack>
        </Stack>
      </Stack>
    `,
  }),
}
