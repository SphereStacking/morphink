import figma from '@figma/code-connect'
import { Heading } from '@morphink/ui'

figma.connect(Heading, 'https://figma.com/design/X8gSyqGQC7yghrfuc4GIdQ?node-id=111:14', {
  props: {
    level: figma.enum('level', {
      '1': '1',
      '2': '2',
      '3': '3',
      '4': '4',
      '5': '5',
      '6': '6',
    }),
  },
  example: (props) => `<Heading :level="${props.level}">Heading text</Heading>`,
})
