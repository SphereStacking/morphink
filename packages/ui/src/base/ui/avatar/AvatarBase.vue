<script setup lang="ts">
defineOptions({ inheritAttrs: false })
import { computed, ref, useAttrs, watch } from 'vue'
import { cva } from 'class-variance-authority'
import { cn } from '../../lib/utils'
import type { AvatarRounded, AvatarSize } from '../../lib/props'
import IconUser from '../icons/IconUser.vue'

const avatarVariants = cva(
  cn('relative inline-flex shrink-0 items-center justify-center overflow-hidden', 'select-none'),
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
    showFallback.value &&
      'bg-(--morphink-color-muted) font-medium text-(--morphink-color-muted-foreground)',
    attrs.class
  )
)
</script>

<template>
  <span data-morphink :class="classes" v-bind="attrs">
    <img
      v-if="src && imageStatus !== 'error'"
      :src="src"
      :alt="alt"
      :class="
        cn(
          'size-full object-cover',
          imageStatus === 'loading' && 'opacity-0',
          imageStatus === 'loaded' &&
            'opacity-100 [transition-property:opacity] [transition-duration:var(--morphink-duration-normal)] [transition-timing-function:var(--morphink-easing-standard)]'
        )
      "
      @load="onImageLoad"
      @error="onImageError"
    />
    <span v-if="showFallback" class="absolute inset-0 flex items-center justify-center">
      <slot name="fallback">
        <span v-if="fallback">{{ fallback }}</span>
        <IconUser v-else class="size-[60%]" />
      </slot>
    </span>
  </span>
</template>
