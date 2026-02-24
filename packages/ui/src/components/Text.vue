<script setup lang="ts">
/**
 * Text — body text block.
 *
 * Public API layer. Customize defaults here.
 * Style variants: base/ui/typography/TextBase.vue
 */
import TextBase from '../base/ui/typography/TextBase.vue'

type Variant = 'body' | 'caption' | 'label'
type Weight = 'regular' | 'medium' | 'semibold' | 'bold'

withDefaults(
  defineProps<{
    variant?: Variant
    weight?: Weight
    muted?: boolean
  }>(),
  {
    variant: 'body',
    weight: 'regular',
    muted: false,
  }
)
</script>

<template>
  <TextBase :variant="variant" :weight="weight" :muted="muted">
    <slot />
  </TextBase>
</template>
