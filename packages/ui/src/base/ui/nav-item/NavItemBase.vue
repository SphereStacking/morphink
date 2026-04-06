<script setup lang="ts">
defineOptions({ inheritAttrs: false })
import { computed, useAttrs } from 'vue'
import { cn } from '../../lib/utils'

const props = withDefaults(
  defineProps<{
    active?: boolean
  }>(),
  {
    active: false,
  }
)

const attrs = useAttrs()

const classes = computed(() =>
  cn(
    // layout
    'flex cursor-pointer items-center gap-(--morphink-space-sm) no-underline',
    'px-(--morphink-space-md) py-(--morphink-space-sm)',
    'rounded-(--morphink-radius-md)',
    // active indicator
    'border-l-2 border-l-transparent',
    // typography
    'text-(length:--morphink-font-size-body) font-medium',
    // default color
    'text-(--morphink-color-muted-foreground)',
    // transition
    '[transition-property:background-color,color,border-color]',
    '[transition-duration:var(--morphink-duration-fast)]',
    '[transition-timing-function:var(--morphink-easing-standard)]',
    // focus
    'focus-visible:ring-2 focus-visible:ring-(--morphink-color-accent) focus-visible:outline-hidden',
    // active state (prop)
    props.active
      ? cn(
          'bg-[color-mix(in_srgb,var(--morphink-color-accent)_12%,transparent)]',
          'text-(--morphink-color-accent)',
          'border-l-(color:--morphink-color-accent)',
          'hover:bg-[color-mix(in_srgb,var(--morphink-color-accent)_16%,transparent)]'
        )
      : cn(
          'hover:bg-[color-mix(in_srgb,var(--morphink-color-foreground)_6%,transparent)]',
          'hover:text-(--morphink-color-foreground)',
          'active:bg-[color-mix(in_srgb,var(--morphink-color-foreground)_10%,transparent)]'
        ),
    attrs.class
  )
)
</script>

<template>
  <a data-morphink :class="classes" v-bind="attrs">
    <slot />
  </a>
</template>
