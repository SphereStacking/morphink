[English](./architecture.md) | [日本語](./architecture.ja.md)

# Architecture

## Three-Layer Component Structure

```
Public (components/)  →  Base (base/ui/*/)  →  Reka UI
  Product API             CVA variants          Headless a11y
```

| Layer | Location | Naming | Role |
|-------|----------|--------|------|
| Public | `packages/ui/src/components/` | `Button.vue` | External API — thin wrapper over Base |
| Base | `packages/ui/src/base/ui/*/` | `ButtonBase.vue` | CVA variants + Reka UI integration |
| Props | `packages/ui/src/base/lib/props/` | `variant.ts`, `size.ts` | Shared prop type definitions |

All components are exported from `packages/ui/src/index.ts`.

## Token Pipeline

```
Tokens Studio
  → packages/tokens/tokens/*.json (alias / semantic / semantic-dark)
  → Style Dictionary (build)
  → packages/tokens/dist (css / json / ts)
  → packages/ui/src/styles/tokens.css (import as CSS variables)
  → Tailwind compile → packages/ui/dist/ui.css
  → Storybook
```

## Package Structure

```
packages/
  tokens/
    tokens/           # alias.json, semantic.json, semantic-dark.json
    dist/             # build outputs (css, json, ts)
  ui/
    src/base/ui/      # Base components (*Base.vue)
    src/base/lib/     # utilities (cn, cva variants, layout-utils, props)
    src/components/   # Public wrappers
    dist/ui.css       # generated CSS
  docs/
    src/stories/      # Storybook stories
```

## Component Patterns

### Compound Components

Card and Dropdown use the compound component pattern with sub-components:

- **Card**: CardHeader / CardBody / CardFooter / CardTitle / CardDescription / CardMedia
- **Dropdown**: 12 sub-components (Trigger, Content, Item, Separator, etc.) with provide/inject context propagation

### Reka UI Wrapper Pattern

Stateful Reka UI primitives (Dialog, Dropdown, Select, etc.) require `useForwardPropsEmits` from reka-ui to correctly handle controlled/uncontrolled mode. Direct binding of optional props passes `undefined`, causing Reka UI to enter controlled mode unexpectedly.

## Design Principles

- **Internal implementation is not exposed** — Products depend only on Public components
- **Dependency isolation** — Swapping Reka UI or Tailwind affects only the Base layer
- **Prefer semantic tokens** — Components reference `--morphink-color-primary`, never raw palette values
