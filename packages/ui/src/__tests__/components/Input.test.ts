import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'

import Input from '@/components/atoms/Input.vue'

describe('Input', () => {
  // ── レンダリング ─────────────────────────────────
  it('<input> 要素がレンダリングされる', () => {
    const wrapper = mount(Input)
    const input = wrapper.find('input')
    expect(input.exists()).toBe(true)
    expect(input.element.tagName).toBe('INPUT')
  })

  it('デフォルト type が "text"', () => {
    const wrapper = mount(Input)
    expect(wrapper.find('input').attributes('type')).toBe('text')
  })

  it('type prop で input type が変わる', () => {
    const wrapper = mount(Input, { props: { type: 'email' } })
    expect(wrapper.find('input').attributes('type')).toBe('email')
  })

  it('placeholder prop が input に反映される', () => {
    const wrapper = mount(Input, { props: { placeholder: 'Enter name' } })
    expect(wrapper.find('input').attributes('placeholder')).toBe('Enter name')
  })

  // ── disabled / readonly ──────────────────────────
  it('disabled=true で disabled 属性がセットされる', () => {
    const wrapper = mount(Input, { props: { disabled: true } })
    expect(wrapper.find('input').attributes('disabled')).toBeDefined()
  })

  it('disabled=false では disabled 属性がない', () => {
    const wrapper = mount(Input, { props: { disabled: false } })
    expect(wrapper.find('input').attributes('disabled')).toBeUndefined()
  })

  it('readonly=true で readonly 属性がセットされる', () => {
    const wrapper = mount(Input, { props: { readonly: true } })
    expect(wrapper.find('input').attributes('readonly')).toBeDefined()
  })

  // ── aria ─────────────────────────────────────────
  it('ariaInvalid=true で aria-invalid="true" がセットされる', () => {
    const wrapper = mount(Input, { props: { ariaInvalid: true } })
    expect(wrapper.find('input').attributes('aria-invalid')).toBe('true')
  })

  it('ariaDescribedby が aria-describedby にセットされる', () => {
    const wrapper = mount(Input, { props: { ariaDescribedby: 'error-msg' } })
    expect(wrapper.find('input').attributes('aria-describedby')).toBe('error-msg')
  })

  // ── イベント ─────────────────────────────────────
  it('input イベントで update:modelValue が emit される', async () => {
    const wrapper = mount(Input)
    await wrapper.find('input').setValue('hello')
    expect(wrapper.emitted('update:modelValue')).toBeTruthy()
    expect(wrapper.emitted('update:modelValue')![0][0]).toBe('hello')
  })

  it('type="number" で数値に変換して emit される', async () => {
    const wrapper = mount(Input, { props: { type: 'number' } })
    await wrapper.find('input').setValue('42')
    expect(wrapper.emitted('update:modelValue')![0][0]).toBe(42)
  })

  // ── attrs パススルー ─────────────────────────────
  it('data-testid が input 要素に伝播する', () => {
    const wrapper = mount(Input, { attrs: { 'data-testid': 'email-input' } })
    expect(wrapper.find('input').attributes('data-testid')).toBe('email-input')
  })
})
