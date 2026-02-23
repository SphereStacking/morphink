<template>
  <div :class="cn('p-(--morphink-space-lg)', $attrs.class)">
    <slot />
  </div>
</template>

<script setup lang="ts">
import { cn } from '../../lib/utils'
</script>
