import figma from '@figma/code-connect'
import { Toolbar } from '@morphink/ui'

import { toEnumMap } from '../../base/lib/figma-utils'
import { componentSizes } from '../../base/lib/props/size'
import { componentVariants } from '../../base/lib/props/variant'

figma.connect(Toolbar, 'https://figma.com/design/X8gSyqGQC7yghrfuc4GIdQ?node-id=125:72', {
  props: {
    variant: figma.enum('variant', toEnumMap(componentVariants.Toolbar)),
    size: figma.enum('size', toEnumMap(componentSizes.Toolbar)),
  },
  example: (props) =>
    `<Toolbar variant="${props.variant}" size="${props.size}">
  <ToolbarButton>Bold</ToolbarButton>
  <ToolbarButton>Italic</ToolbarButton>
  <ToolbarSeparator />
  <ToolbarButton>Align Left</ToolbarButton>
</Toolbar>`,
})
