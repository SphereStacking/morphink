<script setup lang="ts">
import { AppSidebar, NavItem, Stack, Text, Heading, Button, Avatar, Divider } from '@morphink/ui'
import { defineMeta } from 'sb-addon-vue-csf'

const { Story } = defineMeta({
  title: 'Components/Organisms/AppSidebar',
  component: AppSidebar,
  tags: ['autodocs'],
})
</script>

<template>
  <Story name="Default" asChild>
    <div style="height: 400px; width: 240px; border: var(--morphink-border-width-default) solid var(--morphink-color-border)">
      <AppSidebar>
        <template #header>
          <Text variant="label">Navigation</Text>
        </template>
        <Stack gap="xs">
          <NavItem label="Dashboard" href="#" active />
          <NavItem label="Projects" href="#" badge="3" />
          <NavItem label="Team" href="#" />
          <NavItem label="Reports" href="#" />
          <NavItem label="Settings" href="#" />
        </Stack>
      </AppSidebar>
    </div>
  </Story>

  <Story name="WithSections" asChild>
    <div style="height: 500px; width: 260px; border: var(--morphink-border-width-default) solid var(--morphink-color-border)">
      <AppSidebar>
        <template #header>
          <Heading :level="5">My App</Heading>
        </template>
        <Stack gap="lg">
          <Stack gap="xs">
            <Text variant="caption" muted>MAIN</Text>
            <NavItem label="Dashboard" href="#" active />
            <NavItem label="Analytics" href="#" />
          </Stack>
          <Stack gap="xs">
            <Text variant="caption" muted>CONTENT</Text>
            <NavItem label="Posts" href="#" badge="12" />
            <NavItem label="Media" href="#" />
            <NavItem label="Pages" href="#" />
          </Stack>
        </Stack>
        <template #footer>
          <Stack direction="row" gap="sm" align="center">
            <Avatar fallback="AJ" size="sm" />
            <Stack gap="0">
              <Text variant="caption">Alice Johnson</Text>
              <Text variant="caption" muted>Admin</Text>
            </Stack>
          </Stack>
        </template>
      </AppSidebar>
    </div>
  </Story>
</template>
