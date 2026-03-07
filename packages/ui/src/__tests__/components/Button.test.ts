import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'

import Button from '@/components/atoms/Button.vue'

describe('Button', () => {
  // ── レンダリング ─────────────────────────────────
  it('<button type="button"> がレンダリングされる', () => {
    const wrapper = mount(Button)
    const btn = wrapper.find('button')
    expect(btn.exists()).toBe(true)
    expect(btn.element.tagName).toBe('BUTTON')
    expect(btn.attributes('type')).toBe('button')
  })

  // ── slot ─────────────────────────────────────────
  it('テキスト slot が表示される', () => {
    const wrapper = mount(Button, { slots: { default: 'Submit' } })
    expect(wrapper.text()).toBe('Submit')
  })

  it('HTML slot がレンダリングされる', () => {
    const wrapper = mount(Button, {
      slots: { default: '<span class="icon">+</span> Add' },
    })
    expect(wrapper.find('span.icon').exists()).toBe(true)
    expect(wrapper.text()).toContain('Add')
  })

  it('空 slot でも button 要素はレンダリングされる', () => {
    const wrapper = mount(Button)
    expect(wrapper.find('button').exists()).toBe(true)
  })

  // ── disabled ─────────────────────────────────────
  it('disabled=true で native disabled 属性がセットされる', () => {
    const wrapper = mount(Button, { props: { disabled: true } })
    expect(wrapper.find('button').attributes('disabled')).toBeDefined()
  })

  it('disabled=false では disabled 属性がない', () => {
    const wrapper = mount(Button, { props: { disabled: false } })
    expect(wrapper.find('button').attributes('disabled')).toBeUndefined()
  })

  // ── attrs パススルー ─────────────────────────────
  it('aria-label が button 要素に伝播する', () => {
    const wrapper = mount(Button, { attrs: { 'aria-label': 'Close dialog' } })
    expect(wrapper.find('button').attributes('aria-label')).toBe('Close dialog')
  })

  it('data-testid が button 要素に伝播する', () => {
    const wrapper = mount(Button, { attrs: { 'data-testid': 'submit-btn' } })
    expect(wrapper.find('button').attributes('data-testid')).toBe('submit-btn')
  })

  it('カスタム class が CVA クラスとマージされる', () => {
    const wrapper = mount(Button, { attrs: { class: 'my-custom' } })
    const className = wrapper.find('button').element.className
    expect(className).toContain('my-custom')
    expect(className).toContain('inline-flex')
  })

  // ── イベント ─────────────────────────────────────
  it('click トリガーで click イベントが発火する', async () => {
    const wrapper = mount(Button, { slots: { default: 'Go' } })
    await wrapper.find('button').trigger('click')
    expect(wrapper.emitted('click')).toHaveLength(1)
  })
})
