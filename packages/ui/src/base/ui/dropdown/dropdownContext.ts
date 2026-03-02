import type { InjectionKey, Ref } from 'vue'

import type { DropdownSize } from '../../lib/props'

export const dropdownSizeKey: InjectionKey<Ref<DropdownSize>> = Symbol('dropdownSize')
export const dropdownItemCounterKey: InjectionKey<{ next(): number }> =
  Symbol('dropdownItemCounter')
