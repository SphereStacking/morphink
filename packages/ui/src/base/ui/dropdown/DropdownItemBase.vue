<script setup lang="ts">
import { computed, inject, ref } from 'vue'
import { DropdownMenuItem } from 'reka-ui'
import { cn } from '../../lib/utils'
import type { DropdownSize } from '../../lib/props'
import { dropdownSizeKey } from './dropdownContext'

const props = withDefaults(
  defineProps<{
    disabled?: boolean
    destructive?: boolean
    textValue?: string
  }>(),
  {
    disabled: false,
    destructive: false,
  }
)

const emit = defineEmits<{
  (e: 'select', event: Event): void
}>()

const size = inject(dropdownSizeKey, ref('md' as DropdownSize))

const sizeClasses: Record<DropdownSize, string> = {
  sm: 'py-1 px-1.5 text-xs',
  md: 'py-[6px] px-(--morphink-space-sm) text-[13px]',
  lg: 'py-2 px-3 text-sm',
}

const classes = computed(() =>
  cn(
    'flex items-center gap-2 rounded-(--morphink-radius-sm) outline-hidden cursor-default',
    sizeClasses[size.value],
    props.destructive
      ? 'text-(--morphink-color-destructive) focus:bg-[color-mix(in_srgb,var(--morphink-color-destructive)_8%,transparent)]'
      : 'text-(--morphink-color-foreground) focus:bg-(--morphink-color-muted)',
    props.disabled && 'opacity-50 pointer-events-none'
  )
)
</script>

<template>
  <DropdownMenuItem
    :disabled="disabled"
    :text-value="textValue"
    :class="classes"
    @select="emit('select', $event)"
  >
    <span v-if="$slots.icon" class="shrink-0">
      <slot name="icon" />
    </span>
    <slot />
  </DropdownMenuItem>
</template>
