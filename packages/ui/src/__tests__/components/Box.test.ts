import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'

import Box from '@/components/atoms/Box.vue'

describe('Box', () => {
  // ── レンダリング ─────────────────────────────────
  it('デフォルトで <div> 要素がレンダリングされる', () => {
    const wrapper = mount(Box)
    expect(wrapper.find('div').exists()).toBe(true)
    expect(wrapper.find('div').element.tagName).toBe('DIV')
  })

  it('as="section" で <section> がレンダリングされる', () => {
    const wrapper = mount(Box, { props: { as: 'section' } })
    expect(wrapper.find('section').exists()).toBe(true)
  })

  // ── slot ─────────────────────────────────────────
  it('デフォルト slot が表示される', () => {
    const wrapper = mount(Box, { slots: { default: 'Content' } })
    expect(wrapper.text()).toBe('Content')
  })

  // ── inline style ─────────────────────────────────
  it('padding="lg" で padding スタイルがセットされる', () => {
    const wrapper = mount(Box, { props: { padding: 'lg' } })
    expect(wrapper.element.style.padding).toBe('var(--morphink-space-lg)')
  })

  it('paddingX="sm" で paddingInline スタイルがセットされる', () => {
    const wrapper = mount(Box, { props: { paddingX: 'sm' } })
    expect(wrapper.element.style.paddingInline).toBe('var(--morphink-space-sm)')
  })

  it('paddingY="md" で paddingBlock スタイルがセットされる', () => {
    const wrapper = mount(Box, { props: { paddingY: 'md' } })
    expect(wrapper.element.style.paddingBlock).toBe('var(--morphink-space-md)')
  })

  it('overflow="hidden" で overflow スタイルがセットされる', () => {
    const wrapper = mount(Box, { props: { overflow: 'hidden' } })
    expect(wrapper.element.style.overflow).toBe('hidden')
  })

  it('position="relative" で position スタイルがセットされる', () => {
    const wrapper = mount(Box, { props: { position: 'relative' } })
    expect(wrapper.element.style.position).toBe('relative')
  })

  it('grow=true で flex スタイルがセットされる', () => {
    const wrapper = mount(Box, { props: { grow: true } })
    expect(wrapper.element.style.flex).toBe('1 1 0%')
  })

  it('shrink=false で flexShrink スタイルがセットされる', () => {
    const wrapper = mount(Box, { props: { shrink: false } })
    expect(wrapper.element.style.flexShrink).toBe('0')
  })

  // ── rounded ──────────────────────────────────────
  it('rounded="md" で borderRadius スタイルがセットされる', () => {
    const wrapper = mount(Box, { props: { rounded: 'md' } })
    expect(wrapper.element.style.borderRadius).toBe('var(--morphink-radius-md)')
  })

  it('rounded="full" で borderRadius が 9999px になる', () => {
    const wrapper = mount(Box, { props: { rounded: 'full' } })
    expect(wrapper.element.style.borderRadius).toBe('9999px')
  })

  // ── border ───────────────────────────────────────
  it('border=true で border スタイルがセットされる', () => {
    const wrapper = mount(Box, { props: { border: true } })
    expect(wrapper.element.style.borderWidth).toBe('1px')
    expect(wrapper.element.style.borderStyle).toBe('solid')
    expect(wrapper.element.style.borderColor).toBe('var(--morphink-color-border)')
  })

  it('border=false（デフォルト）で border スタイルがない', () => {
    const wrapper = mount(Box)
    expect(wrapper.element.style.borderWidth).toBe('')
  })
})
