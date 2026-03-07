import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'

import AlertDescription from '@/components/atoms/AlertDescription.vue'

describe('AlertDescription', () => {
  // ── レンダリング ─────────────────────────────────
  it('<div> 要素がレンダリングされる', () => {
    const wrapper = mount(AlertDescription)
    const el = wrapper.find('div')
    expect(el.exists()).toBe(true)
    expect(el.element.tagName).toBe('DIV')
  })

  // ── slot ─────────────────────────────────────────
  it('テキスト slot が表示される', () => {
    const wrapper = mount(AlertDescription, {
      slots: { default: 'Something went wrong.' },
    })
    expect(wrapper.text()).toBe('Something went wrong.')
  })

  it('HTML slot がレンダリングされる', () => {
    const wrapper = mount(AlertDescription, {
      slots: { default: '<p>Details here</p>' },
    })
    expect(wrapper.find('p').exists()).toBe(true)
    expect(wrapper.text()).toContain('Details here')
  })
})
