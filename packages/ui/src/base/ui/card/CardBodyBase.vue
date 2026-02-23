<script setup lang="ts">
import { cn } from '../../lib/utils'
</script>

<template>
  <div :class="cn('p-(--morphink-space-lg)', $attrs.class as string)">
    <slot />
  </div>
</template>
