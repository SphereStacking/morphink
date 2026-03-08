<script setup lang="ts">
import { Toolbar, Button, Stack, Text } from '@morphink/ui'
import { componentSizes, componentVariants } from '@morphink/ui'
import { defineMeta } from 'sb-addon-vue-csf'

const { Story } = defineMeta({
  title: 'Components/Molecules/Toolbar',
  component: Toolbar,
  tags: ['autodocs'],
  argTypes: {
    size: { control: { type: 'select' }, options: componentSizes.Toolbar },
    variant: { control: { type: 'select' }, options: componentVariants.Toolbar },
    title: { control: 'text' },
  },
  args: {
    size: 'md',
    variant: 'solid',
    title: 'Toolbar',
  },
})
</script>

<template>
  <Story name="Default">
    <template #template="{ args }">
      <Stack gap="md">
        <Toolbar :size="args.size" :variant="args.variant">
          <template #title>
            <Text weight="semibold">{{ args.title }}</Text>
          </template>
          <template #actions>
            <Button size="sm" variant="ghost">Search</Button>
            <Button size="sm">Add</Button>
          </template>
        </Toolbar>
      </Stack>
    </template>
  </Story>

  <Story name="Sizes" asChild>
    <Stack gap="md">
      <Toolbar size="sm">
        <template #title>
          <Text weight="semibold">Small</Text>
        </template>
        <template #actions>
          <Button size="sm" variant="ghost">Search</Button>
          <Button size="sm">Add</Button>
        </template>
      </Toolbar>
      <Toolbar size="md">
        <template #title>
          <Text weight="semibold">Medium</Text>
        </template>
        <template #actions>
          <Button size="sm" variant="ghost">Search</Button>
          <Button size="sm">Add</Button>
        </template>
      </Toolbar>
      <Toolbar size="lg">
        <template #title>
          <Text weight="semibold">Large</Text>
        </template>
        <template #actions>
          <Button size="sm" variant="ghost">Search</Button>
          <Button size="sm">Add</Button>
        </template>
      </Toolbar>
    </Stack>
  </Story>

  <Story name="Variants" asChild>
    <Stack gap="md">
      <Toolbar variant="solid">
        <template #title>
          <Text weight="semibold">Solid</Text>
        </template>
        <template #actions>
          <Button size="sm" variant="ghost">Search</Button>
          <Button size="sm">Add</Button>
        </template>
      </Toolbar>
      <Toolbar variant="subtle">
        <template #title>
          <Text weight="semibold">Subtle</Text>
        </template>
        <template #actions>
          <Button size="sm" variant="ghost">Search</Button>
          <Button size="sm">Add</Button>
        </template>
      </Toolbar>
    </Stack>
  </Story>
</template>
