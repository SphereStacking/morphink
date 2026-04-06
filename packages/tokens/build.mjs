import { execSync } from 'node:child_process'
import { readFileSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

import { register } from '@tokens-studio/sd-transforms'
import { formatCss, oklch, parse } from 'culori'
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

StyleDictionary.registerTransform({
  name: 'value/to-oklch',
  type: 'value',
  transitive: true,
  filter: (token) => {
    const type = token.$type ?? token.type
    return type === 'color'
  },
  transform: (token) => {
    const value = token.$value ?? token.value
    if (typeof value !== 'string') return value
    // Skip values that are already in oklch() format or are CSS variable references
    if (/^oklch\(/i.test(value.trim()) || value.includes('var(--')) return value
    // Attempt hex (or any parseable color) → OKLCH conversion
    const parsed = parse(value)
    if (!parsed) return value
    const ok = oklch(parsed)
    if (!ok) return value
    if (ok.h === undefined || Number.isNaN(ok.h)) ok.h = 0
    return formatCss(ok)
  },
})

StyleDictionary.registerTransform({
  name: 'value/lineHeight-to-ratio',
  type: 'value',
  filter: (token) => token.path.includes('lineHeight'),
  transform: (token) => {
    const value = token.$value ?? token.value
    const num = Number(value)
    if (Number.isNaN(num) || num === 0) return value
    // Figma exports line-height as percentage (e.g. 120 = 120%).
    // CSS unitless line-height treats 120 as 120x font-size, so divide by 100.
    return num > 10 ? num / 100 : num
  },
})

const tokensStudioTransforms = StyleDictionary.hooks?.transformGroups?.['tokens-studio'] ?? []

StyleDictionary.registerTransformGroup({
  name: 'tokens-studio-kebab',
  transforms: [
    ...tokensStudioTransforms,
    'value/lineHeight-to-ratio',
    'value/to-oklch',
    'name/kebab-no-base',
  ],
})

StyleDictionary.registerFormat({
  name: 'css/variables-dark',
  format: ({ dictionary, options }) => {
    const sourceTokens = dictionary.allTokens.filter((t) => t.isSource)
    const getValue = (token) => (options.usesDtcg ? token.$value : token.value)
    const lines = sourceTokens.map((token) => `  --${token.name}: ${getValue(token)};`)
    return `/**\n * Do not edit directly, this file was auto-generated.\n */\n\n.mi-theme[data-theme="dark"] {\n${lines.join('\n')}\n}\n`
  },
})

StyleDictionary.registerFormat({
  name: 'css/tailwind-theme',
  format: ({ dictionary }) => {
    const sourceTokens = dictionary.allTokens.filter((t) => t.isSource)

    const groups = {
      color: [],
      spacing: [],
      radius: [],
      shadow: [],
      'z-index': [],
      'font-weight': [],
    }

    for (const token of sourceTokens) {
      const key = token.name.replace(`${VAR_PREFIX}-`, '')

      if (key.startsWith('color-')) {
        groups.color.push({ tw: key, ref: token.name })
      } else if (key.startsWith('space-')) {
        groups.spacing.push({
          tw: key.replace('space-', 'spacing-'),
          ref: token.name,
        })
      } else if (key.startsWith('radius-')) {
        groups.radius.push({ tw: key, ref: token.name })
      } else if (key.startsWith('shadow-')) {
        groups.shadow.push({ tw: key, ref: token.name })
      } else if (key.startsWith('z-index-')) {
        groups['z-index'].push({ tw: key, ref: token.name })
      } else if (key.startsWith('font-weight-')) {
        groups['font-weight'].push({ tw: key, ref: token.name })
      }
    }

    const resets = Object.keys(groups).map((k) => `  --${k}-*: initial;`)

    const entries = Object.entries(groups).flatMap(([cat, tokens]) => {
      if (!tokens.length) return []
      return [
        `\n  /* ${cat[0].toUpperCase() + cat.slice(1)} */`,
        ...tokens.map((t) => `  --${t.tw}: var(--${t.ref});`),
      ]
    })

    return [
      '/**',
      ' * Do not edit directly, this file was auto-generated.',
      ' */',
      '',
      '@theme {',
      ...resets,
      ...entries,
      '}',
      '',
    ].join('\n')
  },
})

const sd = new StyleDictionary(config)

await sd.buildAllPlatforms()

const darkConfig = {
  include: [join(__dirname, 'tokens/primitives.json'), join(__dirname, 'tokens/motion.json')],
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
