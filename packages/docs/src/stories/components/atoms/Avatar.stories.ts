import { Avatar, Stack } from '@morphink/ui'
import { componentRounded, componentSizes } from '@morphink/ui'
import type { Meta, StoryObj } from '@storybook/vue3-vite'

const meta: Meta<typeof Avatar> = {
  title: 'Components/Atoms/Avatar',
  component: Avatar,
  tags: ['autodocs'],
  argTypes: {
    size: { control: { type: 'select' }, options: componentSizes.Avatar },
    rounded: { control: { type: 'select' }, options: componentRounded.Avatar },
    src: { control: 'text' },
    alt: { control: 'text' },
    fallback: { control: 'text' },
  },
  args: {
    size: 'md',
    rounded: 'full',
    src: 'https://i.pravatar.cc/150?u=morphink',
    alt: 'User avatar',
    fallback: 'MK',
  },
}

export default meta
type Story = StoryObj<typeof Avatar>

export const Default: Story = {
  render: (args) => ({
    components: { Avatar },
    setup() {
      return { args }
    },
    template: `
      <Avatar :src="args.src" :alt="args.alt" :fallback="args.fallback" :size="args.size" :rounded="args.rounded" />
    `,
  }),
}

export const Sizes: Story = {
  render: () => ({
    components: { Avatar, Stack },
    template: `
      <Stack direction="row" gap="md" align="center">
        <Avatar size="xs" fallback="XS" />
        <Avatar size="sm" fallback="SM" />
        <Avatar size="md" fallback="MD" />
        <Avatar size="lg" fallback="LG" />
        <Avatar size="xl" fallback="XL" />
      </Stack>
    `,
  }),
}

export const WithImage: Story = {
  render: () => ({
    components: { Avatar, Stack },
    template: `
      <Stack direction="row" gap="md" align="center">
        <Avatar size="xs" src="https://i.pravatar.cc/150?u=a" alt="User A" fallback="A" />
        <Avatar size="sm" src="https://i.pravatar.cc/150?u=b" alt="User B" fallback="B" />
        <Avatar size="md" src="https://i.pravatar.cc/150?u=c" alt="User C" fallback="C" />
        <Avatar size="lg" src="https://i.pravatar.cc/150?u=d" alt="User D" fallback="D" />
        <Avatar size="xl" src="https://i.pravatar.cc/150?u=e" alt="User E" fallback="E" />
      </Stack>
    `,
  }),
}

export const Fallback: Story = {
  render: () => ({
    components: { Avatar, Stack },
    template: `
      <Stack direction="row" gap="md" align="center">
        <Avatar fallback="TK" />
        <Avatar fallback="AB" />
        <Avatar />
      </Stack>
    `,
  }),
}

export const Rounded: Story = {
  render: () => ({
    components: { Avatar, Stack },
    template: `
      <Stack direction="row" gap="md" align="center">
        <Avatar rounded="none" fallback="N" />
        <Avatar rounded="sm" fallback="SM" />
        <Avatar rounded="md" fallback="MD" />
        <Avatar rounded="lg" fallback="LG" />
        <Avatar rounded="xl" fallback="XL" />
        <Avatar rounded="full" fallback="F" />
      </Stack>
    `,
  }),
}

export const BrokenImage: Story = {
  render: () => ({
    components: { Avatar, Stack },
    template: `
      <Stack direction="row" gap="md" align="center">
        <Avatar src="https://broken-url.invalid/photo.jpg" fallback="BK" />
        <Avatar src="https://broken-url.invalid/photo.jpg" />
      </Stack>
    `,
  }),
}
