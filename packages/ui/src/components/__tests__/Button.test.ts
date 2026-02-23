import { mount } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'

import Button from '../Button.vue'

describe('Button', () => {
  it('renders slot content', () => {
    const wrapper = mount(Button, { slots: { default: 'Click me' } })
    expect(wrapper.text()).toBe('Click me')
  })

  it('renders as a button element', () => {
    const wrapper = mount(Button)
    expect(wrapper.find('button').exists()).toBe(true)
  })

  it('applies disabled attribute', () => {
    const wrapper = mount(Button, { props: { disabled: true } })
    expect(wrapper.find('button').attributes('disabled')).toBeDefined()
  })

  it('accepts variant prop', () => {
    const wrapper = mount(Button, { props: { variant: 'outline' } })
    expect(wrapper.html()).toContain('border')
  })

  it('accepts tone prop', () => {
    const wrapper = mount(Button, { props: { tone: 'primary' } })
    expect(wrapper.html()).toContain('primary')
  })

  it('accepts size prop', () => {
    const wrapper = mount(Button, {
      props: { size: 'sm' },
      slots: { default: 'Small' },
    })
    expect(wrapper.text()).toBe('Small')
  })
})
