import { FormFieldCheckbox, Stack } from '@morphink/ui'
import type { Meta, StoryObj } from '@storybook/vue3-vite'

const meta: Meta<typeof FormFieldCheckbox> = {
  title: 'Components/Molecules/FormFieldCheckbox',
  component: FormFieldCheckbox,
  tags: ['autodocs'],
  argTypes: {
    label: { control: 'text' },
    helper: { control: 'text' },
    disabled: { control: 'boolean' },
  },
}

export default meta
type Story = StoryObj<typeof FormFieldCheckbox>

export const Default: Story = {
  args: {
    label: 'Accept terms and conditions',
  },
}

export const WithHelper: Story = {
  args: {
    label: 'Subscribe to newsletter',
    helper: 'We will send you updates about new features and releases.',
  },
}

export const Disabled: Story = {
  args: {
    label: 'This option is not available',
    helper: 'Contact support for more information.',
    disabled: true,
  },
}

export const MultipleCheckboxes: Story = {
  render: () => ({
    components: { FormFieldCheckbox, Stack },
    template: `
      <Stack gap="md" style="max-width: 400px">
        <FormFieldCheckbox label="Email notifications" helper="Receive email updates" />
        <FormFieldCheckbox label="SMS notifications" />
        <FormFieldCheckbox label="Push notifications" helper="Mobile push alerts" />
      </Stack>
    `,
  }),
}
