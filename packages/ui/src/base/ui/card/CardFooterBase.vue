<template>
  <div :class="cn('flex items-center gap-(--morphink-space-md) px-(--morphink-space-lg) pb-(--morphink-space-lg)', $attrs.class)">
    <slot />
  </div>
</template>

<script setup lang="ts">
import { cn } from '../../lib/utils'
</script>
