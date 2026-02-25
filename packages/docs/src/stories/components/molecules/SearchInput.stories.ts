import { SearchInput, Stack } from '@morphink/ui'
import type { Meta, StoryObj } from '@storybook/vue3-vite'

const meta: Meta<typeof SearchInput> = {
  title: 'Components/Molecules/SearchInput',
  component: SearchInput,
  tags: ['autodocs'],
  argTypes: {
    placeholder: { control: 'text' },
    size: { control: 'select', options: ['xs', 'sm', 'md', 'lg', 'xl'] },
  },
}

export default meta
type Story = StoryObj<typeof SearchInput>

export const Default: Story = {
  args: {
    placeholder: 'Search...',
  },
}

export const WithValue: Story = {
  args: {
    modelValue: 'design tokens',
    placeholder: 'Search...',
  },
}

export const Sizes: Story = {
  render: () => ({
    components: { SearchInput, Stack },
    template: `
      <Stack gap="md" style="max-width: 400px">
        <SearchInput size="sm" placeholder="Small search..." />
        <SearchInput size="md" placeholder="Medium search..." />
        <SearchInput size="lg" placeholder="Large search..." />
      </Stack>
    `,
  }),
}
