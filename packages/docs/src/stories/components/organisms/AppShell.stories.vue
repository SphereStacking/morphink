<script setup lang="ts">
import { ref } from 'vue'
import {
  AppShell,
  AppHeader,
  AppSidebar,
  DataTable,
  Stat,
  NavItem,
  Nav,
  Breadcrumb,
  SectionHeader,
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Stack,
  Grid,
  Button,
  Text,
  Heading,
  Avatar,
  Divider,
} from '@morphink/ui'
import { defineMeta } from 'sb-addon-vue-csf'

const sidebarCollapsed = ref(false)

const tableColumns = [
  { key: 'name', label: 'Name' },
  { key: 'status', label: 'Status' },
  { key: 'role', label: 'Role' },
]

const tableRows = [
  { name: 'Alice Johnson', status: 'Active', role: 'Admin' },
  { name: 'Bob Smith', status: 'Active', role: 'Editor' },
  { name: 'Carol White', status: 'Inactive', role: 'Viewer' },
  { name: 'David Brown', status: 'Active', role: 'Editor' },
  { name: 'Eva Green', status: 'Active', role: 'Admin' },
  { name: 'Frank Lee', status: 'Inactive', role: 'Viewer' },
]

const { Story } = defineMeta({
  title: 'Components/Organisms/AppShell',
  component: AppShell,
  tags: ['autodocs'],
  argTypes: {
    sidebarWidth: { control: 'text' },
    sidebarCollapsed: { control: 'boolean' },
  },
  parameters: {
    layout: 'fullscreen',
  },
})
</script>

<template>
  <Story name="Default" :args="{ sidebarWidth: '240px', sidebarCollapsed: false }">
    <template #template="{ args }">
      <AppShell v-bind="args" style="height: 600px">
        <template #header>
          <AppHeader title="Dashboard">
            <template #nav>
              <Nav :items="[
                { label: 'Overview', href: '#', active: true },
                { label: 'Reports', href: '#' },
                { label: 'Settings', href: '#' },
              ]" size="sm" />
            </template>
            <template #actions>
              <Avatar fallback="AJ" size="sm" />
            </template>
          </AppHeader>
        </template>
        <template #sidebar>
          <AppSidebar>
            <template #header>
              <Heading :level="6">Workspace</Heading>
            </template>
            <Stack gap="lg">
              <Stack gap="xs">
                <Text variant="caption" muted>MAIN</Text>
                <NavItem label="Dashboard" href="#" active />
                <NavItem label="Analytics" href="#" />
                <NavItem label="Users" href="#" badge="24" />
              </Stack>
              <Stack gap="xs">
                <Text variant="caption" muted>CONTENT</Text>
                <NavItem label="Posts" href="#" badge="3" />
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
        </template>
        <Stack gap="xl" style="padding: var(--morphink-space-xl)">
          <SectionHeader title="Overview" subtitle="Key metrics at a glance" />
          <Grid :columns="3" gap="md">
            <Stat label="Total Users" :value="1284" trend="up" trendValue="+12%" />
            <Stat label="Active Sessions" :value="342" trend="up" trendValue="+5%" />
            <Stat label="Bounce Rate" value="24.3%" trend="down" trendValue="-2%" />
          </Grid>
          <DataTable
            :columns="tableColumns"
            :rows="tableRows"
            :searchable="true"
            :pageSize="5"
            searchPlaceholder="Search users..."
          />
        </Stack>
      </AppShell>
    </template>
  </Story>

  <Story name="WithCollapsibleSidebar" asChild>
    <AppShell :sidebarCollapsed="sidebarCollapsed" style="height: 500px">
      <template #header>
        <AppHeader title="My App">
          <template #actions>
            <Button size="sm" variant="outline" @click="sidebarCollapsed = !sidebarCollapsed">
              {{ sidebarCollapsed ? 'Show Sidebar' : 'Hide Sidebar' }}
            </Button>
          </template>
        </AppHeader>
      </template>
      <template #sidebar>
        <AppSidebar>
          <Stack gap="xs">
            <NavItem label="Dashboard" href="#" active />
            <NavItem label="Projects" href="#" badge="5" />
            <NavItem label="Team" href="#" />
            <NavItem label="Settings" href="#" />
          </Stack>
        </AppSidebar>
      </template>
      <Stack gap="lg" style="padding: var(--morphink-space-xl)">
        <Heading :level="3">Content Area</Heading>
        <Text muted>Click "Hide Sidebar" to collapse the sidebar with a smooth transition.</Text>
      </Stack>
    </AppShell>
  </Story>

  <Story name="NoSidebar" asChild>
    <AppShell style="height: 500px">
      <template #header>
        <AppHeader title="Simple App">
          <template #nav>
            <Nav :items="[
              { label: 'Home', href: '#', active: true },
              { label: 'About', href: '#' },
              { label: 'Contact', href: '#' },
            ]" size="sm" />
          </template>
        </AppHeader>
      </template>
      <Stack gap="lg" style="padding: var(--morphink-space-xl)">
        <Breadcrumb :items="[{ label: 'Home', href: '#' }, { label: 'Projects', href: '#' }, { label: 'Design System' }]" />
        <SectionHeader title="Design System" subtitle="Overview of the morphink component library" />
        <Grid :columns="2" gap="md">
          <Card>
            <CardHeader><CardTitle>Components</CardTitle></CardHeader>
            <CardBody><Text muted>42 components across atoms, molecules, and organisms.</Text></CardBody>
          </Card>
          <Card>
            <CardHeader><CardTitle>Tokens</CardTitle></CardHeader>
            <CardBody><Text muted>Spacing, color, radius, and typography tokens.</Text></CardBody>
          </Card>
        </Grid>
      </Stack>
    </AppShell>
  </Story>
</template>
