<script setup lang="ts">
import { cn } from '../../lib/utils'

defineOptions({ inheritAttrs: false })
</script>

<template>
  <div :class="cn('overflow-hidden', $attrs.class as string)">
    <slot />
  </div>
</template>
