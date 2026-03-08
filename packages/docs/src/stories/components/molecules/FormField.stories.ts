import { FormField, Input, Select, Textarea, Stack } from '@morphink/ui'
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
        <template #default="fieldProps">
          <Input v-bind="fieldProps" placeholder="Enter your name" />
        </template>
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
        <template #default="fieldProps">
          <Input v-bind="fieldProps" placeholder="Enter email" />
        </template>
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
        <template #default="fieldProps">
          <Textarea v-bind="fieldProps" placeholder="Write your message..." />
        </template>
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
    components: { FormField, Input, Stack },
    template: `
      <Stack gap="lg" style="max-width: 400px">
        <FormField label="Name" required>
          <template #default="fieldProps">
            <Input v-bind="fieldProps" placeholder="John Doe" />
          </template>
        </FormField>
        <FormField label="Email" required error="This field is required">
          <template #default="fieldProps">
            <Input v-bind="fieldProps" placeholder="john@example.com" />
          </template>
        </FormField>
        <FormField label="Phone" helper="Optional">
          <template #default="fieldProps">
            <Input v-bind="fieldProps" placeholder="+1 (555) 000-0000" />
          </template>
        </FormField>
      </Stack>
    `,
  }),
}

export const ValidationExample: Story = {
  render: () => ({
    components: { FormField, Input, Stack },
    data() {
      return { email: '', emailError: '' }
    },
    methods: {
      validateEmail() {
        if (!this.email) {
          this.emailError = 'Email is required'
        } else if (!this.email.includes('@')) {
          this.emailError = 'Please enter a valid email address'
        } else {
          this.emailError = ''
        }
      },
    },
    template: `
      <Stack gap="lg" style="max-width: 400px">
        <FormField label="Email" required :error="emailError">
          <template #default="fieldProps">
            <Input
              v-bind="fieldProps"
              v-model="email"
              placeholder="user@example.com"
              @blur="validateEmail"
            />
          </template>
        </FormField>
        <p style="font-size: 12px; color: var(--morphink-color-muted-foreground)">
          Blur the input to trigger validation
        </p>
      </Stack>
    `,
  }),
}
