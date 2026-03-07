import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'

import Grid from '@/components/atoms/Grid.vue'

describe('Grid', () => {
  // ── レンダリング ─────────────────────────────────
  it('<div> 要素が grid クラスでレンダリングされる', () => {
    const wrapper = mount(Grid)
    expect(wrapper.find('div').exists()).toBe(true)
    expect(wrapper.find('div').classes()).toContain('grid')
  })

  // ── slot ─────────────────────────────────────────
  it('デフォルト slot が表示される', () => {
    const wrapper = mount(Grid, { slots: { default: '<div>Item</div>' } })
    expect(wrapper.text()).toContain('Item')
  })

  // ── gridTemplateColumns ──────────────────────────
  it('デフォルトで gridTemplateColumns が repeat(auto-fit, minmax(240px, 1fr))', () => {
    const wrapper = mount(Grid)
    expect(wrapper.element.style.gridTemplateColumns).toBe(
      'repeat(auto-fit, minmax(240px, 1fr))'
    )
  })

  it('columns=3 で gridTemplateColumns が repeat(3, minmax(0, 1fr))', () => {
    const wrapper = mount(Grid, { props: { columns: 3 } })
    expect(wrapper.element.style.gridTemplateColumns).toBe('repeat(3, minmax(0, 1fr))')
  })

  it('columns="auto-fill" で gridTemplateColumns に auto-fill が含まれる', () => {
    const wrapper = mount(Grid, { props: { columns: 'auto-fill' } })
    expect(wrapper.element.style.gridTemplateColumns).toBe(
      'repeat(auto-fill, minmax(240px, 1fr))'
    )
  })

  // ── gridTemplateRows ─────────────────────────────
  it('rows=2 で gridTemplateRows が repeat(2, minmax(0, 1fr))', () => {
    const wrapper = mount(Grid, { props: { rows: 2 } })
    expect(wrapper.element.style.gridTemplateRows).toBe('repeat(2, minmax(0, 1fr))')
  })

  // ── gap ──────────────────────────────────────────
  it('デフォルトで gap が var(--morphink-space-lg)', () => {
    const wrapper = mount(Grid)
    expect(wrapper.element.style.gap).toBe('var(--morphink-space-lg)')
  })

  it('rowGap + columnGap で個別 gap がセットされる', () => {
    const wrapper = mount(Grid, { props: { rowGap: 'sm', columnGap: 'xl' } })
    expect(wrapper.element.style.rowGap).toBe('var(--morphink-space-sm)')
    expect(wrapper.element.style.columnGap).toBe('var(--morphink-space-xl)')
  })

  // ── align / justify ──────────────────────────────
  it('align="center" で alignItems が center', () => {
    const wrapper = mount(Grid, { props: { align: 'center' } })
    expect(wrapper.element.style.alignItems).toBe('center')
  })

  it('justify="start" で justifyItems が start', () => {
    const wrapper = mount(Grid, { props: { justify: 'start' } })
    expect(wrapper.element.style.justifyItems).toBe('start')
  })
})
