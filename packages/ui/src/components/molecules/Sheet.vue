<script setup lang="ts">
/**
 * Sheet — slide-in side panel overlay.
 *
 * Wraps Reka UI Dialog primitive. Customize defaults or add
 * product-level features here.
 * Style variants: base/ui/sheet/SheetBase.vue
 */
import SheetBase from '../../base/ui/sheet/SheetBase.vue'
import type { SheetRounded, SheetShadow, SheetSize } from '../../base/lib/props'

withDefaults(
  defineProps<{
    open?: boolean
    defaultOpen?: boolean
    modal?: boolean
    side?: 'left' | 'right' | 'top' | 'bottom'
    title?: string
    description?: string
    closeLabel?: string
    size?: SheetSize
    rounded?: SheetRounded
    shadow?: SheetShadow
  }>(),
  {
    open: undefined,
    defaultOpen: undefined,
    modal: true,
    side: 'right',
    closeLabel: 'Close',
    size: 'md',
    rounded: 'none',
    shadow: 'lg',
  }
)

defineEmits<{
  'update:open': [value: boolean]
}>()
</script>

<template>
  <SheetBase
    :open="open"
    :default-open="defaultOpen"
    :modal="modal"
    :side="side"
    :title="title"
    :description="description"
    :size="size"
    :close-label="closeLabel"
    :rounded="rounded"
    :shadow="shadow"
    @update:open="$emit('update:open', $event)"
  >
    <template v-if="$slots.trigger" #trigger>
      <slot name="trigger" />
    </template>
    <slot />
    <template v-if="$slots.footer" #footer>
      <slot name="footer" />
    </template>
  </SheetBase>
</template>
