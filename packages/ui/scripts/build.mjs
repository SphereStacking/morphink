/**
 * Unified build script for @morphink/ui.
 *
 * Steps (sequential, order matters):
 *   1. css       — Tailwind CLI → dist/ui.css, then scope under [data-morphink]
 *   2. js        — Vite → dist/index.mjs + dist/components.css
 *   3. morphink  — Inline entry imports + append components.css + ui.css → dist/morphink.css
 *   4. types     — vue-tsc → dist/types/
 *
 * Usage:
 *   node scripts/build.mjs          # full build
 *   node scripts/build.mjs css      # css step only (for dev:docs)
 */

import { execSync } from 'node:child_process'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const uiRoot = resolve(__dirname, '..')

function run(cmd) {
  console.log(`\n> ${cmd}`)
  execSync(cmd, { cwd: uiRoot, stdio: 'inherit' })
}

const steps = {
  css() {
    run('tailwindcss -i ./src/styles/tailwind.css -o ./dist/ui.css')
    run('node scripts/scope-css.mjs')
  },
  js() {
    run('vite build')
  },
  morphink() {
    run('node scripts/build-morphink.mjs')
  },
  types() {
    run('vue-tsc -p tsconfig.build.json --noCheck')
  },
}

// Allow running a single step: node scripts/build.mjs css
const requested = process.argv[2]

if (requested) {
  if (!steps[requested]) {
    console.error(`Unknown step: ${requested}. Available: ${Object.keys(steps).join(', ')}`)
    process.exit(1)
  }
  steps[requested]()
} else {
  // Full build
  for (const step of Object.values(steps)) {
    step()
  }
}
