import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'
import StyleDictionary from 'style-dictionary'
import { register } from '@tokens-studio/sd-transforms'
import config from './style-dictionary.config.mjs'

const __dirname = dirname(fileURLToPath(import.meta.url))

register(StyleDictionary)

StyleDictionary.registerTransform({
  name: 'name/kebab-no-base',
  type: 'name',
  transform: token => {
    const path = [...token.path]
    if (path[path.length - 1] === 'base') {
      path.pop()
    }
    const name = path
      .join('-')
      .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
      .toLowerCase()
    return name
  },
})

StyleDictionary.registerFormat({
  name: 'css/ink-utilities',
  format: ({ dictionary }) => {
    const tokens = dictionary.allTokens
    const colorTokens = tokens.filter(
      token => token.path?.[0] === 'color' && token.path.length === 2
    )
    const spaceTokens = tokens.filter(
      token => token.path?.[0] === 'space' && token.path.length === 2
    )
    const radiusTokens = tokens.filter(
      token => token.path?.[0] === 'radius' && token.path.length === 2
    )
    const shadowTokens = tokens.filter(
      token => token.path?.[0] === 'shadow' && token.path.length === 2
    )
    const lines = ['/* Auto-generated ink utilities */']

    for (const token of colorTokens) {
      const key = token.path[1]
      const varName = `--${token.name}`
      lines.push(`.ink-bg-${key} { background: var(${varName}); }`)
      lines.push(`.ink-text-${key} { color: var(${varName}); }`)
      lines.push(`.ink-border-${key} { border-color: var(${varName}); }`)
    }

    for (const token of spaceTokens) {
      const key = token.path[1]
      const varName = `--${token.name}`
      lines.push(`.ink-p-${key} { padding: var(${varName}); }`)
      lines.push(`.ink-px-${key} { padding-left: var(${varName}); padding-right: var(${varName}); }`)
      lines.push(`.ink-py-${key} { padding-top: var(${varName}); padding-bottom: var(${varName}); }`)
      lines.push(`.ink-pt-${key} { padding-top: var(${varName}); }`)
      lines.push(`.ink-pr-${key} { padding-right: var(${varName}); }`)
      lines.push(`.ink-pb-${key} { padding-bottom: var(${varName}); }`)
      lines.push(`.ink-pl-${key} { padding-left: var(${varName}); }`)
      lines.push(`.ink-m-${key} { margin: var(${varName}); }`)
      lines.push(`.ink-mx-${key} { margin-left: var(${varName}); margin-right: var(${varName}); }`)
      lines.push(`.ink-my-${key} { margin-top: var(${varName}); margin-bottom: var(${varName}); }`)
      lines.push(`.ink-mt-${key} { margin-top: var(${varName}); }`)
      lines.push(`.ink-mr-${key} { margin-right: var(${varName}); }`)
      lines.push(`.ink-mb-${key} { margin-bottom: var(${varName}); }`)
      lines.push(`.ink-ml-${key} { margin-left: var(${varName}); }`)
      lines.push(`.ink-gap-${key} { gap: var(${varName}); }`)
      lines.push(`.ink-space-x-${key} > :not([hidden]) ~ :not([hidden]) { --tw-space-x-reverse: 0; margin-right: calc(var(${varName}) * var(--tw-space-x-reverse)); margin-left: calc(var(${varName}) * calc(1 - var(--tw-space-x-reverse))); }`)
      lines.push(`.ink-space-y-${key} > :not([hidden]) ~ :not([hidden]) { --tw-space-y-reverse: 0; margin-top: calc(var(${varName}) * calc(1 - var(--tw-space-y-reverse))); margin-bottom: calc(var(${varName}) * var(--tw-space-y-reverse)); }`)
    }

    lines.push('.ink-space-x-reverse > :not([hidden]) ~ :not([hidden]) { --tw-space-x-reverse: 1; }')
    lines.push('.ink-space-y-reverse > :not([hidden]) ~ :not([hidden]) { --tw-space-y-reverse: 1; }')

    for (const token of radiusTokens) {
      const key = token.path[1]
      const varName = `--${token.name}`
      lines.push(`.ink-rounded-${key} { border-radius: var(${varName}); }`)
      lines.push(`.ink-rounded-t-${key} { border-top-left-radius: var(${varName}); border-top-right-radius: var(${varName}); }`)
      lines.push(`.ink-rounded-b-${key} { border-bottom-left-radius: var(${varName}); border-bottom-right-radius: var(${varName}); }`)
      lines.push(`.ink-rounded-l-${key} { border-top-left-radius: var(${varName}); border-bottom-left-radius: var(${varName}); }`)
      lines.push(`.ink-rounded-r-${key} { border-top-right-radius: var(${varName}); border-bottom-right-radius: var(${varName}); }`)
      lines.push(`.ink-rounded-tl-${key} { border-top-left-radius: var(${varName}); }`)
      lines.push(`.ink-rounded-tr-${key} { border-top-right-radius: var(${varName}); }`)
      lines.push(`.ink-rounded-bl-${key} { border-bottom-left-radius: var(${varName}); }`)
      lines.push(`.ink-rounded-br-${key} { border-bottom-right-radius: var(${varName}); }`)
    }

    for (const token of shadowTokens) {
      const key = token.path[1]
      const varName = `--${token.name}`
      lines.push(`.ink-shadow-${key} { box-shadow: var(${varName}); }`)
    }

    return `${lines.join('\n')}\n`
  },
})

const tokensStudioTransforms =
  StyleDictionary.hooks?.transformGroups?.['tokens-studio'] ?? []

StyleDictionary.registerTransformGroup({
  name: 'tokens-studio-kebab',
  transforms: [...tokensStudioTransforms, 'name/kebab-no-base'],
})

StyleDictionary.registerFormat({
  name: 'css/variables-dark',
  format: ({ dictionary }) => {
    const sourceTokens = dictionary.allTokens.filter(t => t.isSource)
    const lines = sourceTokens.map(token => `  --${token.name}: ${token.value};`)
    return `/**\n * Do not edit directly, this file was auto-generated.\n */\n\n.ink-theme[data-theme="dark"] {\n${lines.join('\n')}\n}\n`
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
      files: [{
        destination: 'tokens-dark.css',
        format: 'css/variables-dark',
      }],
    },
  },
}
const sdDark = new StyleDictionary(darkConfig)
await sdDark.buildAllPlatforms()
