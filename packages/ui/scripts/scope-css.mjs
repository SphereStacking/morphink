/**
 * Post-process Tailwind CSS build output to:
 * 1. Remove Preflight (@layer base) — prevents global style pollution
 * 2. Scope utility selectors under [data-morphink] — prevents class leakage
 *
 * Uses :where() to maintain specificity 0 for scoped selectors.
 */

import { readFileSync, writeFileSync } from 'node:fs'
import { parse } from 'postcss'

const CSS_PATH = new URL('../dist/ui.css', import.meta.url).pathname

const SCOPE_ATTR = '[data-morphink]'

function scopeUtilities() {
  const css = readFileSync(CSS_PATH, 'utf8')
  const root = parse(css)

  root.walkAtRules('layer', (atRule) => {
    // Step 1: Remove Preflight
    if (atRule.params === 'base') {
      atRule.remove()
      return
    }

    // Step 2: Scope utility selectors
    if (atRule.params === 'utilities') {
      atRule.walkRules((rule) => {
        // Only transform top-level rules within @layer utilities
        // Nested rules (&:hover, & p, [data-state] &) are left untouched
        if (rule.parent !== atRule) return

        const original = rule.selector
        rule.selector = `:where(${SCOPE_ATTR} ${original}, ${SCOPE_ATTR}${original})`
      })
    }

    // @layer theme, @layer properties — kept as-is
  })

  // Remove the layer order declaration (redundant after base removal)
  root.walkAtRules('layer', (atRule) => {
    if (/^theme\s*,\s*base\s*,\s*components\s*,\s*utilities$/.test(atRule.params) && !atRule.nodes) {
      atRule.remove()
    }
  })

  const output = root.toString()
  writeFileSync(CSS_PATH, output)

  // Report
  const beforeLines = css.split('\n').length
  const afterLines = output.split('\n').length
  console.log(`scope-css: ${CSS_PATH}`)
  console.log(`  Removed @layer base (Preflight)`)
  console.log(`  Scoped utilities under ${SCOPE_ATTR}`)
  console.log(`  ${beforeLines} → ${afterLines} lines`)
}

scopeUtilities()
