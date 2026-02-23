[English](./README.md) | [日本語](./README.ja.md)

# morphink

<p>
  <img src="packages/docs/public/ink-ui-icon.svg" alt="morphink icon" width="64" height="64" />
</p>

A Vue 3 design system starter kit with a token pipeline, built as a pnpm monorepo.

## Quick Start

```bash
pnpm install
pnpm run build:css
pnpm run dev:docs
```

Storybook: `http://localhost:6006/`

## Architecture

```
Tokens Studio
  -> packages/tokens/tokens/*.json
  -> Style Dictionary (build)
  -> packages/tokens/dist (css/json/ts)
  -> packages/ui/src/styles/tokens.css (import)
  -> packages/ui/dist/ui.css
  -> Storybook
```

## Package Structure

- `packages/tokens` - Tokens Studio source and build outputs
- `packages/ui` - UI components (internally wraps shadcn-based primitives)
- `packages/docs` - Storybook for tokens and UI visualization

## Tokens

Sources are located at `packages/tokens/tokens`:

- `packages/tokens/tokens/alias.json` - Palette and scales (raw values)
- `packages/tokens/tokens/semantic.json` - Product-facing tokens

## Customization

1. Edit token files in `packages/tokens/tokens/`
2. Run `pnpm --filter @morphink/tokens build` to regenerate outputs
3. Run `pnpm --filter @morphink/ui build:css` to rebuild the UI stylesheet

## Documentation

- `docs/README.md` - Overview and quick start
- `docs/architecture.md` - Architecture and data flow
- `docs/workflows.md` - Daily workflows (tokens/UI/docs)

## License

[MIT](./LICENSE)
