import figma from '@figma/code-connect'
import { Breadcrumb } from '@morphink/ui'

figma.connect(
  Breadcrumb,
  'https://figma.com/design/X8gSyqGQC7yghrfuc4GIdQ?node-id=56:10',
  {
    example: () =>
      `<Breadcrumb :items="[
  { label: 'Home', href: '/' },
  { label: 'Products', href: '/products' },
  { label: 'Current Page' },
]" />`,
  }
)
