<template>
  <p :class="cn('text-(--morphink-font-size-body) leading-(--morphink-font-line-height-body) text-(--morphink-color-muted-foreground)', $attrs.class)">
    <slot />
  </p>
</template>

<script setup lang="ts">
import { cn } from '../../lib/utils'
</script>
