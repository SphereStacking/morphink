import figma from '@figma/code-connect'
import { Card } from '@morphink/ui'

figma.connect(
  Card,
  'https://figma.com/design/X8gSyqGQC7yghrfuc4GIdQ?node-id=129:47',
  {
    props: {
      variant: figma.enum('variant', {
        elevated: 'elevated',
        outline: 'outline',
        ghost: 'ghost',
        soft: 'soft',
        interactive: 'interactive',
      }),
    },
    example: (props) =>
      `<Card variant="${props.variant}">
  <CardHeader>
    <CardTitle>Card Title</CardTitle>
    <CardDescription>Card description</CardDescription>
  </CardHeader>
  <CardBody>Content</CardBody>
  <CardFooter>
    <Button>Action</Button>
  </CardFooter>
</Card>`,
  }
)
