import figma from '@figma/code-connect'
import { AlertDialog } from '@morphink/ui'

figma.connect(
  AlertDialog,
  'https://figma.com/design/X8gSyqGQC7yghrfuc4GIdQ?node-id=121:42',
  {
    props: {
      size: figma.enum('size', { xs: 'xs', sm: 'sm', md: 'md', lg: 'lg', xl: 'xl' }),
    },
    example: (props) =>
      `<AlertDialog size="${props.size}">
  <template #trigger>
    <Button tone="destructive">Delete</Button>
  </template>
  <template #title>Are you sure?</template>
  <template #description>This action cannot be undone.</template>
  <template #cancel>
    <Button variant="outline">Cancel</Button>
  </template>
  <template #action>
    <Button tone="destructive">Delete</Button>
  </template>
</AlertDialog>`,
  }
)
