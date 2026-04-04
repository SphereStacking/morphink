<script setup lang="ts">
import { Panel, Stack, Text, Button } from '@morphink/ui'
import { componentRounded, componentShadow, componentVariants } from '@morphink/ui'
import { defineMeta } from 'sb-addon-vue-csf'

const { Story } = defineMeta({
  title: 'Components/Atoms/Panel',
  component: Panel,
  tags: ['autodocs'],
  argTypes: {
    variant: { control: { type: 'select' }, options: componentVariants.Panel },
    interactive: { control: 'boolean' },
    body: { control: 'text' },
    rounded: { control: { type: 'select' }, options: componentRounded.Panel },
    shadow: { control: { type: 'select' }, options: componentShadow.Panel },
  },
  args: {
    variant: 'subtle',
    interactive: false,
    rounded: 'md',
    shadow: 'md',
    body: 'Use Panel to organize information blocks.',
  },
})
</script>

<template>
  <Story name="Default">
    <template #template="{ args }">
      <Stack gap="md">
        <Panel
          :variant="args.variant"
          :interactive="args.interactive"
          :rounded="args.rounded"
          :shadow="args.shadow"
        >
          <Text>{{ args.body }}</Text>
          <Button size="sm" variant="ghost" style="margin-top: 8px">Action</Button>
        </Panel>
      </Stack>
    </template>
  </Story>

  <Story name="Variants" asChild>
    <Stack gap="md">
      <Panel variant="subtle"><Text muted>Subtle panel</Text></Panel>
      <Panel variant="solid"><Text>Solid panel</Text></Panel>
      <Panel variant="elevated"><Text>Elevated panel</Text></Panel>
    </Stack>
  </Story>

  <Story name="Interactive" asChild>
    <Stack gap="md">
      <Panel><Text muted>Not interactive</Text></Panel>
      <Panel interactive
        ><Text>Interactive</Text
        ><Button size="sm" variant="ghost" style="margin-top: 8px">Action</Button></Panel
      >
    </Stack>
  </Story>

  <Story name="RoundedAndShadow" asChild>
    <Stack gap="md">
      <Panel rounded="sm"><Text>Rounded sm</Text></Panel>
      <Panel rounded="md"><Text>Rounded md</Text></Panel>
      <Panel rounded="lg"><Text>Rounded lg</Text></Panel>
      <Panel shadow="none"><Text>Shadow none</Text></Panel>
      <Panel shadow="sm"><Text>Shadow sm</Text></Panel>
      <Panel shadow="md"><Text>Shadow md</Text></Panel>
    </Stack>
  </Story>
</template>
