import { Alert, AlertTitle, AlertDescription, Stack } from '@morphink/ui'
import { componentRounded, componentTones, componentVariants } from '@morphink/ui'
import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { ref } from 'vue'

const meta: Meta<typeof Alert> = {
  title: 'Components/Atoms/Alert',
  component: Alert,
  tags: ['autodocs'],
  argTypes: {
    tone: {
      control: { type: 'select' },
      options: componentTones.Alert,
    },
    variant: {
      control: { type: 'select' },
      options: componentVariants.Alert,
    },
    rounded: {
      control: { type: 'select' },
      options: componentRounded.Alert,
    },
    dismissible: { control: 'boolean' },
  },
  args: {
    tone: 'info',
    variant: 'soft',
    rounded: 'lg',
    dismissible: false,
  },
}

export default meta
type Story = StoryObj<typeof Alert>

export const Default: Story = {
  render: (args) => ({
    components: { Alert, AlertTitle, AlertDescription },
    setup() {
      return { args }
    },
    template: `
      <Alert :tone="args.tone" :variant="args.variant" :rounded="args.rounded" :dismissible="args.dismissible">
        <AlertTitle>Heads up!</AlertTitle>
        <AlertDescription>You can customize the alert with tone, variant, and rounded props.</AlertDescription>
      </Alert>
    `,
  }),
}

export const Variants: Story = {
  render: () => ({
    components: { Alert, AlertTitle, AlertDescription, Stack },
    template: `
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
    `,
  }),
}

export const Tones: Story = {
  render: () => ({
    components: { Alert, AlertTitle, AlertDescription, Stack },
    template: `
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
    `,
  }),
}

export const Dismissible: Story = {
  render: () => ({
    components: { Alert, AlertTitle, AlertDescription, Stack },
    setup() {
      const show = ref(true)
      function reset() {
        show.value = true
      }
      return { show, reset }
    },
    template: `
      <Stack direction="column" gap="md">
        <Alert v-if="show" tone="warning" dismissible @close="show = false">
          <AlertTitle>Dismissible Alert</AlertTitle>
          <AlertDescription>Click the close button to dismiss this alert.</AlertDescription>
        </Alert>
        <button v-if="!show" @click="reset" style="cursor: pointer; padding: 8px 16px; border: 1px solid #ccc; border-radius: 6px; background: transparent;">
          Reset Alert
        </button>
      </Stack>
    `,
  }),
}

export const DescriptionOnly: Story = {
  render: () => ({
    components: { Alert, AlertDescription, Stack },
    template: `
      <Stack direction="column" gap="md">
        <Alert tone="info">
          <AlertDescription>A simple alert with description only, no title.</AlertDescription>
        </Alert>
        <Alert tone="success">
          <AlertDescription>Changes have been saved successfully.</AlertDescription>
        </Alert>
      </Stack>
    `,
  }),
}
