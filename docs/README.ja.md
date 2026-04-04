[English](./README.md) | [日本語](./README.ja.md)

# morphink docs

morphink デザインシステムボイラープレートのドキュメントと開発ガイド。

> morphink の設計思想については [CONCEPT.ja.md](../CONCEPT.ja.md) を参照。

## アーキテクチャ & ワークフロー

- [アーキテクチャ](./architecture.ja.md) — 3 層コンポーネント構造、トークンパイプライン、Props 体系、CSS 変数命名規則、モーションシステム
- [ワークフロー](./workflows.ja.md) — トークン更新、新コンポーネント追加、Storybook、lint・フォーマット、ビルド成果物

## はじめ方

プロジェクトに合った導入パターンを選択:

- [テンプレートからフォーク](./guides/getting-started-template.ja.md) — メインルート: フォークしてカスタマイズ（推奨）
- [モノレポに組み込み](./guides/getting-started-monorepo.ja.md) — 既存の pnpm workspace に追加
- [フラットに組み込み](./guides/getting-started-flat.ja.md) — モノレポ化せずに追加

## ガイド

- [DS を npm 公開](./guides/publishing-your-design-system.ja.md) — フォークした DS を `@myorg/tokens` + `@myorg/ui` として公開
- [ユーティリティの選択](./guides/choosing-utilities.ja.md) — `mi:*` ユーティリティクラス vs Tailwind テーマプリセット

## クイックスタート

```bash
pnpm install
pnpm run build
pnpm run dev:docs
```

Storybook: `http://localhost:6006/`

## 主要技術

| 技術 | 役割 |
|-----|------|
| [Reka UI](https://reka-ui.com/) | ヘッドレス a11y プリミティブ（Dialog, Select, Dropdown, Tabs 等） |
| Figma Variables + [Style Dictionary](https://amzn.github.io/style-dictionary/) | トークンパイプライン — Figma ネイティブ変数をカスタムプラグインで DTCG 形式出力 |
| [Tailwind CSS v4](https://tailwindcss.com/) | ユーティリティファースト CSS、`ui.css` にコンパイル（内部実装） |
| [CVA](https://cva.style/) | スタイルバリアント定義（class-variance-authority） |
| [Storybook](https://storybook.js.org/) | コンポーネントカタログ、トークン可視化、デザインガイドライン |
| [oxlint](https://oxc.rs/) / [oxfmt](https://oxc.rs/) | 高速な lint・フォーマット |
