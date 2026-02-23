# AGENTS.md

このファイルは、このリポジトリで動作するエージェント向けのガイドです。
デザインシステムを一貫性のあるトークン駆動で、運用しやすく保つことを目的とします。

## リポジトリ概要

- pnpm workspaces で管理された monorepo
- パッケージは 3 つ
- `packages/tokens` (Tokens Studio のソース + Style Dictionary 出力)
- `packages/ui` (Vue UI コンポーネント。shadcn を参考にした Base は内部利用のみ。A11yが重い部分は Reka UI を内部利用)
  - `packages/docs` (Tokens/UI の Storybook)

## ビルド / lint / テスト コマンド

ルートのスクリプト（リポジトリ直下で実行）:

```bash
pnpm install
pnpm run build
pnpm run dev
pnpm run lint
pnpm run test
```

パッケージ別コマンド:

```bash
pnpm --filter @morphink/tokens build
pnpm --filter @morphink/ui build:css
pnpm --filter @morphink/docs dev
pnpm --filter @morphink/docs build
```

補足:

- Tokens の出力: `packages/tokens/dist/*`
- UI CSS の出力: `packages/ui/dist/ui.css`
- Storybook のデフォルト: `http://localhost:6006/`

### 単一テストの実行

現時点ではテストランナーは未導入（unit/integration tests なし）。
将来テストを導入したら、ここに単体テスト実行方法を追記してください。
現状は Storybook で UI を確認します。

## コードスタイル

### 全体

- alias より semantic tokens（例: `color.brand.accent`）を優先
- トークンや既存仕様の再現以外で色の直書きは避ける
- Base コンポーネントは `packages/ui/src/base`
- 公開コンポーネントは `packages/ui/src/components`
- 生成物は手編集しない:
  - `packages/tokens/dist/*`
  - `packages/ui/dist/ui.css`

### Vue / TypeScript

- Vue SFC は `<script setup lang="ts">`
- props は `defineProps` + `withDefaults` を基本
- イベントは `defineEmits` で型を明示
- コンポーネント名は PascalCase (`ButtonBase.vue`)

### Imports

- 順序は「Vue → サードパーティ → ローカル」
- クラス合成は `packages/ui/src/base/lib/utils.ts` の `cn` を使う
- 変種のあるスタイルは `cva` を使う

### Styling

- Tailwind は `packages/ui` でコンパイルし `dist/ui.css` を生成
- トークンの CSS 変数を Tailwind クラスで参照:
  - `text-[var(--colorTextPrimary)]`
  - `bg-[var(--colorSurfaceBase)]`
  - `border-[var(--borderWidthDefault)]`
- Hover/Active は状態トークンを使う:
  - `--colorBrandAccentHover`, `--colorBrandAccentActive`
  - `--colorSurfaceHover`

### Tokens

- ソース:
  - `packages/tokens/tokens/alias.json`
  - `packages/tokens/tokens/semantic.json`
- 出力:
  - `packages/tokens/dist/css/tokens.css`
  - `packages/tokens/dist/json/tokens.json`
  - `packages/tokens/dist/ts/tokens.ts`

### 命名規則

- 公開 props は `variant`, `size`, `tone`, `density` を優先
- バリアント値は小さく固定（例: `sm|md|lg`）
- 内部の shadcn 参考ラップは `Base` サフィックス

### エラーハンドリング

- UI 側に共通のエラーハンドリング層はない
- 入力は TypeScript の型と default で守る
- コンポーネント内で例外は投げず、フォールバックで対応

## Docs (Storybook)

- Story は `packages/docs/src/stories`
- トークン/ガイドラインと整合した内容にする
- ページ内の言語は統一（Guidelines は日本語）

## Cursor / Copilot ルール

- `.cursor/rules`, `.cursorrules`, `.github/copilot-instructions.md` は未検出
  追加された場合はこのファイルに反映する
