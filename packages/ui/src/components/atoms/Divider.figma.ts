import figma from '@figma/code-connect'
import { Divider } from '@morphink/ui'

figma.connect(Divider, 'https://figma.com/design/X8gSyqGQC7yghrfuc4GIdQ?node-id=101:10', {
  props: {
    vertical: figma.enum('direction', {
      horizontal: false,
      vertical: true,
    }),
    weight: figma.enum('weight', {
      none: 'none',
      default: 'default',
      strong: 'strong',
      heavy: 'heavy',
    }),
  },
  example: (props) => `<Divider :vertical="${props.vertical}" weight="${props.weight}" />`,
})
