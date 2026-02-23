<template>
  <h3 :class="cn('text-(length:--morphink-font-size-subheading) font-semibold leading-(--morphink-font-line-height-subheading) text-(color:--morphink-color-foreground)', $attrs.class as string)">
    <slot />
  </h3>
</template>

<script setup lang="ts">
import { cn } from '../../lib/utils'
</script>
