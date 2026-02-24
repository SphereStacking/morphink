<script setup lang="ts">
/**
 * CardHeader — header section of Card.
 *
 * Part of Card compound component.
 * Style variants: base/ui/card/CardHeaderBase.vue
 */
import CardHeaderBase from '../base/ui/card/CardHeaderBase.vue'
</script>

<template>
  <CardHeaderBase>
    <slot />
    <template v-if="$slots.actions" #actions>
      <slot name="actions" />
    </template>
  </CardHeaderBase>
</template>
