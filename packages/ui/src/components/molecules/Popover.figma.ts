import figma from '@figma/code-connect'
import { Popover } from '@morphink/ui'

figma.connect(
  Popover,
  'https://figma.com/design/X8gSyqGQC7yghrfuc4GIdQ?node-id=122:14',
  {
    props: {
      side: figma.enum('side', { top: 'top', right: 'right', bottom: 'bottom', left: 'left' }),
    },
    example: (props) =>
      `<Popover side="${props.side}">
  <template #trigger>
    <Button>Open Popover</Button>
  </template>
  <template #content>
    <p>Popover content goes here.</p>
  </template>
</Popover>`,
  }
)
