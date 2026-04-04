<script setup lang="ts">
import { ref } from 'vue'
import { Alert, AlertTitle, AlertDescription, Stack } from '@morphink/ui'
import { componentRounded, componentTones, componentVariants } from '@morphink/ui'
import { defineMeta } from 'sb-addon-vue-csf'

const show = ref(true)
function reset() {
  show.value = true
}

const { Story } = defineMeta({
  title: 'Components/Atoms/Alert',
  component: Alert,
  tags: ['autodocs'],
  argTypes: {
    tone: { control: { type: 'select' }, options: componentTones.Alert },
    variant: { control: { type: 'select' }, options: componentVariants.Alert },
    rounded: { control: { type: 'select' }, options: componentRounded.Alert },
    dismissible: { control: 'boolean' },
  },
  args: {
    tone: 'info',
    variant: 'soft',
    rounded: 'lg',
    dismissible: false,
  },
})
</script>

<template>
  <Story name="Default">
    <template #template="{ args }">
      <Alert
        :tone="args.tone"
        :variant="args.variant"
        :rounded="args.rounded"
        :dismissible="args.dismissible"
      >
        <AlertTitle>Heads up!</AlertTitle>
        <AlertDescription
          >You can customize the alert with tone, variant, and rounded props.</AlertDescription
        >
      </Alert>
    </template>
  </Story>

  <Story name="Variants" asChild>
    <Stack direction="column" gap="md">
      <Alert tone="info" variant="soft">
        <AlertTitle>Soft</AlertTitle>
        <AlertDescription>This is a soft alert with a subtle background.</AlertDescription>
      </Alert>
      <Alert tone="info" variant="solid">
        <AlertTitle>Solid</AlertTitle>
        <AlertDescription>This is a solid alert with a filled background.</AlertDescription>
      </Alert>
      <Alert tone="info" variant="outline">
        <AlertTitle>Outline</AlertTitle>
        <AlertDescription>This is an outline alert with a border.</AlertDescription>
      </Alert>
    </Stack>
  </Story>

  <Story name="Tones" asChild>
    <Stack direction="column" gap="md">
      <Alert tone="info">
        <AlertTitle>Info</AlertTitle>
        <AlertDescription>This is an informational message.</AlertDescription>
      </Alert>
      <Alert tone="success">
        <AlertTitle>Success</AlertTitle>
        <AlertDescription>Operation completed successfully.</AlertDescription>
      </Alert>
      <Alert tone="warning">
        <AlertTitle>Warning</AlertTitle>
        <AlertDescription>Please review before proceeding.</AlertDescription>
      </Alert>
      <Alert tone="destructive">
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>Something went wrong. Please try again.</AlertDescription>
      </Alert>
      <Alert tone="neutral">
        <AlertTitle>Note</AlertTitle>
        <AlertDescription>This is a neutral informational note.</AlertDescription>
      </Alert>
    </Stack>
  </Story>

  <Story name="Dismissible" asChild>
    <Stack direction="column" gap="md">
      <Alert v-if="show" tone="warning" dismissible @close="show = false">
        <AlertTitle>Dismissible Alert</AlertTitle>
        <AlertDescription>Click the close button to dismiss this alert.</AlertDescription>
      </Alert>
      <button
        v-if="!show"
        @click="reset"
        style="
          cursor: pointer;
          padding: 8px 16px;
          border: 1px solid #ccc;
          border-radius: 6px;
          background: transparent;
        "
      >
        Reset Alert
      </button>
    </Stack>
  </Story>

  <Story name="DescriptionOnly" asChild>
    <Stack direction="column" gap="md">
      <Alert tone="info">
        <AlertDescription>A simple alert with description only, no title.</AlertDescription>
      </Alert>
      <Alert tone="success">
        <AlertDescription>Changes have been saved successfully.</AlertDescription>
      </Alert>
    </Stack>
  </Story>
</template>
