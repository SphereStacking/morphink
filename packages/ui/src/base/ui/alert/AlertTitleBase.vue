<script setup lang="ts">
import { cn } from '../../lib/utils'
</script>

<template>
  <h5 :class="cn('font-semibold leading-(--morphink-font-line-height-heading) tracking-tight', $attrs.class as string)">
    <slot />
  </h5>
</template>
