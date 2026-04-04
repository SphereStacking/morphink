import figma from '@figma/code-connect'
import { Checkbox } from '@morphink/ui'

import { toEnumMap } from '../../base/lib/figma-utils'
import { componentSizes } from '../../base/lib/props/size'
import { componentTones } from '../../base/lib/props/tone'
import { componentVariants } from '../../base/lib/props/variant'

figma.connect(Checkbox, 'https://figma.com/design/X8gSyqGQC7yghrfuc4GIdQ?node-id=99:202', {
  props: {
    variant: figma.enum('variant', toEnumMap(componentVariants.Checkbox)),
    tone: figma.enum('tone', toEnumMap(componentTones.Checkbox)),
    size: figma.enum('size', toEnumMap(componentSizes.Checkbox)),
  },
  example: (props) =>
    `<Checkbox variant="${props.variant}" tone="${props.tone}" size="${props.size}" />`,
})
