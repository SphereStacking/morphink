import figma from '@figma/code-connect'
import { Tooltip } from '@morphink/ui'

figma.connect(
  Tooltip,
  'https://figma.com/design/X8gSyqGQC7yghrfuc4GIdQ?node-id=55:60',
  {
    props: {
      position: figma.enum('position', {
        top: 'top',
        right: 'right',
        bottom: 'bottom',
        left: 'left',
      }),
    },
    example: (props) =>
      `<Tooltip content="Tooltip text" side="${props.position}">
  <Button>Hover me</Button>
</Tooltip>`,
  }
)
