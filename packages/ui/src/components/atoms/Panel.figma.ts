import figma from '@figma/code-connect'
import { Panel } from '@morphink/ui'

import { toEnumMap } from '../../base/lib/figma-utils'
import { componentRounded } from '../../base/lib/props/rounded'
import { componentShadow } from '../../base/lib/props/shadow'
import { componentVariants } from '../../base/lib/props/variant'

figma.connect(Panel, 'https://figma.com/design/X8gSyqGQC7yghrfuc4GIdQ?node-id=107:122', {
  props: {
    variant: figma.enum('variant', toEnumMap(componentVariants.Panel)),
    rounded: figma.enum('rounded', toEnumMap(componentRounded.Panel)),
    shadow: figma.enum('shadow', toEnumMap(componentShadow.Panel)),
  },
  example: (props) =>
    `<Panel variant="${props.variant}" rounded="${props.rounded}" shadow="${props.shadow}">Content</Panel>`,
})
