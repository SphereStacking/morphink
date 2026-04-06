<script setup lang="ts">
import { cn } from '../../lib/utils'

defineOptions({ inheritAttrs: false })
</script>

<template>
  <h3
    data-morphink
    :class="
      cn(
        'text-(length:--morphink-font-size-h3) leading-(--morphink-font-line-height-heading) font-semibold text-(color:--morphink-color-foreground)',
        $attrs.class as string
      )
    "
  >
    <slot />
  </h3>
</template>
