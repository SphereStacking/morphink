# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## プロジェクト概要

pnpm workspaces によるデザインシステム monorepo。Vue 3 + Tailwind CSS v4 + Figma Variables。
アーキテクチャ思想は CONCEPT.md を参照。

- `packages/tokens` — デザイントークンのソース（DTCG 形式 JSON）と Style Dictionary ビルド
- `packages/figma-plugin` — Figma Variables → DTCG JSON エクスポーター（カスタムプラグイン）
- `packages/ui` — Vue 3 UI コンポーネントライブラリ（Reka UI + CVA + tailwind-merge）
- `packages/docs` — Storybook 10（コンポーネントカタログ・ガイドライン）

## コマンド

```bash
pnpm install                              # 依存インストール
pnpm run build                            # 全パッケージビルド（tokens → css → docs）
pnpm run dev:docs                         # Storybook 起動 (localhost:6006)
pnpm run lint                             # oxlint
pnpm run format                           # oxfmt --write

# パッケージ単体
pnpm --filter @morphink/tokens build        # トークン生成 → dist/css,json,ts
pnpm --filter @morphink/ui build:css        # Tailwind コンパイル → dist/ui.css
pnpm --filter @morphink/docs dev            # Storybook dev（tokens+css ビルド込み）
pnpm --filter @morphink/docs build          # Storybook 静的ビルド
```

UI 確認は Storybook で行う。テストは `pnpm test`（Vitest）。

## 主要依存

- **reka-ui** — ヘッドレス a11y コンポーネント（Dialog, Select, Dropdown, Tabs 等の基盤）
- **class-variance-authority** — スタイルバリアント定義
- **style-dictionary** + **@tokens-studio/sd-transforms** — トークンビルド
- **packages/figma-plugin** — Figma Variables → DTCG JSON エクスポーター
- **Storybook 10.2** — ドキュメント・ビジュアルテスト
- **oxlint** / **oxfmt** — lint・フォーマット

## 段階的リファレンス

ルール（常時ロード）は `.claude/rules/` を参照。
詳細な仕様リファレンスは `.claude/reference/` を参照。

### タスクベース読み込みガイド

| タスク | 読むファイル |
|--------|-------------|
| 新規コンポーネント開発 | `packages/ui/src/base/lib/props/` → 既存 Base コンポーネントを参考 |
| 既存コンポーネント修正 | 対象の Base コンポーネント → `packages/ui/src/base/lib/props/` |
| CSS 変数の命名判断 | 対象の Base コンポーネントの CVA 定義を確認 |
| レイアウト構築 | `packages/ui/src/base/ui/layout/` の各コンポーネント |
| トークン追加・変更 | `.claude/reference/token-pipeline.md` |
| アニメーション実装 | `.claude/reference/motion-tokens.md` → `packages/ui/src/styles/base.css` |
| Figma デザイン実装 | rules/ のみで対応可能 |
