<script setup lang="ts">
import { Stack, Panel, Text } from '@morphink/ui'
import { defineMeta } from 'sb-addon-vue-csf'

const { Story } = defineMeta({
  title: 'Components/Atoms/Stack',
  component: Stack,
  tags: ['autodocs'],
  argTypes: {
    direction: { control: { type: 'select' }, options: ['row', 'column'] },
    gap: {
      control: { type: 'select' },
      options: ['0', 'xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl'],
    },
    align: {
      control: { type: 'select' },
      options: ['start', 'center', 'end', 'stretch', 'baseline'],
    },
    justify: {
      control: { type: 'select' },
      options: ['start', 'center', 'end', 'between', 'around', 'evenly'],
    },
    wrap: { control: 'boolean' },
  },
  args: {
    direction: 'row',
    gap: 'md',
    align: 'center',
    justify: 'start',
    wrap: true,
  },
})
</script>

<template>
  <Story name="Default">
    <template #template="{ args }">
      <div style="max-width: 420px">
        <Stack
          :direction="args.direction"
          :gap="args.gap"
          :align="args.align"
          :justify="args.justify"
          :wrap="args.wrap"
        >
          <Panel style="min-width: 120px"><Text>Card A</Text></Panel>
          <Panel style="min-width: 120px"><Text>Card B</Text></Panel>
          <Panel style="min-width: 120px"><Text>Card C</Text></Panel>
        </Stack>
      </div>
    </template>
  </Story>

  <Story name="Direction" asChild>
    <Stack gap="md">
      <Stack direction="row" gap="md">
        <Panel><Text>Row A</Text></Panel>
        <Panel><Text>Row B</Text></Panel>
      </Stack>
      <Stack direction="column" gap="md">
        <Panel><Text>Column A</Text></Panel>
        <Panel><Text>Column B</Text></Panel>
      </Stack>
    </Stack>
  </Story>

  <Story name="GapTokens" asChild>
    <Stack gap="md">
      <Stack direction="row" gap="sm">
        <Panel><Text>sm (8px)</Text></Panel>
        <Panel><Text>sm</Text></Panel>
      </Stack>
      <Stack direction="row" gap="xl">
        <Panel><Text>xl (24px)</Text></Panel>
        <Panel><Text>xl</Text></Panel>
      </Stack>
    </Stack>
  </Story>

  <Story name="Alignment" asChild>
    <Stack gap="md">
      <div style="height: 80px">
        <Stack direction="row" gap="md" align="start" style="height: 80px">
          <Panel style="height: 40px"><Text>Start</Text></Panel>
          <Panel style="height: 60px"><Text>Start</Text></Panel>
        </Stack>
      </div>
      <div style="height: 80px">
        <Stack direction="row" gap="md" align="center" style="height: 80px">
          <Panel style="height: 40px"><Text>Center</Text></Panel>
          <Panel style="height: 60px"><Text>Center</Text></Panel>
        </Stack>
      </div>
      <div style="height: 80px">
        <Stack direction="row" gap="md" align="end" style="height: 80px">
          <Panel style="height: 40px"><Text>End</Text></Panel>
          <Panel style="height: 60px"><Text>End</Text></Panel>
        </Stack>
      </div>
      <Stack direction="row" gap="md" justify="start">
        <Panel><Text>Start</Text></Panel>
        <Panel><Text>Start</Text></Panel>
      </Stack>
      <Stack direction="row" gap="md" justify="center">
        <Panel><Text>Center</Text></Panel>
        <Panel><Text>Center</Text></Panel>
      </Stack>
      <Stack direction="row" gap="md" justify="between">
        <Panel><Text>Between</Text></Panel>
        <Panel><Text>Between</Text></Panel>
      </Stack>
    </Stack>
  </Story>

  <Story name="Wrap" asChild>
    <Stack direction="row" gap="md" wrap>
      <Panel style="min-width: 160px"><Text>Wrap A</Text></Panel>
      <Panel style="min-width: 160px"><Text>Wrap B</Text></Panel>
      <Panel style="min-width: 160px"><Text>Wrap C</Text></Panel>
    </Stack>
  </Story>
</template>
