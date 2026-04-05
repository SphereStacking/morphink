<script setup lang="ts">
import { cn } from '../../lib/utils'

defineOptions({ inheritAttrs: false })
</script>

<template>
  <div
    data-morphink
    :class="
      cn(
        'flex items-center gap-(--morphink-space-md) px-(--morphink-space-lg) pt-(--morphink-space-lg)',
        $attrs.class as string
      )
    "
  >
    <div class="flex-1">
      <slot />
    </div>
    <div v-if="$slots.actions" class="shrink-0">
      <slot name="actions" />
    </div>
  </div>
</template>
