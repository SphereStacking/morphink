<script setup lang="ts">
import { LoginForm, Text } from '@morphink/ui'
import { defineMeta } from 'sb-addon-vue-csf'

const { Story } = defineMeta({
  title: 'Components/Organisms/LoginForm',
  component: LoginForm,
  tags: ['autodocs'],
  argTypes: {
    title: { control: 'text' },
    submitLabel: { control: 'text' },
    loading: { control: 'boolean' },
  },
})
</script>

<template>
  <Story name="Default" :args="{ title: 'Sign in', submitLabel: 'Sign in' }">
    <template #template="{ args }">
      <div style="display: flex; justify-content: center; padding: var(--morphink-space-2xl)">
        <LoginForm v-bind="args" />
      </div>
    </template>
  </Story>

  <Story name="Loading" :args="{ title: 'Sign in', loading: true }">
    <template #template="{ args }">
      <div style="display: flex; justify-content: center; padding: var(--morphink-space-2xl)">
        <LoginForm v-bind="args" />
      </div>
    </template>
  </Story>

  <Story name="WithFooter" :args="{ title: 'Welcome back' }">
    <template #template="{ args }">
      <div style="display: flex; justify-content: center; padding: var(--morphink-space-2xl)">
        <LoginForm v-bind="args">
          <template #footer>
            <Text variant="caption" muted :style="{ textAlign: 'center' }">
              Don't have an account? <a href="#" :style="{ color: 'var(--morphink-color-accent)' }">Sign up</a>
            </Text>
          </template>
        </LoginForm>
      </div>
    </template>
  </Story>
</template>
