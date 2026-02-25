[English](./workflows.md) | [日本語](./workflows.ja.md)

# ワークフロー

## トークン更新

1. `packages/tokens/tokens/` のトークンファイルを編集
2. トークン再ビルド:

```bash
pnpm --filter @morphink/tokens build
```

3. UI CSS 再ビルド:

```bash
pnpm --filter @morphink/ui build:css
```

または一括ビルド:

```bash
pnpm run build
```

## UI 開発

1. Base コンポーネントを作成・更新（`packages/ui/src/base/ui/*/`）
2. Public ラッパーを作成・更新（`packages/ui/src/components/`）
3. `packages/ui/src/index.ts` に export 追加
4. Storybook ストーリーを追加（`packages/docs/src/stories/components/`）

## Storybook

```bash
pnpm run dev:docs
```

## Lint・フォーマット

```bash
pnpm run lint       # oxlint
pnpm run format     # oxfmt --write
```

## ビルド成果物

- `packages/tokens/dist/css/tokens.css` — ライトモード CSS 変数
- `packages/tokens/dist/css/tokens-dark.css` — ダークモードオーバーライド
- `packages/tokens/dist/css/utilities.css` — `mi:` プレフィックス付きユーティリティクラス
- `packages/tokens/dist/css/tailwind-theme.css` — Tailwind v4 テーマプリセット
- `packages/tokens/dist/json/tokens.json`
- `packages/tokens/dist/ts/tokens.ts`
- `packages/ui/dist/ui.css` — コンパイル済み Tailwind CSS
