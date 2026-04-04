#!/usr/bin/env node
/**
 * diff-check.mjs
 * トークン JSON の差分を表示し、色の差異を OKLCH deltaE で評価するスクリプト。
 *
 * 使い方:
 *   node scripts/diff-check.mjs [--threshold <number>] [new-dir]
 *
 * new-dir を省略した場合、git で追跡されているファイルの HEAD 版と
 * ワーキングツリー版を比較する（git diff モード）。
 */

import { execSync } from 'node:child_process'
import { existsSync, readFileSync } from 'node:fs'
import { join, relative, resolve } from 'node:path'
import { parseArgs } from 'node:util'
import { differenceCiede2000, parse } from 'culori'

// ── ANSI カラー ────────────────────────────────────────────────────────────
const C = {
  reset: '\x1b[0m',
  bold: '\x1b[1m',
  dim: '\x1b[2m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  cyan: '\x1b[36m',
  magenta: '\x1b[35m',
  white: '\x1b[37m',
}

const bold = (s) => `${C.bold}${s}${C.reset}`
const dim = (s) => `${C.dim}${s}${C.reset}`
const red = (s) => `${C.red}${s}${C.reset}`
const green = (s) => `${C.green}${s}${C.reset}`
const yellow = (s) => `${C.yellow}${s}${C.reset}`
const cyan = (s) => `${C.cyan}${s}${C.reset}`
const magenta = (s) => `${C.magenta}${s}${C.reset}`

// ── 引数パース ─────────────────────────────────────────────────────────────
const { values: flags, positionals } = parseArgs({
  args: process.argv.slice(2),
  options: {
    threshold: { type: 'string', short: 't', default: '1.0' },
    help: { type: 'boolean', short: 'h', default: false },
  },
  allowPositionals: true,
})

if (flags.help) {
  console.log(`
${bold('Usage:')} node scripts/diff-check.mjs [options] [new-dir]

${bold('Options:')}
  -t, --threshold <number>  deltaE 閾値（デフォルト: 1.0）
  -h, --help                このヘルプを表示

${bold('Arguments:')}
  new-dir  新しいトークン JSON を含むディレクトリ
           省略時は git HEAD との差分を比較

${bold('対象ファイル:')} primitives.json, semantic.json, semantic-dark.json
  `)
  process.exit(0)
}

const THRESHOLD = parseFloat(flags.threshold)
const NEW_DIR = positionals[0] ? resolve(positionals[0]) : null

// ── 対象ファイル ───────────────────────────────────────────────────────────
const TARGET_FILES = ['primitives.json', 'semantic.json', 'semantic-dark.json']
const TOKENS_DIR = new URL('../tokens/', import.meta.url).pathname

// ── ユーティリティ ─────────────────────────────────────────────────────────

/**
 * JSON を再帰的に走査し、$value を持つリーフトークンを抽出する。
 * @param {object} obj
 * @param {string[]} path
 * @returns {Map<string, {$value: unknown, $type?: string}>}
 */
function extractLeaves(obj, path = []) {
  const result = new Map()
  if (typeof obj !== 'object' || obj === null) return result

  if ('$value' in obj) {
    result.set(path.join('.'), obj)
    return result
  }

  for (const [key, val] of Object.entries(obj)) {
    if (key.startsWith('$')) continue
    for (const [k, v] of extractLeaves(val, [...path, key])) {
      result.set(k, v)
    }
  }
  return result
}

/**
 * 文字列が色値かどうか判定する（hex / oklch / rgb 形式）。
 */
function isColorValue(value) {
  if (typeof value !== 'string') return false
  return (
    /^#[0-9a-fA-F]{3,8}$/.test(value) ||
    /^oklch\(/i.test(value) ||
    /^rgb\(/i.test(value) ||
    /^hsl\(/i.test(value)
  )
}

/**
 * culori で CIEDE2000 deltaE を計算する（知覚的均等性が高い）。
 * パースできない場合は null を返す。
 */
const deltaEFn = differenceCiede2000()

function calcDeltaE(a, b) {
  try {
    const colorA = parse(a)
    const colorB = parse(b)
    if (!colorA || !colorB) return null
    return deltaEFn(colorA, colorB)
  } catch {
    return null
  }
}

function formatValue(val) {
  if (typeof val === 'object' && val !== null) return JSON.stringify(val)
  return String(val)
}

/**
 * git HEAD 版のファイル内容を取得する。
 * 追跡されていない場合は null を返す。
 */
function getGitHeadContent(filePath) {
  try {
    const rel = relative(process.cwd(), filePath)
    const content = execSync(`git show HEAD:./${rel}`, {
      cwd: process.cwd(),
      stdio: ['pipe', 'pipe', 'pipe'],
    }).toString()
    return content
  } catch {
    return null
  }
}

// ── メイン処理 ─────────────────────────────────────────────────────────────

let hasThresholdViolation = false
let totalAdded = 0
let totalRemoved = 0
let totalChanged = 0

console.log()
console.log(bold(`${cyan('▶')} Morphink Token Diff Check`))
console.log(dim(`  threshold: deltaE < ${THRESHOLD}`))
if (NEW_DIR) {
  console.log(dim(`  mode: directory comparison (${NEW_DIR})`))
} else {
  console.log(dim(`  mode: git HEAD vs working tree`))
}
console.log()

for (const filename of TARGET_FILES) {
  const currentPath = join(TOKENS_DIR, filename)

  // 旧バージョン（比較元）の取得
  let oldContent = null
  if (NEW_DIR) {
    // new-dir モード: currentPath が旧、new-dir 内が新
    if (existsSync(currentPath)) {
      oldContent = readFileSync(currentPath, 'utf-8')
    }
  } else {
    // git モード: HEAD が旧
    oldContent = getGitHeadContent(currentPath)
  }

  // 新バージョン（比較先）の取得
  let newContent = null
  if (NEW_DIR) {
    const newPath = join(NEW_DIR, filename)
    if (existsSync(newPath)) {
      newContent = readFileSync(newPath, 'utf-8')
    }
  } else {
    if (existsSync(currentPath)) {
      newContent = readFileSync(currentPath, 'utf-8')
    }
  }

  // ファイルが両側に存在しない場合はスキップ
  if (!oldContent && !newContent) continue

  console.log(bold(`  ${magenta('◆')} ${filename}`))

  let oldTokens = new Map()
  let newTokens = new Map()

  if (oldContent) {
    try {
      oldTokens = extractLeaves(JSON.parse(oldContent))
    } catch (e) {
      console.log(red(`    エラー: 旧 JSON のパースに失敗 — ${e.message}`))
    }
  }
  if (newContent) {
    try {
      newTokens = extractLeaves(JSON.parse(newContent))
    } catch (e) {
      console.log(red(`    エラー: 新 JSON のパースに失敗 — ${e.message}`))
    }
  }

  // ファイル新規追加
  if (!oldContent && newContent) {
    console.log(green(`    ファイル新規追加 (${newTokens.size} トークン)`))
    totalAdded += newTokens.size
    console.log()
    continue
  }

  // ファイル削除
  if (oldContent && !newContent) {
    console.log(red(`    ファイル削除 (${oldTokens.size} トークン)`))
    totalRemoved += oldTokens.size
    console.log()
    continue
  }

  // 追加・削除・変更を分類
  const added = []
  const removed = []
  const changed = []

  for (const [key, newToken] of newTokens) {
    if (!oldTokens.has(key)) {
      added.push({ key, token: newToken })
    }
  }

  for (const [key, oldToken] of oldTokens) {
    if (!newTokens.has(key)) {
      removed.push({ key, token: oldToken })
    }
  }

  for (const [key, oldToken] of oldTokens) {
    if (!newTokens.has(key)) continue
    const newToken = newTokens.get(key)
    const oldVal = formatValue(oldToken.$value)
    const newVal = formatValue(newToken.$value)
    if (oldVal !== newVal) {
      changed.push({ key, oldToken, newToken, oldVal, newVal })
    }
  }

  if (added.length === 0 && removed.length === 0 && changed.length === 0) {
    console.log(green(`    変更なし`))
    console.log()
    continue
  }

  // 追加
  if (added.length > 0) {
    console.log(green(`    ✚ 追加 (${added.length})`))
    for (const { key, token } of added) {
      console.log(green(`      + ${key}`) + dim(` = ${formatValue(token.$value)}`))
    }
    totalAdded += added.length
  }

  // 削除
  if (removed.length > 0) {
    console.log(red(`    ✖ 削除 (${removed.length})`))
    for (const { key, token } of removed) {
      console.log(red(`      - ${key}`) + dim(` = ${formatValue(token.$value)}`))
    }
    totalRemoved += removed.length
  }

  // 変更
  if (changed.length > 0) {
    console.log(yellow(`    ✱ 変更 (${changed.length})`))
    for (const { key, oldVal, newVal } of changed) {
      const isColor = isColorValue(oldVal) || isColorValue(newVal)

      if (isColor) {
        const delta = calcDeltaE(oldVal, newVal)
        if (delta !== null) {
          const ok = delta < THRESHOLD
          const deltaStr = delta.toFixed(3)
          const status = ok ? green(`OK (ΔE=${deltaStr})`) : red(`OVER (ΔE=${deltaStr} >= ${THRESHOLD})`)
          if (!ok) hasThresholdViolation = true
          console.log(
            yellow(`      ~ ${key}`) +
              '\n' +
              dim(`          旧: ${oldVal}`) +
              '\n' +
              dim(`          新: ${newVal}`) +
              '\n' +
              `          ${status}`,
          )
        } else {
          // deltaE 計算不可（参照値など）
          console.log(
            yellow(`      ~ ${key}`) +
              '\n' +
              dim(`          旧: ${oldVal}`) +
              '\n' +
              dim(`          新: ${newVal}`) +
              '\n' +
              dim(`          (色として評価不可)`),
          )
        }
      } else {
        console.log(
          yellow(`      ~ ${key}`) + '\n' + dim(`          旧: ${oldVal}`) + '\n' + dim(`          新: ${newVal}`),
        )
      }
    }
    totalChanged += changed.length
  }

  console.log()
}

// ── サマリー ───────────────────────────────────────────────────────────────
console.log(bold(`  ${cyan('◀')} サマリー`))
console.log(green(`    追加:  ${totalAdded}`))
console.log(red(`    削除:  ${totalRemoved}`))
console.log(yellow(`    変更:  ${totalChanged}`))
console.log()

if (hasThresholdViolation) {
  console.log(red(bold(`  ✖ 閾値超過あり (deltaE >= ${THRESHOLD}) — exit 1`)))
  console.log()
  process.exit(1)
} else if (totalAdded + totalRemoved + totalChanged > 0) {
  console.log(yellow(bold(`  ! 差分あり（すべて閾値内）— exit 0`)))
  console.log()
  process.exit(0)
} else {
  console.log(green(bold(`  ✔ 差分なし — exit 0`)))
  console.log()
  process.exit(0)
}
