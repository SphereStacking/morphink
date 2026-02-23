import type { Preview } from '@storybook/vue3-vite'

import '@ink-ui/ui/styles/tokens.css'
import '@ink-ui/ui/styles/base.css'
import '@ink-ui/ui/styles/ui.css'

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
      const theme = context.globals.theme || 'light'
      return {
        template: `<div class="ink-theme" ${theme === 'dark' ? 'data-theme="dark"' : ''} style="padding: 24px; min-width: 320px; background: var(--color-background); color: var(--color-foreground);"><story /></div>`,
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
