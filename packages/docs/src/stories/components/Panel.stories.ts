import { Panel, Stack, Text, Button } from '@morphink/ui'
import { componentRounded, componentShadow, componentVariants } from '@morphink/ui'
import type { Meta, StoryObj } from '@storybook/vue3-vite'

const meta: Meta = {
  title: 'Components/Panel',
  argTypes: {
    variant: { control: { type: 'select' }, options: componentVariants.Panel },
    interactive: { control: 'boolean' },
    body: { control: 'text' },
    rounded: { control: { type: 'select' }, options: componentRounded.Panel },
    shadow: { control: { type: 'select' }, options: componentShadow.Panel },
  },
  args: {
    variant: 'subtle',
    interactive: false,
    rounded: 'md',
    shadow: 'md',
    body: 'Use Panel to organize information blocks.',
  },
}

export default meta
type Story = StoryObj

export const Playground: Story = {
  render: (args) => ({
    components: { Panel, Stack, Text, Button },
    setup() {
      return { args }
    },
    template: `
      <Stack gap="md">
        <Panel :variant="args.variant" :interactive="args.interactive" :rounded="args.rounded" :shadow="args.shadow">
          <Text>{{ args.body }}</Text>
          <Button size="sm" variant="ghost" style="margin-top: 8px;">Action</Button>
        </Panel>
      </Stack>
    `,
  }),
}

export const Overview: Story = {
  render: () => ({
    components: { Panel, Stack, Text, Button },
    template: `
      <Stack gap="2xl">
        <Stack direction="column" gap="md">
          <div class="text-xs font-semibold text-[var(--morphink-color-muted-foreground)]">default</div>
          <Stack gap="md">
            <Panel>
              <Text>Default panel</Text>
              <Button size="sm" variant="ghost" style="margin-top: 8px;">Action</Button>
            </Panel>
          </Stack>
        </Stack>
        <div class="border border-[var(--morphink-color-border)]"></div>
        <Stack direction="column" gap="md">
          <div class="text-xs font-semibold text-[var(--morphink-color-muted-foreground)]">variant</div>
          <Stack gap="md">
            <Panel variant="subtle">
              <Text muted>Subtle panel</Text>
            </Panel>
            <Panel variant="solid">
              <Text>Solid panel</Text>
            </Panel>
            <Panel variant="elevated">
              <Text>Elevated panel</Text>
            </Panel>
          </Stack>
        </Stack>
        <Stack direction="column" gap="md">
          <div class="text-xs font-semibold text-[var(--morphink-color-muted-foreground)]">interactive</div>
          <Stack gap="md">
            <Panel>
              <Text muted>Not interactive</Text>
            </Panel>
            <Panel interactive>
              <Text>Interactive</Text>
              <Button size="sm" variant="ghost" style="margin-top: 8px;">Action</Button>
            </Panel>
          </Stack>
        </Stack>
        <Stack direction="column" gap="md">
          <div class="text-xs font-semibold text-[var(--morphink-color-muted-foreground)]">rounded</div>
          <Stack gap="md">
            <Panel rounded="sm">
              <Text>Rounded sm</Text>
            </Panel>
            <Panel rounded="md">
              <Text>Rounded md</Text>
            </Panel>
            <Panel rounded="lg">
              <Text>Rounded lg</Text>
            </Panel>
          </Stack>
        </Stack>
        <Stack direction="column" gap="md">
          <div class="text-xs font-semibold text-[var(--morphink-color-muted-foreground)]">shadow</div>
          <Stack gap="md">
            <Panel shadow="none">
              <Text>Shadow none</Text>
            </Panel>
            <Panel shadow="sm">
              <Text>Shadow sm</Text>
            </Panel>
            <Panel shadow="md">
              <Text>Shadow md</Text>
            </Panel>
          </Stack>
        </Stack>
      </Stack>
    `,
  }),
}
