import figma from '@figma/code-connect'
import { Textarea } from '@morphink/ui'

import { toEnumMap } from '../../base/lib/figma-utils'
import { componentSizes } from '../../base/lib/props/size'
import { componentTones } from '../../base/lib/props/tone'
import { componentVariants } from '../../base/lib/props/variant'

figma.connect(Textarea, 'https://figma.com/design/X8gSyqGQC7yghrfuc4GIdQ?node-id=54:35', {
  props: {
    variant: figma.enum('variant', toEnumMap(componentVariants.Textarea)),
    tone: figma.enum('tone', toEnumMap(componentTones.Textarea)),
    size: figma.enum('size', toEnumMap(componentSizes.Textarea)),
  },
  example: (props) =>
    `<Textarea variant="${props.variant}" tone="${props.tone}" size="${props.size}" placeholder="Enter text..." />`,
})
