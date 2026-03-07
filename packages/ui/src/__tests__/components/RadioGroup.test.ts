import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { defineComponent } from 'vue'

import Radio from '@/components/atoms/Radio.vue'
import RadioGroup from '@/components/atoms/RadioGroup.vue'

// ── ヘルパー ─────────────────────────────────────
function createRadioGroupWrapper(
  groupProps: Record<string, unknown> = {},
  items: string[] = ['a', 'b', 'c']
) {
  return defineComponent({
    components: { RadioGroup, Radio },
    setup() {
      return { groupProps, items }
    },
    template: `
      <RadioGroup v-bind="groupProps">
        <Radio v-for="item in items" :key="item" :value="item">{{ item }}</Radio>
      </RadioGroup>
    `,
  })
}

describe('RadioGroup', () => {
  // ── 構造 ─────────────────────────────────────────
  it('role="radiogroup" を持つ要素がレンダリングされる', () => {
    const Wrapper = createRadioGroupWrapper()
    const wrapper = mount(Wrapper)
    expect(wrapper.find('[role="radiogroup"]').exists()).toBe(true)
  })

  it('子 Radio の数だけ role="radio" 要素が描画される', () => {
    const Wrapper = createRadioGroupWrapper({}, ['x', 'y', 'z'])
    const wrapper = mount(Wrapper)
    expect(wrapper.findAll('[role="radio"]')).toHaveLength(3)
  })

  // ── orientation ──────────────────────────────────
  it('デフォルト（vertical）で flex-col クラスを持つ', () => {
    const Wrapper = createRadioGroupWrapper()
    const wrapper = mount(Wrapper)
    const group = wrapper.find('[role="radiogroup"]')
    expect(group.classes()).toContain('flex-col')
  })

  it('orientation="horizontal" で flex-row クラスを持つ', () => {
    const Wrapper = createRadioGroupWrapper({ orientation: 'horizontal' })
    const wrapper = mount(Wrapper)
    const group = wrapper.find('[role="radiogroup"]')
    expect(group.classes()).toContain('flex-row')
  })

  // ── modelValue ───────────────────────────────────
  it('modelValue 指定で該当 Radio が data-state="checked" になる', () => {
    const Wrapper = createRadioGroupWrapper({ modelValue: 'b' })
    const wrapper = mount(Wrapper)
    const radios = wrapper.findAll('[role="radio"]')
    expect(radios[0].attributes('data-state')).toBe('unchecked')
    expect(radios[1].attributes('data-state')).toBe('checked')
    expect(radios[2].attributes('data-state')).toBe('unchecked')
  })

  it('modelValue 未指定で全 Radio が data-state="unchecked"', () => {
    const Wrapper = createRadioGroupWrapper()
    const wrapper = mount(Wrapper)
    const radios = wrapper.findAll('[role="radio"]')
    radios.forEach((radio) => {
      expect(radio.attributes('data-state')).toBe('unchecked')
    })
  })

  // ── defaultValue ─────────────────────────────────
  it('defaultValue で初期選択がセットされる', () => {
    const Wrapper = createRadioGroupWrapper({ defaultValue: 'c' })
    const wrapper = mount(Wrapper)
    const radios = wrapper.findAll('[role="radio"]')
    expect(radios[2].attributes('data-state')).toBe('checked')
  })

  // ── disabled ─────────────────────────────────────
  it('disabled=true で子 Radio に disabled 属性がセットされる', () => {
    const Wrapper = createRadioGroupWrapper({ disabled: true })
    const wrapper = mount(Wrapper)
    const radios = wrapper.findAll('[role="radio"]')
    radios.forEach((radio) => {
      expect(radio.attributes('disabled')).toBeDefined()
    })
  })

  // ── イベント ─────────────────────────────────────
  it('Radio クリックで update:modelValue が emit される', async () => {
    const Wrapper = createRadioGroupWrapper()
    const wrapper = mount(Wrapper)
    await wrapper.findAll('[role="radio"]')[1].trigger('click')
    const radioGroup = wrapper.findComponent(RadioGroup)
    expect(radioGroup.emitted('update:modelValue')).toBeTruthy()
  })

  // ── 個別 Radio ───────────────────────────────────
  it('Radio に disabled を個別指定できる', () => {
    const Wrapper = defineComponent({
      components: { RadioGroup, Radio },
      template: `
        <RadioGroup>
          <Radio value="a" />
          <Radio value="b" :disabled="true" />
          <Radio value="c" />
        </RadioGroup>
      `,
    })
    const wrapper = mount(Wrapper)
    const radios = wrapper.findAll('[role="radio"]')
    expect(radios[0].attributes('disabled')).toBeUndefined()
    expect(radios[1].attributes('disabled')).toBeDefined()
    expect(radios[2].attributes('disabled')).toBeUndefined()
  })
})
