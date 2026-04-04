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

  <Story name="Positioning">
    <template #template>
      <Box position="relative" height="200px" border rounded="md">
        <Box
          position="absolute"
          top="0"
          left="0"
          padding="sm"
          background="muted"
          rounded="md"
        >
          <Text variant="caption">top-left</Text>
        </Box>
        <Box
          position="absolute"
          top="50%"
          left="50%"
          padding="sm"
          background="accent"
          color="accent-foreground"
          rounded="md"
          transform="translateY(-50%) translateX(-50%)"
        >
          <Text variant="caption">center</Text>
        </Box>
        <Box
          position="absolute"
          bottom="0"
          right="0"
          padding="sm"
          background="muted"
          rounded="md"
        >
          <Text variant="caption">bottom-right</Text>
        </Box>
      </Box>
    </template>
  </Story>

  <Story name="DirectionalBorder" asChild>
    <Stack direction="row" gap="lg">
      <Box padding="md" borderTop>
        <Text variant="caption">borderTop</Text>
      </Box>
      <Box padding="md" borderRight>
        <Text variant="caption">borderRight</Text>
      </Box>
      <Box padding="md" borderBottom>
        <Text variant="caption">borderBottom</Text>
      </Box>
      <Box padding="md" borderLeft>
        <Text variant="caption">borderLeft</Text>
      </Box>
    </Stack>
  </Story>
</template>
