<script setup lang="ts">
import { ref } from 'vue'
import { Select, Stack, Text } from '@morphink/ui'
import {
  componentRounded,
  componentShadow,
  componentSizes,
  componentTones,
  componentVariants,
} from '@morphink/ui'
import { defineMeta } from 'sb-addon-vue-csf'

const selectOptions = [
  { label: 'None', value: 'none' },
  { label: 'Default', value: 'default' },
  { label: 'Strong', value: 'strong' },
]

// Default story
const value = ref<string | number | null>(null)

// Variants story
const valueSolid = ref<string | number | null>(null)
const valueOutline = ref<string | number | null>(null)
const valueGhost = ref<string | number | null>(null)
const valueSoft = ref<string | number | null>(null)

// Tones story
const valueBase = ref<string | number | null>(null)
const valuePrimary = ref<string | number | null>(null)
const valueSuccess = ref<string | number | null>(null)
const valueWarning = ref<string | number | null>(null)
const valueDestructive = ref<string | number | null>(null)

// Sizes story
const valueSizeLg = ref<string | number | null>(null)
const valueSizeMd = ref<string | number | null>(null)
const valueSizeSm = ref<string | number | null>(null)

// Rounded story
const valueRoundedSm = ref<string | number | null>(null)
const valueRoundedMd = ref<string | number | null>(null)
const valueRoundedLg = ref<string | number | null>(null)

// Shadow story
const valueShadowNone = ref<string | number | null>(null)
const valueShadowSm = ref<string | number | null>(null)
const valueShadowMd = ref<string | number | null>(null)

const { Story } = defineMeta({
  title: 'Components/Molecules/Select',
  component: Select,
  tags: ['autodocs'],
  argTypes: {
    modelValue: { control: 'text' },
    options: { control: 'object' },
    placeholder: { control: 'text' },
    size: { control: { type: 'select' }, options: componentSizes.Select },
    variant: { control: { type: 'select' }, options: componentVariants.Select },
    tone: { control: { type: 'select' }, options: componentTones.Select },
    rounded: { control: { type: 'select' }, options: componentRounded.Select },
    shadow: { control: { type: 'select' }, options: componentShadow.Select },
    'update:modelValue': { action: 'update:modelValue' },
  },
  args: {
    modelValue: null,
    options: [
      { label: 'None', value: 'none' },
      { label: 'Default', value: 'default' },
      { label: 'Strong', value: 'strong' },
    ],
    placeholder: 'Select an option',
    size: 'md',
    variant: 'outline',
    tone: 'base',
    rounded: 'md',
    shadow: 'md',
  },
})
</script>

<template>
  <Story name="Default">
    <template #template="{ args }">
      <Stack gap="md">
        <Text muted>Value: {{ value ?? 'None' }}</Text>
        <Select
          :model-value="value"
          :options="args.options"
          :placeholder="args.placeholder"
          :size="args.size"
          :variant="args.variant"
          :tone="args.tone"
          :rounded="args.rounded"
          :shadow="args.shadow"
          @update:model-value="
            (next) => {
              value = next
            }
          "
        />
      </Stack>
    </template>
  </Story>

  <Story name="Variants" asChild>
    <Stack direction="row" gap="md" align="center" wrap>
      <Select v-model="valueSolid" :options="selectOptions" placeholder="Solid" variant="solid" />
      <Select
        v-model="valueOutline"
        :options="selectOptions"
        placeholder="Outline"
        variant="outline"
      />
      <Select v-model="valueGhost" :options="selectOptions" placeholder="Ghost" variant="ghost" />
      <Select v-model="valueSoft" :options="selectOptions" placeholder="Soft" variant="soft" />
    </Stack>
  </Story>

  <Story name="Tones" asChild>
    <Stack direction="row" gap="md" align="center" wrap>
      <Select v-model="valueBase" :options="selectOptions" placeholder="Base" tone="base" />
      <Select
        v-model="valuePrimary"
        :options="selectOptions"
        placeholder="Primary"
        tone="primary"
      />
      <Select
        v-model="valueSuccess"
        :options="selectOptions"
        placeholder="Success"
        tone="success"
      />
      <Select
        v-model="valueWarning"
        :options="selectOptions"
        placeholder="Warning"
        tone="warning"
      />
      <Select
        v-model="valueDestructive"
        :options="selectOptions"
        placeholder="Destructive"
        tone="destructive"
      />
    </Stack>
  </Story>

  <Story name="Sizes" asChild>
    <Stack direction="row" gap="md" align="center" wrap>
      <Select v-model="valueSizeLg" :options="selectOptions" placeholder="Large" size="lg" />
      <Select v-model="valueSizeMd" :options="selectOptions" placeholder="Medium" size="md" />
      <Select v-model="valueSizeSm" :options="selectOptions" placeholder="Small" size="sm" />
    </Stack>
  </Story>

  <Story name="Rounded" asChild>
    <Stack direction="row" gap="md" align="center" wrap>
      <Select
        v-model="valueRoundedSm"
        :options="selectOptions"
        placeholder="Rounded sm"
        rounded="sm"
      />
      <Select
        v-model="valueRoundedMd"
        :options="selectOptions"
        placeholder="Rounded md"
        rounded="md"
      />
      <Select
        v-model="valueRoundedLg"
        :options="selectOptions"
        placeholder="Rounded lg"
        rounded="lg"
      />
    </Stack>
  </Story>

  <Story name="Shadow" asChild>
    <Stack direction="row" gap="md" align="center" wrap>
      <Select
        v-model="valueShadowNone"
        :options="selectOptions"
        placeholder="Shadow none"
        shadow="none"
      />
      <Select
        v-model="valueShadowSm"
        :options="selectOptions"
        placeholder="Shadow sm"
        shadow="sm"
      />
      <Select
        v-model="valueShadowMd"
        :options="selectOptions"
        placeholder="Shadow md"
        shadow="md"
      />
    </Stack>
  </Story>
</template>
