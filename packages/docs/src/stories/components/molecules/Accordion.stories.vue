<script setup lang="ts">
import { Accordion, AccordionItem, Stack, Text } from '@morphink/ui'
import { componentSizes, componentVariants } from '@morphink/ui'
import { defineMeta } from 'sb-addon-vue-csf'

const { Story } = defineMeta({
  title: 'Components/Molecules/Accordion',
  component: Accordion,
  tags: ['autodocs'],
  argTypes: {
    type: { control: { type: 'select' }, options: ['single', 'multiple'] },
    collapsible: { control: 'boolean' },
    disabled: { control: 'boolean' },
    size: { control: { type: 'select' }, options: componentSizes.Accordion },
    variant: { control: { type: 'select' }, options: componentVariants.Accordion },
  },
  args: {
    type: 'single',
    collapsible: true,
    disabled: false,
    size: 'md',
    variant: 'outline',
  },
})
</script>

<template>
  <Story name="Default">
    <template #template="{ args }">
      <div style="max-width: 500px">
        <Accordion
          :type="args.type"
          :collapsible="args.collapsible"
          :disabled="args.disabled"
          :size="args.size"
          :variant="args.variant"
        >
          <AccordionItem value="item-1">
            <template #trigger>What is morphink?</template>
            A design system built with Vue 3, Tailwind CSS v4, and Reka UI.
          </AccordionItem>
          <AccordionItem value="item-2">
            <template #trigger>How do I install it?</template>
            Run <code>pnpm add @morphink/ui</code> in your project.
          </AccordionItem>
          <AccordionItem value="item-3">
            <template #trigger>Can I customize the theme?</template>
            Yes, override the CSS variables defined by the design tokens.
          </AccordionItem>
        </Accordion>
      </div>
    </template>
  </Story>

  <Story name="Variants" asChild>
    <Stack gap="xl" style="max-width: 500px">
      <Stack gap="xs">
        <Text variant="caption" muted>outline</Text>
        <Accordion type="single" collapsible variant="outline">
          <AccordionItem value="a">
            <template #trigger>Outline Item 1</template>
            Content for outline variant.
          </AccordionItem>
          <AccordionItem value="b">
            <template #trigger>Outline Item 2</template>
            More content here.
          </AccordionItem>
        </Accordion>
      </Stack>
      <Stack gap="xs">
        <Text variant="caption" muted>ghost</Text>
        <Accordion type="single" collapsible variant="ghost">
          <AccordionItem value="a">
            <template #trigger>Ghost Item 1</template>
            Content for ghost variant.
          </AccordionItem>
          <AccordionItem value="b">
            <template #trigger>Ghost Item 2</template>
            More content here.
          </AccordionItem>
        </Accordion>
      </Stack>
      <Stack gap="xs">
        <Text variant="caption" muted>soft</Text>
        <Accordion type="single" collapsible variant="soft">
          <AccordionItem value="a">
            <template #trigger>Soft Item 1</template>
            Content for soft variant.
          </AccordionItem>
          <AccordionItem value="b">
            <template #trigger>Soft Item 2</template>
            More content here.
          </AccordionItem>
        </Accordion>
      </Stack>
    </Stack>
  </Story>

  <Story name="Sizes" asChild>
    <Stack gap="xl" style="max-width: 500px">
      <Stack gap="xs">
        <Text variant="caption" muted>sm</Text>
        <Accordion type="single" collapsible size="sm">
          <AccordionItem value="a">
            <template #trigger>Small</template>
            Small size content.
          </AccordionItem>
        </Accordion>
      </Stack>
      <Stack gap="xs">
        <Text variant="caption" muted>md</Text>
        <Accordion type="single" collapsible size="md">
          <AccordionItem value="a">
            <template #trigger>Medium</template>
            Medium size content.
          </AccordionItem>
        </Accordion>
      </Stack>
      <Stack gap="xs">
        <Text variant="caption" muted>lg</Text>
        <Accordion type="single" collapsible size="lg">
          <AccordionItem value="a">
            <template #trigger>Large</template>
            Large size content.
          </AccordionItem>
        </Accordion>
      </Stack>
    </Stack>
  </Story>

  <Story name="Multiple" asChild>
    <div style="max-width: 500px">
      <Accordion type="multiple">
        <AccordionItem value="item-1">
          <template #trigger>Section 1</template>
          Multiple items can be open at the same time.
        </AccordionItem>
        <AccordionItem value="item-2">
          <template #trigger>Section 2</template>
          This is the second section.
        </AccordionItem>
        <AccordionItem value="item-3">
          <template #trigger>Section 3</template>
          And the third section.
        </AccordionItem>
      </Accordion>
    </div>
  </Story>
</template>
