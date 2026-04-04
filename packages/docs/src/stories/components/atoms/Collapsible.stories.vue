<script setup lang="ts">
import { Collapsible, Button, Text, Stack } from '@morphink/ui'
import { defineMeta } from 'sb-addon-vue-csf'

const { Story } = defineMeta({
  title: 'Components/Atoms/Collapsible',
  component: Collapsible,
  tags: ['autodocs'],
  argTypes: {
    disabled: { control: 'boolean' },
    defaultOpen: { control: 'boolean' },
  },
  args: {
    disabled: false,
    defaultOpen: false,
  },
})
</script>

<template>
  <Story name="Default">
    <template #template="{ args }">
      <Collapsible :disabled="args.disabled" :default-open="args.defaultOpen">
        <template #trigger>
          <Button variant="outline" size="sm">Toggle Content</Button>
        </template>
        <div
          style="
            padding: 12px;
            margin-top: 8px;
            border: 1px solid var(--morphink-color-border);
            border-radius: var(--morphink-radius-md);
          "
        >
          <Text>This is the collapsible content. It can contain any elements.</Text>
        </div>
      </Collapsible>
    </template>
  </Story>

  <Story name="DefaultOpen" asChild>
    <Stack gap="md">
      <Collapsible default-open>
        <template #trigger>
          <Button variant="outline" size="sm">Toggle (Default Open)</Button>
        </template>
        <div
          style="
            padding: 12px;
            margin-top: 8px;
            border: 1px solid var(--morphink-color-border);
            border-radius: var(--morphink-radius-md);
          "
        >
          <Text>This section is open by default.</Text>
        </div>
      </Collapsible>
    </Stack>
  </Story>

  <Story name="Disabled" asChild>
    <Stack gap="md">
      <Collapsible disabled>
        <template #trigger>
          <Button variant="outline" size="sm" disabled>Toggle (Disabled)</Button>
        </template>
        <div style="padding: 12px; margin-top: 8px">
          <Text>This content cannot be toggled.</Text>
        </div>
      </Collapsible>
    </Stack>
  </Story>
</template>
