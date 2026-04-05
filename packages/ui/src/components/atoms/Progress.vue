<script setup lang="ts">
/**
 * Progress — progress bar for determinate and indeterminate states.
 *
 * Public API layer. Customize defaults here.
 * Style variants: base/ui/progress/ProgressBase.vue
 */
import ProgressBase from '../../base/ui/progress/ProgressBase.vue'
import type { ProgressSize, ProgressTone, ProgressRounded, ProgressDuration, ProgressEasing } from '../../base/lib/props'

withDefaults(
  defineProps<{
    value?: number
    max?: number
    size?: ProgressSize
    tone?: ProgressTone
    rounded?: ProgressRounded
    duration?: ProgressDuration
    easing?: ProgressEasing
  }>(),
  {
    max: 100,
    size: 'md',
    tone: 'primary',
    rounded: 'full',
    duration: 'normal',
    easing: 'standard',
  }
)
</script>

<template>
  <ProgressBase :value="value" :max="max" :size="size" :tone="tone" :rounded="rounded" :duration="duration" :easing="easing" />
</template>
