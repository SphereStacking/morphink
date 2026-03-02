import { Tabs, Text, Stack } from '@morphink/ui'
import { componentSizes, componentVariants } from '@morphink/ui'
import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { ref } from 'vue'

const meta: Meta<typeof Tabs> = {
  title: 'Components/Molecules/Tabs',
  component: Tabs,
  tags: ['autodocs'],
  argTypes: {
    variant: { control: { type: 'select' }, options: componentVariants.Tabs },
    size: { control: { type: 'select' }, options: componentSizes.Tabs },
    modelValue: { control: 'text' },
    items: { control: 'object' },
    'update:modelValue': { action: 'update:modelValue' },
  },
  args: {
    variant: 'pill',
    size: 'md',
    modelValue: 'overview',
    items: [
      { label: 'Overview', value: 'overview' },
      { label: 'Layout', value: 'layout' },
      { label: 'Tokens', value: 'tokens' },
    ],
  },
}

export default meta
type Story = StoryObj<typeof Tabs>

export const Default: Story = {
  render: (args) => ({
    components: { Tabs, Stack, Text },
    setup() {
      const active = ref(args.modelValue)
      const onChange = (value: string) => {
        active.value = value
        args['update:modelValue']?.(value)
      }
      return { args, active, onChange }
    },
    template: `
      <Stack gap="md">
        <Tabs
          :items="args.items"
          :model-value="active"
          :variant="args.variant"
          :size="args.size"
          @update:model-value="onChange"
        />
        <Text muted>Selected: {{ active }}</Text>
      </Stack>
    `,
  }),
}

export const Variants: Story = {
  render: () => ({
    components: { Tabs, Text, Stack },
    setup() {
      const items = [
        { label: 'Overview', value: 'overview' },
        { label: 'Layout', value: 'layout' },
        { label: 'Tokens', value: 'tokens' },
      ]
      const activeVariant = ref('overview')
      return { items, activeVariant }
    },
    template: `
      <Stack gap="md">
        <Tabs v-model="activeVariant" :items="items" variant="pill" />
        <Tabs v-model="activeVariant" :items="items" variant="underline" />
      </Stack>
    `,
  }),
}

export const Sizes: Story = {
  render: () => ({
    components: { Tabs, Text, Stack },
    setup() {
      const items = [
        { label: 'Overview', value: 'overview' },
        { label: 'Layout', value: 'layout' },
        { label: 'Tokens', value: 'tokens' },
      ]
      const activeSize = ref('overview')
      return { items, activeSize }
    },
    template: `
      <Stack gap="md">
        <Tabs v-model="activeSize" :items="items" size="sm" />
        <Tabs v-model="activeSize" :items="items" size="md" />
      </Stack>
    `,
  }),
}
