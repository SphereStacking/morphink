<script setup lang="ts">
import DropdownBase from '../base/ui/dropdown/DropdownBase.vue'
import type { DropdownRounded, DropdownShadow } from '../base/lib/props'

type Item = {
  label: string
  value: string
  disabled?: boolean
  danger?: boolean
}

withDefaults(
  defineProps<{
    items?: Item[]
    open?: boolean
    onOpenChange?: (open: boolean) => void
    onSelect?: (value: string) => void
    side?: 'top' | 'right' | 'bottom' | 'left'
    align?: 'start' | 'center' | 'end'
    rounded?: DropdownRounded
    shadow?: DropdownShadow
  }>(),
  {
    items: () => [],
    side: 'bottom',
    align: 'start',
    rounded: 'md',
    shadow: 'md',
  }
)
</script>

<template>
  <DropdownBase
    :items="items"
    :open="open"
    :on-open-change="onOpenChange"
    :on-select="onSelect"
    :side="side"
    :align="align"
    :rounded="rounded"
    :shadow="shadow"
  >
    <template #trigger>
      <slot name="trigger" />
    </template>
    <template v-if="$slots.content" #content>
      <slot name="content" />
    </template>
  </DropdownBase>
</template>
