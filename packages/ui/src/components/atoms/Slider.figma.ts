import figma from '@figma/code-connect'
import { Slider } from '@morphink/ui'

import { toEnumMap } from '../../base/lib/figma-utils'
import { componentSizes } from '../../base/lib/props/size'
import { componentTones } from '../../base/lib/props/tone'

figma.connect(Slider, 'https://figma.com/design/X8gSyqGQC7yghrfuc4GIdQ?node-id=186:202', {
  props: {
    size: figma.enum('size', toEnumMap(componentSizes.Slider)),
    tone: figma.enum('tone', toEnumMap(componentTones.Slider)),
  },
  example: (props) => `<Slider :default-value="[50]" size="${props.size}" tone="${props.tone}" />`,
})
