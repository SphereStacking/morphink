import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'

import AlertTitle from '@/components/atoms/AlertTitle.vue'

describe('AlertTitle', () => {
  // ── レンダリング ─────────────────────────────────
  it('<h5> 要素がレンダリングされる', () => {
    const wrapper = mount(AlertTitle)
    const el = wrapper.find('h5')
    expect(el.exists()).toBe(true)
    expect(el.element.tagName).toBe('H5')
  })

  // ── slot ─────────────────────────────────────────
  it('テキスト slot が表示される', () => {
    const wrapper = mount(AlertTitle, { slots: { default: 'Warning' } })
    expect(wrapper.text()).toBe('Warning')
  })

  it('HTML slot がレンダリングされる', () => {
    const wrapper = mount(AlertTitle, {
      slots: { default: '<strong>Error</strong>' },
    })
    expect(wrapper.find('strong').exists()).toBe(true)
    expect(wrapper.text()).toContain('Error')
  })
})
