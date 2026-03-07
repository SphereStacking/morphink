import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'

import Text from '@/components/atoms/Text.vue'

describe('Text', () => {
  // ── レンダリング ─────────────────────────────────
  it('デフォルトで <p> 要素がレンダリングされる', () => {
    const wrapper = mount(Text)
    expect(wrapper.find('p').exists()).toBe(true)
    expect(wrapper.find('p').element.tagName).toBe('P')
  })

  it('as="span" で <span> がレンダリングされる', () => {
    const wrapper = mount(Text, { props: { as: 'span' } })
    expect(wrapper.find('span').exists()).toBe(true)
  })

  it('as="div" で <div> がレンダリングされる', () => {
    const wrapper = mount(Text, { props: { as: 'div' } })
    expect(wrapper.find('div').exists()).toBe(true)
  })

  // ── slot ─────────────────────────────────────────
  it('テキスト slot が表示される', () => {
    const wrapper = mount(Text, { slots: { default: 'Hello world' } })
    expect(wrapper.text()).toBe('Hello world')
  })

  it('HTML slot がレンダリングされる', () => {
    const wrapper = mount(Text, {
      slots: { default: '<a href="#">Link</a>' },
    })
    expect(wrapper.find('a').exists()).toBe(true)
    expect(wrapper.text()).toContain('Link')
  })

  // ── attrs パススルー ─────────────────────────────
  it('data-testid が要素に伝播する', () => {
    const wrapper = mount(Text, { attrs: { 'data-testid': 'description' } })
    expect(wrapper.find('p').attributes('data-testid')).toBe('description')
  })

  it('カスタム class がマージされる', () => {
    const wrapper = mount(Text, { attrs: { class: 'my-text' } })
    const className = wrapper.find('p').element.className
    expect(className).toContain('my-text')
  })
})
