import figma from '@figma/code-connect'
import { Tabs } from '@morphink/ui'

figma.connect(
  Tabs,
  'https://figma.com/design/X8gSyqGQC7yghrfuc4GIdQ?node-id=55:51',
  {
    props: {
      variant: figma.enum('variant', { pill: 'pill', underline: 'underline' }),
      size: figma.enum('size', { xs: 'xs', sm: 'sm', md: 'md', lg: 'lg', xl: 'xl' }),
    },
    example: (props) =>
      `<Tabs variant="${props.variant}" size="${props.size}" :items="[
  { value: 'tab1', label: 'Tab 1', content: 'Content 1' },
  { value: 'tab2', label: 'Tab 2', content: 'Content 2' },
]" />`,
  }
)
