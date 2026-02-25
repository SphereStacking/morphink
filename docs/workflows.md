[English](./workflows.md) | [日本語](./workflows.ja.md)

# Workflows

## Token Updates

1. Edit token files in `packages/tokens/tokens/`
2. Rebuild tokens:

```bash
pnpm --filter @morphink/tokens build
```

3. Rebuild UI CSS:

```bash
pnpm --filter @morphink/ui build:css
```

Or rebuild everything at once:

```bash
pnpm run build
```

## UI Development

1. Create or update Base component (`packages/ui/src/base/ui/*/`)
2. Create or update Public wrapper (`packages/ui/src/components/`)
3. Add export to `packages/ui/src/index.ts`
4. Add Storybook story (`packages/docs/src/stories/components/`)

## Storybook

```bash
pnpm run dev:docs
```

## Lint & Format

```bash
pnpm run lint       # oxlint
pnpm run format     # oxfmt --write
```

## Build Outputs

- `packages/tokens/dist/css/tokens.css` — Light mode CSS variables
- `packages/tokens/dist/css/tokens-dark.css` — Dark mode overrides
- `packages/tokens/dist/css/utilities.css` — `mi:` prefixed utility classes
- `packages/tokens/dist/css/tailwind-theme.css` — Tailwind v4 theme preset
- `packages/tokens/dist/json/tokens.json`
- `packages/tokens/dist/ts/tokens.ts`
- `packages/ui/dist/ui.css` — Compiled Tailwind CSS
