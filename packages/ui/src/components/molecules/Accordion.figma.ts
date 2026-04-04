import figma from '@figma/code-connect'

figma.connect('Accordion', 'https://figma.com/design/X8gSyqGQC7yghrfuc4GIdQ?node-id=55:97', {
  example: () =>
    `<!-- Accordion uses Reka UI primitives -->
<AccordionRoot type="single" collapsible>
  <AccordionItem value="item-1">
    <AccordionTrigger>Section 1</AccordionTrigger>
    <AccordionContent>Content here</AccordionContent>
  </AccordionItem>
</AccordionRoot>`,
})
