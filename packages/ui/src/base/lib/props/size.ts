export const sizes = ['xs', 'sm', 'md', 'lg', 'xl'] as const
export type Size = (typeof sizes)[number]

export const componentSizes = {
  Badge: ['xs', 'sm', 'md', 'lg', 'xl'],
  Button: ['xs', 'sm', 'md', 'lg', 'xl'],
  Dialog: ['xs', 'sm', 'md', 'lg', 'xl'],
  AlertDialog: ['xs', 'sm', 'md', 'lg', 'xl'],
  Select: ['xs', 'sm', 'md', 'lg', 'xl'],
  Toolbar: ['xs', 'sm', 'md', 'lg', 'xl'],
  Dropdown: ['xs', 'sm', 'md', 'lg', 'xl'],
  Input: ['xs', 'sm', 'md', 'lg', 'xl'],
  Textarea: ['xs', 'sm', 'md', 'lg', 'xl'],
  Checkbox: ['xs', 'sm', 'md', 'lg', 'xl'],
  Switch: ['xs', 'sm', 'md', 'lg', 'xl'],
  Tabs: ['xs', 'sm', 'md', 'lg', 'xl'],
  Nav: ['xs', 'sm', 'md', 'lg', 'xl'],
  SectionHeader: ['xs', 'sm', 'md', 'lg', 'xl'],
  Avatar: ['xs', 'sm', 'md', 'lg', 'xl'],
} as const

export type BadgeSize = (typeof componentSizes.Badge)[number]
export type ButtonSize = (typeof componentSizes.Button)[number]
export type DialogSize = (typeof componentSizes.Dialog)[number]
export type AlertDialogSize = (typeof componentSizes.AlertDialog)[number]
export type SelectSize = (typeof componentSizes.Select)[number]
export type ToolbarSize = (typeof componentSizes.Toolbar)[number]
export type DropdownSize = (typeof componentSizes.Dropdown)[number]
export type InputSize = (typeof componentSizes.Input)[number]
export type TextareaSize = (typeof componentSizes.Textarea)[number]
export type CheckboxSize = (typeof componentSizes.Checkbox)[number]
export type SwitchSize = (typeof componentSizes.Switch)[number]
export type TabsSize = (typeof componentSizes.Tabs)[number]
export type NavSize = (typeof componentSizes.Nav)[number]
export type SectionHeaderSize = (typeof componentSizes.SectionHeader)[number]
export type AvatarSize = (typeof componentSizes.Avatar)[number]
