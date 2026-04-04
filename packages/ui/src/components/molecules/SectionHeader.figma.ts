import figma from '@figma/code-connect'
import { SectionHeader } from '@morphink/ui'

figma.connect(
  SectionHeader,
  'https://figma.com/design/X8gSyqGQC7yghrfuc4GIdQ?node-id=126:17',
  {
    props: {
      size: figma.enum('size', { xs: 'xs', sm: 'sm', md: 'md', lg: 'lg', xl: 'xl' }),
    },
    example: (props) =>
      `<SectionHeader size="${props.size}">Section Title</SectionHeader>`,
  }
)
