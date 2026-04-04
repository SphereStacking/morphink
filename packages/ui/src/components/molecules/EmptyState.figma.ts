import figma from '@figma/code-connect'
import { EmptyState } from '@morphink/ui'

figma.connect(EmptyState, 'https://figma.com/design/X8gSyqGQC7yghrfuc4GIdQ?node-id=126:18', {
  example: () =>
    `<EmptyState title="No results found" description="Try adjusting your search or filters." />`,
})
