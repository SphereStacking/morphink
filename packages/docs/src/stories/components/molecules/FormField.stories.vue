<script setup lang="ts">
import { ref } from 'vue'
import { FormField, Input, Select, Textarea, Stack } from '@morphink/ui'
import { defineMeta } from 'sb-addon-vue-csf'

const email = ref('')
const emailError = ref('')

function validateEmail() {
  if (!email.value) {
    emailError.value = 'Email is required'
  } else if (!email.value.includes('@')) {
    emailError.value = 'Please enter a valid email address'
  } else {
    emailError.value = ''
  }
}

const { Story } = defineMeta({
  title: 'Components/Molecules/FormField',
  component: FormField,
  tags: ['autodocs'],
  argTypes: {
    label: { control: 'text' },
    error: { control: 'text' },
    helper: { control: 'text' },
    required: { control: 'boolean' },
  },
})
</script>

<template>
  <Story name="WithInput" :args="{ label: 'Full Name', helper: 'Enter your first and last name' }">
    <template #template="{ args }">
      <FormField v-bind="args">
        <template #default="fieldProps">
          <Input v-bind="fieldProps" placeholder="Enter your name" />
        </template>
      </FormField>
    </template>
  </Story>

  <Story name="WithError" :args="{ label: 'Email', error: 'Please enter a valid email address', required: true }">
    <template #template="{ args }">
      <FormField v-bind="args">
        <template #default="fieldProps">
          <Input v-bind="fieldProps" placeholder="Enter email" />
        </template>
      </FormField>
    </template>
  </Story>

  <Story name="WithTextarea" :args="{ label: 'Message', helper: 'Maximum 500 characters' }">
    <template #template="{ args }">
      <FormField v-bind="args">
        <template #default="fieldProps">
          <Textarea v-bind="fieldProps" placeholder="Write your message..." />
        </template>
      </FormField>
    </template>
  </Story>

  <Story name="MultipleFields" asChild>
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
  </Story>

  <Story name="ValidationExample" asChild>
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
  </Story>
</template>
