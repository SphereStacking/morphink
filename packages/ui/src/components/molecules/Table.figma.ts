import figma from '@figma/code-connect'
import { Table } from '@morphink/ui'

figma.connect(Table, 'https://figma.com/design/X8gSyqGQC7yghrfuc4GIdQ?node-id=130:126', {
  props: {
    density: figma.enum('density', {
      comfortable: 'comfortable',
      compact: 'compact',
    }),
    striped: figma.enum('striped', {
      true: true,
      false: false,
    }),
  },
  example: (props) =>
    `<Table
  density="${props.density}"
  ${props.striped ? 'striped' : ''}
  :columns="[
    { key: 'name', label: 'Name' },
    { key: 'email', label: 'Email' },
    { key: 'role', label: 'Role' },
  ]"
  :rows="data"
/>`,
})
