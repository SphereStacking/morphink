import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))

const config = {
  include: [join(__dirname, 'tokens/alias.json')],
  source: [join(__dirname, 'tokens/semantic.json')],
  platforms: {
    css: {
      transformGroup: 'tokens-studio-kebab',
      buildPath: 'dist/css/',
      files: [
        {
          destination: 'tokens.css',
          format: 'css/variables',
        },
      ],
    },
    json: {
      transformGroup: 'tokens-studio',
      buildPath: 'dist/json/',
      files: [
        {
          destination: 'tokens.json',
          format: 'json',
        },
      ],
    },
    ts: {
      transformGroup: 'tokens-studio',
      buildPath: 'dist/ts/',
      files: [
        {
          destination: 'tokens.ts',
          format: 'javascript/es6',
        },
      ],
    },
  },
}

export default config
