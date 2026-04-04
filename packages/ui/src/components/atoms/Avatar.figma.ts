import figma from '@figma/code-connect'
import { Avatar } from '@morphink/ui'

import { toEnumMap } from '../../base/lib/figma-utils'
import { componentRounded } from '../../base/lib/props/rounded'
import { componentSizes } from '../../base/lib/props/size'

figma.connect(Avatar, 'https://figma.com/design/X8gSyqGQC7yghrfuc4GIdQ?node-id=50:22', {
  props: {
    size: figma.enum('size', toEnumMap(componentSizes.Avatar)),
    rounded: figma.enum('rounded', toEnumMap(componentRounded.Avatar)),
  },
  example: (props) => `<Avatar size="${props.size}" rounded="${props.rounded}" fallback="AB" />`,
})
