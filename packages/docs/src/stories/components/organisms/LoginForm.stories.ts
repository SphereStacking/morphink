import { LoginForm, Text } from '@morphink/ui'
import type { Meta, StoryObj } from '@storybook/vue3-vite'

const meta: Meta<typeof LoginForm> = {
  title: 'Components/Organisms/LoginForm',
  component: LoginForm,
  tags: ['autodocs'],
  argTypes: {
    title: { control: 'text' },
    submitLabel: { control: 'text' },
    loading: { control: 'boolean' },
  },
}

export default meta
type Story = StoryObj<typeof LoginForm>

export const Default: Story = {
  render: (args) => ({
    components: { LoginForm },
    setup() {
      return { args }
    },
    template: `
      <div style="display: flex; justify-content: center; padding: var(--morphink-space-2xl)">
        <LoginForm v-bind="args" />
      </div>
    `,
  }),
  args: {
    title: 'Sign in',
    submitLabel: 'Sign in',
  },
}

export const Loading: Story = {
  render: (args) => ({
    components: { LoginForm },
    setup() {
      return { args }
    },
    template: `
      <div style="display: flex; justify-content: center; padding: var(--morphink-space-2xl)">
        <LoginForm v-bind="args" />
      </div>
    `,
  }),
  args: {
    title: 'Sign in',
    loading: true,
  },
}

export const WithFooter: Story = {
  render: (args) => ({
    components: { LoginForm, Text },
    setup() {
      return { args }
    },
    template: `
      <div style="display: flex; justify-content: center; padding: var(--morphink-space-2xl)">
        <LoginForm v-bind="args">
          <template #footer>
            <Text variant="caption" muted :style="{ textAlign: 'center' }">
              Don't have an account? <a href="#" :style="{ color: 'var(--morphink-color-accent)' }">Sign up</a>
            </Text>
          </template>
        </LoginForm>
      </div>
    `,
  }),
  args: {
    title: 'Welcome back',
  },
}
