<template>
  <TextBase :variant="variant" :weight="weight" :muted="muted">
    <slot />
  </TextBase>
</template>

<script setup lang="ts">
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
