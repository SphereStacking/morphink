import figma from '@figma/code-connect'
import { DataTable } from '@morphink/ui'

figma.connect(
  DataTable,
  'https://figma.com/design/X8gSyqGQC7yghrfuc4GIdQ?node-id=57:16',
  {
    example: () =>
      `<DataTable
  :columns="[
    { key: 'name', label: 'Name' },
    { key: 'email', label: 'Email' },
    { key: 'role', label: 'Role' },
  ]"
  :data="rows"
/>`,
  }
)
