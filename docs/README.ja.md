[English](./README.md) | [日本語](./README.ja.md)

# morphink docs

デザインシステムのドキュメントと開発ガイド。

> morphink の設計思想については [CONCEPT.ja.md](../CONCEPT.ja.md) を参照。

## ガイド

- [アーキテクチャ](./architecture.ja.md) — 3 層コンポーネント構造、トークンパイプライン、設計原則
- [ワークフロー](./workflows.ja.md) — トークン更新、UI 開発、Storybook、lint・フォーマット

### はじめ方

- [テンプレートからフォーク](./guides/getting-started-template.ja.md) — メインルート: フォークしてカスタマイズ
- [モノレポに組み込み](./guides/getting-started-monorepo.ja.md) — 既存 workspace に追加
- [フラット組み込み](./guides/getting-started-flat.ja.md) — モノレポ化せずに追加
- [DS を npm 公開](./guides/publishing-your-design-system.ja.md) — フォークした DS を公開
- [ユーティリティの選択](./guides/choosing-utilities.ja.md) — mi:* クラス vs Tailwind テーマプリセット

## クイックスタート

```bash
pnpm install
pnpm run build
pnpm run dev:docs
```

Storybook: `http://localhost:6006/`

## 主要技術

- **Reka UI** — ヘッドレス a11y プリミティブ（Dialog, Select, Dropdown, Tabs 等）
- **Tokens Studio + Style Dictionary** — デザインからコードへのトークンパイプライン
- **Tailwind CSS v4** — ユーティリティファースト CSS、`ui.css` にコンパイル
- **CVA**（class-variance-authority）— スタイルバリアント定義
