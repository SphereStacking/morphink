import figma from '@figma/code-connect'
import { Progress } from '@morphink/ui'

import { toEnumMap } from '../../base/lib/figma-utils'
import { componentSizes } from '../../base/lib/props/size'
import { componentTones } from '../../base/lib/props/tone'

figma.connect(Progress, 'https://figma.com/design/X8gSyqGQC7yghrfuc4GIdQ?node-id=184:102', {
  props: {
    size: figma.enum('size', toEnumMap(componentSizes.Progress)),
    tone: figma.enum('tone', toEnumMap(componentTones.Progress)),
    duration: figma.string('duration'),
    easing: figma.string('easing'),
  },
  example: (props) => `<Progress :value="60" size="${props.size}" tone="${props.tone}" duration="${props.duration}" easing="${props.easing}" />`,
})
