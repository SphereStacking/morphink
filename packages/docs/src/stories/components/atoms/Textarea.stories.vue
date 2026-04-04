<script setup lang="ts">
import { Stack, Textarea } from '@morphink/ui'
import {
  componentResize,
  componentRounded,
  componentSizes,
  componentTones,
  componentVariants,
} from '@morphink/ui'
import { defineMeta } from 'sb-addon-vue-csf'

const { Story } = defineMeta({
  title: 'Components/Atoms/Textarea',
  component: Textarea,
  tags: ['autodocs'],
  argTypes: {
    variant: { control: { type: 'select' }, options: componentVariants.Textarea },
    size: { control: { type: 'select' }, options: componentSizes.Textarea },
    tone: { control: { type: 'select' }, options: componentTones.Textarea },
    rounded: { control: { type: 'select' }, options: componentRounded.Textarea },
    placeholder: { control: 'text' },
    disabled: { control: 'boolean' },
    readonly: { control: 'boolean' },
    rows: { control: { type: 'number', min: 1, max: 20 } },
    resize: { control: { type: 'select' }, options: componentResize.Textarea },
  },
  args: {
    variant: 'outline',
    size: 'md',
    tone: 'base',
    rounded: 'md',
    placeholder: 'Enter text...',
    disabled: false,
    readonly: false,
    rows: 3,
    resize: 'vertical',
  },
})
</script>

<template>
  <Story name="Default">
    <template #template="{ args }">
      <div style="max-width: 320px"><Textarea v-bind="args" /></div>
    </template>
  </Story>

  <Story name="Variants" asChild>
    <Stack direction="column" gap="sm" style="max-width: 320px">
      <Textarea variant="outline" placeholder="Outline" />
      <Textarea variant="ghost" placeholder="Ghost" />
      <Textarea variant="soft" placeholder="Soft" />
    </Stack>
  </Story>

  <Story name="Tones" asChild>
    <Stack direction="column" gap="sm" style="max-width: 320px">
      <Textarea tone="base" placeholder="Base" />
      <Textarea tone="primary" placeholder="Primary" />
      <Textarea tone="success" placeholder="Success" />
      <Textarea tone="warning" placeholder="Warning" />
      <Textarea tone="destructive" placeholder="Destructive" />
    </Stack>
  </Story>

  <Story name="Sizes" asChild>
    <Stack direction="column" gap="sm" style="max-width: 320px">
      <Textarea size="xs" placeholder="Extra Small" />
      <Textarea size="sm" placeholder="Small" />
      <Textarea size="md" placeholder="Medium" />
      <Textarea size="lg" placeholder="Large" />
      <Textarea size="xl" placeholder="Extra Large" />
    </Stack>
  </Story>

  <Story name="States" asChild>
    <Stack direction="column" gap="sm" style="max-width: 320px">
      <Textarea placeholder="Default" />
      <Textarea placeholder="Disabled" disabled />
      <Textarea placeholder="Readonly" readonly model-value="Readonly value" />
    </Stack>
  </Story>

  <Story name="Resize" asChild>
    <Stack direction="column" gap="sm" style="max-width: 320px">
      <Textarea resize="none" placeholder="No resize" />
      <Textarea resize="vertical" placeholder="Vertical resize" />
      <Textarea resize="horizontal" placeholder="Horizontal resize" />
      <Textarea resize="both" placeholder="Both resize" />
    </Stack>
  </Story>

  <Story name="SoftTone" asChild>
    <Stack direction="column" gap="sm" style="max-width: 320px">
      <Textarea variant="soft" tone="base" placeholder="Soft Base" />
      <Textarea variant="soft" tone="primary" placeholder="Soft Primary" />
      <Textarea variant="soft" tone="success" placeholder="Soft Success" />
      <Textarea variant="soft" tone="warning" placeholder="Soft Warning" />
      <Textarea variant="soft" tone="destructive" placeholder="Soft Destructive" />
    </Stack>
  </Story>
</template>
