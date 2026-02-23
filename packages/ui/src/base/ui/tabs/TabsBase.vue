<template>
  <TabsRoot :model-value="modelValue" @update:model-value="emit('update:modelValue', $event)">
    <div :class="wrapperClass">
      <TabsList :class="listClass">
        <TabsTrigger
          v-for="item in items"
          :key="item.value"
          :value="item.value"
          :disabled="item.disabled"
          :class="tabClass(item.value === modelValue, item.disabled)"
        >
          {{ item.label }}
        </TabsTrigger>
      </TabsList>
      <TabsContent :value="modelValue" :class="panelClass">
        <slot />
      </TabsContent>
    </div>
  </TabsRoot>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { cva } from 'class-variance-authority'
import { TabsRoot, TabsList, TabsTrigger, TabsContent } from 'reka-ui'
import { cn } from '../../lib/utils'

type TabItem = {
  label: string
  value: string
  disabled?: boolean
}

const props = withDefaults(
  defineProps<{
    items: TabItem[]
    modelValue: string
    size?: 'sm' | 'md'
    variant?: 'pill' | 'underline'
  }>(),
  {
    size: 'md',
    variant: 'pill',
  }
)

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
}>()

const wrapperVariants = cva('grid', {
  variants: {
    size: {
      sm: 'gap-[var(--space-sm)]',
      md: 'gap-[var(--space-md)]',
    },
  },
  defaultVariants: {
    size: 'md',
  },
})

const listVariants = cva('inline-flex', {
  variants: {
    variant: {
      pill:
        'rounded-full p-[6px] border-[var(--border-width-default)] border-[var(--color-border)] bg-[var(--color-muted)]',
      underline: 'border-b border-[var(--color-border)]',
    },
    size: {
      sm: 'gap-[var(--space-sm)]',
      md: 'gap-[var(--space-sm)]',
    },
  },
  defaultVariants: {
    variant: 'pill',
    size: 'md',
  },
})

const tabVariants = cva('font-semibold transition', {
  variants: {
    size: {
      sm: 'px-[10px] py-[4px] text-[12px]',
      md: 'px-[14px] py-[6px] text-[13px]',
    },
    variant: {
      pill: 'rounded-full',
      underline: 'border-b-2 border-transparent',
    },
    active: {
      true: '',
      false: '',
    },
    disabled: {
      true: 'opacity-[var(--opacity-disabled)] pointer-events-none',
      false: '',
    },
  },
  compoundVariants: [
    {
      variant: 'pill',
      active: true,
      class:
        'bg-[var(--color-card)] text-[var(--color-foreground)] shadow-[0_6px_12px_rgba(0,0,0,0.08)]',
    },
    {
      variant: 'pill',
      active: false,
      class:
        'text-[var(--color-muted-foreground)] hover:text-[var(--color-accent)] hover:bg-[var(--color-muted)]',
    },
    {
      variant: 'underline',
      active: true,
      class:
        'text-[var(--color-foreground)] border-b-[var(--border-width-strong)] border-[var(--color-accent)] text-[var(--color-accent)]',
    },
    {
      variant: 'underline',
      active: false,
      class: 'text-[var(--color-muted-foreground)] border-transparent',
    },
  ],
  defaultVariants: {
    size: 'md',
    variant: 'pill',
    active: false,
    disabled: false,
  },
})

const panelVariants = cva(
  cn(
    'rounded-[var(--radius-lg)] border-[var(--border-width-default)] border-[var(--color-border)] bg-[var(--color-card)]'
  ),
  {
    variants: {
      size: {
        sm: 'p-[var(--space-sm)]',
        md: 'p-[var(--space-md)]',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  }
)

const wrapperClass = computed(() => wrapperVariants({ size: props.size }))
const listClass = computed(() => listVariants({ size: props.size, variant: props.variant }))
const panelClass = computed(() => panelVariants({ size: props.size }))
const tabClass = (active: boolean, disabled?: boolean) =>
  tabVariants({
    size: props.size,
    variant: props.variant,
    active,
    disabled: Boolean(disabled),
  })
</script>
