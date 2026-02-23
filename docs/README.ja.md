[English](./README.md) | [日本語](./README.ja.md)

# morphink docs

このリポジトリはプロダクト非依存のデザインシステム基盤です。
Tokens Studio で管理するトークンを出力し、UI コンポーネントと Storybook で可視化します。

## 目的

- shadcn-vue をプロダクトに直接組み込まない
- トークンを唯一の信頼できるソースとして使う
- Storybook を通じて「作り方」を共有する

## 主要技術

- Tokens Studio + Style Dictionary
- Reka UI（A11y が重要なプリミティブの内部利用）
- Tailwind（UI CSS ビルド専用）

## なぜ shadcn-vue を直接使わないのか？

- **利用者の独立性**: プロダクトは `@morphink/ui` のみに依存し、内部実装の詳細を知らない
- **実装の交換可能性**: Tailwind などの内部を差し替えても公開 API は変わらない
- **安定した運用**: トークン変更は UI レイヤーで吸収し、プロダクトへの影響を最小化

## クイックスタート

```bash
pnpm install
pnpm run build:css
pnpm run dev:docs
```

Storybook: `http://localhost:6006/`

## ディレクトリ

- `packages/tokens` - デザイントークンのソースとビルド成果物
- `packages/ui` - UI コンポーネント（shadcn ベースのプリミティブをラップ）
- `packages/docs` - Storybook

詳細は以下を参照:

- `docs/architecture.ja.md`
- `docs/workflows.ja.md`
