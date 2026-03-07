import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'

import Textarea from '@/components/atoms/Textarea.vue'

describe('Textarea', () => {
  // ── レンダリング ─────────────────────────────────
  it('<textarea> 要素がレンダリングされる', () => {
    const wrapper = mount(Textarea)
    const el = wrapper.find('textarea')
    expect(el.exists()).toBe(true)
    expect(el.element.tagName).toBe('TEXTAREA')
  })

  it('デフォルト rows が 3', () => {
    const wrapper = mount(Textarea)
    expect(wrapper.find('textarea').attributes('rows')).toBe('3')
  })

  it('rows prop で rows 属性が変わる', () => {
    const wrapper = mount(Textarea, { props: { rows: 5 } })
    expect(wrapper.find('textarea').attributes('rows')).toBe('5')
  })

  it('placeholder prop が textarea に反映される', () => {
    const wrapper = mount(Textarea, { props: { placeholder: 'Type here...' } })
    expect(wrapper.find('textarea').attributes('placeholder')).toBe('Type here...')
  })

  // ── disabled / readonly ──────────────────────────
  it('disabled=true で disabled 属性がセットされる', () => {
    const wrapper = mount(Textarea, { props: { disabled: true } })
    expect(wrapper.find('textarea').attributes('disabled')).toBeDefined()
  })

  it('disabled=false では disabled 属性がない', () => {
    const wrapper = mount(Textarea, { props: { disabled: false } })
    expect(wrapper.find('textarea').attributes('disabled')).toBeUndefined()
  })

  it('readonly=true で readonly 属性がセットされる', () => {
    const wrapper = mount(Textarea, { props: { readonly: true } })
    expect(wrapper.find('textarea').attributes('readonly')).toBeDefined()
  })

  // ── aria ─────────────────────────────────────────
  it('ariaInvalid=true で aria-invalid="true" がセットされる', () => {
    const wrapper = mount(Textarea, { props: { ariaInvalid: true } })
    expect(wrapper.find('textarea').attributes('aria-invalid')).toBe('true')
  })

  // ── イベント ─────────────────────────────────────
  it('input イベントで update:modelValue が emit される', async () => {
    const wrapper = mount(Textarea)
    await wrapper.find('textarea').setValue('text content')
    expect(wrapper.emitted('update:modelValue')).toBeTruthy()
    expect(wrapper.emitted('update:modelValue')![0][0]).toBe('text content')
  })

  // ── attrs パススルー ─────────────────────────────
  it('data-testid が textarea 要素に伝播する', () => {
    const wrapper = mount(Textarea, { attrs: { 'data-testid': 'bio-input' } })
    expect(wrapper.find('textarea').attributes('data-testid')).toBe('bio-input')
  })
})
