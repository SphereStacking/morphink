<script setup lang="ts">
import { Heading, Stack } from '@morphink/ui'
import { defineMeta } from 'sb-addon-vue-csf'

const { Story } = defineMeta({
  title: 'Components/Atoms/Heading',
  component: Heading,
  tags: ['autodocs'],
  argTypes: {
    level: { control: { type: 'select' }, options: [1, 2, 3, 4, 5, 6] },
    text: { control: 'text' },
  },
  args: {
    level: 2,
    text: 'Heading Preview',
  },
})
</script>

<template>
  <Story name="Default">
    <template #template="{ args }">
      <Heading :level="args.level">{{ args.text }}</Heading>
    </template>
  </Story>

  <Story name="Levels" asChild>
    <Stack gap="sm">
      <Heading :level="1">H1</Heading>
      <Heading :level="2">H2</Heading>
      <Heading :level="3">H3</Heading>
      <Heading :level="4">H4</Heading>
      <Heading :level="5">H5</Heading>
      <Heading :level="6">H6</Heading>
    </Stack>
  </Story>
</template>
