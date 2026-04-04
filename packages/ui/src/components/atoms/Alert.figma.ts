import figma from '@figma/code-connect'
import { Alert } from '@morphink/ui'

import { toEnumMap } from '../../base/lib/figma-utils'
import { componentRounded } from '../../base/lib/props/rounded'
import { componentTones } from '../../base/lib/props/tone'
import { componentVariants } from '../../base/lib/props/variant'

figma.connect(Alert, 'https://figma.com/design/X8gSyqGQC7yghrfuc4GIdQ?node-id=95:227', {
  props: {
    variant: figma.enum('variant', toEnumMap(componentVariants.Alert)),
    tone: figma.enum('tone', toEnumMap(componentTones.Alert)),
    rounded: figma.enum('rounded', toEnumMap(componentRounded.Alert)),
  },
  example: (props) =>
    `<Alert variant="${props.variant}" tone="${props.tone}" rounded="${props.rounded}">
  <AlertTitle>Alert Title</AlertTitle>
  <AlertDescription>Alert description text goes here.</AlertDescription>
</Alert>`,
})
