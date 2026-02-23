[English](./workflows.md) | [日本語](./workflows.ja.md)

# Workflows

## Token Updates

1. Make changes in Tokens Studio
2. Update `packages/tokens/tokens/*.json`
3. Generate outputs

```bash
pnpm --filter @morphink/tokens build
```

## UI Development

1. Update base components (`packages/ui/src/base`)
2. Reflect changes in wrapper components (`packages/ui/src/components`)
3. Build Tailwind CSS output

```bash
pnpm --filter @morphink/ui build:css
```

## Storybook

```bash
pnpm --filter @morphink/docs dev
```

## Build Outputs

- `packages/tokens/dist/css/tokens.css`
- `packages/tokens/dist/json/tokens.json`
- `packages/tokens/dist/ts/tokens.ts`
- `packages/ui/dist/ui.css`
