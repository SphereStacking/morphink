import { Dialog, Button, Stack, Text } from '@morphink/ui'
import { componentRounded, componentShadow, componentSizes } from '@morphink/ui'
import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { ref } from 'vue'

const meta: Meta<typeof Dialog> = {
  title: 'Components/Molecules/Dialog',
  component: Dialog,
  tags: ['autodocs'],
  argTypes: {
    size: { control: { type: 'select' }, options: componentSizes.Dialog },
    title: { control: 'text' },
    description: { control: 'text' },
    closeLabel: { control: 'text' },
    open: { control: 'boolean' },
    rounded: { control: { type: 'select' }, options: componentRounded.Dialog },
    shadow: { control: { type: 'select' }, options: componentShadow.Dialog },
  },
  args: {
    size: 'md',
    title: 'Confirm',
    description: 'Example description',
    closeLabel: 'Close',
    open: false,
    rounded: 'lg',
    shadow: 'md',
  },
}

export default meta
type Story = StoryObj<typeof Dialog>

export const Default: Story = {
  render: (args) => ({
    components: { Dialog, Button, Stack, Text },
    setup() {
      const open = ref(args.open)
      return { args, open }
    },
    template: `
      <Stack gap="md">
        <Button @click="open = true">Open Dialog</Button>
        <Dialog
          v-model:open="open"
          :title="args.title"
          :description="args.description"
          :size="args.size"
          :close-label="args.closeLabel"
          :rounded="args.rounded"
          :shadow="args.shadow"
        >
          <Text>Example content area.</Text>
        </Dialog>
      </Stack>
    `,
  }),
}

export const Sizes: Story = {
  render: () => ({
    components: { Dialog, Button, Stack, Text },
    setup() {
      const openSize = ref<'sm' | 'md' | 'lg' | null>(null)
      return { openSize }
    },
    template: `
      <Stack direction="row" gap="md" align="center" wrap>
        <Button size="sm" @click="openSize = 'sm'">Small</Button>
        <Button size="sm" @click="openSize = 'md'">Medium</Button>
        <Button size="sm" @click="openSize = 'lg'">Large</Button>
        <Dialog
          v-if="openSize"
          :open="true"
          :size="openSize"
          @update:open="(v) => { if (!v) openSize = null }"
          title="Size"
          description="Size variants"
        >
          <Text>Dialog content</Text>
        </Dialog>
      </Stack>
    `,
  }),
}

export const Rounded: Story = {
  render: () => ({
    components: { Dialog, Button, Stack, Text },
    setup() {
      const openRounded = ref<'sm' | 'md' | 'lg' | null>(null)
      return { openRounded }
    },
    template: `
      <Stack direction="row" gap="md" align="center" wrap>
        <Button size="sm" @click="openRounded = 'sm'">Rounded sm</Button>
        <Button size="sm" @click="openRounded = 'md'">Rounded md</Button>
        <Button size="sm" @click="openRounded = 'lg'">Rounded lg</Button>
        <Dialog
          v-if="openRounded"
          :open="true"
          :rounded="openRounded"
          @update:open="(v) => { if (!v) openRounded = null }"
          title="Rounded"
          description="Rounded variants"
        >
          <Text>Dialog content</Text>
        </Dialog>
      </Stack>
    `,
  }),
}

export const Shadow: Story = {
  render: () => ({
    components: { Dialog, Button, Stack, Text },
    setup() {
      const openShadow = ref<'none' | 'sm' | 'md' | null>(null)
      return { openShadow }
    },
    template: `
      <Stack direction="row" gap="md" align="center" wrap>
        <Button size="sm" @click="openShadow = 'none'">Shadow none</Button>
        <Button size="sm" @click="openShadow = 'sm'">Shadow sm</Button>
        <Button size="sm" @click="openShadow = 'md'">Shadow md</Button>
        <Dialog
          v-if="openShadow"
          :open="true"
          :shadow="openShadow"
          @update:open="(v) => { if (!v) openShadow = null }"
          title="Shadow"
          description="Shadow variants"
        >
          <Text>Dialog content</Text>
        </Dialog>
      </Stack>
    `,
  }),
}
