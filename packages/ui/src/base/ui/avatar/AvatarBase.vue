<script setup lang="ts">
defineOptions({ inheritAttrs: false })
import { computed, ref, useAttrs, watch } from 'vue'
import { cva } from 'class-variance-authority'
import { cn } from '../../lib/utils'
import type { AvatarRounded, AvatarSize } from '../../lib/props'

const avatarVariants = cva(
  cn('relative inline-flex items-center justify-center overflow-hidden shrink-0', 'select-none'),
  {
    variants: {
      size: {
        xs: 'size-6 text-[10px]',
        sm: 'size-8 text-xs',
        md: 'size-10 text-sm',
        lg: 'size-12 text-base',
        xl: 'size-14 text-lg',
      },
      rounded: {
        none: 'rounded-none',
        sm: 'rounded-(--morphink-radius-sm)',
        md: 'rounded-(--morphink-radius-md)',
        lg: 'rounded-(--morphink-radius-lg)',
        xl: 'rounded-(--morphink-radius-xl)',
        full: 'rounded-full',
      },
    },
    defaultVariants: {
      size: 'md',
      rounded: 'full',
    },
  }
)

const props = withDefaults(
  defineProps<{
    src?: string
    alt?: string
    fallback?: string
    size?: AvatarSize
    rounded?: AvatarRounded
  }>(),
  {
    size: 'md',
    rounded: 'full',
  }
)

const imageStatus = ref<'loading' | 'loaded' | 'error'>(props.src ? 'loading' : 'error')

watch(
  () => props.src,
  (newSrc) => {
    imageStatus.value = newSrc ? 'loading' : 'error'
  }
)

function onImageLoad() {
  imageStatus.value = 'loaded'
}

function onImageError() {
  imageStatus.value = 'error'
}

const showFallback = computed(() => imageStatus.value !== 'loaded')

const attrs = useAttrs()
const classes = computed(() =>
  cn(
    avatarVariants({
      size: props.size,
      rounded: props.rounded,
    }),
    showFallback.value && 'bg-(--morphink-color-muted) text-(--morphink-color-muted-foreground) font-medium',
    attrs.class,
  )
)
</script>

<template>
  <span :class="classes" v-bind="attrs">
    <img
      v-if="src && imageStatus !== 'error'"
      :src="src"
      :alt="alt"
      :class="cn(
        'size-full object-cover',
        imageStatus === 'loading' && 'opacity-0',
        imageStatus === 'loaded' && 'opacity-100 [transition-property:opacity] [transition-duration:var(--morphink-duration-normal)] [transition-timing-function:var(--morphink-easing-standard)]',
      )"
      @load="onImageLoad"
      @error="onImageError"
    />
    <span v-if="showFallback" class="absolute inset-0 flex items-center justify-center">
      <slot name="fallback">
        <span v-if="fallback">{{ fallback }}</span>
        <svg v-else xmlns="http://www.w3.org/2000/svg" width="60%" height="60%" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>
      </slot>
    </span>
  </span>
</template>
