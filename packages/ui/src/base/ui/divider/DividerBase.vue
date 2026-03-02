<script setup lang="ts">
import { useAttrs } from 'vue'
import { cn } from '../../lib/utils'

defineOptions({ inheritAttrs: false })

withDefaults(
  defineProps<{
    vertical?: boolean
  }>(),
  {
    vertical: false,
  }
)

const attrs = useAttrs()
</script>

<template>
  <div
    :class="
      cn(vertical ? 'h-full w-px' : 'h-px w-full', 'bg-(--morphink-color-border)', attrs.class)
    "
  />
</template>
