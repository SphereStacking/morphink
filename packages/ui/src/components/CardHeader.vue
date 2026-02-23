<script setup lang="ts">
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
