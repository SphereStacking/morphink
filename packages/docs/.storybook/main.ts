import { readFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

import type { StorybookConfig } from '@storybook/vue3-vite'
import vue from '@vitejs/plugin-vue'
import remarkGfm from 'remark-gfm'

const __dirname = dirname(fileURLToPath(import.meta.url))

const config: StorybookConfig = {
  stories: ['../src/stories/**/*.mdx', '../src/stories/**/*.stories.@(js|ts|vue)'],
  addons: [
    '@storybook/addon-a11y',
    'sb-addon-vue-csf',
    {
      name: '@storybook/addon-docs',
      options: {
        mdxPluginOptions: {
          mdxCompileOptions: {
            remarkPlugins: [remarkGfm],
          },
        },
      },
    },
  ],
  framework: {
    name: '@storybook/vue3-vite',
    options: {},
  },
  experimental_indexers: (indexers) => {
    // sb-addon-vue-csf's indexer doesn't propagate defineMeta tags to story entries.
    // Wrap .stories.vue indexers to extract tags from defineMeta and merge them.
    return indexers.map((indexer) => {
      if (indexer.test?.toString().includes('stories\\.vue')) {
        const original = indexer.createIndex
        return {
          ...indexer,
          createIndex: async (fileName: string, opts: any) => {
            const entries = await original(fileName, opts)
            // Extract tags from defineMeta in source
            const src = readFileSync(fileName, 'utf-8')
            const match = /defineMeta\s*\(\s*\{[\s\S]*?tags\s*:\s*\[([^\]]*)\]/.exec(src)
            if (match) {
              const metaTags = match[1]
                .split(',')
                .map((t: string) => t.trim().replace(/['"]/g, ''))
                .filter(Boolean)
              if (metaTags.length > 0) {
                return entries.map((entry: any) => ({
                  ...entry,
                  tags: [...new Set([...(entry.tags || []), ...metaTags])],
                }))
              }
            }
            return entries
          },
        }
      }
      return indexer
    })
  },
  viteFinal: async (config) => {
    const baseDir = dirname(__dirname)
    config.resolve = config.resolve || {}
    config.resolve.alias = {
      ...(config.resolve.alias || {}),
      '@tokens': join(baseDir, '../tokens/tokens'),
    }
    config.plugins = [vue({ include: /\.stories\.vue$/ }), ...(config.plugins || [])]
    return config
  },
}

export default config
