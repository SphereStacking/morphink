import figma from '@figma/code-connect'
import { Pagination } from '@morphink/ui'

import { toEnumMap } from '../../base/lib/figma-utils'
import { componentVariants } from '../../base/lib/props/variant'

figma.connect(Pagination, 'https://figma.com/design/X8gSyqGQC7yghrfuc4GIdQ?node-id=182:137', {
  props: {
    variant: figma.enum('variant', toEnumMap(componentVariants.Pagination)),
    size: figma.enum('size', { sm: 'sm', md: 'md', lg: 'lg' }),
  },
  example: (props) => `<Pagination :total="100" variant="${props.variant}" size="${props.size}" />`,
})
