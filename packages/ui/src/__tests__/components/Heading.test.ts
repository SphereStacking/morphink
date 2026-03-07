import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'

import Heading from '@/components/atoms/Heading.vue'

describe('Heading', () => {
  // ── レンダリング ─────────────────────────────────
  it('デフォルトで <h2> がレンダリングされる', () => {
    const wrapper = mount(Heading)
    expect(wrapper.find('h2').exists()).toBe(true)
    expect(wrapper.find('h2').element.tagName).toBe('H2')
  })

  it('level=1 で <h1> がレンダリングされる', () => {
    const wrapper = mount(Heading, { props: { level: 1 } })
    expect(wrapper.find('h1').exists()).toBe(true)
  })

  it('level=3 で <h3> がレンダリングされる', () => {
    const wrapper = mount(Heading, { props: { level: 3 } })
    expect(wrapper.find('h3').exists()).toBe(true)
  })

  it('level=6 で <h6> がレンダリングされる', () => {
    const wrapper = mount(Heading, { props: { level: 6 } })
    expect(wrapper.find('h6').exists()).toBe(true)
  })

  // ── slot ─────────────────────────────────────────
  it('テキスト slot が表示される', () => {
    const wrapper = mount(Heading, { slots: { default: 'Title' } })
    expect(wrapper.text()).toBe('Title')
  })

  it('HTML slot がレンダリングされる', () => {
    const wrapper = mount(Heading, {
      slots: { default: '<span class="icon">*</span> Title' },
    })
    expect(wrapper.find('span.icon').exists()).toBe(true)
    expect(wrapper.text()).toContain('Title')
  })

  it('空 slot でも heading 要素はレンダリングされる', () => {
    const wrapper = mount(Heading)
    expect(wrapper.find('h2').exists()).toBe(true)
  })
})
