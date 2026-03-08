<script setup lang="ts">
import { Avatar, Stack } from '@morphink/ui'
import { componentRounded, componentSizes } from '@morphink/ui'
import { defineMeta } from 'sb-addon-vue-csf'

const { Story } = defineMeta({
  title: 'Components/Atoms/Avatar',
  component: Avatar,
  tags: ['autodocs'],
  argTypes: {
    size: { control: { type: 'select' }, options: componentSizes.Avatar },
    rounded: { control: { type: 'select' }, options: componentRounded.Avatar },
    src: { control: 'text' },
    alt: { control: 'text' },
    fallback: { control: 'text' },
  },
  args: {
    size: 'md',
    rounded: 'full',
    src: 'https://i.pravatar.cc/150?u=morphink',
    alt: 'User avatar',
    fallback: 'MK',
  },
})
</script>

<template>
  <Story name="Default">
    <template #template="{ args }">
      <Avatar :src="args.src" :alt="args.alt" :fallback="args.fallback" :size="args.size" :rounded="args.rounded" />
    </template>
  </Story>

  <Story name="Sizes" asChild>
    <Stack direction="row" gap="md" align="center">
      <Avatar size="xs" fallback="XS" />
      <Avatar size="sm" fallback="SM" />
      <Avatar size="md" fallback="MD" />
      <Avatar size="lg" fallback="LG" />
      <Avatar size="xl" fallback="XL" />
    </Stack>
  </Story>

  <Story name="WithImage" asChild>
    <Stack direction="row" gap="md" align="center">
      <Avatar size="xs" src="https://i.pravatar.cc/150?u=a" alt="User A" fallback="A" />
      <Avatar size="sm" src="https://i.pravatar.cc/150?u=b" alt="User B" fallback="B" />
      <Avatar size="md" src="https://i.pravatar.cc/150?u=c" alt="User C" fallback="C" />
      <Avatar size="lg" src="https://i.pravatar.cc/150?u=d" alt="User D" fallback="D" />
      <Avatar size="xl" src="https://i.pravatar.cc/150?u=e" alt="User E" fallback="E" />
    </Stack>
  </Story>

  <Story name="Fallback" asChild>
    <Stack direction="row" gap="md" align="center">
      <Avatar fallback="TK" />
      <Avatar fallback="AB" />
      <Avatar />
    </Stack>
  </Story>

  <Story name="Rounded" asChild>
    <Stack direction="row" gap="md" align="center">
      <Avatar rounded="none" fallback="N" />
      <Avatar rounded="sm" fallback="SM" />
      <Avatar rounded="md" fallback="MD" />
      <Avatar rounded="lg" fallback="LG" />
      <Avatar rounded="xl" fallback="XL" />
      <Avatar rounded="full" fallback="F" />
    </Stack>
  </Story>

  <Story name="BrokenImage" asChild>
    <Stack direction="row" gap="md" align="center">
      <Avatar src="https://broken-url.invalid/photo.jpg" fallback="BK" />
      <Avatar src="https://broken-url.invalid/photo.jpg" />
    </Stack>
  </Story>
</template>
