import { ref } from 'vue'
import { Switch, Stack } from '@morphink/ui'
import { componentSizes, componentTones } from '@morphink/ui'
import type { Meta, StoryObj } from '@storybook/vue3-vite'

const meta: Meta = {
  title: 'Components/Switch',
  argTypes: {
    size: { control: { type: 'select' }, options: componentSizes.Switch },
    tone: { control: { type: 'select' }, options: componentTones.Switch },
    disabled: { control: 'boolean' },
  },
  args: {
    size: 'md',
    tone: 'primary',
    disabled: false,
  },
}

export default meta
type Story = StoryObj

export const Playground: Story = {
  render: (args) => ({
    components: { Switch },
    setup() {
      const checked = ref(false)
      return { args, checked }
    },
    template: `
      <div class="flex items-center gap-3">
        <Switch v-bind="args" v-model="checked" />
        <label class="text-sm text-[var(--morphink-color-foreground)]">
          {{ checked ? 'On' : 'Off' }}
        </label>
      </div>
    `,
  }),
}

export const Overview: Story = {
  render: () => ({
    components: { Switch, Stack },
    template: `
      <Stack direction="column" gap="2xl">
        <Stack direction="column" gap="md">
          <div class="text-xs font-semibold text-[var(--morphink-color-muted-foreground)]">states</div>
          <Stack direction="row" gap="lg" align="center">
            <div class="flex items-center gap-3">
              <Switch />
              <span class="text-sm text-[var(--morphink-color-foreground)]">Off</span>
            </div>
            <div class="flex items-center gap-3">
              <Switch :default-value="true" />
              <span class="text-sm text-[var(--morphink-color-foreground)]">On</span>
            </div>
            <div class="flex items-center gap-3">
              <Switch disabled />
              <span class="text-sm text-[var(--morphink-color-muted-foreground)]">Disabled Off</span>
            </div>
            <div class="flex items-center gap-3">
              <Switch :default-value="true" disabled />
              <span class="text-sm text-[var(--morphink-color-muted-foreground)]">Disabled On</span>
            </div>
          </Stack>
        </Stack>
        <div class="border border-[var(--morphink-color-border)]"></div>
        <Stack direction="column" gap="md">
          <div class="text-xs font-semibold text-[var(--morphink-color-muted-foreground)]">tone</div>
          <Stack direction="row" gap="lg" align="center">
            <div class="flex items-center gap-3">
              <Switch tone="base" :default-value="true" />
              <span class="text-sm text-[var(--morphink-color-foreground)]">Base</span>
            </div>
            <div class="flex items-center gap-3">
              <Switch tone="primary" :default-value="true" />
              <span class="text-sm text-[var(--morphink-color-foreground)]">Primary</span>
            </div>
          </Stack>
        </Stack>
        <div class="border border-[var(--morphink-color-border)]"></div>
        <Stack direction="column" gap="md">
          <div class="text-xs font-semibold text-[var(--morphink-color-muted-foreground)]">size</div>
          <Stack direction="row" gap="lg" align="center">
            <div class="flex items-center gap-3">
              <Switch size="sm" :default-value="true" />
              <span class="text-sm text-[var(--morphink-color-foreground)]">Small</span>
            </div>
            <div class="flex items-center gap-3">
              <Switch size="md" :default-value="true" />
              <span class="text-sm text-[var(--morphink-color-foreground)]">Medium</span>
            </div>
            <div class="flex items-center gap-3">
              <Switch size="lg" :default-value="true" />
              <span class="text-sm text-[var(--morphink-color-foreground)]">Large</span>
            </div>
          </Stack>
        </Stack>
      </Stack>
    `,
  }),
}
