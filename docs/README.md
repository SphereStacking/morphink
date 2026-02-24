[English](./README.md) | [日本語](./README.ja.md)

# morphink docs

Design system documentation and development guides.

> For the design philosophy behind morphink, see [CONCEPT.md](../CONCEPT.md).

## Guides

- [Architecture](./architecture.md) — Three-layer component structure, token pipeline, design principles
- [Workflows](./workflows.md) — Token updates, UI development, Storybook, lint & format

## Quick Start

```bash
pnpm install
pnpm run build
pnpm run dev:docs
```

Storybook: `http://localhost:6006/`

## Key Technologies

- **Reka UI** — Headless a11y primitives (Dialog, Select, Dropdown, Tabs, etc.)
- **Tokens Studio + Style Dictionary** — Token pipeline from design to code
- **Tailwind CSS v4** — Utility-first CSS, compiled to `ui.css`
- **CVA** (class-variance-authority) — Style variant definitions
