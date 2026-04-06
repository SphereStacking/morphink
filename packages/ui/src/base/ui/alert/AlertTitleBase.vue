<script setup lang="ts">
import { cn } from '../../lib/utils'

defineOptions({ inheritAttrs: false })
</script>

<template>
  <h5
    data-morphink
    :class="
      cn(
        'leading-(--morphink-font-line-height-heading) font-semibold tracking-tight',
        $attrs.class as string
      )
    "
  >
    <slot />
  </h5>
</template>
