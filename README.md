[English](./README.md) | [日本語](./README.ja.md)

# morphink

<p>
  <img src="packages/docs/public/ink-ui-icon.svg" alt="morphink icon" width="64" height="64" />
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

## Documentation

- [CONCEPT.md](./CONCEPT.md) — Architecture philosophy and design decisions
- [docs/architecture.md](./docs/architecture.md) — Technical architecture and data flow
- [docs/workflows.md](./docs/workflows.md) — Development workflows

## License

[MIT](./LICENSE)
