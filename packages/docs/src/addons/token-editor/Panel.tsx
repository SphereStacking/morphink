import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useChannel } from 'storybook/manager-api'
import { EVENT_RESET_ALL, EVENT_SET_TOKEN } from './constants'
import { tokenCategories, type TokenEntry } from './token-map'

// ── Inject scoped styles once ────────────────────────────────────────
const STYLE_ID = 'ink-token-editor-styles'

function injectStyles() {
  if (document.getElementById(STYLE_ID)) return
  const style = document.createElement('style')
  style.id = STYLE_ID
  style.textContent = `
    .ite-root {
      --ite-bg: #1b1b1f;
      --ite-bg-elevated: #232328;
      --ite-bg-hover: #2a2a30;
      --ite-border: #3a3a42;
      --ite-border-subtle: #2e2e36;
      --ite-text: #e4e4e8;
      --ite-text-muted: #8e8e96;
      --ite-text-dim: #5e5e66;
      --ite-accent: #6e9fff;
      --ite-accent-soft: rgba(110, 159, 255, 0.12);
      --ite-danger: #ff6b6b;
      --ite-radius: 6px;
      --ite-font: -apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif;
      --ite-mono: 'SF Mono', SFMono-Regular, ui-monospace, Menlo, monospace;

      font-family: var(--ite-font);
      font-size: 12px;
      color: var(--ite-text);
      background: var(--ite-bg);
      height: 100%;
      overflow-y: auto;
      overflow-x: hidden;
      scrollbar-width: thin;
      scrollbar-color: var(--ite-border) transparent;
    }
    .ite-root::-webkit-scrollbar { width: 6px; }
    .ite-root::-webkit-scrollbar-track { background: transparent; }
    .ite-root::-webkit-scrollbar-thumb {
      background: var(--ite-border);
      border-radius: 3px;
    }

    /* ── Header ── */
    .ite-header {
      position: sticky;
      top: 0;
      z-index: 10;
      background: var(--ite-bg);
      padding: 8px 14px;
      border-bottom: 1px solid var(--ite-border-subtle);
      display: flex;
      align-items: center;
      gap: 8px;
    }
    .ite-count {
      display: inline-flex;
      align-items: center;
      gap: 4px;
      padding: 1px 7px;
      font-size: 10px;
      font-weight: 600;
      color: var(--ite-accent);
      background: var(--ite-accent-soft);
      border-radius: 10px;
      flex-shrink: 0;
    }
    .ite-count-dot {
      width: 5px;
      height: 5px;
      border-radius: 50%;
      background: var(--ite-accent);
    }
    .ite-reset-all {
      font-family: var(--ite-font);
      font-size: 11px;
      font-weight: 500;
      color: var(--ite-danger);
      background: transparent;
      border: 1px solid color-mix(in srgb, var(--ite-danger) 30%, transparent);
      border-radius: var(--ite-radius);
      padding: 3px 10px;
      cursor: pointer;
      transition: all 0.15s ease;
      flex-shrink: 0;
      white-space: nowrap;
    }
    .ite-reset-all:hover {
      background: color-mix(in srgb, var(--ite-danger) 12%, transparent);
      border-color: color-mix(in srgb, var(--ite-danger) 50%, transparent);
    }

    /* ── Search ── */
    .ite-search-wrap {
      position: relative;
      flex: 1;
      min-width: 0;
    }
    .ite-search-icon {
      position: absolute;
      left: 10px;
      top: 50%;
      transform: translateY(-50%);
      color: var(--ite-text-dim);
      font-size: 13px;
      pointer-events: none;
    }
    .ite-search {
      width: 100%;
      box-sizing: border-box;
      padding: 6px 10px 6px 30px;
      font-family: var(--ite-font);
      font-size: 12px;
      color: var(--ite-text);
      background: var(--ite-bg-elevated);
      border: 1px solid var(--ite-border-subtle);
      border-radius: var(--ite-radius);
      outline: none;
      transition: border-color 0.15s ease, box-shadow 0.15s ease;
    }
    .ite-search::placeholder {
      color: var(--ite-text-dim);
    }
    .ite-search:focus {
      border-color: var(--ite-accent);
      box-shadow: 0 0 0 2px var(--ite-accent-soft);
    }

    /* ── Category ── */
    .ite-body { padding: 6px 14px 20px; }
    .ite-category {
      margin-bottom: 2px;
      border-radius: var(--ite-radius);
    }
    .ite-category-header {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 8px 10px;
      cursor: pointer;
      user-select: none;
      border-radius: var(--ite-radius);
      transition: background 0.12s ease;
    }
    .ite-category-header:hover {
      background: var(--ite-bg-hover);
    }
    .ite-category-arrow {
      font-size: 8px;
      color: var(--ite-text-dim);
      transition: transform 0.2s ease;
      flex-shrink: 0;
      width: 10px;
      text-align: center;
    }
    .ite-category[open] > .ite-category-header .ite-category-arrow {
      transform: rotate(90deg);
    }
    .ite-category-label {
      font-size: 11px;
      font-weight: 600;
      color: var(--ite-text);
      flex: 1;
    }
    .ite-category-count {
      font-size: 10px;
      color: var(--ite-text-dim);
      font-variant-numeric: tabular-nums;
    }
    .ite-category-tokens {
      padding: 2px 6px 8px 18px;
    }

    /* ── Token Row ── */
    .ite-token {
      display: grid;
      grid-template-columns: 110px 1fr auto;
      align-items: center;
      gap: 8px;
      padding: 4px 6px;
      border-radius: 4px;
      transition: background 0.1s ease;
      min-height: 30px;
    }
    .ite-token:hover {
      background: var(--ite-bg-hover);
    }
    .ite-token-label {
      font-size: 11px;
      color: var(--ite-text-muted);
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      cursor: default;
      transition: color 0.1s ease;
    }
    .ite-token-label.is-changed {
      color: var(--ite-accent);
      font-weight: 500;
    }
    .ite-token-label:hover {
      color: var(--ite-text);
    }

    /* ── Color Control ── */
    .ite-color-control {
      display: flex;
      align-items: center;
      gap: 6px;
    }
    .ite-swatch-wrap {
      position: relative;
      width: 28px;
      height: 28px;
      flex-shrink: 0;
    }
    .ite-swatch {
      width: 28px;
      height: 28px;
      border-radius: 6px;
      border: 2px solid var(--ite-border);
      cursor: pointer;
      transition: border-color 0.15s ease, transform 0.1s ease;
      box-shadow: inset 0 0 0 1px rgba(0,0,0,0.15);
    }
    .ite-swatch:hover {
      border-color: var(--ite-text-muted);
      transform: scale(1.08);
    }
    .ite-color-picker {
      position: absolute;
      inset: 0;
      opacity: 0;
      width: 28px;
      height: 28px;
      cursor: pointer;
      border: none;
      padding: 0;
    }
    .ite-text-input {
      flex: 1;
      min-width: 0;
      padding: 5px 8px;
      font-family: var(--ite-mono);
      font-size: 11px;
      color: var(--ite-text);
      background: var(--ite-bg-elevated);
      border: 1px solid var(--ite-border-subtle);
      border-radius: 4px;
      outline: none;
      transition: border-color 0.15s ease, box-shadow 0.15s ease;
    }
    .ite-text-input:focus {
      border-color: var(--ite-accent);
      box-shadow: 0 0 0 2px var(--ite-accent-soft);
    }
    .ite-text-input.is-changed {
      border-color: color-mix(in srgb, var(--ite-accent) 50%, transparent);
    }

    /* ── Range Control ── */
    .ite-range-control {
      display: flex;
      align-items: center;
      gap: 8px;
    }
    .ite-range {
      flex: 1;
      min-width: 0;
      height: 4px;
      -webkit-appearance: none;
      appearance: none;
      background: var(--ite-border);
      border-radius: 2px;
      outline: none;
    }
    .ite-range::-webkit-slider-thumb {
      -webkit-appearance: none;
      width: 14px;
      height: 14px;
      border-radius: 50%;
      background: var(--ite-accent);
      cursor: pointer;
      border: 2px solid var(--ite-bg);
      box-shadow: 0 1px 3px rgba(0,0,0,0.3);
      transition: transform 0.1s ease;
    }
    .ite-range::-webkit-slider-thumb:hover {
      transform: scale(1.15);
    }
    .ite-range::-moz-range-thumb {
      width: 14px;
      height: 14px;
      border-radius: 50%;
      background: var(--ite-accent);
      cursor: pointer;
      border: 2px solid var(--ite-bg);
    }
    .ite-range-value {
      flex: 0 0 44px;
      font-family: var(--ite-mono);
      font-size: 11px;
      color: var(--ite-text-muted);
      text-align: right;
      font-variant-numeric: tabular-nums;
    }
    .ite-range-value.is-changed {
      color: var(--ite-accent);
    }

    /* ── Reset Button ── */
    .ite-reset-single {
      width: 18px;
      height: 18px;
      display: flex;
      align-items: center;
      justify-content: center;
      border: none;
      background: transparent;
      color: var(--ite-text-dim);
      border-radius: 4px;
      cursor: pointer;
      font-size: 12px;
      padding: 0;
      opacity: 0;
      transition: opacity 0.12s ease, background 0.12s ease, color 0.12s ease;
    }
    .ite-token:hover .ite-reset-single,
    .ite-reset-single.is-visible {
      opacity: 1;
    }
    .ite-reset-single:hover {
      background: color-mix(in srgb, var(--ite-danger) 15%, transparent);
      color: var(--ite-danger);
    }

    /* ── Empty State ── */
    .ite-empty {
      text-align: center;
      padding: 32px 16px;
      color: var(--ite-text-dim);
      font-size: 12px;
    }
    .ite-empty-icon {
      font-size: 24px;
      margin-bottom: 8px;
      opacity: 0.4;
    }

    /* ── Tooltip ── */
    .ite-copied {
      position: fixed;
      padding: 4px 10px;
      font-size: 11px;
      font-weight: 500;
      color: #fff;
      background: var(--ite-accent);
      border-radius: 4px;
      pointer-events: none;
      z-index: 999;
      animation: ite-fade 1s ease forwards;
    }
    @keyframes ite-fade {
      0% { opacity: 1; transform: translateY(0); }
      70% { opacity: 1; }
      100% { opacity: 0; transform: translateY(-6px); }
    }
  `
  document.head.appendChild(style)
}

// ── Clipboard helper ─────────────────────────────────────────────────
function CopiedToast({ text, x, y }: { text: string; x: number; y: number }) {
  return (
    <div className="ite-copied" style={{ left: x, top: y - 28 }}>
      Copied: {text}
    </div>
  )
}

// ── Token Control ────────────────────────────────────────────────────
function TokenControl({
  token,
  value,
  onChange,
  onReset,
  onCopyVar,
}: {
  token: TokenEntry
  value: string | undefined
  onChange: (cssVar: string, value: string) => void
  onReset: (cssVar: string) => void
  onCopyVar: (cssVar: string, e: React.MouseEvent) => void
}) {
  const display = value ?? token.defaultValue
  const changed = value !== undefined

  return (
    <div className="ite-token">
      <span
        className={`ite-token-label ${changed ? 'is-changed' : ''}`}
        title={`Click to copy: var(${token.cssVar})`}
        onClick={(e) => onCopyVar(token.cssVar, e)}
      >
        {token.label}
      </span>

      <div>
        {token.type === 'color' && (
          <div className="ite-color-control">
            <div className="ite-swatch-wrap">
              <div
                className="ite-swatch"
                style={{ background: display }}
                title={display}
              />
              <input
                className="ite-color-picker"
                type="color"
                onChange={(e) => onChange(token.cssVar, e.target.value)}
                title="Open color picker"
              />
            </div>
            <input
              className={`ite-text-input ${changed ? 'is-changed' : ''}`}
              type="text"
              value={display}
              onChange={(e) => onChange(token.cssVar, e.target.value)}
              spellCheck={false}
            />
          </div>
        )}

        {(token.type === 'dimension' || token.type === 'number') && (
          <div className="ite-range-control">
            <input
              className="ite-range"
              type="range"
              min={token.min}
              max={token.max}
              step={token.step}
              value={
                token.type === 'dimension'
                  ? parseInt(display) || 0
                  : parseFloat(display) || 0
              }
              onChange={(e) =>
                onChange(
                  token.cssVar,
                  token.type === 'dimension' ? `${e.target.value}px` : e.target.value
                )
              }
            />
            <span className={`ite-range-value ${changed ? 'is-changed' : ''}`}>
              {display}
            </span>
          </div>
        )}

        {token.type === 'text' && (
          <input
            className={`ite-text-input ${changed ? 'is-changed' : ''}`}
            type="text"
            value={display}
            onChange={(e) => onChange(token.cssVar, e.target.value)}
            spellCheck={false}
          />
        )}
      </div>

      <button
        className={`ite-reset-single ${changed ? 'is-visible' : ''}`}
        onClick={() => onReset(token.cssVar)}
        title="Reset to default"
      >
        &#x21ba;
      </button>
    </div>
  )
}

// ── Main Panel ───────────────────────────────────────────────────────
export function TokenEditorPanel() {
  const [overrides, setOverrides] = useState<Record<string, string>>({})
  const [search, setSearch] = useState('')
  const [toast, setToast] = useState<{ text: string; x: number; y: number } | null>(null)
  const toastTimer = useRef<ReturnType<typeof setTimeout>>()

  useEffect(() => {
    injectStyles()
  }, [])

  const emit = useChannel({})

  const overrideCount = useMemo(() => Object.keys(overrides).length, [overrides])

  const handleChange = useCallback(
    (cssVar: string, value: string) => {
      setOverrides((prev) => ({ ...prev, [cssVar]: value }))
      emit(EVENT_SET_TOKEN, { cssVar, value })
    },
    [emit]
  )

  const handleResetSingle = useCallback(
    (cssVar: string) => {
      setOverrides((prev) => {
        const next = { ...prev }
        delete next[cssVar]
        return next
      })
      emit(EVENT_SET_TOKEN, { cssVar, value: null })
    },
    [emit]
  )

  const handleResetAll = useCallback(() => {
    setOverrides({})
    emit(EVENT_RESET_ALL)
  }, [emit])

  const handleCopyVar = useCallback((cssVar: string, e: React.MouseEvent) => {
    navigator.clipboard.writeText(`var(${cssVar})`)
    if (toastTimer.current) clearTimeout(toastTimer.current)
    setToast({ text: `var(${cssVar})`, x: e.clientX, y: e.clientY })
    toastTimer.current = setTimeout(() => setToast(null), 1000)
  }, [])

  const filteredCategories = useMemo(() => {
    if (!search.trim()) return tokenCategories
    const q = search.toLowerCase()
    return tokenCategories
      .map((cat) => ({
        ...cat,
        tokens: cat.tokens.filter(
          (t) =>
            t.label.toLowerCase().includes(q) ||
            t.cssVar.toLowerCase().includes(q) ||
            cat.label.toLowerCase().includes(q)
        ),
      }))
      .filter((cat) => cat.tokens.length > 0)
  }, [search])

  return (
    <div className="ite-root">
      <div className="ite-header">
        <div className="ite-search-wrap">
          <span className="ite-search-icon">&#x2315;</span>
          <input
            className="ite-search"
            type="text"
            placeholder="Search tokens..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            spellCheck={false}
          />
        </div>
        {overrideCount > 0 && (
          <span className="ite-count">
            <span className="ite-count-dot" />
            {overrideCount}
          </span>
        )}
        {overrideCount > 0 && (
          <button className="ite-reset-all" onClick={handleResetAll}>
            Reset
          </button>
        )}
      </div>

      <div className="ite-body">
        {filteredCategories.length === 0 ? (
          <div className="ite-empty">
            <div className="ite-empty-icon">&#x2313;</div>
            No tokens match "{search}"
          </div>
        ) : (
          filteredCategories.map((cat) => (
            <details key={cat.label} className="ite-category">
              <summary className="ite-category-header">
                <span className="ite-category-arrow">&#x25B6;</span>
                <span className="ite-category-label">{cat.label}</span>
                <span className="ite-category-count">{cat.tokens.length}</span>
              </summary>
              <div className="ite-category-tokens">
                {cat.tokens.map((token) => (
                  <TokenControl
                    key={token.cssVar}
                    token={token}
                    value={overrides[token.cssVar]}
                    onChange={handleChange}
                    onReset={handleResetSingle}
                    onCopyVar={handleCopyVar}
                  />
                ))}
              </div>
            </details>
          ))
        )}
      </div>

      {toast && <CopiedToast {...toast} />}
    </div>
  )
}
