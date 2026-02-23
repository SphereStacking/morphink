<template>
  <DividerBase :vertical="vertical" />
</template>

<script setup lang="ts">
import DividerBase from '../base/ui/divider/DividerBase.vue'

withDefaults(
  defineProps<{
    vertical?: boolean
  }>(),
  {
    vertical: false,
  }
)
</script>
