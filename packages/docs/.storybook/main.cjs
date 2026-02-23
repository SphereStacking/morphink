const { dirname, join } = require('node:path')
const remarkGfm = require('remark-gfm')
const remarkGfmPlugin = remarkGfm.default ?? remarkGfm

const config = {
  stories: ['../src/stories/**/*.mdx', '../src/stories/**/*.stories.@(js|ts)'],
  addons: [
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
    '@storybook/addon-a11y',
    '@storybook/addon-viewport',
    '@storybook/addon-backgrounds',
    {
      name: '@storybook/addon-docs',
      options: {
        mdxPluginOptions: {
          mdxCompileOptions: {
            remarkPlugins: [remarkGfmPlugin],
          },
        },
      },
    },
  ],
  framework: {
    name: '@storybook/vue3-vite',
    options: {},
  },
  docs: {
    autodocs: false,
  },
  viteFinal: async config => {
    const vue = require('@vitejs/plugin-vue')
    const baseDir = dirname(__dirname)
    config.resolve = config.resolve || {}
    config.resolve.alias = {
      ...(config.resolve.alias || {}),
      '@tokens': join(baseDir, '../tokens/tokens'),
    }
    config.plugins = [...(config.plugins || []), vue()]
    return config
  },
}

module.exports = config
