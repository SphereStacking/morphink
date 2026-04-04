import figma from '@figma/code-connect'
import { Badge } from '@morphink/ui'

import { toEnumMap } from '../../base/lib/figma-utils'
import { componentSizes } from '../../base/lib/props/size'
import { componentTones } from '../../base/lib/props/tone'
import { componentVariants } from '../../base/lib/props/variant'

figma.connect(Badge, 'https://figma.com/design/X8gSyqGQC7yghrfuc4GIdQ?node-id=49:114', {
  props: {
    variant: figma.enum('variant', toEnumMap(componentVariants.Badge)),
    tone: figma.enum('tone', toEnumMap(componentTones.Badge)),
    size: figma.enum('size', toEnumMap(componentSizes.Badge)),
  },
  example: (props) =>
    `<Badge variant="${props.variant}" tone="${props.tone}" size="${props.size}">Badge</Badge>`,
})
