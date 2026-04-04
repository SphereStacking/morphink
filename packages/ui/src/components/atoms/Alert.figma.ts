import figma from '@figma/code-connect'
import { Alert } from '@morphink/ui'

figma.connect(
  Alert,
  'https://figma.com/design/X8gSyqGQC7yghrfuc4GIdQ?node-id=95:227',
  {
    props: {
      variant: figma.enum('variant', {
        soft: 'soft',
        solid: 'solid',
        outline: 'outline',
      }),
      tone: figma.enum('tone', {
        info: 'info',
        success: 'success',
        warning: 'warning',
        destructive: 'destructive',
        neutral: 'neutral',
      }),
      rounded: figma.enum('rounded', {
        none: 'none',
        sm: 'sm',
        md: 'md',
        lg: 'lg',
        xl: 'xl',
      }),
    },
    example: (props) =>
      `<Alert variant="${props.variant}" tone="${props.tone}" rounded="${props.rounded}">
  <AlertTitle>Alert Title</AlertTitle>
  <AlertDescription>Alert description text goes here.</AlertDescription>
</Alert>`,
  }
)
