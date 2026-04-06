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
    // sb-addon-vue-csf appends raw defineMeta() source text to the main module,
    // but identifier references (Badge, componentTones, etc.) only exist in the
    // Vue script sub-module scope. This plugin re-imports them into the main module
    // so Rollup can properly track and rename the bindings.
    const fixMetaImports = {
      name: 'fix-vue-csf-meta-imports',
      enforce: 'post' as const,
      transform(code: string, id: string) {
        if (!id.endsWith('.stories.vue') || id.includes('?')) return null
        if (!code.includes('const meta =')) return null

        const src = readFileSync(id, 'utf-8')
        const scriptMatch = /<script[^>]*>([\s\S]*?)<\/script>/.exec(src)
        if (!scriptMatch) return null

        // Extract complete import statements (handles multi-line imports)
        const importRegex = /import\s+(?:\{[\s\S]*?\}|[^;'"]*)\s+from\s+['"][^'"]+['"]\s*;?/g
        const imports = (scriptMatch[1].match(importRegex) || [])
          .filter((stmt: string) => !stmt.includes('sb-addon-vue-csf'))
          .filter((stmt: string) => {
            // Skip if the code already contains an import from the same module
            // (Vue SFC compiler may inline <script setup> imports)
            const modMatch = /from\s+['"]([^'"]+)['"]/.exec(stmt)
            return !modMatch || !code.includes(modMatch[1])
          })
          .join('\n')

        if (!imports) return null
        return { code: imports + '\n' + code, map: null }
      },
    }
    config.plugins = [
      vue({ include: /\.stories\.vue$/ }),
      ...(config.plugins || []),
      fixMetaImports,
    ]

    return config
  },
}

export default config
