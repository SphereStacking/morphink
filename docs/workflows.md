# Workflows

## Tokens 更新

1. Tokens Studio で変更
2. `packages/tokens/tokens/*.json` を更新
3. 出力生成

```bash
pnpm --filter @ink-ui/tokens build
```

## UI 開発

1. Base コンポーネント（`packages/ui/src/base`）を更新
2. ラップコンポーネント（`packages/ui/src/components`）に反映
3. Tailwind CSS 出力

```bash
pnpm --filter @ink-ui/ui build:css
```

## Storybook

```bash
pnpm --filter @ink-ui/docs dev
```

## 生成物

- `packages/tokens/dist/css/tokens.css`
- `packages/tokens/dist/json/tokens.json`
- `packages/tokens/dist/ts/tokens.ts`
- `packages/ui/dist/ui.css`
