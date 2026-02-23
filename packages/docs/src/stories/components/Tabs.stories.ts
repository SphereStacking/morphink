import type { Meta, StoryObj } from '@storybook/vue3'
import { Tabs, Text, Stack } from '@ink-ui/ui'
import { ref } from 'vue'

const meta: Meta = {
  title: 'Components/Tabs',
  argTypes: {
    variant: { control: { type: 'select' }, options: ['pill', 'underline'] },
    size: { control: { type: 'select' }, options: ['sm', 'md'] },
    modelValue: { control: 'text' },
    items: { control: 'object' },
    'update:modelValue': { action: 'update:modelValue' },
  },
  args: {
    variant: 'pill',
    size: 'md',
    modelValue: 'overview',
    items: [
      { label: '概要', value: 'overview' },
      { label: 'レイアウト', value: 'layout' },
      { label: 'トークン', value: 'tokens' },
    ],
  },
}

export default meta
type Story = StoryObj

export const Playground: Story = {
  render: args => ({
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
      <Stack gap="12px">
        <Tabs
          :items="args.items"
          :model-value="active"
          :variant="args.variant"
          :size="args.size"
          @update:model-value="onChange"
        />
        <Text muted>選択中: {{ active }}</Text>
      </Stack>
    `,
  }),
}

export const Overview: Story = {
  render: () => ({
    components: { Tabs, Text, Stack },
    setup() {
      const items = [
        { label: '概要', value: 'overview' },
        { label: 'レイアウト', value: 'layout' },
        { label: 'トークン', value: 'tokens' },
      ]
      const activeDefault = ref('overview')
      const activeVariant = ref('overview')
      const activeSize = ref('overview')
      return { items, activeDefault, activeVariant, activeSize }
    },
    template: `
      <Stack gap="30px">
        <Stack direction="column" gap="12px">
          <div class="text-xs font-semibold text-[var(--color-muted-foreground)]">default</div>
          <Stack gap="12px">
            <Tabs v-model="activeDefault" :items="items" />
            <Text muted>選択中: {{ activeDefault }}</Text>
          </Stack>
        </Stack>
        <div class="border border-[var(--color-border)]"></div>
        <Stack direction="column" gap="12px">
          <div class="text-xs font-semibold text-[var(--color-muted-foreground)]">variant</div>
          <Stack gap="12px">
            <Tabs v-model="activeVariant" :items="items" variant="pill" />
            <Tabs v-model="activeVariant" :items="items" variant="underline" />
          </Stack>
        </Stack>
        <Stack direction="column" gap="12px">
          <div class="text-xs font-semibold text-[var(--color-muted-foreground)]">size</div>
          <Stack gap="12px">
            <Tabs v-model="activeSize" :items="items" size="sm" />
            <Tabs v-model="activeSize" :items="items" size="md" />
          </Stack>
        </Stack>
      </Stack>
    `,
  }),
}
