import figma from '@figma/code-connect'
import { Dropdown } from '@morphink/ui'

figma.connect(
  Dropdown,
  'https://figma.com/design/X8gSyqGQC7yghrfuc4GIdQ?node-id=55:2',
  {
    example: () =>
      `<Dropdown>
  <DropdownTrigger>
    <Button>Open Menu</Button>
  </DropdownTrigger>
  <DropdownContent>
    <DropdownItem>Edit</DropdownItem>
    <DropdownItem>Duplicate</DropdownItem>
    <DropdownSeparator />
    <DropdownItem>Delete</DropdownItem>
  </DropdownContent>
</Dropdown>`,
  }
)
