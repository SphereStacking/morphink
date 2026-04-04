import figma from '@figma/code-connect'
import { Sheet } from '@morphink/ui'

figma.connect(Sheet, 'https://figma.com/design/X8gSyqGQC7yghrfuc4GIdQ?node-id=180:18', {
  props: {
    side: figma.enum('side', { left: 'left', right: 'right', top: 'top', bottom: 'bottom' }),
  },
  example: (props) =>
    `<Sheet side="${props.side}" title="Sheet Title" description="Description text">
  <template #trigger>
    <Button>Open Sheet</Button>
  </template>
  <template #default>
    <p>Content here.</p>
  </template>
</Sheet>`,
})
