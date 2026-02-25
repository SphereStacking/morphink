<script setup lang="ts">
/**
 * LoginForm — reference implementation.
 *
 * Organism: provides a login form layout.
 * Fork and customize for your product's authentication flow.
 */
import { ref } from 'vue'
import Card from '../atoms/Card.vue'
import CardHeader from '../atoms/CardHeader.vue'
import CardBody from '../atoms/CardBody.vue'
import CardFooter from '../atoms/CardFooter.vue'
import CardTitle from '../atoms/CardTitle.vue'
import Stack from '../atoms/Stack.vue'
import Button from '../atoms/Button.vue'
import Input from '../atoms/Input.vue'
import FormField from '../molecules/FormField.vue'

withDefaults(
  defineProps<{
    title?: string
    submitLabel?: string
    loading?: boolean
  }>(),
  {
    title: 'Sign in',
    submitLabel: 'Sign in',
    loading: false,
  }
)

const emit = defineEmits<{
  (e: 'submit', payload: { email: string; password: string }): void
}>()

const email = ref('')
const password = ref('')

function handleSubmit() {
  emit('submit', { email: email.value, password: password.value })
}
</script>

<template>
  <Card :style="{ maxWidth: '400px', width: '100%' }">
    <CardHeader>
      <slot name="header">
        <CardTitle>{{ title }}</CardTitle>
      </slot>
    </CardHeader>
    <CardBody>
      <form @submit.prevent="handleSubmit">
        <Stack gap="lg">
          <FormField label="Email" label-for="login-email" required>
            <Input
              id="login-email"
              v-model="email"
              type="email"
              placeholder="you@example.com"
              :disabled="loading"
            />
          </FormField>
          <FormField label="Password" label-for="login-password" required>
            <Input
              id="login-password"
              v-model="password"
              type="password"
              placeholder="Enter your password"
              :disabled="loading"
            />
          </FormField>
          <Button type="submit" tone="primary" :disabled="loading">
            {{ loading ? 'Signing in...' : submitLabel }}
          </Button>
        </Stack>
      </form>
    </CardBody>
    <CardFooter v-if="$slots.footer">
      <slot name="footer" />
    </CardFooter>
  </Card>
</template>
