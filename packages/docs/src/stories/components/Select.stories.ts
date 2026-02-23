import { Select, Stack, Text } from '@morphink/ui'
import { componentRounded, componentShadow, componentSizes, componentVariants } from '@morphink/ui'
import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { ref } from 'vue'

const meta: Meta = {
  title: 'Components/Select',
  argTypes: {
    modelValue: { control: 'text' },
    options: { control: 'object' },
    placeholder: { control: 'text' },
    size: { control: { type: 'select' }, options: componentSizes.Select },
    variant: { control: { type: 'select' }, options: componentVariants.Select },
    rounded: { control: { type: 'select' }, options: componentRounded.Select },
    shadow: { control: { type: 'select' }, options: componentShadow.Select },
    'update:modelValue': { action: 'update:modelValue' },
  },
  args: {
    modelValue: null,
    options: [
      { label: 'None', value: 'none' },
      { label: 'Default', value: 'default' },
      { label: 'Strong', value: 'strong' },
    ],
    placeholder: 'Select an option',
    size: 'md',
    variant: 'outline',
    rounded: 'md',
    shadow: 'md',
  },
}

export default meta
type Story = StoryObj

export const Playground: Story = {
  render: (args) => ({
    components: { Select, Stack, Text },
    setup() {
      const value = ref(args.modelValue)
      const onChange = (next: string | number | null) => {
        value.value = next
        args['update:modelValue']?.(next)
      }
      return { args, value, onChange }
    },
    template: `
      <Stack gap="12px">
        <Text muted>Value: {{ value ?? 'None' }}</Text>
        <Select
          :model-value="value"
          :options="args.options"
          :placeholder="args.placeholder"
          :size="args.size"
          :variant="args.variant"
          :rounded="args.rounded"
          :shadow="args.shadow"
          @update:model-value="onChange"
        />
      </Stack>
    `,
  }),
}

export const Overview: Story = {
  render: () => ({
    components: { Select, Stack, Text },
    setup() {
      const options = [
        { label: 'None', value: 'none' },
        { label: 'Default', value: 'default' },
        { label: 'Strong', value: 'strong' },
      ]
      const valueDefault = ref<string | number | null>(null)
      const valueOutline = ref<string | number | null>(null)
      const valueGhost = ref<string | number | null>(null)
      const valueSize = ref<string | number | null>(null)
      const valueRounded = ref<string | number | null>(null)
      const valueShadow = ref<string | number | null>(null)
      return {
        options,
        valueDefault,
        valueOutline,
        valueGhost,
        valueSize,
        valueRounded,
        valueShadow,
      }
    },
    template: `
      <Stack gap="30px">
        <Stack direction="column" gap="12px">
          <div class="text-xs font-semibold text-[var(--morphink-color-muted-foreground)]">default</div>
          <Stack gap="12px">
            <Select v-model="valueDefault" :options="options" placeholder="Select an option" />
          </Stack>
        </Stack>
        <div class="border border-[var(--morphink-color-border)]"></div>
        <Stack direction="column" gap="12px">
          <div class="text-xs font-semibold text-[var(--morphink-color-muted-foreground)]">variant</div>
          <Stack direction="row" gap="12px" align="center" wrap>
            <Select v-model="valueOutline" :options="options" placeholder="Outline" variant="outline" />
            <Select v-model="valueGhost" :options="options" placeholder="Ghost" variant="ghost" />
          </Stack>
        </Stack>
        <Stack direction="column" gap="12px">
          <div class="text-xs font-semibold text-[var(--morphink-color-muted-foreground)]">size</div>
          <Stack direction="row" gap="12px" align="center" wrap>
            <Select v-model="valueSize" :options="options" placeholder="Large" size="lg" />
            <Select v-model="valueSize" :options="options" placeholder="Medium" size="md" />
            <Select v-model="valueSize" :options="options" placeholder="Small" size="sm" />
          </Stack>
        </Stack>
        <Stack direction="column" gap="12px">
          <div class="text-xs font-semibold text-[var(--morphink-color-muted-foreground)]">rounded</div>
          <Stack direction="row" gap="12px" align="center" wrap>
            <Select v-model="valueRounded" :options="options" placeholder="Rounded sm" rounded="sm" />
            <Select v-model="valueRounded" :options="options" placeholder="Rounded md" rounded="md" />
            <Select v-model="valueRounded" :options="options" placeholder="Rounded lg" rounded="lg" />
          </Stack>
        </Stack>
        <Stack direction="column" gap="12px">
          <div class="text-xs font-semibold text-[var(--morphink-color-muted-foreground)]">shadow</div>
          <Stack direction="row" gap="12px" align="center" wrap>
            <Select v-model="valueShadow" :options="options" placeholder="Shadow none" shadow="none" />
            <Select v-model="valueShadow" :options="options" placeholder="Shadow sm" shadow="sm" />
            <Select v-model="valueShadow" :options="options" placeholder="Shadow md" shadow="md" />
          </Stack>
        </Stack>
      </Stack>
    `,
  }),
}
