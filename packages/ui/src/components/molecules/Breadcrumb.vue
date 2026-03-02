<script setup lang="ts">
/**
 * Breadcrumb — page hierarchy navigation.
 *
 * Molecule: composes Atoms (Text) into a breadcrumb trail.
 */
import Text from '../atoms/Text.vue'

const props = withDefaults(
  defineProps<{
    items: { label: string; href?: string }[]
    separator?: string
  }>(),
  {
    separator: '/',
  }
)

const emit = defineEmits<{
  (e: 'navigate', href: string): void
}>()

function handleClick(event: Event, href?: string) {
  if (href) {
    event.preventDefault()
    emit('navigate', href)
  }
}
</script>

<template>
  <nav
    aria-label="Breadcrumb"
    :style="{
      display: 'flex',
      alignItems: 'center',
      gap: 'var(--morphink-space-xs)',
      flexWrap: 'wrap',
    }"
  >
    <template v-for="(item, index) in items" :key="index">
      <Text v-if="index > 0" variant="caption" muted aria-hidden="true">
        <slot name="separator">{{ separator }}</slot>
      </Text>
      <a
        v-if="item.href && index < items.length - 1"
        :href="item.href"
        :style="{
          color: 'var(--morphink-color-muted-foreground)',
          textDecoration: 'none',
          fontSize: 'var(--morphink-font-size-caption)',
        }"
        @click="handleClick($event, item.href)"
      >
        {{ item.label }}
      </a>
      <Text
        v-else
        variant="caption"
        :muted="index < items.length - 1"
        :aria-current="index === items.length - 1 ? 'page' : undefined"
        :style="
          index === items.length - 1
            ? { color: 'var(--morphink-color-foreground)', fontWeight: '500' }
            : {}
        "
      >
        {{ item.label }}
      </Text>
    </template>
  </nav>
</template>
