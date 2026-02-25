<script setup lang="ts">
/**
 * Stat — KPI / metric display.
 *
 * Molecule: composes Atoms (Stack, Heading, Text, Badge) into a metric pattern.
 */
import { computed } from 'vue'
import Stack from '../atoms/Stack.vue'
import Heading from '../atoms/Heading.vue'
import Text from '../atoms/Text.vue'
import Badge from '../atoms/Badge.vue'

const props = defineProps<{
  label: string
  value: string | number
  description?: string
  trend?: 'up' | 'down' | 'neutral'
  trendValue?: string
}>()

const trendTone = computed(() => {
  if (!props.trend) return 'neutral'
  const map = { up: 'success', down: 'destructive', neutral: 'neutral' } as const
  return map[props.trend]
})
</script>

<template>
  <Stack gap="xs">
    <Text variant="caption" muted>{{ label }}</Text>
    <Stack direction="row" gap="sm" align="baseline">
      <Heading :level="3">{{ value }}</Heading>
      <Badge v-if="trend && trendValue" :tone="trendTone" size="sm" variant="soft">{{ trendValue }}</Badge>
    </Stack>
    <Text v-if="description" variant="caption" muted>{{ description }}</Text>
  </Stack>
</template>
