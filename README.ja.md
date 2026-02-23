[English](./README.md) | [日本語](./README.ja.md)

# morphink

<p>
  <img src="packages/docs/public/ink-ui-icon.svg" alt="morphink icon" width="64" height="64" />
</p>

Vue 3 デザインシステムスターターキット。トークンパイプライン付きの pnpm モノレポ構成。

## クイックスタート

```bash
pnpm install
pnpm run build:css
pnpm run dev:docs
```

Storybook: `http://localhost:6006/`

## アーキテクチャ

```
Tokens Studio
  -> packages/tokens/tokens/*.json
  -> Style Dictionary (ビルド)
  -> packages/tokens/dist (css/json/ts)
  -> packages/ui/src/styles/tokens.css (import)
  -> packages/ui/dist/ui.css
  -> Storybook
```

## パッケージ構成

- `packages/tokens` - デザイントークンのソースとビルド成果物
- `packages/ui` - UI コンポーネント（shadcn ベースのプリミティブをラップ）
- `packages/docs` - トークンと UI の可視化用 Storybook

## トークン

ソースファイルは `packages/tokens/tokens` に配置:

- `packages/tokens/tokens/alias.json` - パレットとスケール（生の値）
- `packages/tokens/tokens/semantic.json` - プロダクト向けトークン

## カスタマイズ

1. `packages/tokens/tokens/` 内のトークンファイルを編集
2. `pnpm --filter @morphink/tokens build` で成果物を再生成
3. `pnpm --filter @morphink/ui build:css` で UI スタイルシートを再ビルド

## ドキュメント

- `docs/README.md` - 概要とクイックスタート
- `docs/architecture.md` - アーキテクチャとデータフロー
- `docs/workflows.md` - 日常ワークフロー（トークン / UI / ドキュメント）

## ライセンス

[MIT](./LICENSE)
