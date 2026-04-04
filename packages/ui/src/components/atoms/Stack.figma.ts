import figma from '@figma/code-connect'
import { Stack } from '@morphink/ui'

figma.connect(
  Stack,
  'https://figma.com/design/X8gSyqGQC7yghrfuc4GIdQ?node-id=114:162',
  {
    props: {
      direction: figma.enum('direction', {
        row: 'row',
        column: 'column',
      }),
      gap: figma.enum('gap', {
        xs: 'xs',
        sm: 'sm',
        md: 'md',
        lg: 'lg',
        xl: 'xl',
      }),
      align: figma.enum('align', {
        start: 'start',
        center: 'center',
        end: 'end',
        stretch: 'stretch',
      }),
    },
    example: (props) =>
      `<Stack direction="${props.direction}" gap="${props.gap}" align="${props.align}">Content</Stack>`,
  }
)
