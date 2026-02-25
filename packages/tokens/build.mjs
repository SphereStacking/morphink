import { execSync } from 'node:child_process'
import { readFileSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

import { register } from '@tokens-studio/sd-transforms'
import StyleDictionary from 'style-dictionary'

import config from './style-dictionary.config.mjs'

const __dirname = dirname(fileURLToPath(import.meta.url))

/** CSS custom property prefix — prepended to all generated CSS variables */
const VAR_PREFIX = 'morphink'

register(StyleDictionary)

StyleDictionary.registerTransform({
  name: 'name/kebab-no-base',
  type: 'name',
  transform: (token) => {
    const path = [...token.path]
    if (path[path.length - 1] === 'base') {
      path.pop()
    }
    const name = path
      .join('-')
      .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
      .toLowerCase()
    return `${VAR_PREFIX}-${name}`
  },
})

const tokensStudioTransforms = StyleDictionary.hooks?.transformGroups?.['tokens-studio'] ?? []

StyleDictionary.registerTransformGroup({
  name: 'tokens-studio-kebab',
  transforms: [...tokensStudioTransforms, 'name/kebab-no-base'],
})

StyleDictionary.registerFormat({
  name: 'css/variables-dark',
  format: ({ dictionary }) => {
    const sourceTokens = dictionary.allTokens.filter((t) => t.isSource)
    const lines = sourceTokens.map((token) => `  --${token.name}: ${token.value};`)
    return `/**\n * Do not edit directly, this file was auto-generated.\n */\n\n.mi-theme[data-theme="dark"] {\n${lines.join('\n')}\n}\n`
  },
})

const sd = new StyleDictionary(config)

await sd.buildAllPlatforms()

const darkConfig = {
  include: [join(__dirname, 'tokens/alias.json')],
  source: [join(__dirname, 'tokens/semantic-dark.json')],
  platforms: {
    css: {
      transformGroup: 'tokens-studio-kebab',
      buildPath: 'dist/css/',
      files: [
        {
          destination: 'tokens-dark.css',
          format: 'css/variables-dark',
        },
      ],
    },
  },
}
const sdDark = new StyleDictionary(darkConfig)
await sdDark.buildAllPlatforms()

// Build mi-utilities via Tailwind v4
execSync('npx @tailwindcss/cli -i ./src/mi-utilities.css -o ./dist/css/utilities.css', {
  cwd: __dirname,
  stdio: 'inherit',
})

// Strip preflight and layer declarations from utilities output
const utilitiesPath = join(__dirname, 'dist/css/utilities.css')
let css = readFileSync(utilitiesPath, 'utf8')
css = css
  .replace(/@layer\s+theme\s*,\s*base\s*,\s*components\s*,\s*utilities\s*;/g, '')
  .replace(/@layer\s+base\s*\{[\s\S]*?\n\}/g, '')
  .replace(/@layer\s+utilities\s*\{([\s\S]*?)\n\}/g, '$1')
  .replace(/^\s*\n/gm, '')
writeFileSync(utilitiesPath, css)
