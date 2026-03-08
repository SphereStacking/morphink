<script setup lang="ts">
import { Nav, Text, Stack } from '@morphink/ui'
import { componentSizes, componentVariants } from '@morphink/ui'
import { defineMeta } from 'sb-addon-vue-csf'

const { Story } = defineMeta({
  title: 'Components/Molecules/Navigation',
  component: Nav,
  tags: ['autodocs'],
  argTypes: {
    items: { control: 'object' },
    size: { control: { type: 'select' }, options: componentSizes.Nav },
    variant: { control: { type: 'select' }, options: componentVariants.Nav },
  },
  args: {
    items: [
      { label: 'Discover', href: '#', active: true },
      { label: 'Ranking', href: '#' },
      { label: 'Library', href: '#' },
    ],
    size: 'md',
    variant: 'subtle',
  },
})

const navItems = [
  { label: 'Discover', href: '#', active: true },
  { label: 'Ranking', href: '#' },
  { label: 'Library', href: '#' },
]
</script>

<template>
  <Story name="Default">
    <template #template="{ args }">
      <Stack gap="md">
        <Text muted>Preview active and hover states.</Text>
        <Nav :items="args.items" :size="args.size" :variant="args.variant" />
      </Stack>
    </template>
  </Story>

  <Story name="Variants" asChild>
    <Stack gap="md">
      <Nav :items="navItems" variant="subtle" />
      <Nav :items="navItems" variant="solid" />
    </Stack>
  </Story>

  <Story name="Sizes" asChild>
    <Stack gap="md">
      <Nav :items="navItems" size="sm" />
      <Nav :items="navItems" size="md" />
    </Stack>
  </Story>
</template>
