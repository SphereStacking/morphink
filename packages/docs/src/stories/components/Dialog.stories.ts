import { Dialog, Button, Stack, Text } from '@morphink/ui'
import { componentRounded, componentShadow, componentSizes } from '@morphink/ui'
import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { ref } from 'vue'

const meta: Meta = {
  title: 'Components/Dialog',
  argTypes: {
    size: { control: { type: 'select' }, options: componentSizes.Dialog },
    title: { control: 'text' },
    description: { control: 'text' },
    closeLabel: { control: 'text' },
    open: { control: 'boolean' },
    rounded: { control: { type: 'select' }, options: componentRounded.Dialog },
    shadow: { control: { type: 'select' }, options: componentShadow.Dialog },
    onOpenChange: { action: 'onOpenChange' },
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
type Story = StoryObj

export const Playground: Story = {
  render: (args) => ({
    components: { Dialog, Button, Stack, Text },
    setup() {
      const open = ref(args.open)
      const onOpenChange = (value: boolean) => {
        open.value = value
        args.onOpenChange?.(value)
      }
      return { args, open, onOpenChange }
    },
    template: `
      <Stack gap="md">
        <Button @click="open = true">Open Dialog</Button>
        <Dialog
          :open="open"
          :on-open-change="onOpenChange"
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

export const Overview: Story = {
  render: () => ({
    components: { Dialog, Button, Stack, Text },
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
      <Stack gap="2xl">
        <Stack direction="column" gap="md">
          <div class="text-xs font-semibold text-[var(--morphink-color-muted-foreground)]">default</div>
          <Stack direction="row" gap="md" align="center" wrap>
            <Button @click="openDefault = true">Default</Button>
            <Dialog
              :open="openDefault"
              :on-open-change="onCloseDefault"
              title="Default"
              description="Default dialog"
            >
              <Text>Dialog content</Text>
            </Dialog>
          </Stack>
        </Stack>
        <div class="border border-[var(--morphink-color-border)]"></div>
        <Stack direction="column" gap="md">
          <div class="text-xs font-semibold text-[var(--morphink-color-muted-foreground)]">size</div>
          <Stack direction="row" gap="md" align="center" wrap>
            <Button size="sm" @click="openSize = 'sm'">Small</Button>
            <Button size="sm" @click="openSize = 'md'">Medium</Button>
            <Button size="sm" @click="openSize = 'lg'">Large</Button>
            <Dialog
              v-if="openSize"
              :open="true"
              :size="openSize"
              :on-open-change="onCloseSize"
              title="Size"
              description="Size variants"
            >
              <Text>Dialog content</Text>
            </Dialog>
          </Stack>
        </Stack>
        <Stack direction="column" gap="md">
          <div class="text-xs font-semibold text-[var(--morphink-color-muted-foreground)]">rounded</div>
          <Stack direction="row" gap="md" align="center" wrap>
            <Button size="sm" @click="openRounded = 'sm'">Rounded sm</Button>
            <Button size="sm" @click="openRounded = 'md'">Rounded md</Button>
            <Button size="sm" @click="openRounded = 'lg'">Rounded lg</Button>
            <Dialog
              v-if="openRounded"
              :open="true"
              :rounded="openRounded"
              :on-open-change="onCloseRounded"
              title="Rounded"
              description="Rounded variants"
            >
              <Text>Dialog content</Text>
            </Dialog>
          </Stack>
        </Stack>
        <Stack direction="column" gap="md">
          <div class="text-xs font-semibold text-[var(--morphink-color-muted-foreground)]">shadow</div>
          <Stack direction="row" gap="md" align="center" wrap>
            <Button size="sm" @click="openShadow = 'none'">Shadow none</Button>
            <Button size="sm" @click="openShadow = 'sm'">Shadow sm</Button>
            <Button size="sm" @click="openShadow = 'md'">Shadow md</Button>
            <Dialog
              v-if="openShadow"
              :open="true"
              :shadow="openShadow"
              :on-open-change="onCloseShadow"
              title="Shadow"
              description="Shadow variants"
            >
              <Text>Dialog content</Text>
            </Dialog>
          </Stack>
        </Stack>
      </Stack>
    `,
  }),
}
