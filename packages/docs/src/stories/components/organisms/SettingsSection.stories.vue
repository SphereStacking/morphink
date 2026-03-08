<script setup lang="ts">
import { SettingsSection, FormField, FormFieldCheckbox, Input, Button, Stack } from '@morphink/ui'
import { defineMeta } from 'sb-addon-vue-csf'

const { Story } = defineMeta({
  title: 'Components/Organisms/SettingsSection',
  component: SettingsSection,
  tags: ['autodocs'],
  argTypes: {
    title: { control: 'text' },
    description: { control: 'text' },
  },
})
</script>

<template>
  <Story name="Default" :args="{ title: 'Profile', description: 'Manage your public profile information.' }">
    <template #template="{ args }">
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
    </template>
  </Story>

  <Story name="WithAction" :args="{ title: 'Notifications', description: 'Configure how you receive notifications.' }">
    <template #template="{ args }">
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
    </template>
  </Story>
</template>
