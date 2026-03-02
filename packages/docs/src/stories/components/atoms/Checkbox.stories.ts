import { Checkbox, CheckboxGroup, Stack } from '@morphink/ui'
import { componentRounded, componentSizes, componentTones, componentVariants } from '@morphink/ui'
import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { ref } from 'vue'

const meta: Meta<typeof Checkbox> = {
  title: 'Components/Atoms/Checkbox',
  component: Checkbox,
  tags: ['autodocs'],
  argTypes: {
    variant: { control: { type: 'select' }, options: componentVariants.Checkbox },
    tone: { control: { type: 'select' }, options: componentTones.Checkbox },
    size: { control: { type: 'select' }, options: componentSizes.Checkbox },
    rounded: { control: { type: 'select' }, options: componentRounded.Checkbox },
    disabled: { control: 'boolean' },
  },
  args: {
    variant: 'outline',
    tone: 'primary',
    size: 'md',
    rounded: 'sm',
    disabled: false,
  },
}

export default meta
type Story = StoryObj<typeof Checkbox>

export const Default: Story = {
  render: (args) => ({
    components: { Checkbox },
    setup() {
      const checked = ref(false)
      return { args, checked }
    },
    template: `
      <div class="flex items-center gap-2">
        <Checkbox v-bind="args" v-model="checked" />
        <label class="text-sm text-[var(--morphink-color-foreground)]">
          Accept terms and conditions ({{ checked }})
        </label>
      </div>
    `,
  }),
}

export const Variants: Story = {
  render: () => ({
    components: { Checkbox, Stack },
    template: `
      <Stack direction="column" gap="md">
        <Stack direction="row" gap="lg">
          <div class="flex items-center gap-2">
            <Checkbox variant="outline" :default-value="true" />
            <span class="text-sm text-[var(--morphink-color-foreground)]">Outline</span>
          </div>
          <div class="flex items-center gap-2">
            <Checkbox variant="solid" :default-value="true" />
            <span class="text-sm text-[var(--morphink-color-foreground)]">Solid</span>
          </div>
          <div class="flex items-center gap-2">
            <Checkbox variant="ghost" :default-value="true" />
            <span class="text-sm text-[var(--morphink-color-foreground)]">Ghost</span>
          </div>
          <div class="flex items-center gap-2">
            <Checkbox variant="soft" :default-value="true" />
            <span class="text-sm text-[var(--morphink-color-foreground)]">Soft</span>
          </div>
        </Stack>
        <Stack direction="row" gap="lg">
          <div class="flex items-center gap-2">
            <Checkbox variant="outline" />
            <span class="text-sm text-[var(--morphink-color-muted-foreground)]">Outline off</span>
          </div>
          <div class="flex items-center gap-2">
            <Checkbox variant="solid" />
            <span class="text-sm text-[var(--morphink-color-muted-foreground)]">Solid off</span>
          </div>
          <div class="flex items-center gap-2">
            <Checkbox variant="ghost" />
            <span class="text-sm text-[var(--morphink-color-muted-foreground)]">Ghost off</span>
          </div>
          <div class="flex items-center gap-2">
            <Checkbox variant="soft" />
            <span class="text-sm text-[var(--morphink-color-muted-foreground)]">Soft off</span>
          </div>
        </Stack>
      </Stack>
    `,
  }),
}

export const States: Story = {
  render: () => ({
    components: { Checkbox, Stack },
    template: `
      <Stack direction="row" gap="lg">
        <div class="flex items-center gap-2">
          <Checkbox />
          <span class="text-sm text-[var(--morphink-color-foreground)]">Unchecked</span>
        </div>
        <div class="flex items-center gap-2">
          <Checkbox :default-value="true" />
          <span class="text-sm text-[var(--morphink-color-foreground)]">Checked</span>
        </div>
        <div class="flex items-center gap-2">
          <Checkbox default-value="indeterminate" />
          <span class="text-sm text-[var(--morphink-color-foreground)]">Indeterminate</span>
        </div>
        <div class="flex items-center gap-2">
          <Checkbox disabled />
          <span class="text-sm text-[var(--morphink-color-foreground)]">Disabled</span>
        </div>
        <div class="flex items-center gap-2">
          <Checkbox disabled :default-value="true" />
          <span class="text-sm text-[var(--morphink-color-foreground)]">Disabled + Checked</span>
        </div>
      </Stack>
    `,
  }),
}

export const Tones: Story = {
  render: () => ({
    components: { Checkbox, Stack },
    template: `
      <Stack direction="row" gap="lg">
        <div class="flex items-center gap-2">
          <Checkbox tone="base" :default-value="true" />
          <span class="text-sm text-[var(--morphink-color-foreground)]">Base</span>
        </div>
        <div class="flex items-center gap-2">
          <Checkbox tone="primary" :default-value="true" />
          <span class="text-sm text-[var(--morphink-color-foreground)]">Primary</span>
        </div>
        <div class="flex items-center gap-2">
          <Checkbox tone="success" :default-value="true" />
          <span class="text-sm text-[var(--morphink-color-foreground)]">Success</span>
        </div>
        <div class="flex items-center gap-2">
          <Checkbox tone="warning" :default-value="true" />
          <span class="text-sm text-[var(--morphink-color-foreground)]">Warning</span>
        </div>
        <div class="flex items-center gap-2">
          <Checkbox tone="destructive" :default-value="true" />
          <span class="text-sm text-[var(--morphink-color-foreground)]">Destructive</span>
        </div>
      </Stack>
    `,
  }),
}

export const Sizes: Story = {
  render: () => ({
    components: { Checkbox, Stack },
    template: `
      <Stack direction="row" gap="lg" align="center">
        <div class="flex items-center gap-2">
          <Checkbox size="sm" :default-value="true" />
          <span class="text-sm text-[var(--morphink-color-foreground)]">Small</span>
        </div>
        <div class="flex items-center gap-2">
          <Checkbox size="md" :default-value="true" />
          <span class="text-sm text-[var(--morphink-color-foreground)]">Medium</span>
        </div>
        <div class="flex items-center gap-2">
          <Checkbox size="lg" :default-value="true" />
          <span class="text-sm text-[var(--morphink-color-foreground)]">Large</span>
        </div>
      </Stack>
    `,
  }),
}

export const Rounded: Story = {
  render: () => ({
    components: { Checkbox, Stack },
    template: `
      <Stack direction="row" gap="lg" align="center">
        <div class="flex items-center gap-2">
          <Checkbox rounded="none" :default-value="true" />
          <span class="text-sm text-[var(--morphink-color-foreground)]">None</span>
        </div>
        <div class="flex items-center gap-2">
          <Checkbox rounded="sm" :default-value="true" />
          <span class="text-sm text-[var(--morphink-color-foreground)]">Small</span>
        </div>
        <div class="flex items-center gap-2">
          <Checkbox rounded="md" :default-value="true" />
          <span class="text-sm text-[var(--morphink-color-foreground)]">Medium</span>
        </div>
        <div class="flex items-center gap-2">
          <Checkbox rounded="full" :default-value="true" />
          <span class="text-sm text-[var(--morphink-color-foreground)]">Full</span>
        </div>
      </Stack>
    `,
  }),
}

export const Group: Story = {
  render: () => ({
    components: { Checkbox, CheckboxGroup },
    setup() {
      const selected = ref(['apple', 'cherry'])
      return { selected }
    },
    template: `
      <CheckboxGroup v-model="selected">
        <div class="flex items-center gap-2">
          <Checkbox value="apple" />
          <span class="text-sm text-[var(--morphink-color-foreground)]">Apple</span>
        </div>
        <div class="flex items-center gap-2">
          <Checkbox value="banana" />
          <span class="text-sm text-[var(--morphink-color-foreground)]">Banana</span>
        </div>
        <div class="flex items-center gap-2">
          <Checkbox value="cherry" />
          <span class="text-sm text-[var(--morphink-color-foreground)]">Cherry</span>
        </div>
      </CheckboxGroup>
      <p class="mt-4 text-sm text-[var(--morphink-color-muted-foreground)]">Selected: {{ selected.join(', ') }}</p>
    `,
  }),
}

export const GroupHorizontal: Story = {
  render: () => ({
    components: { Checkbox, CheckboxGroup },
    template: `
      <CheckboxGroup orientation="horizontal" :default-value="['sm']" tone="accent">
        <div class="flex items-center gap-2">
          <Checkbox value="sm" />
          <span class="text-sm text-[var(--morphink-color-foreground)]">Small</span>
        </div>
        <div class="flex items-center gap-2">
          <Checkbox value="md" />
          <span class="text-sm text-[var(--morphink-color-foreground)]">Medium</span>
        </div>
        <div class="flex items-center gap-2">
          <Checkbox value="lg" />
          <span class="text-sm text-[var(--morphink-color-foreground)]">Large</span>
        </div>
      </CheckboxGroup>
    `,
  }),
}
