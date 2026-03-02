<script setup lang="ts">
import { cn } from '../../lib/utils'

defineOptions({ inheritAttrs: false })
</script>

<template>
  <p
    :class="
      cn(
        'text-(length:--morphink-font-size-body) leading-(--morphink-font-line-height-body) text-(color:--morphink-color-muted-foreground)',
        $attrs.class as string
      )
    "
  >
    <slot />
  </p>
</template>
