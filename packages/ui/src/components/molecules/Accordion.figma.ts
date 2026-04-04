import figma from '@figma/code-connect'
import { Accordion } from '@morphink/ui'

figma.connect(Accordion, 'https://figma.com/design/X8gSyqGQC7yghrfuc4GIdQ?node-id=55:97', {
  props: {
    expanded: figma.enum('state', { expanded: true, collapsed: false }),
  },
  example: () =>
    `<Accordion type="single" collapsible variant="outline" size="md">
  <AccordionItem value="item-1">
    <template #trigger>Section 1</template>
    Content here
  </AccordionItem>
</Accordion>`,
})
