import { SettingsSection, FormField, FormFieldCheckbox, Input, Button, Stack } from '@morphink/ui'
import type { Meta, StoryObj } from '@storybook/vue3-vite'

const meta: Meta<typeof SettingsSection> = {
  title: 'Components/Organisms/SettingsSection',
  component: SettingsSection,
  tags: ['autodocs'],
  argTypes: {
    title: { control: 'text' },
    description: { control: 'text' },
  },
}

export default meta
type Story = StoryObj<typeof SettingsSection>

export const Default: Story = {
  render: (args) => ({
    components: { SettingsSection, FormField, Input, Stack },
    setup() { return { args } },
    template: `
      <SettingsSection v-bind="args">
        <Stack gap="lg">
          <FormField label="Display Name">
            <Input placeholder="Your name" />
          </FormField>
          <FormField label="Email" helper="This email will be used for notifications">
            <Input type="email" placeholder="you@example.com" />
          </FormField>
        </Stack>
      </SettingsSection>
    `,
  }),
  args: {
    title: 'Profile',
    description: 'Manage your public profile information.',
  },
}

export const WithAction: Story = {
  render: (args) => ({
    components: { SettingsSection, FormFieldCheckbox, Button, Stack },
    setup() { return { args } },
    template: `
      <SettingsSection v-bind="args">
        <template #action>
          <Button size="sm" tone="primary">Save</Button>
        </template>
        <Stack gap="md">
          <FormFieldCheckbox label="Email notifications" helper="Receive updates via email" />
          <FormFieldCheckbox label="Push notifications" helper="Receive push notifications on your device" />
          <FormFieldCheckbox label="Marketing emails" helper="Receive marketing and promotional content" />
        </Stack>
      </SettingsSection>
    `,
  }),
  args: {
    title: 'Notifications',
    description: 'Configure how you receive notifications.',
  },
}
