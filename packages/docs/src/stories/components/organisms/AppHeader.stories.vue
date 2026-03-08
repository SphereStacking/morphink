<script setup lang="ts">
import { AppHeader, Nav, Button } from '@morphink/ui'
import { defineMeta } from 'sb-addon-vue-csf'

const { Story } = defineMeta({
  title: 'Components/Organisms/AppHeader',
  component: AppHeader,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
})
</script>

<template>
  <Story name="Default" :args="{ title: 'My Application' }">
    <template #template="{ args }">
      <AppHeader v-bind="args" />
    </template>
  </Story>

  <Story name="WithNav" :args="{ title: 'morphink' }">
    <template #template="{ args }">
      <AppHeader v-bind="args">
        <template #nav>
          <Nav :items="[{ label: 'Home', href: '/', active: true }, { label: 'Docs', href: '/docs' }, { label: 'Blog', href: '/blog' }]" size="sm" />
        </template>
        <template #actions>
          <Button size="sm" variant="outline">Sign In</Button>
        </template>
      </AppHeader>
    </template>
  </Story>
</template>
