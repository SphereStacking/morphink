<template>
  <CardBase :variant="variant" :rounded="rounded" :shadow="shadow">
    <template v-if="$slots.header" #header>
      <slot name="header" />
    </template>
    <slot />
    <template v-if="$slots.footer" #footer>
      <slot name="footer" />
    </template>
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
