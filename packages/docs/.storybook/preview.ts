import type { Preview } from '@storybook/vue3-vite'

import { EVENT_RESET_ALL, EVENT_SET_TOKEN } from '../src/addons/token-editor/constants'

import '@morphink/ui/styles/tokens.css'
import '@morphink/ui/styles/base.css'
import '@morphink/ui/styles/ui.css'

const tokenOverrides = new Map<string, string>()
let channelInitialized = false

function initTokenEditorChannel() {
  if (channelInitialized) return
  channelInitialized = true

  const channel = (window as any).__STORYBOOK_ADDONS_CHANNEL__
  if (!channel) return

  channel.on(EVENT_SET_TOKEN, ({ cssVar, value }: { cssVar: string; value: string | null }) => {
    const el = document.querySelector('.mi-theme') as HTMLElement | null
    if (value === null) {
      tokenOverrides.delete(cssVar)
      el?.style.removeProperty(cssVar)
      document.documentElement.style.removeProperty(cssVar)
    } else {
      tokenOverrides.set(cssVar, value)
      if (el) el.style.setProperty(cssVar, value)
      document.documentElement.style.setProperty(cssVar, value)
    }
  })

  channel.on(EVENT_RESET_ALL, () => {
    const el = document.querySelector('.mi-theme') as HTMLElement | null
    for (const cssVar of tokenOverrides.keys()) {
      el?.style.removeProperty(cssVar)
      document.documentElement.style.removeProperty(cssVar)
    }
    tokenOverrides.clear()
  })
}

const preview: Preview = {
  globalTypes: {
    theme: {
      description: 'Theme switcher',
      toolbar: {
        title: 'Theme',
        icon: 'paintbrush',
        items: [
          { value: 'light', title: 'Light', icon: 'sun' },
          { value: 'dark', title: 'Dark', icon: 'moon' },
        ],
        dynamicTitle: true,
      },
    },
  },
  initialGlobals: {
    theme: 'light',
  },
  decorators: [
    (story, context) => {
      initTokenEditorChannel()

      const theme = context.globals.theme || 'light'
      return {
        setup() {
          // Re-apply token overrides after story render
          if (typeof window !== 'undefined') {
            requestAnimationFrame(() => {
              const el = document.querySelector('.mi-theme') as HTMLElement | null
              if (el) {
                for (const [cssVar, value] of tokenOverrides.entries()) {
                  el.style.setProperty(cssVar, value)
                }
              }
            })
          }
        },
        template: `<div class="mi-theme" ${theme === 'dark' ? 'data-theme="dark"' : ''} style="padding: 24px; min-width: 320px; background: var(--morphink-color-background); color: var(--morphink-color-foreground);"><story /></div>`,
      }
    },
  ],
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      expanded: true,
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
    layout: 'centered',
    backgrounds: {
      disabled: true,
    },
    viewport: {
      options: {
        mobileSmall: {
          name: 'Mobile Small',
          styles: { width: '360px', height: '640px' },
        },
        desktop: {
          name: 'Desktop',
          styles: { width: '1280px', height: '720px' },
        },
      },
    },
    a11y: {
      options: {
        restoreScroll: true,
      },
    },
  },
}

export default preview
