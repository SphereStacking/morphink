import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'

import Checkbox from '@/components/atoms/Checkbox.vue'

describe('Checkbox', () => {
  // ── レンダリング ─────────────────────────────────
  it('<button> 要素がレンダリングされる', () => {
    const wrapper = mount(Checkbox)
    expect(wrapper.find('button').exists()).toBe(true)
  })

  it('role="checkbox" を持つ', () => {
    const wrapper = mount(Checkbox)
    expect(wrapper.find('button').attributes('role')).toBe('checkbox')
  })

  // ── data-state ───────────────────────────────────
  it('デフォルトで data-state="unchecked"', () => {
    const wrapper = mount(Checkbox)
    expect(wrapper.find('button').attributes('data-state')).toBe('unchecked')
  })

  it('modelValue=true で data-state="checked"', () => {
    const wrapper = mount(Checkbox, { props: { modelValue: true } })
    expect(wrapper.find('button').attributes('data-state')).toBe('checked')
  })

  it('modelValue=false で data-state="unchecked"', () => {
    const wrapper = mount(Checkbox, { props: { modelValue: false } })
    expect(wrapper.find('button').attributes('data-state')).toBe('unchecked')
  })

  it('modelValue="indeterminate" で data-state="indeterminate"', () => {
    const wrapper = mount(Checkbox, { props: { modelValue: 'indeterminate' } })
    expect(wrapper.find('button').attributes('data-state')).toBe('indeterminate')
  })

  // ── disabled ─────────────────────────────────────
  it('disabled=true で disabled 属性がセットされる', () => {
    const wrapper = mount(Checkbox, { props: { disabled: true } })
    expect(wrapper.find('button').attributes('disabled')).toBeDefined()
  })

  it('disabled=false では disabled 属性がない', () => {
    const wrapper = mount(Checkbox, { props: { disabled: false } })
    expect(wrapper.find('button').attributes('disabled')).toBeUndefined()
  })

  // ── id ───────────────────────────────────────────
  it('id prop が button に伝播する', () => {
    const wrapper = mount(Checkbox, { props: { id: 'terms' } })
    expect(wrapper.find('button').attributes('id')).toBe('terms')
  })

  // ── イベント ─────────────────────────────────────
  it('クリックで update:modelValue が emit される', async () => {
    const wrapper = mount(Checkbox)
    await wrapper.find('button').trigger('click')
    expect(wrapper.emitted('update:modelValue')).toBeTruthy()
  })
})
