import figma from '@figma/code-connect'
import { Radio } from '@morphink/ui'

figma.connect(
  Radio,
  'https://figma.com/design/X8gSyqGQC7yghrfuc4GIdQ?node-id=50:39',
  {
    props: {
      variant: figma.enum('variant', {
        solid: 'solid',
        outline: 'outline',
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
      `<Radio variant="${props.variant}" tone="${props.tone}" size="${props.size}" value="option" />`,
  }
)
