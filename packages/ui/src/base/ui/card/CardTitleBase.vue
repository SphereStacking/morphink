<template>
  <h3 :class="cn('text-(--morphink-font-size-subheading) font-semibold leading-(--morphink-font-line-height-subheading) text-(--morphink-color-foreground)', $attrs.class)">
    <slot />
  </h3>
</template>

<script setup lang="ts">
import { cn } from '../../lib/utils'
</script>
