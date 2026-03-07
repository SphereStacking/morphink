import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'

import Divider from '@/components/atoms/Divider.vue'

describe('Divider', () => {
  // ── レンダリング ─────────────────────────────────
  it('<div> 要素がレンダリングされる', () => {
    const wrapper = mount(Divider)
    expect(wrapper.find('div').exists()).toBe(true)
  })

  // ── 水平 / 垂直 ─────────────────────────────────
  it('デフォルト（水平）で w-full クラスを持つ', () => {
    const wrapper = mount(Divider)
    expect(wrapper.find('div').classes()).toContain('w-full')
  })

  it('vertical=true で w-px クラスを持つ', () => {
    const wrapper = mount(Divider, { props: { vertical: true } })
    expect(wrapper.find('div').classes()).toContain('w-px')
  })

  it('vertical=true で h-full クラスを持つ', () => {
    const wrapper = mount(Divider, { props: { vertical: true } })
    expect(wrapper.find('div').classes()).toContain('h-full')
  })
})
