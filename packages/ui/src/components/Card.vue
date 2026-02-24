<script setup lang="ts">
/**
 * Card — content container with sections.
 *
 * Root of compound component. See Card* siblings.
 * Public API layer. Customize defaults here.
 * Style variants: base/ui/card/CardBase.vue
 */
import CardBase from '../base/ui/card/CardBase.vue'
import type { CardRounded, CardShadow, CardVariant } from '../base/lib/props'

withDefaults(
  defineProps<{
    variant?: CardVariant
    rounded?: CardRounded
    shadow?: CardShadow
  }>(),
  {
    variant: 'elevated',
    rounded: 'lg',
    shadow: 'md',
  }
)
</script>

<template>
  <CardBase :variant="variant" :rounded="rounded" :shadow="shadow">
    <slot />
  </CardBase>
</template>
