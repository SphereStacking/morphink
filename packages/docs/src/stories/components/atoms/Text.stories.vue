<script setup lang="ts">
import { Text, Stack } from '@morphink/ui'
import { defineMeta } from 'sb-addon-vue-csf'

const { Story } = defineMeta({
  title: 'Components/Atoms/Text',
  component: Text,
  tags: ['autodocs'],
  argTypes: {
    variant: { control: { type: 'select' }, options: ['body', 'caption', 'label'] },
    weight: { control: { type: 'select' }, options: ['regular', 'medium', 'semibold', 'bold'] },
    muted: { control: 'boolean' },
    text: { control: 'text' },
  },
  args: {
    variant: 'body',
    weight: 'regular',
    muted: false,
    text: 'Body text preview',
  },
})
</script>

<template>
  <Story name="Default">
    <template #template="{ args }">
      <Text :variant="args.variant" :weight="args.weight" :muted="args.muted">{{ args.text }}</Text>
    </template>
  </Story>

  <Story name="Variants" asChild>
    <Stack gap="sm">
      <Text variant="body">Body</Text>
      <Text variant="caption">Caption</Text>
      <Text variant="label">Label</Text>
    </Stack>
  </Story>

  <Story name="Weights" asChild>
    <Stack gap="sm">
      <Text weight="regular">Regular</Text>
      <Text weight="medium">Medium</Text>
      <Text weight="semibold">Semibold</Text>
      <Text weight="bold">Bold</Text>
    </Stack>
  </Story>

  <Story name="Muted" asChild>
    <Stack gap="sm">
      <Text :muted="false">Muted false</Text>
      <Text muted>Muted true</Text>
    </Stack>
  </Story>
</template>
