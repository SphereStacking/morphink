<script setup lang="ts">
import { Divider, Stack, Text } from '@morphink/ui'
import { defineMeta } from 'sb-addon-vue-csf'

const { Story } = defineMeta({
  title: 'Components/Atoms/Divider',
  component: Divider,
  tags: ['autodocs'],
  argTypes: {
    vertical: { control: 'boolean' },
    weight: { control: 'select', options: ['none', 'default', 'strong', 'heavy'] },
  },
  args: {
    vertical: false,
    weight: 'default',
  },
})
</script>

<template>
  <Story name="Default">
    <template #template="{ args }">
      <Stack :direction="args.vertical ? 'row' : 'column'" :align="args.vertical ? 'center' : undefined" gap="md">
        <Text>Section A</Text>
        <Divider v-bind="args" />
        <Text>Section B</Text>
      </Stack>
    </template>
  </Story>

  <Story name="Vertical" asChild>
    <Stack direction="row" align="center" gap="md">
      <Text>Section A</Text>
      <Divider vertical />
      <Text>Section B</Text>
    </Stack>
  </Story>

  <Story name="Weight" asChild>
    <Stack direction="column" gap="lg">
      <Stack direction="column" gap="sm">
        <Text size="sm" color="muted">default (1px)</Text>
        <Divider weight="default" />
      </Stack>
      <Stack direction="column" gap="sm">
        <Text size="sm" color="muted">strong (2px)</Text>
        <Divider weight="strong" />
      </Stack>
      <Stack direction="column" gap="sm">
        <Text size="sm" color="muted">heavy (4px)</Text>
        <Divider weight="heavy" />
      </Stack>
    </Stack>
  </Story>
</template>
