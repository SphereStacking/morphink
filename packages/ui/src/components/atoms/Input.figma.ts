import figma from '@figma/code-connect'
import { Input } from '@morphink/ui'

import { toEnumMap } from '../../base/lib/figma-utils'
import { componentSizes } from '../../base/lib/props/size'
import { componentTones } from '../../base/lib/props/tone'
import { componentVariants } from '../../base/lib/props/variant'

figma.connect(Input, 'https://figma.com/design/X8gSyqGQC7yghrfuc4GIdQ?node-id=81:10', {
  props: {
    variant: figma.enum('variant', toEnumMap(componentVariants.Input)),
    tone: figma.enum('tone', toEnumMap(componentTones.Input)),
    size: figma.enum('size', toEnumMap(componentSizes.Input)),
  },
  example: (props) =>
    `<Input variant="${props.variant}" tone="${props.tone}" size="${props.size}" placeholder="Placeholder" />`,
})
