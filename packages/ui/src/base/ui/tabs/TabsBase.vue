<script setup lang="ts">
import { computed } from 'vue'
import { cva } from 'class-variance-authority'
import { TabsRoot, TabsList, TabsTrigger, TabsContent } from 'reka-ui'
import { cn } from '../../lib/utils'
import type { TabsSize, TabsVariant, TabsDuration, TabsEasing } from '../../lib/props'

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
    duration?: TabsDuration
    easing?: TabsEasing
  }>(),
  {
    size: 'md',
    variant: 'pill',
    duration: 'normal',
    easing: 'standard',
  }
)

const durationMap: Record<TabsDuration, string> = {
  instant: 'var(--morphink-duration-instant)',
  fast: 'var(--morphink-duration-fast)',
  normal: 'var(--morphink-duration-normal)',
  slow: 'var(--morphink-duration-slow)',
  slower: 'var(--morphink-duration-slower)',
}

const easingMap: Record<TabsEasing, string> = {
  standard: 'var(--morphink-easing-standard)',
  decelerate: 'var(--morphink-easing-decelerate)',
  accelerate: 'var(--morphink-easing-accelerate)',
  'emphasized-decelerate': 'var(--morphink-easing-emphasized-decelerate)',
  'emphasized-accelerate': 'var(--morphink-easing-emphasized-accelerate)',
  linear: 'var(--morphink-easing-linear)',
  spring: 'var(--morphink-easing-spring)',
}

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
      pill: 'rounded-full border-(--morphink-border-width-default) border-(--morphink-color-border) bg-(--morphink-color-muted) p-[6px]',
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
    'relative z-[1] font-semibold',
    '[transition-property:color]',
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
        true: 'pointer-events-none opacity-(--morphink-opacity-disabled)',
        false: '',
      },
    },
    compoundVariants: [
      {
        variant: 'pill',
        active: true,
        class: 'text-(--morphink-color-foreground)',
      },
      {
        variant: 'pill',
        active: false,
        class: 'text-(--morphink-color-muted-foreground) hover:text-(--morphink-color-accent)',
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
</script>

<template>
  <TabsRoot
    data-morphink
    :model-value="modelValue"
    @update:model-value="emit('update:modelValue', $event)"
  >
    <div :class="wrapperClass">
      <TabsList asChild>
        <div :class="listClass" class="relative">
          <TabsTrigger
            v-for="item in items"
            :key="item.value"
            :value="item.value"
            :disabled="item.disabled"
            :class="cn('relative z-[1]', tabClass(item.value === modelValue, item.disabled))"
            :style="item.value === modelValue ? { anchorName: '--active-tab' } : undefined"
          >
            {{ item.label }}
          </TabsTrigger>
          <!-- CSS Anchor Positioning indicator -->
          <div
            :class="
              cn(
                'pointer-events-none absolute',
                variant === 'pill'
                  ? 'rounded-full bg-(--morphink-color-card) shadow-[0_6px_12px_rgba(0,0,0,0.08)]'
                  : 'bg-(--morphink-color-accent)'
              )
            "
            :style="{
              transitionProperty: 'left, width, top, height',
              transitionDuration: durationMap[duration],
              transitionTimingFunction: easingMap[easing],
              ...(variant === 'pill'
                ? {
                    left: 'anchor(--active-tab left)',
                    top: 'anchor(--active-tab top)',
                    width: 'anchor-size(--active-tab width)',
                    height: 'anchor-size(--active-tab height)',
                  }
                : {
                    left: 'anchor(--active-tab left)',
                    bottom: '0',
                    width: 'anchor-size(--active-tab width)',
                    height: '2px',
                  }),
            }"
          />
        </div>
      </TabsList>
      <TabsContent :value="modelValue" :class="panelClass" class="mi-tab-anim" :key="modelValue">
        <slot />
      </TabsContent>
    </div>
  </TabsRoot>
</template>

<style scoped>
.mi-tab-anim {
  animation: mi-tab-fade-in var(--morphink-duration-fast) var(--morphink-easing-standard) both;
}

@keyframes mi-tab-fade-in {
  from {
    opacity: 0;
  }
}
</style>
