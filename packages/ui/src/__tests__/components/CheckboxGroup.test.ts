import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { defineComponent, inject, nextTick } from 'vue'

import { checkboxGroupKey, type CheckboxGroupContext } from '@/base/ui/checkbox/checkboxContext'
import CheckboxGroupBase from '@/base/ui/checkbox/CheckboxGroupBase.vue'
import Checkbox from '@/components/atoms/Checkbox.vue'
import CheckboxGroup from '@/components/atoms/CheckboxGroup.vue'

/**
 * provide/inject テスト用のラッパーコンポーネント。
 * string slot では inject が動かないため、実コンポーネントを template で合成する。
 */
function createGroupWrapper(
  groupProps: Record<string, unknown> = {},
  items: string[] = ['a', 'b', 'c']
) {
  return defineComponent({
    components: { CheckboxGroup, Checkbox },
    setup() {
      return { groupProps, items }
    },
    template: `
      <CheckboxGroup v-bind="groupProps">
        <Checkbox v-for="item in items" :key="item" :value="item" />
      </CheckboxGroup>
    `,
  })
}

/**
 * provide/inject 経由で toggle 関数を直接テストするための probe コンポーネント。
 * Reka UI の emitProxy 問題を回避する。
 */
const ToggleProbe = defineComponent({
  setup() {
    const group = inject(checkboxGroupKey) as CheckboxGroupContext
    return { group }
  },
  template: '<div />',
})

// ────────────────────────────────────────────────────
// CheckboxGroup
// ────────────────────────────────────────────────────
describe('CheckboxGroup', () => {
  // ── 構造 ─────────────────────────────────────────
  it('role="group" の div がレンダリングされる', () => {
    const wrapper = mount(createGroupWrapper())
    const group = wrapper.find('[role="group"]')
    expect(group.exists()).toBe(true)
    expect(group.element.tagName).toBe('DIV')
  })

  it('子 Checkbox が指定数分レンダリングされる', () => {
    const wrapper = mount(createGroupWrapper({}, ['x', 'y']))
    expect(wrapper.findAll('button')).toHaveLength(2)
  })

  // ── orientation ──────────────────────────────────
  it('デフォルトで vertical レイアウト', () => {
    const wrapper = mount(createGroupWrapper())
    expect(wrapper.find('[role="group"]').element.className).toContain('flex-col')
  })

  it('orientation="horizontal" で horizontal レイアウト', () => {
    const wrapper = mount(createGroupWrapper({ orientation: 'horizontal' }))
    expect(wrapper.find('[role="group"]').element.className).toContain('flex-row')
  })

  // ── checked 状態（modelValue 反映）───────────────
  it('modelValue に含まれる値の Checkbox だけが checked になる', () => {
    const wrapper = mount(createGroupWrapper({ modelValue: ['b'] }))
    const buttons = wrapper.findAll('button')
    expect(buttons[0].attributes('data-state')).toBe('unchecked')
    expect(buttons[1].attributes('data-state')).toBe('checked')
    expect(buttons[2].attributes('data-state')).toBe('unchecked')
  })

  it('modelValue=[] で全 Checkbox が unchecked', () => {
    const wrapper = mount(createGroupWrapper({ modelValue: [] }))
    for (const btn of wrapper.findAll('button')) {
      expect(btn.attributes('data-state')).toBe('unchecked')
    }
  })

  // ── トグル動作（ToggleProbe 経由）────────────────
  it('toggle で値を追加すると update:modelValue が emit される', async () => {
    const wrapper = mount(
      defineComponent({
        components: { CheckboxGroupBase, ToggleProbe },
        template: '<CheckboxGroupBase :model-value="[]"><ToggleProbe /></CheckboxGroupBase>',
      })
    )
    wrapper.findComponent(ToggleProbe).vm.group.toggle('a')
    await nextTick()
    const emitted = wrapper.findComponent(CheckboxGroupBase).emitted('update:modelValue')
    expect(emitted![0][0]).toEqual(['a'])
  })

  it('toggle で既存の値を除去すると update:modelValue から消える', async () => {
    const wrapper = mount(
      defineComponent({
        components: { CheckboxGroupBase, ToggleProbe },
        template: `<CheckboxGroupBase :model-value="['a', 'b']"><ToggleProbe /></CheckboxGroupBase>`,
      })
    )
    wrapper.findComponent(ToggleProbe).vm.group.toggle('a')
    await nextTick()
    expect(wrapper.findComponent(CheckboxGroupBase).emitted('update:modelValue')![0][0]).toEqual([
      'b',
    ])
  })

  it('uncontrolled モードで toggle を複数回呼ぶと値が蓄積される', async () => {
    const wrapper = mount(
      defineComponent({
        components: { CheckboxGroupBase, ToggleProbe },
        template: '<CheckboxGroupBase><ToggleProbe /></CheckboxGroupBase>',
      })
    )
    const probe = wrapper.findComponent(ToggleProbe)
    probe.vm.group.toggle('a')
    probe.vm.group.toggle('c')
    await nextTick()
    const emitted = wrapper.findComponent(CheckboxGroupBase).emitted('update:modelValue')!
    expect(emitted[1][0]).toEqual(['a', 'c'])
  })

  it('uncontrolled モードで toggle を同じ値で 2 回呼ぶと追加→除去される', async () => {
    const wrapper = mount(
      defineComponent({
        components: { CheckboxGroupBase, ToggleProbe },
        template: '<CheckboxGroupBase><ToggleProbe /></CheckboxGroupBase>',
      })
    )
    const probe = wrapper.findComponent(ToggleProbe)
    probe.vm.group.toggle('a')
    probe.vm.group.toggle('a')
    await nextTick()
    const emitted = wrapper.findComponent(CheckboxGroupBase).emitted('update:modelValue')!
    expect(emitted[0][0]).toEqual(['a'])
    expect(emitted[1][0]).toEqual([])
  })

  // ── コンテキスト伝播（provide/inject）────────────
  it('グループの size prop が子 Checkbox に伝播する', () => {
    const wrapper = mount(createGroupWrapper({ size: 'lg' }))
    expect(wrapper.find('button').element.className).toContain('size-6')
  })

  // ── uncontrolled モード ──────────────────────────
  it('defaultValue で初期選択が反映される', () => {
    const wrapper = mount(createGroupWrapper({ defaultValue: ['a'] }))
    const buttons = wrapper.findAll('button')
    expect(buttons[0].attributes('data-state')).toBe('checked')
    expect(buttons[1].attributes('data-state')).toBe('unchecked')
  })

  it('defaultValue 未指定で全て unchecked', () => {
    const wrapper = mount(createGroupWrapper())
    for (const btn of wrapper.findAll('button')) {
      expect(btn.attributes('data-state')).toBe('unchecked')
    }
  })
})

// ────────────────────────────────────────────────────
// Checkbox（単体）
// ────────────────────────────────────────────────────
describe('Checkbox（単体）', () => {
  it('button 要素がレンダリングされる', () => {
    const wrapper = mount(Checkbox)
    expect(wrapper.find('button').exists()).toBe(true)
  })

  it('デフォルトで data-state="unchecked"', () => {
    const wrapper = mount(Checkbox)
    expect(wrapper.find('button').attributes('data-state')).toBe('unchecked')
  })

  it('modelValue=true で data-state="checked"', () => {
    const wrapper = mount(Checkbox, { props: { modelValue: true } })
    expect(wrapper.find('button').attributes('data-state')).toBe('checked')
  })

  it('disabled=true で disabled 属性がセットされる', () => {
    const wrapper = mount(Checkbox, { props: { disabled: true } })
    expect(wrapper.find('button').attributes('disabled')).toBeDefined()
  })

  it('disabled=false では disabled 属性がない', () => {
    const wrapper = mount(Checkbox, { props: { disabled: false } })
    expect(wrapper.find('button').attributes('disabled')).toBeUndefined()
  })

  it('id prop が button に渡される', () => {
    const wrapper = mount(Checkbox, { props: { id: 'cb-1' } })
    expect(wrapper.find('button').attributes('id')).toBe('cb-1')
  })

  it('クリックで update:modelValue が emit される', async () => {
    const wrapper = mount(Checkbox)
    await wrapper.find('button').trigger('click')
    expect(wrapper.emitted('update:modelValue')).toBeTruthy()
  })

  // ── アクセシビリティ ─────────────────────────────
  it('role="checkbox" 属性を持つ', () => {
    const wrapper = mount(Checkbox)
    expect(wrapper.find('button').attributes('role')).toBe('checkbox')
  })

  it('checked 状態で aria-checked="true"', () => {
    const wrapper = mount(Checkbox, { props: { modelValue: true } })
    expect(wrapper.find('button').attributes('aria-checked')).toBe('true')
  })

  it('unchecked 状態で aria-checked="false"', () => {
    const wrapper = mount(Checkbox, { props: { modelValue: false } })
    expect(wrapper.find('button').attributes('aria-checked')).toBe('false')
  })
})
