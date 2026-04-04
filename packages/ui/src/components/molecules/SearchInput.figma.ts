import figma from '@figma/code-connect'
import { SearchInput } from '@morphink/ui'

figma.connect(
  SearchInput,
  'https://figma.com/design/X8gSyqGQC7yghrfuc4GIdQ?node-id=54:26',
  {
    props: {
      size: figma.enum('size', { xs: 'xs', sm: 'sm', md: 'md', lg: 'lg', xl: 'xl' }),
    },
    example: (props) =>
      `<SearchInput v-model="query" size="${props.size}" placeholder="Search..." />`,
  }
)
