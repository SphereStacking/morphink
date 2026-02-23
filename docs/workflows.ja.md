[English](./workflows.md) | [日本語](./workflows.ja.md)

# ワークフロー

## トークン更新

1. Tokens Studio で変更
2. `packages/tokens/tokens/*.json` を更新
3. 成果物を生成

```bash
pnpm --filter @morphink/tokens build
```

## UI 開発

1. ベースコンポーネントを更新（`packages/ui/src/base`）
2. ラッパーコンポーネントに反映（`packages/ui/src/components`）
3. Tailwind CSS 出力をビルド

```bash
pnpm --filter @morphink/ui build:css
```

## Storybook

```bash
pnpm run dev:docs
```

## ビルド成果物

- `packages/tokens/dist/css/tokens.css`
- `packages/tokens/dist/json/tokens.json`
- `packages/tokens/dist/ts/tokens.ts`
- `packages/ui/dist/ui.css`
