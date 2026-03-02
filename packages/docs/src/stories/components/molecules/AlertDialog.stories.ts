import { AlertDialog, Button, Stack, Text } from '@morphink/ui'
import { componentRounded, componentShadow, componentSizes } from '@morphink/ui'
import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { ref } from 'vue'

const meta: Meta<typeof AlertDialog> = {
  title: 'Components/Molecules/AlertDialog',
  component: AlertDialog,
  tags: ['autodocs'],
  argTypes: {
    open: { control: 'boolean' },
    title: { control: 'text' },
    description: { control: 'text' },
    size: { control: { type: 'select' }, options: componentSizes.AlertDialog },
    confirmLabel: { control: 'text' },
    cancelLabel: { control: 'text' },
    rounded: { control: { type: 'select' }, options: componentRounded.AlertDialog },
    shadow: { control: { type: 'select' }, options: componentShadow.AlertDialog },
  },
  args: {
    open: false,
    title: 'Delete this item?',
    description: 'This action cannot be undone.',
    size: 'md',
    confirmLabel: 'Confirm',
    cancelLabel: 'Cancel',
    rounded: 'lg',
    shadow: 'md',
  },
}

export default meta
type Story = StoryObj<typeof AlertDialog>

export const Default: Story = {
  render: (args) => ({
    components: { AlertDialog, Button, Stack, Text },
    setup() {
      const open = ref(args.open)
      return { args, open }
    },
    template: `
      <Stack gap="md">
        <Button @click="open = true">Open Alert</Button>
        <AlertDialog
          v-model:open="open"
          :title="args.title"
          :description="args.description"
          :size="args.size"
          :confirm-label="args.confirmLabel"
          :cancel-label="args.cancelLabel"
          :rounded="args.rounded"
          :shadow="args.shadow"
        >
          <Text>Are you sure you want to delete this?</Text>
        </AlertDialog>
      </Stack>
    `,
  }),
}

export const Sizes: Story = {
  render: () => ({
    components: { AlertDialog, Button, Stack, Text },
    setup() {
      const openSize = ref<'sm' | 'md' | 'lg' | null>(null)
      return { openSize }
    },
    template: `
      <Stack direction="row" gap="md" align="center" wrap>
        <Button size="sm" @click="openSize = 'sm'">Small</Button>
        <Button size="sm" @click="openSize = 'md'">Medium</Button>
        <Button size="sm" @click="openSize = 'lg'">Large</Button>
        <AlertDialog
          v-if="openSize"
          :open="true"
          :size="openSize"
          @update:open="(v) => { if (!v) openSize = null }"
          title="Size"
          description="Size variants"
        >
          <Text>Alert content</Text>
        </AlertDialog>
      </Stack>
    `,
  }),
}

export const Rounded: Story = {
  render: () => ({
    components: { AlertDialog, Button, Stack, Text },
    setup() {
      const openRounded = ref<'sm' | 'md' | 'lg' | null>(null)
      return { openRounded }
    },
    template: `
      <Stack direction="row" gap="md" align="center" wrap>
        <Button size="sm" @click="openRounded = 'sm'">Rounded sm</Button>
        <Button size="sm" @click="openRounded = 'md'">Rounded md</Button>
        <Button size="sm" @click="openRounded = 'lg'">Rounded lg</Button>
        <AlertDialog
          v-if="openRounded"
          :open="true"
          :rounded="openRounded"
          @update:open="(v) => { if (!v) openRounded = null }"
          title="Rounded"
          description="Rounded variants"
        >
          <Text>Alert content</Text>
        </AlertDialog>
      </Stack>
    `,
  }),
}

export const Shadow: Story = {
  render: () => ({
    components: { AlertDialog, Button, Stack, Text },
    setup() {
      const openShadow = ref<'none' | 'sm' | 'md' | null>(null)
      return { openShadow }
    },
    template: `
      <Stack direction="row" gap="md" align="center" wrap>
        <Button size="sm" @click="openShadow = 'none'">Shadow none</Button>
        <Button size="sm" @click="openShadow = 'sm'">Shadow sm</Button>
        <Button size="sm" @click="openShadow = 'md'">Shadow md</Button>
        <AlertDialog
          v-if="openShadow"
          :open="true"
          :shadow="openShadow"
          @update:open="(v) => { if (!v) openShadow = null }"
          title="Shadow"
          description="Shadow variants"
        >
          <Text>Alert content</Text>
        </AlertDialog>
      </Stack>
    `,
  }),
}
