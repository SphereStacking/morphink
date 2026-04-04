import figma from '@figma/code-connect'
import { SectionHeader } from '@morphink/ui'

import { toEnumMap } from '../../base/lib/figma-utils'
import { componentSizes } from '../../base/lib/props/size'

figma.connect(SectionHeader, 'https://figma.com/design/X8gSyqGQC7yghrfuc4GIdQ?node-id=126:17', {
  props: {
    size: figma.enum('size', toEnumMap(componentSizes.SectionHeader)),
  },
  example: (props) => `<SectionHeader size="${props.size}">Section Title</SectionHeader>`,
})
