import { AlertDialog, Button, Stack, Text } from '@morphink/ui'
import { componentRounded, componentShadow, componentSizes } from '@morphink/ui'
import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { ref } from 'vue'

const meta: Meta = {
  title: 'Components/AlertDialog',
  argTypes: {
    open: { control: 'boolean' },
    onOpenChange: { action: 'onOpenChange' },
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
type Story = StoryObj

export const Playground: Story = {
  render: (args) => ({
    components: { AlertDialog, Button, Stack, Text },
    setup() {
      const open = ref(args.open)
      const onOpenChange = (value: boolean) => {
        open.value = value
        args.onOpenChange?.(value)
      }
      return { args, open, onOpenChange }
    },
    template: `
      <Stack gap="12px">
        <Button @click="open = true">Open Alert</Button>
        <AlertDialog
          :open="open"
          :on-open-change="onOpenChange"
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

export const Overview: Story = {
  render: () => ({
    components: { AlertDialog, Button, Stack, Text },
    setup() {
      const openDefault = ref(false)
      const openSize = ref<'sm' | 'md' | 'lg' | null>(null)
      const openRounded = ref<'sm' | 'md' | 'lg' | null>(null)
      const openShadow = ref<'none' | 'sm' | 'md' | null>(null)
      const onCloseDefault = (value: boolean) => {
        openDefault.value = value
      }
      const onCloseSize = (value: boolean) => {
        if (!value) openSize.value = null
      }
      const onCloseRounded = (value: boolean) => {
        if (!value) openRounded.value = null
      }
      const onCloseShadow = (value: boolean) => {
        if (!value) openShadow.value = null
      }
      return {
        openDefault,
        openSize,
        openRounded,
        openShadow,
        onCloseDefault,
        onCloseSize,
        onCloseRounded,
        onCloseShadow,
      }
    },
    template: `
      <Stack gap="30px">
        <Stack direction="column" gap="12px">
          <div class="text-xs font-semibold text-[var(--color-muted-foreground)]">default</div>
          <Stack direction="row" gap="12px" align="center" wrap>
            <Button @click="openDefault = true">Default</Button>
            <AlertDialog
              :open="openDefault"
              :on-open-change="onCloseDefault"
              title="Default"
              description="Default alert dialog"
            >
              <Text>Alert content</Text>
            </AlertDialog>
          </Stack>
        </Stack>
        <div class="border border-[var(--color-border)]"></div>
        <Stack direction="column" gap="12px">
          <div class="text-xs font-semibold text-[var(--color-muted-foreground)]">size</div>
          <Stack direction="row" gap="12px" align="center" wrap>
            <Button size="sm" @click="openSize = 'sm'">Small</Button>
            <Button size="sm" @click="openSize = 'md'">Medium</Button>
            <Button size="sm" @click="openSize = 'lg'">Large</Button>
            <AlertDialog
              v-if="openSize"
              :open="true"
              :size="openSize"
              :on-open-change="onCloseSize"
              title="Size"
              description="Size variants"
            >
              <Text>Alert content</Text>
            </AlertDialog>
          </Stack>
        </Stack>
        <Stack direction="column" gap="12px">
          <div class="text-xs font-semibold text-[var(--color-muted-foreground)]">rounded</div>
          <Stack direction="row" gap="12px" align="center" wrap>
            <Button size="sm" @click="openRounded = 'sm'">Rounded sm</Button>
            <Button size="sm" @click="openRounded = 'md'">Rounded md</Button>
            <Button size="sm" @click="openRounded = 'lg'">Rounded lg</Button>
            <AlertDialog
              v-if="openRounded"
              :open="true"
              :rounded="openRounded"
              :on-open-change="onCloseRounded"
              title="Rounded"
              description="Rounded variants"
            >
              <Text>Alert content</Text>
            </AlertDialog>
          </Stack>
        </Stack>
        <Stack direction="column" gap="12px">
          <div class="text-xs font-semibold text-[var(--color-muted-foreground)]">shadow</div>
          <Stack direction="row" gap="12px" align="center" wrap>
            <Button size="sm" @click="openShadow = 'none'">Shadow none</Button>
            <Button size="sm" @click="openShadow = 'sm'">Shadow sm</Button>
            <Button size="sm" @click="openShadow = 'md'">Shadow md</Button>
            <AlertDialog
              v-if="openShadow"
              :open="true"
              :shadow="openShadow"
              :on-open-change="onCloseShadow"
              title="Shadow"
              description="Shadow variants"
            >
              <Text>Alert content</Text>
            </AlertDialog>
          </Stack>
        </Stack>
      </Stack>
    `,
  }),
}
