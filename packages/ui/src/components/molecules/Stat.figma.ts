import figma from '@figma/code-connect'
import { Stat } from '@morphink/ui'

figma.connect(
  Stat,
  'https://figma.com/design/X8gSyqGQC7yghrfuc4GIdQ?node-id=126:40',
  {
    props: {
      trend: figma.enum('trend', { up: 'up', down: 'down', neutral: 'neutral' }),
    },
    example: (props) =>
      `<Stat label="Total Revenue" value="$45,231" trend="${props.trend}" trendValue="12%" />`,
  }
)
