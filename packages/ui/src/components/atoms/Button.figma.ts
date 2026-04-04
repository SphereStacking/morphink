import figma from '@figma/code-connect'
import { Button } from '@morphink/ui'

import { toEnumMap } from '../../base/lib/figma-utils'
import { componentSizes } from '../../base/lib/props/size'
import { componentTones } from '../../base/lib/props/tone'
import { componentVariants } from '../../base/lib/props/variant'

figma.connect(Button, 'https://figma.com/design/X8gSyqGQC7yghrfuc4GIdQ?node-id=48:98', {
  props: {
    variant: figma.enum('variant', toEnumMap(componentVariants.Button)),
    tone: figma.enum('tone', toEnumMap(componentTones.Button)),
    size: figma.enum('size', toEnumMap(componentSizes.Button)),
  },
  example: (props) =>
    `<Button variant="${props.variant}" tone="${props.tone}" size="${props.size}">Button</Button>`,
})
