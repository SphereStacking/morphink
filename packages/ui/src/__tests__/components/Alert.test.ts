import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'

import Alert from '@/components/atoms/Alert.vue'

describe('Alert', () => {
  // ── レンダリング ─────────────────────────────────
  it('role="alert" を持つ要素がレンダリングされる', () => {
    const wrapper = mount(Alert)
    const el = wrapper.find('[role="alert"]')
    expect(el.exists()).toBe(true)
  })

  // ── slot ─────────────────────────────────────────
  it('デフォルト slot が表示される', () => {
    const wrapper = mount(Alert, { slots: { default: 'Something happened' } })
    expect(wrapper.text()).toContain('Something happened')
  })

  it('HTML slot がレンダリングされる', () => {
    const wrapper = mount(Alert, {
      slots: { default: '<strong>Error!</strong> Try again.' },
    })
    expect(wrapper.find('strong').exists()).toBe(true)
    expect(wrapper.text()).toContain('Error!')
  })

  // ── dismissible ──────────────────────────────────
  it('dismissible=false（デフォルト）で閉じるボタンがない', () => {
    const wrapper = mount(Alert)
    expect(wrapper.find('button').exists()).toBe(false)
  })

  it('dismissible=true で aria-label="Close" のボタンが表示される', () => {
    const wrapper = mount(Alert, { props: { dismissible: true } })
    const btn = wrapper.find('button[aria-label="Close"]')
    expect(btn.exists()).toBe(true)
    expect(btn.attributes('type')).toBe('button')
  })

  it('閉じるボタンをクリックすると close イベントが emit される', async () => {
    const wrapper = mount(Alert, { props: { dismissible: true } })
    await wrapper.find('button[aria-label="Close"]').trigger('click')
    expect(wrapper.emitted('close')).toHaveLength(1)
  })

  it('閉じるボタンをクリックすると alert 要素が DOM から除去される', async () => {
    const wrapper = mount(Alert, { props: { dismissible: true } })
    await wrapper.find('button[aria-label="Close"]').trigger('click')
    expect(wrapper.find('[role="alert"]').exists()).toBe(false)
  })

  // ── attrs パススルー ─────────────────────────────
  it('data-testid が alert 要素に伝播する', () => {
    const wrapper = mount(Alert, { attrs: { 'data-testid': 'error-alert' } })
    expect(wrapper.find('[role="alert"]').attributes('data-testid')).toBe('error-alert')
  })
})
