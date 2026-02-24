<script setup lang="ts">
/**
 * Badge — status or count indicator.
 *
 * Public API layer. Customize defaults here.
 * Style variants: base/ui/badge/BadgeBase.vue
 */
import BadgeBase from '../base/ui/badge/BadgeBase.vue'
import type { BadgeRounded, BadgeSize, BadgeTone, BadgeVariant } from '../base/lib/props'

withDefaults(
  defineProps<{
    size?: BadgeSize
    tone?: BadgeTone
    variant?: BadgeVariant
    rounded?: BadgeRounded
  }>(),
  {
    size: 'md',
    tone: 'base',
    variant: 'solid',
    rounded: 'full',
  }
)
</script>

<template>
  <BadgeBase :tone="tone" :variant="variant" :rounded="rounded" :size="size">
    <slot />
  </BadgeBase>
</template>
