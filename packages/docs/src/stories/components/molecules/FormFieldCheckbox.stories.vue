<script setup lang="ts">
import { FormFieldCheckbox, Stack } from '@morphink/ui'
import { defineMeta } from 'sb-addon-vue-csf'

const { Story } = defineMeta({
  title: 'Components/Molecules/FormFieldCheckbox',
  component: FormFieldCheckbox,
  tags: ['autodocs'],
  argTypes: {
    label: { control: 'text' },
    helper: { control: 'text' },
    disabled: { control: 'boolean' },
  },
})
</script>

<template>
  <Story name="Default" :args="{ label: 'Accept terms and conditions' }">
    <template #template="{ args }">
      <FormFieldCheckbox v-bind="args" />
    </template>
  </Story>

  <Story name="WithHelper" :args="{ label: 'Subscribe to newsletter', helper: 'We will send you updates about new features and releases.' }">
    <template #template="{ args }">
      <FormFieldCheckbox v-bind="args" />
    </template>
  </Story>

  <Story name="Disabled" :args="{ label: 'This option is not available', helper: 'Contact support for more information.', disabled: true }">
    <template #template="{ args }">
      <FormFieldCheckbox v-bind="args" />
    </template>
  </Story>

  <Story name="MultipleCheckboxes" asChild>
    <Stack gap="md" style="max-width: 400px">
      <FormFieldCheckbox label="Email notifications" helper="Receive email updates" />
      <FormFieldCheckbox label="SMS notifications" />
      <FormFieldCheckbox label="Push notifications" helper="Mobile push alerts" />
    </Stack>
  </Story>
</template>
