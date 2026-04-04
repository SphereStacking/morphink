import figma from '@figma/code-connect'
import { Toolbar } from '@morphink/ui'

figma.connect(
  Toolbar,
  'https://figma.com/design/X8gSyqGQC7yghrfuc4GIdQ?node-id=125:72',
  {
    props: {
      variant: figma.enum('variant', { solid: 'solid', subtle: 'subtle' }),
      size: figma.enum('size', { xs: 'xs', sm: 'sm', md: 'md', lg: 'lg', xl: 'xl' }),
    },
    example: (props) =>
      `<Toolbar variant="${props.variant}" size="${props.size}">
  <ToolbarButton>Bold</ToolbarButton>
  <ToolbarButton>Italic</ToolbarButton>
  <ToolbarSeparator />
  <ToolbarButton>Align Left</ToolbarButton>
</Toolbar>`,
  }
)
