import figma from '@figma/code-connect'
import { Grid } from '@morphink/ui'

figma.connect(Grid, 'https://figma.com/design/X8gSyqGQC7yghrfuc4GIdQ?node-id=115:177', {
  props: {
    columns: figma.enum('columns', {
      '2': 2,
      '3': 3,
      '4': 4,
      'auto-fit': 'auto-fit',
      'auto-fill': 'auto-fill',
    }),
    gap: figma.enum('gap', {
      xs: 'xs',
      sm: 'sm',
      md: 'md',
      lg: 'lg',
      xl: 'xl',
    }),
  },
  example: (props) => `<Grid :columns="${props.columns}" gap="${props.gap}">Content</Grid>`,
})
