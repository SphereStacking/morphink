# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## プロジェクト概要

pnpm workspaces による デザインシステム monorepo。Vue 3 + Tailwind CSS + Tokens Studio。

- `packages/tokens` — デザイントークンのソース（alias.json / semantic.json）と Style Dictionary ビルド
- `packages/ui` — Vue 3 UI コンポーネントライブラリ（Reka UI + CVA + tailwind-merge）
- `packages/docs` — Storybook（コンポーネントカタログ・ガイドライン）

## コマンド

```bash
pnpm install                              # 依存インストール
pnpm run build                            # 全パッケージビルド
pnpm run dev:docs                         # Storybook 起動 (localhost:6006)

# パッケージ単体
pnpm --filter @ink-ui/tokens build        # トークン生成 → dist/css,json,ts
pnpm --filter @ink-ui/ui build:css        # Tailwind コンパイル → dist/ui.css
pnpm --filter @ink-ui/docs dev            # Storybook dev（tokens+css ビルド込み）
pnpm --filter @ink-ui/docs build          # Storybook 静的ビルド
```

テストランナーは未導入。UI 確認は Storybook で行う。

## アーキテクチャ

### データフロー

```
Tokens Studio → packages/tokens/tokens/*.json
  → Style Dictionary (build.mjs) → packages/tokens/dist/{css,json,ts}
  → packages/ui/src/styles/tokens.css (CSS変数として import)
  → Tailwind コンパイル → packages/ui/dist/ui.css
  → Storybook で表示
```

### コンポーネント 3 層構造

1. **Base** (`packages/ui/src/base/ui/*/`): CVA でバリアント管理。Reka UI で a11y プリミティブ。内部利用前提
2. **Public** (`packages/ui/src/components/`): Base の薄いラッパー。外部公開 API
3. **Props** (`packages/ui/src/base/lib/props/`): variant / size / tone / rounded / shadow の CVA 定義を集約

Base コンポーネントは `*Base.vue`、公開ラッパーは素の名前（`Button.vue`）。
すべて `packages/ui/src/index.ts` から export。

### 共通 Props 体系

| Prop | 値 |
|------|----|
| variant | solid, outline, ghost, soft, subtle, elevated |
| size | xs, sm, md, lg, xl |
| tone | primary, secondary, tertiary, base, accent, neutral, success, warning, info, destructive |
| rounded | none, sm, md, lg, xl, full |
| shadow | none, sm, md, lg |

## コードスタイル

- Vue SFC: `<script setup lang="ts">` / `defineProps` + `withDefaults` / `defineEmits`
- import 順: Vue → サードパーティ → ローカル
- クラス合成: `cn()` (`packages/ui/src/base/lib/utils.ts`) を使う（clsx + tailwind-merge）
- スタイルバリアント: `cva` (class-variance-authority) を使う
- トークン参照: CSS 変数を Tailwind arbitrary value で使う — `text-[var(--colorTextPrimary)]`, `bg-[var(--colorSurfaceBase)]`
- 状態トークン: `--colorBrandAccentHover`, `--colorSurfaceHover` 等を使う
- semantic tokens を優先し、alias tokens や色の直書きは避ける

## 編集してはいけないファイル（生成物）

- `packages/tokens/dist/*`
- `packages/ui/dist/ui.css`
- `packages/ui/dist/utilities.css`

## 主要依存

- **reka-ui** — ヘッドレス a11y コンポーネント（Dialog, Select, Tabs 等の基盤）
- **style-dictionary** + **@tokens-studio/sd-transforms** — トークンビルド
- **Storybook 8.6** — ドキュメント・ビジュアルテスト
