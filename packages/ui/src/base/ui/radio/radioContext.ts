import type { InjectionKey, Ref } from 'vue'
import type { RadioSize, RadioTone, RadioVariant } from '../../lib/props'

export const radioSizeKey: InjectionKey<Ref<RadioSize>> = Symbol('radioSize')
export const radioVariantKey: InjectionKey<Ref<RadioVariant>> = Symbol('radioVariant')
export const radioToneKey: InjectionKey<Ref<RadioTone>> = Symbol('radioTone')
