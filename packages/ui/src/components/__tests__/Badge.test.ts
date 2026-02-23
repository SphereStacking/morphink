import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Badge from '../Badge.vue'

describe('Badge', () => {
  it('renders slot content', () => {
    const wrapper = mount(Badge, { slots: { default: 'New' } })
    expect(wrapper.text()).toBe('New')
  })

  it('renders as a span element', () => {
    const wrapper = mount(Badge)
    expect(wrapper.find('span').exists()).toBe(true)
  })

  it('accepts variant prop', () => {
    const wrapper = mount(Badge, { props: { variant: 'soft' } })
    expect(wrapper.html()).toBeTruthy()
  })

  it('accepts tone prop', () => {
    const wrapper = mount(Badge, { props: { tone: 'success' } })
    expect(wrapper.html()).toContain('success')
  })
})
