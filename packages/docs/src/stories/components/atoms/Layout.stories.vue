<script setup lang="ts">
import { Grid, Stack, Card, Text, Heading } from '@morphink/ui'
import { defineMeta } from 'sb-addon-vue-csf'

const { Story } = defineMeta({
  title: 'Components/Atoms/Layout',
  tags: ['autodocs'],
  argTypes: {
    columns: { control: 'text' },
    gap: {
      control: { type: 'select' },
      options: ['0', 'xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl'],
    },
    direction: { control: { type: 'select' }, options: ['row', 'column'] },
  },
  args: {
    columns: 'auto-fit',
    gap: 'lg',
    direction: 'column',
  },
})
</script>

<template>
  <Story name="Default">
    <template #template="{ args }">
      <Stack :direction="args.direction" gap="lg">
        <Heading :level="4">Layout Preview</Heading>
        <Grid :columns="args.columns" :gap="args.gap">
          <Card>
            <Heading :level="5">Block A</Heading>
            <Text>A card for testing composition.</Text>
          </Card>
          <Card>
            <Heading :level="5">Block B</Heading>
            <Text>Adjust grid columns and gap.</Text>
          </Card>
          <Card>
            <Heading :level="5">Block C</Heading>
            <Text>Toggle stack direction.</Text>
          </Card>
        </Grid>
      </Stack>
    </template>
  </Story>

  <Story name="Columns" asChild>
    <Stack gap="md">
      <Grid :columns="2" gap="lg">
        <Card><Heading :level="5">2 cols</Heading><Text>Grid columns</Text></Card>
        <Card><Heading :level="5">2 cols</Heading><Text>Grid columns</Text></Card>
      </Grid>
      <Grid :columns="3" gap="lg">
        <Card><Heading :level="5">3 cols</Heading><Text>Grid columns</Text></Card>
        <Card><Heading :level="5">3 cols</Heading><Text>Grid columns</Text></Card>
        <Card><Heading :level="5">3 cols</Heading><Text>Grid columns</Text></Card>
      </Grid>
    </Stack>
  </Story>

  <Story name="GapAndDirection" asChild>
    <Stack gap="md">
      <Stack direction="row" gap="lg">
        <Card><Heading :level="5">Row A</Heading><Text>Stack row</Text></Card>
        <Card><Heading :level="5">Row B</Heading><Text>Stack row</Text></Card>
      </Stack>
      <Stack direction="column" gap="lg">
        <Card><Heading :level="5">Column A</Heading><Text>Stack column</Text></Card>
        <Card><Heading :level="5">Column B</Heading><Text>Stack column</Text></Card>
      </Stack>
      <Grid :columns="3" gap="sm">
        <Card><Heading :level="5">sm (8px)</Heading><Text>Grid gap</Text></Card>
        <Card><Heading :level="5">sm</Heading><Text>Grid gap</Text></Card>
        <Card><Heading :level="5">sm</Heading><Text>Grid gap</Text></Card>
      </Grid>
      <Grid :columns="3" gap="xl">
        <Card><Heading :level="5">xl (24px)</Heading><Text>Grid gap</Text></Card>
        <Card><Heading :level="5">xl</Heading><Text>Grid gap</Text></Card>
        <Card><Heading :level="5">xl</Heading><Text>Grid gap</Text></Card>
      </Grid>
    </Stack>
  </Story>
</template>
