<script setup lang="ts">
import { computed } from 'vue'
import { cva } from 'class-variance-authority'
import { TabsRoot, TabsList, TabsTrigger, TabsContent } from 'reka-ui'
import { cn } from '../../lib/utils'
import type { TabsSize } from '../../lib/props'

type TabItem = {
  label: string
  value: string
  disabled?: boolean
}

const props = withDefaults(
  defineProps<{
    items: TabItem[]
    modelValue: string
    size?: TabsSize
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
      xs: 'gap-(--morphink-space-xs)',
      sm: 'gap-(--morphink-space-sm)',
      md: 'gap-(--morphink-space-md)',
      lg: 'gap-(--morphink-space-lg)',
      xl: 'gap-(--morphink-space-xl)',
    },
  },
  defaultVariants: {
    size: 'md',
  },
})

const listVariants = cva('inline-flex', {
  variants: {
    variant: {
      pill: 'rounded-full p-[6px] border-(--morphink-border-width-default) border-(--morphink-color-border) bg-(--morphink-color-muted)',
      underline: 'border-b border-(--morphink-color-border)',
    },
    size: {
      xs: 'gap-(--morphink-space-xs)',
      sm: 'gap-(--morphink-space-sm)',
      md: 'gap-(--morphink-space-sm)',
      lg: 'gap-(--morphink-space-md)',
      xl: 'gap-(--morphink-space-md)',
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
      xs: 'px-[8px] py-[2px] text-[11px]',
      sm: 'px-[10px] py-[4px] text-[12px]',
      md: 'px-[14px] py-[6px] text-[13px]',
      lg: 'px-[18px] py-[8px] text-[14px]',
      xl: 'px-[22px] py-[10px] text-[16px]',
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
      true: 'opacity-(--morphink-opacity-disabled) pointer-events-none',
      false: '',
    },
  },
  compoundVariants: [
    {
      variant: 'pill',
      active: true,
      class:
        'bg-(--morphink-color-card) text-(--morphink-color-foreground) shadow-[0_6px_12px_rgba(0,0,0,0.08)]',
    },
    {
      variant: 'pill',
      active: false,
      class:
        'text-(--morphink-color-muted-foreground) hover:text-(--morphink-color-accent) hover:bg-(--morphink-color-muted)',
    },
    {
      variant: 'underline',
      active: true,
      class:
        'text-(--morphink-color-foreground) border-b-(--morphink-border-width-strong) border-(--morphink-color-accent) text-(--morphink-color-accent)',
    },
    {
      variant: 'underline',
      active: false,
      class: 'text-(--morphink-color-muted-foreground) border-transparent',
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
    'rounded-(--morphink-radius-lg) border-(--morphink-border-width-default) border-(--morphink-color-border) bg-(--morphink-color-card)'
  ),
  {
    variants: {
      size: {
        xs: 'p-(--morphink-space-xs)',
        sm: 'p-(--morphink-space-sm)',
        md: 'p-(--morphink-space-md)',
        lg: 'p-(--morphink-space-lg)',
        xl: 'p-(--morphink-space-xl)',
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
