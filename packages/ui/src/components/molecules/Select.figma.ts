import figma from '@figma/code-connect'
import { Select } from '@morphink/ui'

import { toEnumMap } from '../../base/lib/figma-utils'
import { componentSizes } from '../../base/lib/props/size'
import { componentTones } from '../../base/lib/props/tone'
import { componentVariants } from '../../base/lib/props/variant'

figma.connect(Select, 'https://figma.com/design/X8gSyqGQC7yghrfuc4GIdQ?node-id=124:602', {
  props: {
    variant: figma.enum('variant', toEnumMap(componentVariants.Select)),
    tone: figma.enum('tone', toEnumMap(componentTones.Select)),
    size: figma.enum('size', toEnumMap(componentSizes.Select)),
  },
  example: (props) =>
    `<Select
  v-model="selected"
  variant="${props.variant}"
  tone="${props.tone}"
  size="${props.size}"
  :options="[
    { label: 'Option A', value: 'a' },
    { label: 'Option B', value: 'b' },
  ]"
/>`,
})
