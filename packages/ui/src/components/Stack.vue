<template>
  <StackBase :direction="direction" :gap="gap" :align="align" :justify="justify" :wrap="wrap">
    <slot />
  </StackBase>
</template>

<script setup lang="ts">
import StackBase from '../base/ui/layout/StackBase.vue'

withDefaults(
  defineProps<{
    direction?: 'row' | 'column'
    gap?: string
    align?: string
    justify?: string
    wrap?: boolean
  }>(),
  {
    direction: 'column',
    gap: 'var(--space-md)',
    align: 'stretch',
    justify: 'flex-start',
    wrap: false,
  }
)
</script>
