import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'

const __dirname = dirname(fileURLToPath(import.meta.url))

const config = {
  include: [
    join(__dirname, 'tokens/alias.json'),
  ],
  source: [
    join(__dirname, 'tokens/semantic.json'),
  ],
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
    utilities: {
      transformGroup: 'tokens-studio-kebab',
      buildPath: join(__dirname, '../ui/dist/'),
      files: [
        {
          destination: 'utilities.css',
          format: 'css/ink-utilities',
          filter: token =>
            ['color', 'space', 'radius', 'shadow'].includes(token.path?.[0]) &&
            token.path.length === 2,
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
