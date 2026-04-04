import figma from '@figma/code-connect'
import { Avatar } from '@morphink/ui'

figma.connect(
  Avatar,
  'https://figma.com/design/X8gSyqGQC7yghrfuc4GIdQ?node-id=50:22',
  {
    props: {
      size: figma.enum('size', {
        xs: 'xs',
        sm: 'sm',
        md: 'md',
        lg: 'lg',
        xl: 'xl',
      }),
      rounded: figma.enum('rounded', {
        none: 'none',
        sm: 'sm',
        md: 'md',
        lg: 'lg',
        xl: 'xl',
        full: 'full',
      }),
    },
    example: (props) =>
      `<Avatar size="${props.size}" rounded="${props.rounded}" fallback="AB" />`,
  }
)
