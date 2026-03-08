<script setup lang="ts">
import { Heading, Text, Stack } from '@morphink/ui'
import { defineMeta } from 'sb-addon-vue-csf'

const { Story } = defineMeta({
  title: 'Components/Atoms/Typography',
  tags: ['autodocs'],
  argTypes: {
    headingLevel: { control: { type: 'select' }, options: [1, 2, 3, 4, 5, 6] },
    variant: { control: { type: 'select' }, options: ['body', 'caption', 'label'] },
    weight: { control: { type: 'select' }, options: ['regular', 'medium', 'semibold', 'bold'] },
    muted: { control: 'boolean' },
    text: { control: 'text' },
  },
  args: {
    headingLevel: 3,
    variant: 'body',
    weight: 'regular',
    muted: false,
    text: 'Text preview',
  },
})
</script>

<template>
  <Story name="Default">
    <template #template="{ args }">
      <Stack gap="md">
        <Heading :level="args.headingLevel">Heading Preview</Heading>
        <Text :variant="args.variant" :weight="args.weight" :muted="args.muted">{{ args.text }}</Text>
      </Stack>
    </template>
  </Story>

  <Story name="HeadingLevels" asChild>
    <Stack gap="sm">
      <Heading :level="1">H1</Heading>
      <Heading :level="2">H2</Heading>
      <Heading :level="3">H3</Heading>
      <Heading :level="4">H4</Heading>
    </Stack>
  </Story>

  <Story name="TextVariants" asChild>
    <Stack gap="sm">
      <Text variant="body">Body</Text>
      <Text variant="caption">Caption</Text>
      <Text variant="label">Label</Text>
    </Stack>
  </Story>

  <Story name="WeightsAndMuted" asChild>
    <Stack gap="sm">
      <Text weight="regular">Regular</Text>
      <Text weight="medium">Medium</Text>
      <Text weight="semibold">Semibold</Text>
      <Text weight="bold">Bold</Text>
      <Text :muted="false">Muted false</Text>
      <Text muted>Muted true</Text>
    </Stack>
  </Story>
</template>
