// ─── Atoms: Interactive ───
export { default as Button } from './components/atoms/Button.vue'
export { default as Input } from './components/atoms/Input.vue'
export { default as Textarea } from './components/atoms/Textarea.vue'
export { default as Checkbox } from './components/atoms/Checkbox.vue'
export { default as CheckboxGroup } from './components/atoms/CheckboxGroup.vue'
export { default as RadioGroup } from './components/atoms/RadioGroup.vue'
export { default as Radio } from './components/atoms/Radio.vue'
export { default as Switch } from './components/atoms/Switch.vue'
export { default as Slider } from './components/atoms/Slider.vue'

// ─── Atoms: Display ───
export { default as Text } from './components/atoms/Text.vue'
export { default as Heading } from './components/atoms/Heading.vue'
export { default as Badge } from './components/atoms/Badge.vue'
export { default as Avatar } from './components/atoms/Avatar.vue'
export { default as Divider } from './components/atoms/Divider.vue'

// ─── Atoms: Layout ───
export { default as Box } from './components/atoms/Box.vue'
export { default as Stack } from './components/atoms/Stack.vue'
export { default as Grid } from './components/atoms/Grid.vue'

// ─── Atoms: Feedback ───
export { default as Alert } from './components/atoms/Alert.vue'
export { default as AlertTitle } from './components/atoms/AlertTitle.vue'
export { default as AlertDescription } from './components/atoms/AlertDescription.vue'
export { default as Progress } from './components/atoms/Progress.vue'

// ─── Atoms: Container ───
export { default as Panel } from './components/atoms/Panel.vue'

// ─── Molecules: Card ───
export { default as Card } from './components/molecules/Card.vue'
export { default as CardHeader } from './components/molecules/CardHeader.vue'
export { default as CardBody } from './components/molecules/CardBody.vue'
export { default as CardFooter } from './components/molecules/CardFooter.vue'
export { default as CardTitle } from './components/molecules/CardTitle.vue'
export { default as CardDescription } from './components/molecules/CardDescription.vue'
export { default as CardMedia } from './components/molecules/CardMedia.vue'

// ─── Molecules: Dropdown ───
export { default as Dropdown } from './components/molecules/Dropdown.vue'
export { default as DropdownTrigger } from './components/molecules/DropdownTrigger.vue'
export { default as DropdownContent } from './components/molecules/DropdownContent.vue'
export { default as DropdownItem } from './components/molecules/DropdownItem.vue'
export { default as DropdownSeparator } from './components/molecules/DropdownSeparator.vue'
export { default as DropdownGroup } from './components/molecules/DropdownGroup.vue'
export { default as DropdownLabel } from './components/molecules/DropdownLabel.vue'
export { default as DropdownCheckboxItem } from './components/molecules/DropdownCheckboxItem.vue'
export { default as DropdownRadioGroup } from './components/molecules/DropdownRadioGroup.vue'
export { default as DropdownRadioItem } from './components/molecules/DropdownRadioItem.vue'
export { default as DropdownSub } from './components/molecules/DropdownSub.vue'
export { default as DropdownSubTrigger } from './components/molecules/DropdownSubTrigger.vue'
export { default as DropdownSubContent } from './components/molecules/DropdownSubContent.vue'

// ─── Molecules: Overlay ───
export { default as Dialog } from './components/molecules/Dialog.vue'
export { default as AlertDialog } from './components/molecules/AlertDialog.vue'
export { default as Sheet } from './components/molecules/Sheet.vue'
export { default as Select } from './components/molecules/Select.vue'
export { default as Popover } from './components/molecules/Popover.vue'
export { default as Tooltip } from './components/molecules/Tooltip.vue'

// ─── Molecules: Navigation ───
export { default as Nav } from './components/molecules/Nav.vue'
export { default as NavItem } from './components/molecules/NavItem.vue'
export { default as Breadcrumb } from './components/molecules/Breadcrumb.vue'
export { default as Pagination } from './components/molecules/Pagination.vue'

// ─── Molecules: Data ───
export { default as Accordion } from './components/molecules/Accordion.vue'
export { default as AccordionItem } from './components/molecules/AccordionItem.vue'
export { default as Tabs } from './components/molecules/Tabs.vue'
export { default as Table } from './components/molecules/Table.vue'

// ─── Molecules: Form ───
export { default as FormField } from './components/molecules/FormField.vue'
export { default as FormFieldCheckbox } from './components/molecules/FormFieldCheckbox.vue'

// ─── Molecules: Feedback ───
export { default as Toast } from './components/molecules/Toast.vue'
export { default as Toaster } from './components/molecules/Toaster.vue'

// ─── Molecules: Composite ───
export { default as SectionHeader } from './components/molecules/SectionHeader.vue'
export { default as Toolbar } from './components/molecules/Toolbar.vue'
export { default as SearchInput } from './components/molecules/SearchInput.vue'
export { default as EmptyState } from './components/molecules/EmptyState.vue'
export { default as Stat } from './components/molecules/Stat.vue'

// ─── Organisms (reference implementations) ───
export { default as AppShell } from './components/organisms/AppShell.vue'
export { default as AppHeader } from './components/organisms/AppHeader.vue'
export { default as AppSidebar } from './components/organisms/AppSidebar.vue'
export { default as LoginForm } from './components/organisms/LoginForm.vue'
export { default as DataTable } from './components/organisms/DataTable.vue'
export { default as SettingsSection } from './components/organisms/SettingsSection.vue'

// ─── Icons (internal, available for customization) ───
export {
  IconCheck,
  IconChevronDown,
  IconChevronLeft,
  IconChevronRight,
  IconChevronsLeft,
  IconChevronsRight,
  IconCircle,
  IconClose,
  IconMinus,
  IconSearch,
  IconUser,
} from './base/ui/icons'

export {
  componentVariants,
  componentSizes,
  componentRounded,
  componentTones,
  componentShadow,
  componentResize,
} from './base/lib/props'

export { useToast } from './composables/useToast'
export type { ToastItem } from './composables/useToast'

export type { SpaceToken } from './base/lib/props/space'
export { spaceTokenMap, resolveSpace } from './base/lib/props/space'
