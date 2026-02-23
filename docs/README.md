# ink-ui docs

This repository is a product-independent design system foundation.
It outputs tokens managed by Tokens Studio and visualizes them through UI components and Storybook.

## Purpose

- Avoid embedding shadcn-vue directly in products
- Use tokens as the single source of truth
- Share "how to build" through Storybook

## Key Technologies

- Tokens Studio + Style Dictionary
- Reka UI (internal use for A11y-heavy primitives)
- Tailwind (UI CSS build only)

## Why Not Use shadcn-vue Directly?

- **Consumer independence**: Products depend only on `@ink-ui/ui`, not internal implementation details
- **Swappable implementation**: Replacing Tailwind or other internals doesn't change the public API
- **Stable operations**: Token changes are absorbed within the UI layer, minimizing product impact

## Quick Start

```bash
pnpm install
pnpm --filter @ink-ui/tokens build
pnpm --filter @ink-ui/ui build:css
pnpm --filter @ink-ui/docs dev
```

Storybook: `http://localhost:6006/`

## Directory

- `packages/tokens` - Tokens Studio source and build outputs
- `packages/ui` - UI components (internally wraps shadcn-based primitives)
- `packages/docs` - Storybook

For details, see:

- `docs/architecture.md`
- `docs/workflows.md`
