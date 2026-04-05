<script setup lang="ts">
import { computed, ref, watch, onMounted, nextTick } from 'vue'
import { cva } from 'class-variance-authority'
import { TabsRoot, TabsList, TabsTrigger, TabsContent } from 'reka-ui'
import { cn } from '../../lib/utils'
import type { TabsSize, TabsVariant } from '../../lib/props'

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
    variant?: TabsVariant
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

const tabVariants = cva(
  cn(
    'font-semibold',
    '[transition-property:color,background-color,box-shadow]',
    '[transition-duration:var(--morphink-duration-fast)]',
    '[transition-timing-function:var(--morphink-easing-standard)]'
  ),
  {
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
        underline: '',
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
        class: 'text-(--morphink-color-accent)',
      },
      {
        variant: 'underline',
        active: false,
        class: 'text-(--morphink-color-muted-foreground)',
      },
    ],
    defaultVariants: {
      size: 'md',
      variant: 'pill',
      active: false,
      disabled: false,
    },
  }
)

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

// Underline indicator slide
const tabsListRef = ref<HTMLElement | null>(null)
const indicatorStyle = ref<Record<string, string>>({})

function updateIndicator() {
  if (!tabsListRef.value || props.variant !== 'underline') return
  const activeEl = tabsListRef.value.querySelector('[data-state="active"]') as HTMLElement
  if (!activeEl) return
  const listRect = tabsListRef.value.getBoundingClientRect()
  const activeRect = activeEl.getBoundingClientRect()
  indicatorStyle.value = {
    transform: `translateX(${activeRect.left - listRect.left}px)`,
    width: `${activeRect.width}px`,
  }
}

watch(
  () => props.modelValue,
  () => nextTick(updateIndicator)
)
onMounted(() => nextTick(updateIndicator))
</script>

<template>
  <TabsRoot data-morphink :model-value="modelValue" @update:model-value="emit('update:modelValue', $event)">
    <div :class="wrapperClass">
      <TabsList ref="tabsListRef" :class="listClass" class="relative">
        <TabsTrigger
          v-for="item in items"
          :key="item.value"
          :value="item.value"
          :disabled="item.disabled"
          :class="tabClass(item.value === modelValue, item.disabled)"
        >
          {{ item.label }}
        </TabsTrigger>
        <div
          v-if="variant === 'underline'"
          class="absolute bottom-0 left-0 h-[2px] bg-(--morphink-color-accent) [transition-property:transform,width] [transition-duration:var(--morphink-duration-normal)] [transition-timing-function:var(--morphink-easing-standard)]"
          :style="indicatorStyle"
        />
      </TabsList>
      <TabsContent
        :value="modelValue"
        :class="panelClass"
        class="animate-[mi-tab-fade-in_var(--morphink-duration-fast)_var(--morphink-easing-standard)_both]"
        :key="modelValue"
      >
        <slot />
      </TabsContent>
    </div>
  </TabsRoot>
</template>
