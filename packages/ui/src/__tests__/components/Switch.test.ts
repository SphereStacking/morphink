import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'

import Switch from '@/components/atoms/Switch.vue'

describe('Switch', () => {
  // ── レンダリング ─────────────────────────────────
  it('<button> 要素がレンダリングされる', () => {
    const wrapper = mount(Switch)
    expect(wrapper.find('button').exists()).toBe(true)
  })

  it('role="switch" を持つ', () => {
    const wrapper = mount(Switch)
    expect(wrapper.find('button').attributes('role')).toBe('switch')
  })

  // ── data-state ───────────────────────────────────
  it('デフォルトで data-state="unchecked"', () => {
    const wrapper = mount(Switch)
    expect(wrapper.find('button').attributes('data-state')).toBe('unchecked')
  })

  it('modelValue=true で data-state="checked"', () => {
    const wrapper = mount(Switch, { props: { modelValue: true } })
    expect(wrapper.find('button').attributes('data-state')).toBe('checked')
  })

  it('modelValue=false で data-state="unchecked"', () => {
    const wrapper = mount(Switch, { props: { modelValue: false } })
    expect(wrapper.find('button').attributes('data-state')).toBe('unchecked')
  })

  // ── disabled ─────────────────────────────────────
  it('disabled=true で disabled 属性がセットされる', () => {
    const wrapper = mount(Switch, { props: { disabled: true } })
    expect(wrapper.find('button').attributes('disabled')).toBeDefined()
  })

  it('disabled=false では disabled 属性がない', () => {
    const wrapper = mount(Switch, { props: { disabled: false } })
    expect(wrapper.find('button').attributes('disabled')).toBeUndefined()
  })

  // ── id ───────────────────────────────────────────
  it('id prop が button に伝播する', () => {
    const wrapper = mount(Switch, { props: { id: 'dark-mode' } })
    expect(wrapper.find('button').attributes('id')).toBe('dark-mode')
  })

  // ── イベント ─────────────────────────────────────
  it('クリックで update:modelValue が emit される', async () => {
    const wrapper = mount(Switch)
    await wrapper.find('button').trigger('click')
    expect(wrapper.emitted('update:modelValue')).toBeTruthy()
  })
})
