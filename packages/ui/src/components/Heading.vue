<script setup lang="ts">
/**
 * Heading — semantic heading (h1-h6).
 *
 * Public API layer. Customize defaults here.
 * Style variants: base/ui/typography/HeadingBase.vue
 */
import HeadingBase from '../base/ui/typography/HeadingBase.vue'

type Level = 1 | 2 | 3 | 4 | 5 | 6

withDefaults(
  defineProps<{
    level?: Level
  }>(),
  {
    level: 2,
  }
)
</script>

<template>
  <HeadingBase :level="level">
    <slot />
  </HeadingBase>
</template>
