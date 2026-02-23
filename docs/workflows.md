# Workflows

## Token Updates

1. Make changes in Tokens Studio
2. Update `packages/tokens/tokens/*.json`
3. Generate outputs

```bash
pnpm --filter @ink-ui/tokens build
```

## UI Development

1. Update base components (`packages/ui/src/base`)
2. Reflect changes in wrapper components (`packages/ui/src/components`)
3. Build Tailwind CSS output

```bash
pnpm --filter @ink-ui/ui build:css
```

## Storybook

```bash
pnpm --filter @ink-ui/docs dev
```

## Build Outputs

- `packages/tokens/dist/css/tokens.css`
- `packages/tokens/dist/json/tokens.json`
- `packages/tokens/dist/ts/tokens.ts`
- `packages/ui/dist/ui.css`
