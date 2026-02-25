<script setup lang="ts">
/**
 * Button — clickable action trigger.
 *
 * Public API layer. Customize defaults here.
 * Style variants: base/ui/button/ButtonBase.vue
 */
import ButtonBase from '../../base/ui/button/ButtonBase.vue'
import type {
  ButtonRounded,
  ButtonShadow,
  ButtonSize,
  ButtonTone,
  ButtonVariant,
} from '../../base/lib/props'

withDefaults(
  defineProps<{
    variant?: ButtonVariant
    size?: ButtonSize
    tone?: ButtonTone
    rounded?: ButtonRounded
    shadow?: ButtonShadow
    disabled?: boolean
  }>(),
  {
    variant: 'solid',
    size: 'md',
    tone: 'base',
    rounded: 'md',
    shadow: 'md',
    disabled: false,
  }
)
</script>

<template>
  <ButtonBase
    :variant="variant"
    :size="size"
    :tone="tone"
    :rounded="rounded"
    :shadow="shadow"
    :disabled="disabled"
  >
    <slot />
  </ButtonBase>
</template>
