import figma from '@figma/code-connect'
import { Panel } from '@morphink/ui'

figma.connect(
  Panel,
  'https://figma.com/design/X8gSyqGQC7yghrfuc4GIdQ?node-id=107:122',
  {
    props: {
      variant: figma.enum('variant', {
        subtle: 'subtle',
        solid: 'solid',
        elevated: 'elevated',
      }),
      rounded: figma.enum('rounded', {
        none: 'none',
        sm: 'sm',
        md: 'md',
        lg: 'lg',
        xl: 'xl',
      }),
      shadow: figma.enum('shadow', {
        none: 'none',
        sm: 'sm',
        md: 'md',
        lg: 'lg',
      }),
    },
    example: (props) =>
      `<Panel variant="${props.variant}" rounded="${props.rounded}" shadow="${props.shadow}">Content</Panel>`,
  }
)
