<script setup lang="ts">
import TooltipBase from '../base/ui/tooltip/TooltipBase.vue'
import type { TooltipRounded, TooltipShadow } from '../base/lib/props'

withDefaults(
  defineProps<{
    content?: string
    open?: boolean
    onOpenChange?: (open: boolean) => void
    side?: 'top' | 'right' | 'bottom' | 'left'
    align?: 'start' | 'center' | 'end'
    delay?: number
    rounded?: TooltipRounded
    shadow?: TooltipShadow
  }>(),
  {
    side: 'top',
    align: 'center',
    delay: 200,
    rounded: 'md',
    shadow: 'md',
  }
)
</script>

<template>
  <TooltipBase
    :content="content"
    :open="open"
    :on-open-change="onOpenChange"
    :side="side"
    :align="align"
    :delay="delay"
    :rounded="rounded"
    :shadow="shadow"
  >
    <slot />
    <template v-if="$slots.content" #content>
      <slot name="content" />
    </template>
  </TooltipBase>
</template>
