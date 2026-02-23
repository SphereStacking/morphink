<template>
  <CardBase :variant="variant" :rounded="rounded" :shadow="shadow">
    <slot />
  </CardBase>
</template>

<script setup lang="ts">
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
