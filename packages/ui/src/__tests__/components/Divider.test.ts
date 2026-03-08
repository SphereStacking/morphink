import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'

import Divider from '@/components/atoms/Divider.vue'

describe('Divider', () => {
  // ── レンダリング ─────────────────────────────────
  it('<div> 要素がレンダリングされる', () => {
    const wrapper = mount(Divider)
    expect(wrapper.find('div').exists()).toBe(true)
  })

  // ── 水平（デフォルト） ─────────────────────────────
  it('デフォルト（水平）で width: 100% がセットされる', () => {
    const wrapper = mount(Divider)
    expect(wrapper.element.style.width).toBe('100%')
  })

  it('デフォルトで height が border-width-default トークンを参照する', () => {
    const wrapper = mount(Divider)
    expect(wrapper.element.style.height).toBe('var(--morphink-border-width-default)')
  })

  // ── 垂直 ───────────────────────────────────────
  it('vertical=true で align-self: stretch がセットされる', () => {
    const wrapper = mount(Divider, { props: { vertical: true } })
    expect(wrapper.element.style.alignSelf).toBe('stretch')
  })

  it('vertical=true で width が border-width-default トークンを参照する', () => {
    const wrapper = mount(Divider, { props: { vertical: true } })
    expect(wrapper.element.style.width).toBe('var(--morphink-border-width-default)')
  })

  // ── weight ─────────────────────────────────────
  it('weight="strong" で height が border-width-strong トークンを参照する', () => {
    const wrapper = mount(Divider, { props: { weight: 'strong' } })
    expect(wrapper.element.style.height).toBe('var(--morphink-border-width-strong)')
  })

  it('weight="heavy" で height が border-width-heavy トークンを参照する', () => {
    const wrapper = mount(Divider, { props: { weight: 'heavy' } })
    expect(wrapper.element.style.height).toBe('var(--morphink-border-width-heavy)')
  })

  it('vertical + weight="strong" で width が border-width-strong トークンを参照する', () => {
    const wrapper = mount(Divider, { props: { vertical: true, weight: 'strong' } })
    expect(wrapper.element.style.width).toBe('var(--morphink-border-width-strong)')
  })
})
