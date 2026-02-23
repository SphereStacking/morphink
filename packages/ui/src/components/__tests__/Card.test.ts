import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Card from '../Card.vue'

describe('Card', () => {
  it('renders default slot content', () => {
    const wrapper = mount(Card, { slots: { default: 'Card content' } })
    expect(wrapper.text()).toContain('Card content')
  })

  it('renders header slot when provided', () => {
    const wrapper = mount(Card, {
      slots: {
        header: '<h2>Title</h2>',
        default: 'Body',
      },
    })
    expect(wrapper.html()).toContain('Title')
    expect(wrapper.text()).toContain('Body')
  })

  it('renders footer slot when provided', () => {
    const wrapper = mount(Card, {
      slots: {
        default: 'Body',
        footer: 'Footer',
      },
    })
    expect(wrapper.text()).toContain('Footer')
  })

  it('accepts variant prop', () => {
    const wrapper = mount(Card, {
      props: { variant: 'outline' },
      slots: { default: 'Content' },
    })
    expect(wrapper.html()).toBeTruthy()
  })
})
