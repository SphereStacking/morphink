<script setup lang="ts">
import { Box, Stack, Text } from '@morphink/ui'
import { defineMeta } from 'sb-addon-vue-csf'

const { Story } = defineMeta({
  title: 'Components/Atoms/Box',
  component: Box,
  tags: ['autodocs'],
  argTypes: {
    as: { control: 'text' },
    padding: { control: 'select', options: ['xs', 'sm', 'md', 'lg', 'xl', '2xl'] },
    paddingX: { control: 'select', options: ['xs', 'sm', 'md', 'lg', 'xl', '2xl'] },
    paddingY: { control: 'select', options: ['xs', 'sm', 'md', 'lg', 'xl', '2xl'] },
    overflow: { control: 'select', options: ['auto', 'hidden', 'scroll'] },
    position: { control: 'select', options: ['relative', 'absolute', 'fixed', 'sticky'] },
    grow: { control: 'boolean' },
    shrink: { control: 'boolean' },
    rounded: { control: 'select', options: ['none', 'sm', 'md', 'lg', 'xl', 'full'] },
    border: { control: 'select', options: [false, 'default', 'strong', 'heavy'] },
  },
})
</script>

<template>
  <Story name="Default" :args="{ padding: 'lg', border: true }">
    <template #template="{ args }">
      <Box v-bind="args">
        <Text>Content inside a Box</Text>
      </Box>
    </template>
  </Story>

  <Story name="Rounded" asChild>
    <Stack direction="row" gap="md">
      <Box padding="md" border rounded="none"><Text>none</Text></Box>
      <Box padding="md" border rounded="sm"><Text>sm</Text></Box>
      <Box padding="md" border rounded="md"><Text>md</Text></Box>
      <Box padding="md" border rounded="lg"><Text>lg</Text></Box>
      <Box padding="md" border rounded="xl"><Text>xl</Text></Box>
      <Box padding="md" border rounded="full"><Text>full</Text></Box>
    </Stack>
  </Story>

  <Story name="Overflow" asChild>
    <Box overflow="auto" height="120px" padding="md" border rounded="md">
      <Text v-for="i in 20" :key="i">Line {{ i }} — scrollable content</Text>
    </Box>
  </Story>

  <Story name="FlexGrow" asChild>
    <Stack direction="row" gap="md" :style="{ height: '200px' }">
      <Box padding="md" border :style="{ width: '100px' }">
        <Text>Fixed</Text>
      </Box>
      <Box grow padding="md" border>
        <Text>Grows to fill remaining space</Text>
      </Box>
    </Stack>
  </Story>
</template>
