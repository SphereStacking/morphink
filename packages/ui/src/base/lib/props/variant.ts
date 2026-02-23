export const variants = ['solid', 'outline', 'ghost', 'soft', 'subtle', 'elevated'] as const
export type Variant = typeof variants[number]

export const componentVariants = {
  Button: ['solid', 'outline', 'ghost', 'soft'],
  Badge: ['solid', 'soft', 'outline', 'ghost'],
  Panel: ['subtle', 'solid', 'elevated'],
  Card: ['elevated', 'outline'],
  Select: ['outline', 'ghost'],
  Toolbar: ['solid', 'subtle'],
} as const

export type ButtonVariant = typeof componentVariants.Button[number]
export type BadgeVariant = typeof componentVariants.Badge[number]
export type PanelVariant = typeof componentVariants.Panel[number]
export type CardVariant = typeof componentVariants.Card[number]
export type SelectVariant = typeof componentVariants.Select[number]
export type ToolbarVariant = typeof componentVariants.Toolbar[number]
