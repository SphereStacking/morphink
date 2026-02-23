# ink-ui

<p>
  <img src="packages/docs/public/ink-ui-icon.svg" alt="ink-ui icon" width="64" height="64" />
</p>

pnpm workspace を使ったデザインシステムの monorepo です。

## パッケージ構成

- `packages/tokens` - Tokens Studio のソースと出力物
- `packages/ui` - UI コンポーネント（shadcn を参考にした Base を内部に保持）
- `packages/docs` - Tokens / UI の Storybook

## Tokens

ソースは `packages/tokens/tokens` にあります。

- `packages/tokens/tokens/alias.json` - パレットとスケール（生値）
- `packages/tokens/tokens/semantic.json` - プロダクト向けトークン

## ドキュメント

- `docs/README.md` - 概要とクイックスタート
- `docs/architecture.md` - アーキテクチャとデータフロー
- `docs/workflows.md` - 日々の運用手順（tokens/UI/docs）
