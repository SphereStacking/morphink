export const componentShadow = {
  Button: ['none', 'sm', 'md', 'lg'],
  Card: ['none', 'sm', 'md', 'lg'],
  Panel: ['none', 'sm', 'md', 'lg'],
  Dialog: ['none', 'sm', 'md', 'lg'],
  AlertDialog: ['none', 'sm', 'md', 'lg'],
  Tooltip: ['none', 'sm', 'md', 'lg'],
  Popover: ['none', 'sm', 'md', 'lg'],
  Dropdown: ['none', 'sm', 'md', 'lg'],
  Select: ['none', 'sm', 'md', 'lg'],
  Sheet: ['none', 'sm', 'md', 'lg'],
} as const

export type ButtonShadow = (typeof componentShadow.Button)[number]
export type CardShadow = (typeof componentShadow.Card)[number]
export type PanelShadow = (typeof componentShadow.Panel)[number]
export type DialogShadow = (typeof componentShadow.Dialog)[number]
export type AlertDialogShadow = (typeof componentShadow.AlertDialog)[number]
export type TooltipShadow = (typeof componentShadow.Tooltip)[number]
export type PopoverShadow = (typeof componentShadow.Popover)[number]
export type DropdownShadow = (typeof componentShadow.Dropdown)[number]
export type SelectShadow = (typeof componentShadow.Select)[number]
export type SheetShadow = (typeof componentShadow.Sheet)[number]
