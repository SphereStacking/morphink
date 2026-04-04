import figma from '@figma/code-connect'
import { Switch } from '@morphink/ui'

import { toEnumMap } from '../../base/lib/figma-utils'
import { componentSizes } from '../../base/lib/props/size'
import { componentTones } from '../../base/lib/props/tone'
import { componentVariants } from '../../base/lib/props/variant'

figma.connect(Switch, 'https://figma.com/design/X8gSyqGQC7yghrfuc4GIdQ?node-id=96:162', {
  props: {
    variant: figma.enum('variant', toEnumMap(componentVariants.Switch)),
    tone: figma.enum('tone', toEnumMap(componentTones.Switch)),
    size: figma.enum('size', toEnumMap(componentSizes.Switch)),
  },
  example: (props) =>
    `<Switch variant="${props.variant}" tone="${props.tone}" size="${props.size}" />`,
})
