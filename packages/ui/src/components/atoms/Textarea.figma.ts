import figma from '@figma/code-connect'
import { Textarea } from '@morphink/ui'

figma.connect(
  Textarea,
  'https://figma.com/design/X8gSyqGQC7yghrfuc4GIdQ?node-id=54:35',
  {
    props: {
      variant: figma.enum('variant', {
        outline: 'outline',
        solid: 'solid',
        ghost: 'ghost',
        soft: 'soft',
      }),
      tone: figma.enum('tone', {
        primary: 'primary',
        secondary: 'secondary',
        tertiary: 'tertiary',
        base: 'base',
        accent: 'accent',
        neutral: 'neutral',
        success: 'success',
        warning: 'warning',
        info: 'info',
        destructive: 'destructive',
      }),
      size: figma.enum('size', {
        xs: 'xs',
        sm: 'sm',
        md: 'md',
        lg: 'lg',
        xl: 'xl',
      }),
    },
    example: (props) =>
      `<Textarea variant="${props.variant}" tone="${props.tone}" size="${props.size}" placeholder="Enter text..." />`,
  }
)
