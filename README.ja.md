[English](./README.md) | [日本語](./README.ja.md)

# morphink

<p>
  <img src="packages/docs/public/ink-ui-icon.svg" alt="morphink icon" width="64" height="64" />
</p>

Vue 3 のためのデザインシステムボイラープレート — トークンパイプライン、レイヤードコンポーネントアーキテクチャ、Storybook をフォークして使える形で提供。

> **なぜ morphink？** 設計思想の詳細は [CONCEPT.ja.md](./CONCEPT.ja.md) を参照。

## クイックスタート

```bash
pnpm install
pnpm run build
pnpm run dev:docs
```

Storybook: `http://localhost:6006/`

## アーキテクチャ

```
Tokens Studio
  → packages/tokens/tokens/*.json (alias / semantic / semantic-dark)
  → Style Dictionary (ビルド)
  → packages/tokens/dist (css / json / ts)
  → packages/ui/src/styles/tokens.css (import)
  → Tailwind コンパイル → packages/ui/dist/ui.css
  → Storybook
```

## パッケージ構成

| パッケージ | 説明 |
|-----------|------|
| `packages/tokens` | デザイントークンのソース（Tokens Studio）と Style Dictionary ビルド |
| `packages/ui` | Vue 3 UI コンポーネント — Reka UI ヘッドレスプリミティブ + CVA スタイリング |
| `packages/docs` | コンポーネントカタログとガイドラインの Storybook |

## カスタマイズ

1. `packages/tokens/tokens/` のトークン値をブランドカラーとスケールに差し替え
2. 再ビルド: `pnpm run build`
3. デザインシステムの準備完了

## ドキュメント

- [CONCEPT.ja.md](./CONCEPT.ja.md) — アーキテクチャ思想と設計判断
- [docs/architecture.ja.md](./docs/architecture.ja.md) — 技術アーキテクチャとデータフロー
- [docs/workflows.ja.md](./docs/workflows.ja.md) — 開発ワークフロー

## ライセンス

[MIT](./LICENSE)
