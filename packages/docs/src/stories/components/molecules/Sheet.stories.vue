<script setup lang="ts">
import { Sheet, Button, Stack, Text } from '@morphink/ui'
import { componentSizes, componentRounded, componentShadow } from '@morphink/ui'
import { defineMeta } from 'sb-addon-vue-csf'

const { Story } = defineMeta({
  title: 'Components/Molecules/Sheet',
  component: Sheet,
  tags: ['autodocs'],
  argTypes: {
    side: { control: { type: 'select' }, options: ['left', 'right', 'top', 'bottom'] },
    title: { control: 'text' },
    description: { control: 'text' },
    size: { control: { type: 'select' }, options: componentSizes.Sheet },
    rounded: { control: { type: 'select' }, options: componentRounded.Sheet },
    shadow: { control: { type: 'select' }, options: componentShadow.Sheet },
  },
  args: {
    side: 'right',
    title: 'Sheet Title',
    description: 'This is a sheet panel that slides in from the side.',
    size: 'md',
    rounded: 'none',
    shadow: 'lg',
  },
})
</script>

<template>
  <Story name="Default">
    <template #template="{ args }">
      <Sheet
        :side="args.side"
        :title="args.title"
        :description="args.description"
        :size="args.size"
        :rounded="args.rounded"
        :shadow="args.shadow"
      >
        <template #trigger>
          <Button variant="outline">Open Sheet</Button>
        </template>
        <div style="padding: 16px 0">
          <Text>Sheet content goes here. You can place forms, lists, or any content.</Text>
        </div>
      </Sheet>
    </template>
  </Story>

  <Story name="Sides" asChild>
    <Stack direction="row" gap="md" wrap>
      <Sheet side="right" title="Right">
        <template #trigger>
          <Button variant="outline" size="sm">Right</Button>
        </template>
        <Text>Slides in from the right.</Text>
      </Sheet>
      <Sheet side="left" title="Left">
        <template #trigger>
          <Button variant="outline" size="sm">Left</Button>
        </template>
        <Text>Slides in from the left.</Text>
      </Sheet>
      <Sheet side="top" title="Top">
        <template #trigger>
          <Button variant="outline" size="sm">Top</Button>
        </template>
        <Text>Slides in from the top.</Text>
      </Sheet>
      <Sheet side="bottom" title="Bottom">
        <template #trigger>
          <Button variant="outline" size="sm">Bottom</Button>
        </template>
        <Text>Slides in from the bottom.</Text>
      </Sheet>
    </Stack>
  </Story>

  <Story name="Sizes" asChild>
    <Stack direction="row" gap="md" wrap>
      <Sheet side="right" title="Small" size="sm">
        <template #trigger>
          <Button variant="outline" size="sm">sm</Button>
        </template>
        <Text>Small sheet.</Text>
      </Sheet>
      <Sheet side="right" title="Medium" size="md">
        <template #trigger>
          <Button variant="outline" size="sm">md</Button>
        </template>
        <Text>Medium sheet.</Text>
      </Sheet>
      <Sheet side="right" title="Large" size="lg">
        <template #trigger>
          <Button variant="outline" size="sm">lg</Button>
        </template>
        <Text>Large sheet.</Text>
      </Sheet>
    </Stack>
  </Story>

  <Story name="WithFooter" asChild>
    <Sheet side="right" title="Edit Profile" description="Make changes to your profile.">
      <template #trigger>
        <Button variant="outline">Edit Profile</Button>
      </template>
      <div style="padding: 16px 0">
        <Text>Form fields would go here.</Text>
      </div>
      <template #footer>
        <Button variant="outline" size="sm">Cancel</Button>
        <Button size="sm">Save</Button>
      </template>
    </Sheet>
  </Story>
</template>
