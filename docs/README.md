# ink-ui docs

このリポジトリは、プロダクトから独立したデザインシステム基盤です。
Tokens Studio で管理したトークンを出力し、UIコンポーネントと Storybook で可視化します。

## 目的

- プロダクトに shadcn-vue を直接入れない
- トークンを single source of truth にする
- Storybook で「こう作る」を共有できる状態にする

## 使用技術（要点）

- Tokens Studio + Style Dictionary
- Reka UI（A11yが重いプリミティブの内部利用）
- Tailwind（UI CSS のビルドのみ）

## なぜ shadcn-vue を直接入れないのか

- **使用側が直接依存しないため**: プロダクトは `@ink-ui/ui` だけを使い、内部実装を意識しない
- **実装を差し替えやすくするため**: Tailwind などの採用を変えても、UI の使い方を変えずに済む
- **運用を安定させるため**: Tokens 変更を UI の内部で吸収でき、プロダクトへの影響を最小化できる

## クイックスタート

```bash
pnpm install
pnpm --filter @ink-ui/tokens build
pnpm --filter @ink-ui/ui build:css
pnpm --filter @ink-ui/docs dev
```

Storybook: `http://localhost:6006/`

## ディレクトリ

- `packages/tokens` - Tokens Studio のソースと出力物
- `packages/ui` - UIコンポーネント（shadcn を参考にした Base を内部に保持）
- `packages/docs` - Storybook

詳細は以下を参照してください。

- `docs/architecture.md`
- `docs/workflows.md`
