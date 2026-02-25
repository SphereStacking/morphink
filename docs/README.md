[English](./README.md) | [日本語](./README.ja.md)

# morphink docs

Design system documentation and development guides.

> For the design philosophy behind morphink, see [CONCEPT.md](../CONCEPT.md).

## Guides

- [Architecture](./architecture.md) — Three-layer component structure, token pipeline, design principles
- [Workflows](./workflows.md) — Token updates, UI development, Storybook, lint & format

### Getting Started

- [Fork from Template](./guides/getting-started-template.md) — Primary route: fork and customize
- [Embed in Monorepo](./guides/getting-started-monorepo.md) — Add to an existing workspace
- [Embed Flat](./guides/getting-started-flat.md) — Add without monorepo setup
- [Publishing Your DS](./guides/publishing-your-design-system.md) — npm publish your forked DS
- [Choosing Utilities](./guides/choosing-utilities.md) — mi:* classes vs Tailwind theme preset

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
