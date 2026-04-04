import figma from '@figma/code-connect'
import { Nav } from '@morphink/ui'

figma.connect(
  Nav,
  'https://figma.com/design/X8gSyqGQC7yghrfuc4GIdQ?node-id=127:72',
  {
    props: {
      variant: figma.enum('variant', { subtle: 'subtle', solid: 'solid' }),
      size: figma.enum('size', { xs: 'xs', sm: 'sm', md: 'md', lg: 'lg', xl: 'xl' }),
    },
    example: (props) =>
      `<Nav variant="${props.variant}" size="${props.size}" :items="[
  { label: 'Dashboard', href: '/dashboard', active: true },
  { label: 'Settings', href: '/settings' },
]" />`,
  }
)
