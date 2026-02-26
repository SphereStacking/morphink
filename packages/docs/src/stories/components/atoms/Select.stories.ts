import { Select, Stack, Text } from '@morphink/ui'
import { componentRounded, componentShadow, componentSizes, componentTones, componentVariants } from '@morphink/ui'
import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { ref } from 'vue'

const meta: Meta<typeof Select> = {
  title: 'Components/Atoms/Select',
  component: Select,
  tags: ['autodocs'],
  argTypes: {
    modelValue: { control: 'text' },
    options: { control: 'object' },
    placeholder: { control: 'text' },
    size: { control: { type: 'select' }, options: componentSizes.Select },
    variant: { control: { type: 'select' }, options: componentVariants.Select },
    tone: { control: { type: 'select' }, options: componentTones.Select },
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
    tone: 'base',
    rounded: 'md',
    shadow: 'md',
  },
}

export default meta
type Story = StoryObj<typeof Select>

export const Default: Story = {
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
      <Stack gap="md">
        <Text muted>Value: {{ value ?? 'None' }}</Text>
        <Select
          :model-value="value"
          :options="args.options"
          :placeholder="args.placeholder"
          :size="args.size"
          :variant="args.variant"
          :tone="args.tone"
          :rounded="args.rounded"
          :shadow="args.shadow"
          @update:model-value="onChange"
        />
      </Stack>
    `,
  }),
}

export const Variants: Story = {
  render: () => ({
    components: { Select, Stack },
    setup() {
      const options = [
        { label: 'None', value: 'none' },
        { label: 'Default', value: 'default' },
        { label: 'Strong', value: 'strong' },
      ]
      const valueSolid = ref<string | number | null>(null)
      const valueOutline = ref<string | number | null>(null)
      const valueGhost = ref<string | number | null>(null)
      const valueSoft = ref<string | number | null>(null)
      return { options, valueSolid, valueOutline, valueGhost, valueSoft }
    },
    template: `
      <Stack direction="row" gap="md" align="center" wrap>
        <Select v-model="valueSolid" :options="options" placeholder="Solid" variant="solid" />
        <Select v-model="valueOutline" :options="options" placeholder="Outline" variant="outline" />
        <Select v-model="valueGhost" :options="options" placeholder="Ghost" variant="ghost" />
        <Select v-model="valueSoft" :options="options" placeholder="Soft" variant="soft" />
      </Stack>
    `,
  }),
}

export const Tones: Story = {
  render: () => ({
    components: { Select, Stack },
    setup() {
      const options = [
        { label: 'None', value: 'none' },
        { label: 'Default', value: 'default' },
        { label: 'Strong', value: 'strong' },
      ]
      const valueBase = ref<string | number | null>(null)
      const valuePrimary = ref<string | number | null>(null)
      const valueSuccess = ref<string | number | null>(null)
      const valueWarning = ref<string | number | null>(null)
      const valueDestructive = ref<string | number | null>(null)
      return { options, valueBase, valuePrimary, valueSuccess, valueWarning, valueDestructive }
    },
    template: `
      <Stack direction="row" gap="md" align="center" wrap>
        <Select v-model="valueBase" :options="options" placeholder="Base" tone="base" />
        <Select v-model="valuePrimary" :options="options" placeholder="Primary" tone="primary" />
        <Select v-model="valueSuccess" :options="options" placeholder="Success" tone="success" />
        <Select v-model="valueWarning" :options="options" placeholder="Warning" tone="warning" />
        <Select v-model="valueDestructive" :options="options" placeholder="Destructive" tone="destructive" />
      </Stack>
    `,
  }),
}

export const Sizes: Story = {
  render: () => ({
    components: { Select, Stack },
    setup() {
      const options = [
        { label: 'None', value: 'none' },
        { label: 'Default', value: 'default' },
        { label: 'Strong', value: 'strong' },
      ]
      const valueLg = ref<string | number | null>(null)
      const valueMd = ref<string | number | null>(null)
      const valueSm = ref<string | number | null>(null)
      return { options, valueLg, valueMd, valueSm }
    },
    template: `
      <Stack direction="row" gap="md" align="center" wrap>
        <Select v-model="valueLg" :options="options" placeholder="Large" size="lg" />
        <Select v-model="valueMd" :options="options" placeholder="Medium" size="md" />
        <Select v-model="valueSm" :options="options" placeholder="Small" size="sm" />
      </Stack>
    `,
  }),
}

export const Rounded: Story = {
  render: () => ({
    components: { Select, Stack },
    setup() {
      const options = [
        { label: 'None', value: 'none' },
        { label: 'Default', value: 'default' },
        { label: 'Strong', value: 'strong' },
      ]
      const valueSm = ref<string | number | null>(null)
      const valueMd = ref<string | number | null>(null)
      const valueLg = ref<string | number | null>(null)
      return { options, valueSm, valueMd, valueLg }
    },
    template: `
      <Stack direction="row" gap="md" align="center" wrap>
        <Select v-model="valueSm" :options="options" placeholder="Rounded sm" rounded="sm" />
        <Select v-model="valueMd" :options="options" placeholder="Rounded md" rounded="md" />
        <Select v-model="valueLg" :options="options" placeholder="Rounded lg" rounded="lg" />
      </Stack>
    `,
  }),
}

export const Shadow: Story = {
  render: () => ({
    components: { Select, Stack },
    setup() {
      const options = [
        { label: 'None', value: 'none' },
        { label: 'Default', value: 'default' },
        { label: 'Strong', value: 'strong' },
      ]
      const valueNone = ref<string | number | null>(null)
      const valueSm = ref<string | number | null>(null)
      const valueMd = ref<string | number | null>(null)
      return { options, valueNone, valueSm, valueMd }
    },
    template: `
      <Stack direction="row" gap="md" align="center" wrap>
        <Select v-model="valueNone" :options="options" placeholder="Shadow none" shadow="none" />
        <Select v-model="valueSm" :options="options" placeholder="Shadow sm" shadow="sm" />
        <Select v-model="valueMd" :options="options" placeholder="Shadow md" shadow="md" />
      </Stack>
    `,
  }),
}
