import type { InjectionKey, Ref } from 'vue'

import type { AccordionSize, AccordionVariant } from '../../lib/props'

// ─── Provide/Inject Keys ───
export const accordionSizeKey: InjectionKey<Ref<AccordionSize>> = Symbol('accordionSize')
export const accordionVariantKey: InjectionKey<Ref<AccordionVariant>> = Symbol('accordionVariant')
