import { Breadcrumb } from '@morphink/ui'
import type { Meta, StoryObj } from '@storybook/vue3-vite'

const meta: Meta<typeof Breadcrumb> = {
  title: 'Components/Molecules/Breadcrumb',
  component: Breadcrumb,
  tags: ['autodocs'],
  argTypes: {
    separator: { control: 'text' },
  },
}

export default meta
type Story = StoryObj<typeof Breadcrumb>

export const Default: Story = {
  args: {
    items: [
      { label: 'Home', href: '/' },
      { label: 'Products', href: '/products' },
      { label: 'Categories', href: '/products/categories' },
      { label: 'Electronics' },
    ],
  },
}

export const CustomSeparator: Story = {
  args: {
    items: [
      { label: 'Home', href: '/' },
      { label: 'Dashboard', href: '/dashboard' },
      { label: 'Settings' },
    ],
    separator: '›',
  },
}

export const TwoItems: Story = {
  args: {
    items: [
      { label: 'Home', href: '/' },
      { label: 'About' },
    ],
  },
}
