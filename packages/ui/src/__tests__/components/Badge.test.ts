import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'

import Badge from '@/components/atoms/Badge.vue'

describe('Badge', () => {
  // ── レンダリング ─────────────────────────────────
  it('<span> 要素がレンダリングされる', () => {
    const wrapper = mount(Badge)
    const el = wrapper.find('span')
    expect(el.exists()).toBe(true)
    expect(el.element.tagName).toBe('SPAN')
  })

  // ── slot ─────────────────────────────────────────
  it('テキスト slot が表示される', () => {
    const wrapper = mount(Badge, { slots: { default: 'New' } })
    expect(wrapper.text()).toBe('New')
  })

  it('HTML slot がレンダリングされる', () => {
    const wrapper = mount(Badge, {
      slots: { default: '<em>Hot</em>' },
    })
    expect(wrapper.find('em').exists()).toBe(true)
    expect(wrapper.text()).toContain('Hot')
  })

  // ── attrs パススルー ─────────────────────────────
  it('data-testid が span 要素に伝播する', () => {
    const wrapper = mount(Badge, { attrs: { 'data-testid': 'status-badge' } })
    expect(wrapper.find('span').attributes('data-testid')).toBe('status-badge')
  })

  it('カスタム class が CVA クラスとマージされる', () => {
    const wrapper = mount(Badge, { attrs: { class: 'my-custom' } })
    const className = wrapper.find('span').element.className
    expect(className).toContain('my-custom')
    expect(className).toContain('inline-flex')
  })
})
