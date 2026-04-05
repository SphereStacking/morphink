<script setup lang="ts">
import AccordionItemBase from '../../base/ui/accordion/AccordionItemBase.vue'
import AccordionTriggerBase from '../../base/ui/accordion/AccordionTriggerBase.vue'
import AccordionContentBase from '../../base/ui/accordion/AccordionContentBase.vue'
import type { AccordionDuration, AccordionEasing } from '../../base/lib/props'

withDefaults(
  defineProps<{
    value: string
    disabled?: boolean
    duration?: AccordionDuration
    easing?: AccordionEasing
  }>(),
  {
    duration: 'normal',
    easing: 'standard',
  }
)
</script>

<template>
  <AccordionItemBase :value="value" :disabled="disabled">
    <AccordionTriggerBase><slot name="trigger" /></AccordionTriggerBase>
    <AccordionContentBase :duration="duration" :easing="easing"><slot /></AccordionContentBase>
  </AccordionItemBase>
</template>
