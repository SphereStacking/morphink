<script setup lang="ts">
import { ref } from 'vue'
import { Slider, Stack, Text } from '@morphink/ui'
import { componentSizes, componentTones } from '@morphink/ui'
import { defineMeta } from 'sb-addon-vue-csf'

const value = ref([50])
const valueTone = ref([50])
const valueRange = ref([25, 75])

const { Story } = defineMeta({
  title: 'Components/Atoms/Slider',
  component: Slider,
  tags: ['autodocs'],
  argTypes: {
    min: { control: 'number' },
    max: { control: 'number' },
    step: { control: 'number' },
    disabled: { control: 'boolean' },
    size: { control: { type: 'select' }, options: componentSizes.Slider },
    tone: { control: { type: 'select' }, options: componentTones.Slider },
  },
  args: {
    min: 0,
    max: 100,
    step: 1,
    disabled: false,
    size: 'md',
    tone: 'primary',
  },
})
</script>

<template>
  <Story name="Default">
    <template #template="{ args }">
      <Stack gap="md" style="max-width: 400px">
        <Text muted>Value: {{ value[0] }}</Text>
        <Slider
          :model-value="value"
          :min="args.min"
          :max="args.max"
          :step="args.step"
          :disabled="args.disabled"
          :size="args.size"
          :tone="args.tone"
          @update:model-value="
            (v) => {
              value = v
            }
          "
        />
      </Stack>
    </template>
  </Story>

  <Story name="Tones" asChild>
    <Stack gap="lg" style="max-width: 400px">
      <Stack gap="xs">
        <Text variant="caption" muted>Primary</Text>
        <Slider v-model="valueTone" tone="primary" />
      </Stack>
      <Stack gap="xs">
        <Text variant="caption" muted>Success</Text>
        <Slider v-model="valueTone" tone="success" />
      </Stack>
      <Stack gap="xs">
        <Text variant="caption" muted>Warning</Text>
        <Slider v-model="valueTone" tone="warning" />
      </Stack>
      <Stack gap="xs">
        <Text variant="caption" muted>Destructive</Text>
        <Slider v-model="valueTone" tone="destructive" />
      </Stack>
    </Stack>
  </Story>

  <Story name="Sizes" asChild>
    <Stack gap="lg" style="max-width: 400px">
      <Stack gap="xs">
        <Text variant="caption" muted>xs</Text>
        <Slider :default-value="[50]" size="xs" />
      </Stack>
      <Stack gap="xs">
        <Text variant="caption" muted>sm</Text>
        <Slider :default-value="[50]" size="sm" />
      </Stack>
      <Stack gap="xs">
        <Text variant="caption" muted>md</Text>
        <Slider :default-value="[50]" size="md" />
      </Stack>
      <Stack gap="xs">
        <Text variant="caption" muted>lg</Text>
        <Slider :default-value="[50]" size="lg" />
      </Stack>
      <Stack gap="xs">
        <Text variant="caption" muted>xl</Text>
        <Slider :default-value="[50]" size="xl" />
      </Stack>
    </Stack>
  </Story>

  <Story name="Range" asChild>
    <Stack gap="md" style="max-width: 400px">
      <Text muted>Range: {{ valueRange[0] }} – {{ valueRange[1] }}</Text>
      <Slider v-model="valueRange" />
    </Stack>
  </Story>
</template>
