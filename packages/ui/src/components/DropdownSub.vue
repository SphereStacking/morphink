<script setup lang="ts">
import DropdownSubBase from '../base/ui/dropdown/DropdownSubBase.vue'
import { useForwardPropsEmits } from 'reka-ui'

const props = defineProps<{
  open?: boolean
  defaultOpen?: boolean
}>()

const emit = defineEmits<{
  (e: 'update:open', value: boolean): void
}>()

const forwarded = useForwardPropsEmits(props, emit)
</script>

<template>
  <DropdownSubBase v-bind="forwarded">
    <slot />
  </DropdownSubBase>
</template>
