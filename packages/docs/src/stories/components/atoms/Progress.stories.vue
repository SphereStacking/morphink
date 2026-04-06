<script setup lang="ts">
import { Progress, Stack, Text } from '@morphink/ui'
import {
  componentDurations,
  componentEasings,
  componentSizes,
  componentTones,
  componentRounded,
} from '@morphink/ui'
import { defineMeta } from 'sb-addon-vue-csf'

const { Story } = defineMeta({
  title: 'Components/Atoms/Progress',
  component: Progress,
  tags: ['autodocs'],
  argTypes: {
    value: { control: { type: 'range', min: 0, max: 100, step: 1 } },
    max: { control: 'number' },
    size: { control: { type: 'select' }, options: componentSizes.Progress },
    tone: { control: { type: 'select' }, options: componentTones.Progress },
    rounded: { control: { type: 'select' }, options: componentRounded.Progress },
    duration: { control: { type: 'select' }, options: componentDurations.Progress },
    easing: { control: { type: 'select' }, options: componentEasings.Progress },
  },
  args: {
    value: 60,
    max: 100,
    size: 'md',
    tone: 'primary',
    rounded: 'full',
    duration: 'normal',
    easing: 'standard',
  },
})
</script>

<template>
  <Story name="Default">
    <template #template="{ args }">
      <div style="max-width: 400px">
        <Progress
          :value="args.value"
          :max="args.max"
          :size="args.size"
          :tone="args.tone"
          :rounded="args.rounded"
          :duration="args.duration"
          :easing="args.easing"
        />
      </div>
    </template>
  </Story>

  <Story name="Tones" asChild>
    <Stack gap="lg" style="max-width: 400px">
      <Stack gap="xs">
        <Text variant="caption" muted>Primary</Text>
        <Progress :value="70" tone="primary" />
      </Stack>
      <Stack gap="xs">
        <Text variant="caption" muted>Success</Text>
        <Progress :value="100" tone="success" />
      </Stack>
      <Stack gap="xs">
        <Text variant="caption" muted>Warning</Text>
        <Progress :value="45" tone="warning" />
      </Stack>
      <Stack gap="xs">
        <Text variant="caption" muted>Destructive</Text>
        <Progress :value="30" tone="destructive" />
      </Stack>
      <Stack gap="xs">
        <Text variant="caption" muted>Info</Text>
        <Progress :value="80" tone="info" />
      </Stack>
    </Stack>
  </Story>

  <Story name="Sizes" asChild>
    <Stack gap="lg" style="max-width: 400px">
      <Stack gap="xs">
        <Text variant="caption" muted>xs</Text>
        <Progress :value="60" size="xs" />
      </Stack>
      <Stack gap="xs">
        <Text variant="caption" muted>sm</Text>
        <Progress :value="60" size="sm" />
      </Stack>
      <Stack gap="xs">
        <Text variant="caption" muted>md</Text>
        <Progress :value="60" size="md" />
      </Stack>
      <Stack gap="xs">
        <Text variant="caption" muted>lg</Text>
        <Progress :value="60" size="lg" />
      </Stack>
      <Stack gap="xs">
        <Text variant="caption" muted>xl</Text>
        <Progress :value="60" size="xl" />
      </Stack>
    </Stack>
  </Story>

  <Story name="Indeterminate" asChild>
    <Stack gap="md" style="max-width: 400px">
      <Text muted>No value = indeterminate animation</Text>
      <Progress />
    </Stack>
  </Story>
</template>
