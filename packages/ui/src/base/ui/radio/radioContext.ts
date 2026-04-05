import type { InjectionKey, Ref } from 'vue'

import type { RadioSize, RadioTone, RadioVariant, RadioDuration, RadioEasing } from '../../lib/props'

export const radioSizeKey: InjectionKey<Ref<RadioSize>> = Symbol('radioSize')
export const radioVariantKey: InjectionKey<Ref<RadioVariant>> = Symbol('radioVariant')
export const radioToneKey: InjectionKey<Ref<RadioTone>> = Symbol('radioTone')
export const radioDurationKey: InjectionKey<Ref<RadioDuration>> = Symbol('radioDuration')
export const radioEasingKey: InjectionKey<Ref<RadioEasing>> = Symbol('radioEasing')
