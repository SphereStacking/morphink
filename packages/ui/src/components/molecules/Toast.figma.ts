import figma from '@figma/code-connect'
import { Toast } from '@morphink/ui'

import { toEnumMap } from '../../base/lib/figma-utils'
import { componentTones } from '../../base/lib/props/tone'
import { componentVariants } from '../../base/lib/props/variant'

figma.connect(Toast, 'https://figma.com/design/X8gSyqGQC7yghrfuc4GIdQ?node-id=181:62', {
  props: {
    variant: figma.enum('variant', toEnumMap(componentVariants.Toast)),
    tone: figma.enum('tone', toEnumMap(componentTones.Toast)),
  },
  example: (props) =>
    `<Toast variant="${props.variant}" tone="${props.tone}" title="Toast Title" description="Description text" />`,
})
