<script setup lang="ts">
defineOptions({ inheritAttrs: false })
import { computed } from 'vue'
import {
  CollapsibleRoot,
  CollapsibleTrigger,
  CollapsibleContent,
  useForwardPropsEmits,
} from 'reka-ui'

const props = defineProps<{
  open?: boolean
  defaultOpen?: boolean
  disabled?: boolean
}>()

const emit = defineEmits<{
  (e: 'update:open', value: boolean): void
}>()

const rekaProps = computed(() => ({
  ...(props.open !== undefined && { open: props.open }),
  ...(props.defaultOpen !== undefined && { defaultOpen: props.defaultOpen }),
  disabled: props.disabled,
}))

const forwarded = useForwardPropsEmits(rekaProps, emit)
</script>

<template>
  <CollapsibleRoot data-morphink v-bind="forwarded">
    <CollapsibleTrigger asChild>
      <slot name="trigger" />
    </CollapsibleTrigger>
    <CollapsibleContent
      class="grid [transition-property:grid-template-rows] [transition-duration:var(--morphink-duration-normal)] [transition-timing-function:var(--morphink-easing-standard)] data-[state=open]:grid-rows-[1fr] data-[state=closed]:grid-rows-[0fr]"
    >
      <div class="min-h-0 overflow-hidden [[data-state=closed]_&]:opacity-0 [[data-state=open]_&]:opacity-100 [transition-property:opacity] [transition-duration:var(--morphink-duration-normal)] [transition-timing-function:var(--morphink-easing-standard)]">
        <slot />
      </div>
    </CollapsibleContent>
  </CollapsibleRoot>
</template>
