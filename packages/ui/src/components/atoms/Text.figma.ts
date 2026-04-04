import figma from '@figma/code-connect'
import { Text } from '@morphink/ui'

figma.connect(
  Text,
  'https://figma.com/design/X8gSyqGQC7yghrfuc4GIdQ?node-id=112:50',
  {
    props: {
      variant: figma.enum('variant', {
        body: 'body',
        caption: 'caption',
        label: 'label',
      }),
      weight: figma.enum('weight', {
        regular: 'regular',
        medium: 'medium',
        semibold: 'semibold',
        bold: 'bold',
      }),
      muted: figma.enum('muted', {
        true: true,
        false: false,
      }),
    },
    example: (props) =>
      `<Text variant="${props.variant}" weight="${props.weight}"${props.muted ? ' muted' : ''}>Text content</Text>`,
  }
)
