import figma from '@figma/code-connect'
import { FormField } from '@morphink/ui'

figma.connect(
  FormField,
  'https://figma.com/design/X8gSyqGQC7yghrfuc4GIdQ?node-id=54:16',
  {
    example: () =>
      `<FormField label="Email" helper="Enter your email address">
  <template #default="fieldProps">
    <Input v-bind="fieldProps" />
  </template>
</FormField>`,
  }
)
