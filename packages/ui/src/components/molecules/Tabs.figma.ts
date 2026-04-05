import figma from '@figma/code-connect'
import { Tabs } from '@morphink/ui'

import { toEnumMap } from '../../base/lib/figma-utils'
import { componentSizes } from '../../base/lib/props/size'
import { componentVariants } from '../../base/lib/props/variant'
figma.connect(Tabs, 'https://figma.com/design/X8gSyqGQC7yghrfuc4GIdQ?node-id=55:51', {
  props: {
    variant: figma.enum('variant', toEnumMap(componentVariants.Tabs)),
    size: figma.enum('size', toEnumMap(componentSizes.Tabs)),
    duration: figma.string('duration'),
    easing: figma.string('easing'),
  },
  example: (props) =>
    `<Tabs variant="${props.variant}" size="${props.size}" duration="${props.duration}" easing="${props.easing}" :items="[
  { value: 'tab1', label: 'Tab 1', content: 'Content 1' },
  { value: 'tab2', label: 'Tab 2', content: 'Content 2' },
]" />`,
})
