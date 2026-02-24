import { ref } from 'vue'
import { Switch, Stack } from '@morphink/ui'
import { componentSizes, componentTones, componentVariants } from '@morphink/ui'
import type { Meta, StoryObj } from '@storybook/vue3-vite'

const meta: Meta = {
  title: 'Components/Switch',
  argTypes: {
    variant: { control: { type: 'select' }, options: componentVariants.Switch },
    size: { control: { type: 'select' }, options: componentSizes.Switch },
    tone: { control: { type: 'select' }, options: componentTones.Switch },
    disabled: { control: 'boolean' },
  },
  args: {
    variant: 'solid',
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
          <div class="text-xs font-semibold text-[var(--morphink-color-muted-foreground)]">variant</div>
          <Stack direction="row" gap="lg" align="center">
            <div class="flex items-center gap-3">
              <Switch variant="outline" :default-value="true" />
              <span class="text-sm text-[var(--morphink-color-foreground)]">Outline</span>
            </div>
            <div class="flex items-center gap-3">
              <Switch variant="solid" :default-value="true" />
              <span class="text-sm text-[var(--morphink-color-foreground)]">Solid</span>
            </div>
            <div class="flex items-center gap-3">
              <Switch variant="ghost" :default-value="true" />
              <span class="text-sm text-[var(--morphink-color-foreground)]">Ghost</span>
            </div>
            <div class="flex items-center gap-3">
              <Switch variant="soft" :default-value="true" />
              <span class="text-sm text-[var(--morphink-color-foreground)]">Soft</span>
            </div>
          </Stack>
          <Stack direction="row" gap="lg" align="center">
            <div class="flex items-center gap-3">
              <Switch variant="outline" />
              <span class="text-sm text-[var(--morphink-color-muted-foreground)]">Outline off</span>
            </div>
            <div class="flex items-center gap-3">
              <Switch variant="solid" />
              <span class="text-sm text-[var(--morphink-color-muted-foreground)]">Solid off</span>
            </div>
            <div class="flex items-center gap-3">
              <Switch variant="ghost" />
              <span class="text-sm text-[var(--morphink-color-muted-foreground)]">Ghost off</span>
            </div>
            <div class="flex items-center gap-3">
              <Switch variant="soft" />
              <span class="text-sm text-[var(--morphink-color-muted-foreground)]">Soft off</span>
            </div>
          </Stack>
        </Stack>
        <div class="border border-[var(--morphink-color-border)]"></div>
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
            <div class="flex items-center gap-3">
              <Switch tone="success" :default-value="true" />
              <span class="text-sm text-[var(--morphink-color-foreground)]">Success</span>
            </div>
            <div class="flex items-center gap-3">
              <Switch tone="warning" :default-value="true" />
              <span class="text-sm text-[var(--morphink-color-foreground)]">Warning</span>
            </div>
            <div class="flex items-center gap-3">
              <Switch tone="destructive" :default-value="true" />
              <span class="text-sm text-[var(--morphink-color-foreground)]">Destructive</span>
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
