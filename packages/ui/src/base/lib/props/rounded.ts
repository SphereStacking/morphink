export const componentRounded = {
  Button: ['none', 'sm', 'md', 'lg', 'xl', 'full'],
  Badge: ['none', 'sm', 'md', 'lg', 'xl', 'full'],
  Card: ['none', 'sm', 'md', 'lg', 'xl'],
  Panel: ['none', 'sm', 'md', 'lg', 'xl'],
  Dialog: ['none', 'sm', 'md', 'lg', 'xl'],
  AlertDialog: ['none', 'sm', 'md', 'lg', 'xl'],
  Tooltip: ['none', 'sm', 'md', 'lg', 'xl'],
  Popover: ['none', 'sm', 'md', 'lg', 'xl'],
  Dropdown: ['none', 'sm', 'md', 'lg', 'xl'],
  Select: ['none', 'sm', 'md', 'lg', 'xl'],
  Table: ['none', 'sm', 'md', 'lg', 'xl'],
  Input: ['none', 'sm', 'md', 'lg', 'xl'],
} as const

export type ButtonRounded = (typeof componentRounded.Button)[number]
export type BadgeRounded = (typeof componentRounded.Badge)[number]
export type CardRounded = (typeof componentRounded.Card)[number]
export type PanelRounded = (typeof componentRounded.Panel)[number]
export type DialogRounded = (typeof componentRounded.Dialog)[number]
export type AlertDialogRounded = (typeof componentRounded.AlertDialog)[number]
export type TooltipRounded = (typeof componentRounded.Tooltip)[number]
export type PopoverRounded = (typeof componentRounded.Popover)[number]
export type DropdownRounded = (typeof componentRounded.Dropdown)[number]
export type SelectRounded = (typeof componentRounded.Select)[number]
export type TableRounded = (typeof componentRounded.Table)[number]
export type InputRounded = (typeof componentRounded.Input)[number]
