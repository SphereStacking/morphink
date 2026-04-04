<script setup lang="ts">
import { ref } from 'vue'
import { Pagination, Stack, Text } from '@morphink/ui'
import { componentSizes, componentTones, componentVariants, componentRounded } from '@morphink/ui'
import { defineMeta } from 'sb-addon-vue-csf'

const page = ref(1)

const { Story } = defineMeta({
  title: 'Components/Molecules/Pagination',
  component: Pagination,
  tags: ['autodocs'],
  argTypes: {
    total: { control: 'number' },
    itemsPerPage: { control: 'number' },
    siblingCount: { control: 'number' },
    showEdges: { control: 'boolean' },
    size: { control: { type: 'select' }, options: componentSizes.Pagination },
    variant: { control: { type: 'select' }, options: componentVariants.Pagination },
    tone: { control: { type: 'select' }, options: componentTones.Pagination },
    rounded: { control: { type: 'select' }, options: componentRounded.Pagination },
  },
  args: {
    total: 100,
    itemsPerPage: 10,
    siblingCount: 1,
    showEdges: true,
    size: 'md',
    variant: 'outline',
    tone: 'primary',
    rounded: 'md',
  },
})
</script>

<template>
  <Story name="Default">
    <template #template="{ args }">
      <Stack gap="md">
        <Text muted>Page: {{ page }}</Text>
        <Pagination
          :page="page"
          :total="args.total"
          :items-per-page="args.itemsPerPage"
          :sibling-count="args.siblingCount"
          :show-edges="args.showEdges"
          :size="args.size"
          :variant="args.variant"
          :tone="args.tone"
          :rounded="args.rounded"
          @update:page="
            (v) => {
              page = v
            }
          "
        />
      </Stack>
    </template>
  </Story>

  <Story name="Variants" asChild>
    <Stack gap="lg">
      <Stack gap="xs">
        <Text variant="caption" muted>outline</Text>
        <Pagination :total="100" variant="outline" />
      </Stack>
      <Stack gap="xs">
        <Text variant="caption" muted>ghost</Text>
        <Pagination :total="100" variant="ghost" />
      </Stack>
      <Stack gap="xs">
        <Text variant="caption" muted>soft</Text>
        <Pagination :total="100" variant="soft" />
      </Stack>
    </Stack>
  </Story>

  <Story name="Tones" asChild>
    <Stack gap="lg">
      <Stack gap="xs">
        <Text variant="caption" muted>Primary</Text>
        <Pagination :total="100" tone="primary" />
      </Stack>
      <Stack gap="xs">
        <Text variant="caption" muted>Success</Text>
        <Pagination :total="100" tone="success" />
      </Stack>
      <Stack gap="xs">
        <Text variant="caption" muted>Destructive</Text>
        <Pagination :total="100" tone="destructive" />
      </Stack>
    </Stack>
  </Story>

  <Story name="Sizes" asChild>
    <Stack gap="lg">
      <Stack gap="xs">
        <Text variant="caption" muted>sm</Text>
        <Pagination :total="100" size="sm" />
      </Stack>
      <Stack gap="xs">
        <Text variant="caption" muted>md</Text>
        <Pagination :total="100" size="md" />
      </Stack>
      <Stack gap="xs">
        <Text variant="caption" muted>lg</Text>
        <Pagination :total="100" size="lg" />
      </Stack>
    </Stack>
  </Story>
</template>
