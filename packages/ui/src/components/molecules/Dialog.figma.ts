import figma from '@figma/code-connect'
import { Dialog } from '@morphink/ui'

import { toEnumMap } from '../../base/lib/figma-utils'
import { componentSizes } from '../../base/lib/props/size'

figma.connect(Dialog, 'https://figma.com/design/X8gSyqGQC7yghrfuc4GIdQ?node-id=131:72', {
  props: {
    size: figma.enum('size', toEnumMap(componentSizes.Dialog)),
  },
  example: (props) =>
    `<Dialog size="${props.size}" title="Dialog Title" description="Description text">
  <template #trigger>
    <Button>Open Dialog</Button>
  </template>
  <template #default>
    <p>Dialog content here.</p>
  </template>
</Dialog>`,
})
