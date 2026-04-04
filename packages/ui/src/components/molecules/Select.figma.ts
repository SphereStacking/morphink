import figma from '@figma/code-connect'
import { Select } from '@morphink/ui'

figma.connect(
  Select,
  'https://figma.com/design/X8gSyqGQC7yghrfuc4GIdQ?node-id=124:602',
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
      size: figma.enum('size', { xs: 'xs', sm: 'sm', md: 'md', lg: 'lg', xl: 'xl' }),
    },
    example: (props) =>
      `<Select
  v-model="selected"
  variant="${props.variant}"
  tone="${props.tone}"
  size="${props.size}"
  :options="[
    { label: 'Option A', value: 'a' },
    { label: 'Option B', value: 'b' },
  ]"
/>`,
  }
)
