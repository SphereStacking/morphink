import type { Preview } from '@storybook/vue3'
import '@ink-ui/ui/styles/tokens.css'
import '@ink-ui/ui/styles/base.css'
import '@ink-ui/ui/styles/ui.css'

const preview: Preview = {
  decorators: [
    () => ({
      template: '<div class="ink-theme" style="padding: 24px; min-width: 320px;"><story /></div>',
    }),
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
      default: 'Surface Base',
      values: [
        { name: 'Surface Base', value: '#ffffff' },
        { name: 'Surface Subtle', value: '#f5f5f5' },
      ],
    },
    viewport: {
      viewports: {
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
