import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'

import Stack from '@/components/atoms/Stack.vue'

describe('Stack', () => {
  // ── レンダリング ─────────────────────────────────
  it('<div> 要素が flex クラスでレンダリングされる', () => {
    const wrapper = mount(Stack)
    expect(wrapper.find('div').exists()).toBe(true)
    expect(wrapper.find('div').classes()).toContain('flex')
  })

  // ── slot ─────────────────────────────────────────
  it('デフォルト slot が表示される', () => {
    const wrapper = mount(Stack, { slots: { default: '<span>A</span><span>B</span>' } })
    expect(wrapper.text()).toContain('A')
    expect(wrapper.text()).toContain('B')
  })

  // ── inline style ─────────────────────────────────
  it('デフォルトで flexDirection が column', () => {
    const wrapper = mount(Stack)
    expect(wrapper.element.style.flexDirection).toBe('column')
  })

  it('direction="row" で flexDirection が row', () => {
    const wrapper = mount(Stack, { props: { direction: 'row' } })
    expect(wrapper.element.style.flexDirection).toBe('row')
  })

  it('デフォルトで gap が var(--morphink-space-md)', () => {
    const wrapper = mount(Stack)
    expect(wrapper.element.style.gap).toBe('var(--morphink-space-md)')
  })

  it('gap="xl" で gap スタイルが var(--morphink-space-xl)', () => {
    const wrapper = mount(Stack, { props: { gap: 'xl' } })
    expect(wrapper.element.style.gap).toBe('var(--morphink-space-xl)')
  })

  it('align="center" で alignItems が center', () => {
    const wrapper = mount(Stack, { props: { align: 'center' } })
    expect(wrapper.element.style.alignItems).toBe('center')
  })

  it('justify="between" で justifyContent が space-between', () => {
    const wrapper = mount(Stack, { props: { justify: 'between' } })
    expect(wrapper.element.style.justifyContent).toBe('space-between')
  })

  it('wrap=true で flexWrap が wrap', () => {
    const wrapper = mount(Stack, { props: { wrap: true } })
    expect(wrapper.element.style.flexWrap).toBe('wrap')
  })

  it('grow=true で flex が 1 1 0%', () => {
    const wrapper = mount(Stack, { props: { grow: true } })
    expect(wrapper.element.style.flex).toBe('1 1 0%')
  })
})
