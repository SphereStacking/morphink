import figma from '@figma/code-connect'
import { Collapsible } from '@morphink/ui'

figma.connect(Collapsible, 'https://figma.com/design/X8gSyqGQC7yghrfuc4GIdQ?node-id=187:12', {
  props: {
    defaultOpen: figma.enum('state', { expanded: true, collapsed: false }),
    duration: figma.string('duration'),
    easing: figma.string('easing'),
  },
  example: (props) =>
    `<Collapsible${props.defaultOpen ? ' default-open' : ''} duration="${props.duration}" easing="${props.easing}">
  <template #trigger>
    <Button variant="outline" size="sm">Toggle</Button>
  </template>
  <p>Collapsible content here.</p>
</Collapsible>`,
})
