<script setup lang="ts">
import AccordionItemBase from '../../base/ui/accordion/AccordionItemBase.vue'
import AccordionTriggerBase from '../../base/ui/accordion/AccordionTriggerBase.vue'
import AccordionContentBase from '../../base/ui/accordion/AccordionContentBase.vue'

defineProps<{
  value: string
  disabled?: boolean
}>()
</script>

<template>
  <AccordionItemBase :value="value" :disabled="disabled">
    <AccordionTriggerBase><slot name="trigger" /></AccordionTriggerBase>
    <AccordionContentBase><slot /></AccordionContentBase>
  </AccordionItemBase>
</template>
