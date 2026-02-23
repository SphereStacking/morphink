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
      sm: 'gap-(--space-sm)',
      md: 'gap-(--space-md)',
    },
  },
  defaultVariants: {
    size: 'md',
  },
})

const listVariants = cva('inline-flex', {
  variants: {
    variant: {
      pill: 'rounded-full p-[6px] border-(--border-width-default) border-(--color-border) bg-(--color-muted)',
      underline: 'border-b border-(--color-border)',
    },
    size: {
      sm: 'gap-(--space-sm)',
      md: 'gap-(--space-sm)',
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
      true: 'opacity-(--opacity-disabled) pointer-events-none',
      false: '',
    },
  },
  compoundVariants: [
    {
      variant: 'pill',
      active: true,
      class:
        'bg-(--color-card) text-(--color-foreground) shadow-[0_6px_12px_rgba(0,0,0,0.08)]',
    },
    {
      variant: 'pill',
      active: false,
      class:
        'text-(--color-muted-foreground) hover:text-(--color-accent) hover:bg-(--color-muted)',
    },
    {
      variant: 'underline',
      active: true,
      class:
        'text-(--color-foreground) border-b-(--border-width-strong) border-(--color-accent) text-(--color-accent)',
    },
    {
      variant: 'underline',
      active: false,
      class: 'text-(--color-muted-foreground) border-transparent',
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
    'rounded-(--radius-lg) border-(--border-width-default) border-(--color-border) bg-(--color-card)'
  ),
  {
    variants: {
      size: {
        sm: 'p-(--space-sm)',
        md: 'p-(--space-md)',
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
