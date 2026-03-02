<script setup lang="ts">
/**
 * Avatar — user profile image with fallback.
 *
 * Public API layer. Customize defaults here.
 * Style variants: base/ui/avatar/AvatarBase.vue
 */
import AvatarBase from '../../base/ui/avatar/AvatarBase.vue'
import type { AvatarRounded, AvatarSize } from '../../base/lib/props'

withDefaults(
  defineProps<{
    src?: string
    alt?: string
    fallback?: string
    size?: AvatarSize
    rounded?: AvatarRounded
  }>(),
  {
    size: 'md',
    rounded: 'full',
  }
)
</script>

<template>
  <AvatarBase :src="src" :alt="alt" :fallback="fallback" :size="size" :rounded="rounded">
    <template v-if="$slots.fallback" #fallback>
      <slot name="fallback" />
    </template>
  </AvatarBase>
</template>
