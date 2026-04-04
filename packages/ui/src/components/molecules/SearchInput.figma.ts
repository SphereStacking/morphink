import figma from '@figma/code-connect'
import { SearchInput } from '@morphink/ui'

import { toEnumMap } from '../../base/lib/figma-utils'
import { componentSizes } from '../../base/lib/props/size'

figma.connect(SearchInput, 'https://figma.com/design/X8gSyqGQC7yghrfuc4GIdQ?node-id=54:26', {
  props: {
    size: figma.enum('size', toEnumMap(componentSizes.SearchInput)),
  },
  example: (props) =>
    `<SearchInput v-model="query" size="${props.size}" placeholder="Search..." />`,
})
