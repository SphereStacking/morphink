import { Box, Stack, Text } from '@morphink/ui'
import type { Meta, StoryObj } from '@storybook/vue3-vite'

const meta: Meta<typeof Box> = {
  title: 'Components/Atoms/Box',
  component: Box,
  tags: ['autodocs'],
  argTypes: {
    as: { control: 'text' },
    padding: { control: 'select', options: ['xs', 'sm', 'md', 'lg', 'xl', '2xl'] },
    paddingX: { control: 'select', options: ['xs', 'sm', 'md', 'lg', 'xl', '2xl'] },
    paddingY: { control: 'select', options: ['xs', 'sm', 'md', 'lg', 'xl', '2xl'] },
    overflow: { control: 'select', options: ['auto', 'hidden', 'scroll'] },
    position: { control: 'select', options: ['relative', 'absolute', 'fixed', 'sticky'] },
    grow: { control: 'boolean' },
    shrink: { control: 'boolean' },
  },
}

export default meta
type Story = StoryObj<typeof Box>

export const Default: Story = {
  render: (args) => ({
    components: { Box, Text },
    setup() {
      return { args }
    },
    template: `
      <Box v-bind="args" :style="{ border: 'var(--morphink-border-width-default) solid var(--morphink-color-border)' }">
        <Text>Content inside a Box</Text>
      </Box>
    `,
  }),
  args: {
    padding: 'lg',
  },
}

export const Overflow: Story = {
  render: () => ({
    components: { Box, Text },
    template: `
      <Box overflow="auto" height="120px" padding="md"
        :style="{ border: 'var(--morphink-border-width-default) solid var(--morphink-color-border)' }">
        <Text v-for="i in 20" :key="i">Line {{ i }} — scrollable content</Text>
      </Box>
    `,
  }),
}

export const FlexGrow: Story = {
  render: () => ({
    components: { Box, Stack, Text },
    template: `
      <Stack direction="row" gap="md" :style="{ height: '200px' }">
        <Box padding="md" :style="{ border: 'var(--morphink-border-width-default) solid var(--morphink-color-border)', width: '100px' }">
          <Text>Fixed</Text>
        </Box>
        <Box grow padding="md" :style="{ border: 'var(--morphink-border-width-default) solid var(--morphink-color-border)' }">
          <Text>Grows to fill remaining space</Text>
        </Box>
      </Stack>
    `,
  }),
}
