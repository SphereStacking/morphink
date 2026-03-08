<script setup lang="ts">
import { Tooltip, Button, Stack, Text } from '@morphink/ui'
import { componentRounded, componentShadow } from '@morphink/ui'
import { defineMeta } from 'sb-addon-vue-csf'

const { Story } = defineMeta({
  title: 'Components/Molecules/Tooltip',
  component: Tooltip,
  tags: ['autodocs'],
  argTypes: {
    content: { control: 'text' },
    side: { control: { type: 'select' }, options: ['top', 'right', 'bottom', 'left'] },
    align: { control: { type: 'select' }, options: ['start', 'center', 'end'] },
    delay: { control: 'number' },
    open: { control: 'boolean' },
    rounded: { control: { type: 'select' }, options: componentRounded.Tooltip },
    shadow: { control: { type: 'select' }, options: componentShadow.Tooltip },
    'onUpdate:open': { action: 'update:open' },
  },
  args: {
    content: 'Supplementary info',
    side: 'top',
    align: 'center',
    delay: 200,
    open: false,
    rounded: 'md',
    shadow: 'md',
  },
})
</script>

<template>
  <Story name="Default">
    <template #template="{ args }">
      <Stack gap="md">
        <Text muted>Shown on hover or focus.</Text>
        <Tooltip
          :content="args.content"
          :side="args.side"
          :align="args.align"
          :delay="args.delay"
          :open="args.open"
          :rounded="args.rounded"
          :shadow="args.shadow"
          @update:open="args['onUpdate:open']"
        >
          <Button size="sm">Tooltip</Button>
        </Tooltip>
      </Stack>
    </template>
  </Story>

  <Story name="Sides" asChild>
    <Stack direction="row" gap="md" align="center" wrap>
      <Tooltip content="Bottom" side="bottom">
        <Button size="sm">Bottom</Button>
      </Tooltip>
      <Tooltip content="Top" side="top">
        <Button size="sm">Top</Button>
      </Tooltip>
      <Tooltip content="Right" side="right">
        <Button size="sm">Right</Button>
      </Tooltip>
      <Tooltip content="Left" side="left">
        <Button size="sm">Left</Button>
      </Tooltip>
    </Stack>
  </Story>

  <Story name="Align" asChild>
    <Stack direction="row" gap="md" align="center" wrap>
      <Tooltip content="Start" align="start">
        <Button size="sm">Start</Button>
      </Tooltip>
      <Tooltip content="Center" align="center">
        <Button size="sm">Center</Button>
      </Tooltip>
      <Tooltip content="End" align="end">
        <Button size="sm">End</Button>
      </Tooltip>
    </Stack>
  </Story>

  <Story name="Rounded" asChild>
    <Stack direction="row" gap="md" align="center" wrap>
      <Tooltip content="Rounded sm" rounded="sm">
        <Button size="sm">Rounded sm</Button>
      </Tooltip>
      <Tooltip content="Rounded md" rounded="md">
        <Button size="sm">Rounded md</Button>
      </Tooltip>
      <Tooltip content="Rounded lg" rounded="lg">
        <Button size="sm">Rounded lg</Button>
      </Tooltip>
    </Stack>
  </Story>

  <Story name="Shadow" asChild>
    <Stack direction="row" gap="md" align="center" wrap>
      <Tooltip content="Shadow none" shadow="none">
        <Button size="sm">Shadow none</Button>
      </Tooltip>
      <Tooltip content="Shadow sm" shadow="sm">
        <Button size="sm">Shadow sm</Button>
      </Tooltip>
      <Tooltip content="Shadow md" shadow="md">
        <Button size="sm">Shadow md</Button>
      </Tooltip>
    </Stack>
  </Story>
</template>
