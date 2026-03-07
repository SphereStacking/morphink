import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'

import Avatar from '@/components/atoms/Avatar.vue'

describe('Avatar', () => {
  // ── レンダリング ─────────────────────────────────
  it('<span> 要素がレンダリングされる', () => {
    const wrapper = mount(Avatar)
    expect(wrapper.find('span').exists()).toBe(true)
    expect(wrapper.element.tagName).toBe('SPAN')
  })

  // ── 画像 ─────────────────────────────────────────
  it('src が指定されると <img> が存在する', () => {
    const wrapper = mount(Avatar, { props: { src: '/photo.jpg' } })
    expect(wrapper.find('img').exists()).toBe(true)
  })

  it('alt prop が <img> に反映される', () => {
    const wrapper = mount(Avatar, { props: { src: '/photo.jpg', alt: 'User' } })
    expect(wrapper.find('img').attributes('alt')).toBe('User')
  })

  it('src が未指定だと <img> がない', () => {
    const wrapper = mount(Avatar)
    expect(wrapper.find('img').exists()).toBe(false)
  })

  // ── fallback ─────────────────────────────────────
  it('src 未指定 + fallback prop でテキストが表示される', () => {
    const wrapper = mount(Avatar, { props: { fallback: 'AB' } })
    expect(wrapper.text()).toContain('AB')
  })

  it('src 未指定 + fallback slot でカスタムコンテンツが表示される', () => {
    const wrapper = mount(Avatar, {
      slots: { fallback: '<em>Custom</em>' },
    })
    expect(wrapper.find('em').exists()).toBe(true)
    expect(wrapper.text()).toContain('Custom')
  })

  it('src 未指定 + fallback なしでデフォルトアイコン（SVG）が表示される', () => {
    const wrapper = mount(Avatar)
    expect(wrapper.find('svg').exists()).toBe(true)
  })

  // ── attrs パススルー ─────────────────────────────
  it('data-testid が span 要素に伝播する', () => {
    const wrapper = mount(Avatar, { attrs: { 'data-testid': 'user-avatar' } })
    expect(wrapper.element.getAttribute('data-testid')).toBe('user-avatar')
  })
})
