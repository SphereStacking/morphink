<template>
  <PanelBase :variant="variant" :interactive="interactive" :rounded="rounded" :shadow="shadow">
    <slot />
  </PanelBase>
</template>

<script setup lang="ts">
import PanelBase from '../base/ui/panel/PanelBase.vue'
import type { PanelRounded, PanelShadow, PanelVariant } from '../base/lib/props'


withDefaults(
  defineProps<{
    variant?: PanelVariant
    interactive?: boolean
    rounded?: PanelRounded
    shadow?: PanelShadow
  }>(),
  {
    variant: 'subtle',
    interactive: false,
    rounded: 'md',
    shadow: 'md',
  }
)
</script>
