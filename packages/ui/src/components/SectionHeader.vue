<script setup lang="ts">
/**
 * SectionHeader — section title with optional actions.
 *
 * Public API layer. Customize defaults here.
 * Style variants: base/ui/section-header/SectionHeaderBase.vue
 */
import SectionHeaderBase from '../base/ui/section-header/SectionHeaderBase.vue'

withDefaults(
  defineProps<{
    size?: 'sm' | 'md'
  }>(),
  {
    size: 'md',
  }
)
</script>

<template>
  <SectionHeaderBase :size="size">
    <template #title>
      <slot name="title" />
    </template>
    <template v-if="$slots.subtitle" #subtitle>
      <slot name="subtitle" />
    </template>
    <template v-if="$slots.action" #action>
      <slot name="action" />
    </template>
  </SectionHeaderBase>
</template>
