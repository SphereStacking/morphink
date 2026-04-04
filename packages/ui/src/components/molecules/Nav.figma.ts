import figma from '@figma/code-connect'
import { Nav } from '@morphink/ui'

import { toEnumMap } from '../../base/lib/figma-utils'
import { componentSizes } from '../../base/lib/props/size'
import { componentVariants } from '../../base/lib/props/variant'

figma.connect(Nav, 'https://figma.com/design/X8gSyqGQC7yghrfuc4GIdQ?node-id=127:72', {
  props: {
    variant: figma.enum('variant', toEnumMap(componentVariants.Nav)),
    size: figma.enum('size', toEnumMap(componentSizes.Nav)),
  },
  example: (props) =>
    `<Nav variant="${props.variant}" size="${props.size}" :items="[
  { label: 'Dashboard', href: '/dashboard', active: true },
  { label: 'Settings', href: '/settings' },
]" />`,
})
