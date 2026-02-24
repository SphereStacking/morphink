<script setup lang="ts">
/**
 * Stack — flex layout container.
 *
 * Public API layer. Customize defaults here.
 * Style variants: base/ui/layout/StackBase.vue
 */
import StackBase from '../base/ui/layout/StackBase.vue'
import type { SpaceToken } from '../base/lib/props/space'

withDefaults(
  defineProps<{
    direction?: 'row' | 'column'
    gap?: SpaceToken | string
    align?: 'start' | 'center' | 'end' | 'stretch' | 'baseline'
    justify?: 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly'
    wrap?: boolean
  }>(),
  {
    direction: 'column',
    gap: 'md',
    align: 'stretch',
    justify: 'start',
    wrap: false,
  }
)
</script>

<template>
  <StackBase :direction="direction" :gap="gap" :align="align" :justify="justify" :wrap="wrap">
    <slot />
  </StackBase>
</template>
