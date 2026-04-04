import figma from '@figma/code-connect'
import { Box } from '@morphink/ui'

figma.connect(
  Box,
  'https://figma.com/design/X8gSyqGQC7yghrfuc4GIdQ?node-id=113:27',
  {
    props: {
      padding: figma.enum('padding', {
        none: '0',
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
      }),
    },
    example: (props) =>
      `<Box padding="${props.padding}" rounded="${props.rounded}">Content</Box>`,
  }
)
