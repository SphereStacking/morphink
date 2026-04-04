import figma from '@figma/code-connect'
import { NavItem } from '@morphink/ui'

figma.connect(NavItem, 'https://figma.com/design/X8gSyqGQC7yghrfuc4GIdQ?node-id=56:28', {
  props: {
    active: figma.enum('state', {
      active: true,
      default: false,
      disabled: false,
    }),
  },
  example: (props) =>
    `<NavItem href="/dashboard"${props.active ? ' active' : ''}>Dashboard</NavItem>`,
})
