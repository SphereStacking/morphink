export const variants = ['solid', 'outline', 'ghost', 'soft', 'subtle', 'elevated'] as const
export type Variant = (typeof variants)[number]

export const componentVariants = {
  Button: ['solid', 'outline', 'ghost', 'soft'],
  Badge: ['solid', 'soft', 'outline', 'ghost'],
  Panel: ['subtle', 'solid', 'elevated'],
  Card: ['elevated', 'outline', 'ghost', 'soft', 'interactive'],
  Select: ['solid', 'outline', 'ghost', 'soft'],
  Toolbar: ['solid', 'subtle'],
  Input: ['solid', 'outline', 'ghost', 'soft'],
  Textarea: ['solid', 'outline', 'ghost', 'soft'],
  Checkbox: ['outline', 'solid', 'ghost', 'soft'],
  Switch: ['outline', 'solid', 'ghost', 'soft'],
  Nav: ['subtle', 'solid'],
  Tabs: ['pill', 'underline'],
} as const

export type ButtonVariant = (typeof componentVariants.Button)[number]
export type BadgeVariant = (typeof componentVariants.Badge)[number]
export type PanelVariant = (typeof componentVariants.Panel)[number]
export type CardVariant = (typeof componentVariants.Card)[number]
export type SelectVariant = (typeof componentVariants.Select)[number]
export type ToolbarVariant = (typeof componentVariants.Toolbar)[number]
export type InputVariant = (typeof componentVariants.Input)[number]
export type TextareaVariant = (typeof componentVariants.Textarea)[number]
export type CheckboxVariant = (typeof componentVariants.Checkbox)[number]
export type SwitchVariant = (typeof componentVariants.Switch)[number]
export type NavVariant = (typeof componentVariants.Nav)[number]
export type TabsVariant = (typeof componentVariants.Tabs)[number]
