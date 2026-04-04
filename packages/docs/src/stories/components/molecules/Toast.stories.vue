<script setup lang="ts">
import { Toaster, Button, Stack, Text } from '@morphink/ui'
import { useToast } from '@morphink/ui'
import { defineMeta } from 'sb-addon-vue-csf'

const { add } = useToast()

const { Story } = defineMeta({
  title: 'Components/Molecules/Toast',
  component: Toaster,
  tags: ['autodocs'],
  argTypes: {
    position: {
      control: { type: 'select' },
      options: [
        'top-right',
        'top-left',
        'bottom-right',
        'bottom-left',
        'top-center',
        'bottom-center',
      ],
    },
  },
  args: {
    position: 'bottom-right',
  },
})

function showDefault() {
  add({ title: 'Event created', description: 'Your event has been scheduled.' })
}

function showSuccess() {
  add({ title: 'Saved', description: 'Your changes have been saved.', tone: 'success' })
}

function showWarning() {
  add({
    title: 'Warning',
    description: 'This action may have side effects.',
    tone: 'warning',
  })
}

function showDestructive() {
  add({
    title: 'Error',
    description: 'Something went wrong. Please try again.',
    tone: 'destructive',
  })
}

function showInfo() {
  add({
    title: 'Update available',
    description: 'A new version is ready to install.',
    tone: 'info',
  })
}

function showWithAction() {
  add({
    title: 'File deleted',
    description: 'The file has been moved to trash.',
    tone: 'neutral',
    action: { label: 'Undo', onClick: () => {} },
  })
}

function showSolid() {
  add({ title: 'Solid variant', tone: 'success', variant: 'solid' })
}

function showOutline() {
  add({ title: 'Outline variant', tone: 'info', variant: 'outline' })
}

function showSoft() {
  add({ title: 'Soft variant', tone: 'warning', variant: 'soft' })
}
</script>

<template>
  <Story name="Default">
    <template #template="{ args }">
      <Stack gap="md">
        <Text muted>Click buttons to trigger toasts.</Text>
        <Stack direction="row" gap="sm" wrap>
          <Button variant="outline" size="sm" @click="showDefault">Default</Button>
          <Button variant="outline" size="sm" @click="showSuccess">Success</Button>
          <Button variant="outline" size="sm" @click="showWarning">Warning</Button>
          <Button variant="outline" size="sm" @click="showDestructive">Error</Button>
          <Button variant="outline" size="sm" @click="showInfo">Info</Button>
        </Stack>
        <Toaster :position="args.position" />
      </Stack>
    </template>
  </Story>

  <Story name="Variants" asChild>
    <Stack gap="md">
      <Text muted>Different visual variants.</Text>
      <Stack direction="row" gap="sm" wrap>
        <Button variant="outline" size="sm" @click="showSolid">Solid</Button>
        <Button variant="outline" size="sm" @click="showOutline">Outline</Button>
        <Button variant="outline" size="sm" @click="showSoft">Soft</Button>
      </Stack>
      <Toaster />
    </Stack>
  </Story>

  <Story name="WithAction" asChild>
    <Stack gap="md">
      <Text muted>Toast with an action button.</Text>
      <Button variant="outline" size="sm" @click="showWithAction">Delete File</Button>
      <Toaster />
    </Stack>
  </Story>
</template>
