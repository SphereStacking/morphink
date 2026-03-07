import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'

import Panel from '@/components/atoms/Panel.vue'

describe('Panel', () => {
  // ── レンダリング ─────────────────────────────────
  it('<div> 要素がレンダリングされる', () => {
    const wrapper = mount(Panel)
    expect(wrapper.find('div').exists()).toBe(true)
    expect(wrapper.find('div').element.tagName).toBe('DIV')
  })

  // ── slot ─────────────────────────────────────────
  it('テキスト slot が表示される', () => {
    const wrapper = mount(Panel, { slots: { default: 'Content' } })
    expect(wrapper.text()).toBe('Content')
  })

  it('HTML slot がレンダリングされる', () => {
    const wrapper = mount(Panel, {
      slots: { default: '<p>Paragraph</p>' },
    })
    expect(wrapper.find('p').exists()).toBe(true)
    expect(wrapper.text()).toContain('Paragraph')
  })

  // ── interactive ──────────────────────────────────
  it('interactive=true で cursor-pointer クラスを持つ', () => {
    const wrapper = mount(Panel, { props: { interactive: true } })
    expect(wrapper.find('div').classes()).toContain('cursor-pointer')
  })

  it('interactive=false（デフォルト）で cursor-pointer がない', () => {
    const wrapper = mount(Panel)
    expect(wrapper.find('div').classes()).not.toContain('cursor-pointer')
  })
})
