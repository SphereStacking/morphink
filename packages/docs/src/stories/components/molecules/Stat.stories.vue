<script setup lang="ts">
import { Stat, Grid, Card, CardBody } from '@morphink/ui'
import { defineMeta } from 'sb-addon-vue-csf'

const { Story } = defineMeta({
  title: 'Components/Molecules/Stat',
  component: Stat,
  tags: ['autodocs'],
  argTypes: {
    label: { control: 'text' },
    value: { control: 'text' },
    description: { control: 'text' },
    trend: { control: 'select', options: ['up', 'down', 'neutral'] },
    trendValue: { control: 'text' },
  },
})
</script>

<template>
  <Story name="Default" :args="{ label: 'Total Revenue', value: '$45,231' }">
    <template #template="{ args }">
      <Stat v-bind="args" />
    </template>
  </Story>

  <Story
    name="WithTrend"
    :args="{
      label: 'Monthly Active Users',
      value: '2,350',
      trend: 'up',
      trendValue: '+12.5%',
      description: 'Compared to last month',
    }"
  >
    <template #template="{ args }">
      <Stat v-bind="args" />
    </template>
  </Story>

  <Story name="StatsGrid" asChild>
    <Grid :columns="4" gap="md">
      <Card
        ><CardBody><Stat label="Revenue" value="$45,231" trend="up" trendValue="+20.1%" /></CardBody
      ></Card>
      <Card
        ><CardBody
          ><Stat label="Subscriptions" value="+2,350" trend="up" trendValue="+180.1%" /></CardBody
      ></Card>
      <Card
        ><CardBody><Stat label="Sales" value="+12,234" trend="down" trendValue="-19%" /></CardBody
      ></Card>
      <Card
        ><CardBody
          ><Stat label="Active Now" value="+573" trend="neutral" trendValue="+201" /></CardBody
      ></Card>
    </Grid>
  </Story>
</template>
