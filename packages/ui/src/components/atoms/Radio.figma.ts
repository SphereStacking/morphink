import figma from '@figma/code-connect'
import { Radio } from '@morphink/ui'

import { toEnumMap } from '../../base/lib/figma-utils'
import { componentSizes } from '../../base/lib/props/size'
import { componentTones } from '../../base/lib/props/tone'
import { componentVariants } from '../../base/lib/props/variant'

figma.connect(Radio, 'https://figma.com/design/X8gSyqGQC7yghrfuc4GIdQ?node-id=50:39', {
  props: {
    variant: figma.enum('variant', toEnumMap(componentVariants.Radio)),
    tone: figma.enum('tone', toEnumMap(componentTones.Radio)),
    size: figma.enum('size', toEnumMap(componentSizes.Radio)),
    duration: figma.string('duration'),
    easing: figma.string('easing'),
  },
  example: (props) =>
    `<RadioGroup variant="${props.variant}" tone="${props.tone}" size="${props.size}" duration="${props.duration}" easing="${props.easing}">
  <Radio value="option1" />
  <Radio value="option2" />
</RadioGroup>`,
})
