<script setup lang="ts">
defineOptions({ inheritAttrs: false })
import { computed } from 'vue'
import {
  CollapsibleRoot,
  CollapsibleTrigger,
  CollapsibleContent,
  useForwardPropsEmits,
} from 'reka-ui'
import type { CollapsibleDuration, CollapsibleEasing } from '../../lib/props'

const props = withDefaults(
  defineProps<{
    open?: boolean
    defaultOpen?: boolean
    disabled?: boolean
    duration?: CollapsibleDuration
    easing?: CollapsibleEasing
  }>(),
  {
    duration: 'normal',
    easing: 'standard',
  }
)

const emit = defineEmits<{
  (e: 'update:open', value: boolean): void
}>()

const rekaProps = computed(() => ({
  ...(props.open !== undefined && { open: props.open }),
  ...(props.defaultOpen !== undefined && { defaultOpen: props.defaultOpen }),
  disabled: props.disabled,
}))

const forwarded = useForwardPropsEmits(rekaProps, emit)

const durationMap: Record<CollapsibleDuration, string> = {
  instant: 'var(--morphink-duration-instant)',
  fast: 'var(--morphink-duration-fast)',
  normal: 'var(--morphink-duration-normal)',
  slow: 'var(--morphink-duration-slow)',
  slower: 'var(--morphink-duration-slower)',
}

const easingMap: Record<CollapsibleEasing, string> = {
  standard: 'var(--morphink-easing-standard)',
  decelerate: 'var(--morphink-easing-decelerate)',
  accelerate: 'var(--morphink-easing-accelerate)',
  'emphasized-decelerate': 'var(--morphink-easing-emphasized-decelerate)',
  'emphasized-accelerate': 'var(--morphink-easing-emphasized-accelerate)',
  linear: 'var(--morphink-easing-linear)',
  spring: 'var(--morphink-easing-spring)',
}
</script>

<template>
  <CollapsibleRoot data-morphink v-bind="forwarded">
    <CollapsibleTrigger asChild>
      <slot name="trigger" />
    </CollapsibleTrigger>
    <CollapsibleContent
      class="grid [transition-property:grid-template-rows] data-[state=closed]:grid-rows-[0fr] data-[state=open]:grid-rows-[1fr]"
      :style="{
        transitionDuration: durationMap[props.duration],
        transitionTimingFunction: easingMap[props.easing],
      }"
    >
      <div
        class="min-h-0 overflow-hidden [transition-property:opacity] [[data-state=closed]_&]:opacity-0 [[data-state=open]_&]:opacity-100"
        :style="{
          transitionDuration: durationMap[props.duration],
          transitionTimingFunction: easingMap[props.easing],
        }"
      >
        <slot />
      </div>
    </CollapsibleContent>
  </CollapsibleRoot>
</template>
