export const sizes = ['xs', 'sm', 'md', 'lg', 'xl'] as const
export type Size = (typeof sizes)[number]

export const componentSizes = {
  Badge: ['sm', 'md', 'lg'],
  Button: ['sm', 'md', 'lg'],
  Dialog: ['sm', 'md', 'lg'],
  AlertDialog: ['sm', 'md', 'lg'],
  Select: ['sm', 'md'],
  Toolbar: ['sm', 'md', 'lg'],
  Dropdown: ['sm', 'md', 'lg'],
  Input: ['xs', 'sm', 'md', 'lg', 'xl'],
} as const

export type BadgeSize = (typeof componentSizes.Badge)[number]
export type ButtonSize = (typeof componentSizes.Button)[number]
export type DialogSize = (typeof componentSizes.Dialog)[number]
export type AlertDialogSize = (typeof componentSizes.AlertDialog)[number]
export type SelectSize = (typeof componentSizes.Select)[number]
export type ToolbarSize = (typeof componentSizes.Toolbar)[number]
export type DropdownSize = (typeof componentSizes.Dropdown)[number]
export type InputSize = (typeof componentSizes.Input)[number]
