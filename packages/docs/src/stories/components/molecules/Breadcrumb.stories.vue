<script setup lang="ts">
import { Breadcrumb } from '@morphink/ui'
import { defineMeta } from 'sb-addon-vue-csf'

const { Story } = defineMeta({
  title: 'Components/Molecules/Breadcrumb',
  component: Breadcrumb,
  tags: ['autodocs'],
  argTypes: {
    separator: { control: 'text' },
  },
})
</script>

<template>
  <Story
    name="Default"
    :args="{
      items: [
        { label: 'Home', href: '/' },
        { label: 'Products', href: '/products' },
        { label: 'Categories', href: '/products/categories' },
        { label: 'Electronics' },
      ],
    }"
  >
    <template #template="{ args }">
      <Breadcrumb v-bind="args" />
    </template>
  </Story>

  <Story
    name="CustomSeparator"
    :args="{
      items: [
        { label: 'Home', href: '/' },
        { label: 'Dashboard', href: '/dashboard' },
        { label: 'Settings' },
      ],
      separator: '›',
    }"
  >
    <template #template="{ args }">
      <Breadcrumb v-bind="args" />
    </template>
  </Story>

  <Story name="TwoItems" :args="{ items: [{ label: 'Home', href: '/' }, { label: 'About' }] }">
    <template #template="{ args }">
      <Breadcrumb v-bind="args" />
    </template>
  </Story>
</template>
