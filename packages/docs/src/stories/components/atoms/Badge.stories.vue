<script setup lang="ts">
import { Badge, Stack } from '@morphink/ui'
import { componentRounded, componentSizes, componentTones, componentVariants } from '@morphink/ui'
import { defineMeta } from 'sb-addon-vue-csf'

const { Story } = defineMeta({
  title: 'Components/Atoms/Badge',
  component: Badge,
  tags: ['autodocs'],
  argTypes: {
    tone: { control: { type: 'select' }, options: componentTones.Badge },
    size: { control: { type: 'select' }, options: componentSizes.Badge },
    rounded: { control: { type: 'select' }, options: componentRounded.Badge },
    variant: { control: { type: 'select' }, options: componentVariants.Badge },
    label: { control: 'text' },
  },
  args: {
    tone: 'base',
    size: 'md',
    variant: 'solid',
    rounded: 'full',
    label: 'Badge',
  },
})
</script>

<template>
  <Story name="Default">
    <template #template="{ args }">
      <Badge :tone="args.tone" :variant="args.variant" :rounded="args.rounded" :size="args.size">{{ args.label }}</Badge>
    </template>
  </Story>

  <Story name="Variants" asChild>
    <Stack direction="row" gap="md" align="center" wrap>
      <Badge tone="primary" variant="solid">Solid</Badge>
      <Badge tone="primary" variant="soft">Soft</Badge>
      <Badge tone="primary" variant="outline">Outline</Badge>
      <Badge tone="primary" variant="ghost">Ghost</Badge>
    </Stack>
  </Story>

  <Story name="Tones" asChild>
    <Stack direction="column" gap="md">
      <Stack direction="row" gap="md" align="center" wrap>
        <Badge tone="base">Base</Badge>
        <Badge tone="neutral">Neutral</Badge>
      </Stack>
      <Stack direction="row" gap="md" align="center" wrap>
        <Badge tone="primary">Primary</Badge>
        <Badge tone="secondary">Secondary</Badge>
        <Badge tone="tertiary">Tertiary</Badge>
        <Badge tone="accent">Accent</Badge>
      </Stack>
      <Stack direction="row" gap="md" align="center" wrap>
        <Badge tone="success">Success</Badge>
        <Badge tone="warning">Warning</Badge>
        <Badge tone="info">Info</Badge>
        <Badge tone="destructive">Destructive</Badge>
      </Stack>
    </Stack>
  </Story>

  <Story name="Sizes" asChild>
    <Stack direction="row" gap="md" align="center" wrap>
      <Badge size="lg">Large</Badge>
      <Badge size="md">Medium</Badge>
      <Badge size="sm">Small</Badge>
    </Stack>
  </Story>

  <Story name="Rounded" asChild>
    <Stack direction="row" gap="md" align="center" wrap>
      <Badge rounded="sm">Rounded Sm</Badge>
      <Badge rounded="md">Rounded Md</Badge>
      <Badge rounded="full">Rounded Full</Badge>
    </Stack>
  </Story>
</template>
