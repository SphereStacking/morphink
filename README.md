[English](./README.md) | [日本語](./README.ja.md)

# morphink

<p align="center">
  <img src="docs/brand-showcase.png" alt="morphink brand showcase" width="600" />
</p>

A design system boilerplate for Vue 3 — token pipeline, layered component architecture, and Storybook, ready to fork.

> **Why morphink?** See [CONCEPT.md](./CONCEPT.md) for the full design philosophy.

## Quick Start

```bash
pnpm install
pnpm run build
pnpm run dev:docs
```

Storybook: `http://localhost:6006/`

## Architecture

```
Tokens Studio
  → packages/tokens/tokens/*.json (alias / semantic / semantic-dark)
  → Style Dictionary (build)
  → packages/tokens/dist (css / json / ts)
  → packages/ui/src/styles/tokens.css (import)
  → Tailwind compile → packages/ui/dist/ui.css
  → Storybook
```

## Package Structure

| Package | Description |
|---------|-------------|
| `packages/tokens` | Design tokens source (Tokens Studio) and Style Dictionary build |
| `packages/ui` | Vue 3 UI components — Reka UI headless primitives + CVA styling |
| `packages/docs` | Storybook for component catalog and guidelines |

## Customization

1. Replace token values in `packages/tokens/tokens/` with your brand colors and scales
2. Rebuild: `pnpm run build`
3. Your design system is ready

## Usage Patterns

### How to adopt morphink

1. **Fork from template** — Click "Use this template" on GitHub to create an independent repository. This is the primary intended route. You can also publish it as an npm package for your organization.
2. **Embed in a monorepo** — Add packages/tokens and packages/ui to an existing workspace.
3. **Embed flat** — Place the design system under src/ in an existing project (no monorepo required).

### Utility choice for DS consumers

| Project situation | Use |
|---|---|
| Cannot adopt Tailwind | `utilities.css` (mi:\* classes) |
| Already has Tailwind | `tailwind-theme.css` (Tailwind theme preset) |

Both reference the same tokens — only the entry point differs.

## Documentation

- [CONCEPT.md](./CONCEPT.md) — Architecture philosophy and design decisions
- [docs/architecture.md](./docs/architecture.md) — Technical architecture and data flow
- [docs/workflows.md](./docs/workflows.md) — Development workflows
- [docs/guides/](./docs/guides/) — Getting started guides for each adoption pattern

## License

[MIT](./LICENSE)
