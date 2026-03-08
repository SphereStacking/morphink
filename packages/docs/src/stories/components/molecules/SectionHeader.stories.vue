<script setup lang="ts">
import { SectionHeader, Button, Stack, Text } from '@morphink/ui'
import { componentSizes } from '@morphink/ui'
import { defineMeta } from 'sb-addon-vue-csf'

const { Story } = defineMeta({
  title: 'Components/Molecules/SectionHeader',
  component: SectionHeader,
  tags: ['autodocs'],
  argTypes: {
    size: { control: { type: 'select' }, options: componentSizes.SectionHeader },
    title: { control: 'text' },
    subtitle: { control: 'text' },
    showSubtitle: { control: 'boolean' },
    showAction: { control: 'boolean' },
    actionLabel: { control: 'text' },
  },
  args: {
    size: 'md',
    title: 'Featured Content',
    subtitle: 'A summary of the latest updates.',
    showSubtitle: true,
    showAction: true,
    actionLabel: 'View All',
  },
})
</script>

<template>
  <Story name="Default">
    <template #template="{ args }">
      <Stack gap="md">
        <Text muted>Organize section headings and actions.</Text>
        <SectionHeader :size="args.size">
          <template #title>{{ args.title }}</template>
          <template v-if="args.showSubtitle" #subtitle>{{ args.subtitle }}</template>
          <template v-if="args.showAction" #action>
            <Button size="sm" variant="outline">{{ args.actionLabel }}</Button>
          </template>
        </SectionHeader>
      </Stack>
    </template>
  </Story>

  <Story name="Sizes" asChild>
    <Stack gap="md">
      <SectionHeader size="sm">
        <template #title>Small</template>
        <template #subtitle>Subtitle</template>
        <template #action>
          <Button size="sm" variant="ghost">Action</Button>
        </template>
      </SectionHeader>
      <SectionHeader size="md">
        <template #title>Medium</template>
        <template #subtitle>Subtitle</template>
        <template #action>
          <Button size="sm">Action</Button>
        </template>
      </SectionHeader>
    </Stack>
  </Story>

  <Story name="Minimal" asChild>
    <Stack gap="md">
      <SectionHeader>
        <template #title>Subtitle on</template>
        <template #subtitle>Subtitle</template>
      </SectionHeader>
      <SectionHeader>
        <template #title>Subtitle off</template>
      </SectionHeader>
      <SectionHeader>
        <template #title>Action on</template>
        <template #action>
          <Button size="sm" variant="outline">Action</Button>
        </template>
      </SectionHeader>
      <SectionHeader>
        <template #title>Action off</template>
      </SectionHeader>
    </Stack>
  </Story>
</template>
