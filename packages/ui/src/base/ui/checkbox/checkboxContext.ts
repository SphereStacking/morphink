import type { InjectionKey, Ref } from 'vue'
import type { CheckboxRounded, CheckboxSize, CheckboxTone, CheckboxVariant } from '../../lib/props'

export const checkboxSizeKey: InjectionKey<Ref<CheckboxSize>> = Symbol('checkboxSize')
export const checkboxVariantKey: InjectionKey<Ref<CheckboxVariant>> = Symbol('checkboxVariant')
export const checkboxToneKey: InjectionKey<Ref<CheckboxTone>> = Symbol('checkboxTone')
export const checkboxRoundedKey: InjectionKey<Ref<CheckboxRounded>> = Symbol('checkboxRounded')

export interface CheckboxGroupContext {
  modelValue: Ref<string[]>
  toggle: (value: string) => void
}

export const checkboxGroupKey: InjectionKey<CheckboxGroupContext> = Symbol('checkboxGroup')
