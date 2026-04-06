[English](./README.md) | [日本語](./README.ja.md)

# morphink docs

Documentation and development guides for the morphink design system boilerplate.

> For the design philosophy behind morphink, see [CONCEPT.md](../CONCEPT.md).

## Architecture & Workflow

- [Architecture](./architecture.md) — Three-layer component structure, token pipeline, props system, CSS variable naming, motion system
- [Workflows](./workflows.md) — Token updates, adding new components, Storybook, lint & format, build outputs
- [DTCG Token Manager](../packages/figma-plugin/README.md) — Figma plugin for bidirectional sync between Figma Variables and DTCG JSON (import & export)

## Getting Started

Choose the adoption pattern that fits your project:

| Pattern | Best for | Guide |
|---------|----------|-------|
| **Fork from Template** (recommended) | New projects or teams starting a fresh DS | [getting-started-template.md](./guides/getting-started-template.md) |
| **Embed in Monorepo** | Adding to an existing pnpm workspace | [getting-started-monorepo.md](./guides/getting-started-monorepo.md) |
| **Embed Flat** | Adding without monorepo setup | [getting-started-flat.md](./guides/getting-started-flat.md) |

## Guides

- [Publishing Your Design System](./guides/publishing-your-design-system.md) — npm publish your forked DS as `@myorg/tokens` + `@myorg/ui`
- [Choosing Utilities](./guides/choosing-utilities.md) — `mi:*` utility classes vs Tailwind theme preset

## Quick Start

```bash
pnpm install
pnpm run build
pnpm run dev:docs
```

Storybook: `http://localhost:6006/`

## Key Technologies

| Technology | Role |
|-----------|------|
| [Reka UI](https://reka-ui.com/) | Headless a11y primitives (Dialog, Select, Dropdown, Tabs, etc.) |
| Figma Variables + [Style Dictionary](https://amzn.github.io/style-dictionary/) | Token pipeline — Figma Variables synced via DTCG Token Manager plugin (DTCG format, import & export) |
| [Tailwind CSS v4](https://tailwindcss.com/) | Utility-first CSS, compiled to `morphink.css` (internal detail) |
| [CVA](https://cva.style/) | Style variant definitions (class-variance-authority) |
| [Storybook](https://storybook.js.org/) | Component catalog, token visualization, design guidelines |
| [oxlint](https://oxc.rs/) / [oxfmt](https://oxc.rs/) | Fast linting and formatting |
