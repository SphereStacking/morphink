<script setup lang="ts">
withDefaults(
  defineProps<{
    vertical?: boolean
  }>(),
  {
    vertical: false,
  }
)
</script>

<template>
  <div :class="vertical ? 'h-full w-px' : 'h-px w-full'" class="bg-(--morphink-color-border)" />
</template>
