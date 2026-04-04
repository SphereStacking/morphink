import figma from '@figma/code-connect'
import { Dialog } from '@morphink/ui'

figma.connect(
  Dialog,
  'https://figma.com/design/X8gSyqGQC7yghrfuc4GIdQ?node-id=131:72',
  {
    props: {
      size: figma.enum('size', { xs: 'xs', sm: 'sm', md: 'md', lg: 'lg', xl: 'xl' }),
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
  }
)
