<script setup lang="ts">
import { AppHeader, Nav, Button, Avatar, SearchInput } from '@morphink/ui'
import { defineMeta } from 'sb-addon-vue-csf'

const { Story } = defineMeta({
  title: 'Components/Organisms/AppHeader',
  component: AppHeader,
  tags: ['autodocs'],
  argTypes: {
    title: { control: 'text' },
  },
  parameters: {
    layout: 'fullscreen',
  },
})
</script>

<template>
  <Story name="Default" :args="{ title: 'My Application' }">
    <template #template="{ args }">
      <AppHeader v-bind="args">
        <template #actions>
          <Avatar fallback="U" size="sm" />
        </template>
      </AppHeader>
    </template>
  </Story>

  <Story name="WithNav" :args="{ title: 'morphink' }">
    <template #template="{ args }">
      <AppHeader v-bind="args">
        <template #nav>
          <Nav
            :items="[
              { label: 'Dashboard', href: '#', active: true },
              { label: 'Projects', href: '#' },
              { label: 'Team', href: '#' },
              { label: 'Settings', href: '#' },
            ]"
            size="sm"
          />
        </template>
        <template #actions>
          <SearchInput placeholder="Search..." size="sm" />
          <Button size="sm" variant="ghost">Sign In</Button>
          <Avatar fallback="AJ" size="sm" />
        </template>
      </AppHeader>
    </template>
  </Story>
</template>
