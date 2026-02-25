import { FormField, Input, Select, Textarea, Checkbox, Stack } from '@morphink/ui'
import type { Meta, StoryObj } from '@storybook/vue3-vite'

const meta: Meta<typeof FormField> = {
  title: 'Components/Molecules/FormField',
  component: FormField,
  tags: ['autodocs'],
  argTypes: {
    label: { control: 'text' },
    error: { control: 'text' },
    helper: { control: 'text' },
    required: { control: 'boolean' },
  },
}

export default meta
type Story = StoryObj<typeof FormField>

export const WithInput: Story = {
  render: (args) => ({
    components: { FormField, Input },
    setup() {
      return { args }
    },
    template: `
      <FormField v-bind="args">
        <Input placeholder="Enter your name" />
      </FormField>
    `,
  }),
  args: {
    label: 'Full Name',
    helper: 'Enter your first and last name',
  },
}

export const WithError: Story = {
  render: (args) => ({
    components: { FormField, Input },
    setup() {
      return { args }
    },
    template: `
      <FormField v-bind="args">
        <Input placeholder="Enter email" tone="destructive" />
      </FormField>
    `,
  }),
  args: {
    label: 'Email',
    error: 'Please enter a valid email address',
    required: true,
  },
}

export const WithTextarea: Story = {
  render: (args) => ({
    components: { FormField, Textarea },
    setup() {
      return { args }
    },
    template: `
      <FormField v-bind="args">
        <Textarea placeholder="Write your message..." />
      </FormField>
    `,
  }),
  args: {
    label: 'Message',
    helper: 'Maximum 500 characters',
  },
}

export const MultipleFields: Story = {
  render: () => ({
    components: { FormField, Input, Select, Stack },
    template: `
      <Stack gap="lg" style="max-width: 400px">
        <FormField label="Name" required>
          <Input placeholder="John Doe" />
        </FormField>
        <FormField label="Email" required error="This field is required">
          <Input placeholder="john@example.com" tone="destructive" />
        </FormField>
        <FormField label="Phone" helper="Optional">
          <Input placeholder="+1 (555) 000-0000" />
        </FormField>
      </Stack>
    `,
  }),
}
