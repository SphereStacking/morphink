[English](./getting-started-monorepo.md) | [日本語](./getting-started-monorepo.ja.md)

# クイックスタート: 既存モノレポへの組み込み

morphink のパッケージを既存の pnpm モノレポに統合する方法です。

## 前提条件

- Node.js 18+
- pnpm 9+ によるモノレポ環境
- `pnpm-workspace.yaml` が設定済み

## 手順

### 1. パッケージをコピーする

morphink リポジトリから以下のディレクトリを既存モノレポにコピーします。

- `packages/tokens` — デザイントークンのソースとビルド設定
- `packages/ui` — Vue 3 コンポーネントライブラリ

### 2. ワークスペース設定にパスを追加する

`pnpm-workspace.yaml` にコピーしたパッケージのパスを追加します。

```yaml
packages:
  - "packages/*"
  # 既存のワークスペース設定に追加
```

### 3. パッケージ名を変更する

各 `package.json` の `name` フィールドを自社スコープに変更します。

- `packages/tokens/package.json` — `@morphink/tokens` → `@myorg/tokens`
- `packages/ui/package.json` — `@morphink/ui` → `@myorg/ui`
- `packages/ui/package.json` の dependencies 内の `@morphink/tokens` 参照も更新

### 4. 依存をインストールする

```bash
pnpm install
```

### 5. ビルドする

```bash
pnpm --filter @myorg/tokens build
pnpm --filter @myorg/ui build:css
```

トークンのビルドを先に実行し、その出力を UI パッケージの CSS コンパイルで利用します。

### 6. アプリの CSS エントリに import を追加する

```css
@import "@myorg/tokens/tokens.css";
@import "@myorg/tokens/tokens-dark.css";
@import "@myorg/ui/styles/base.css";
```

### 7. コンポーネントを利用する

```vue
<script setup>
import { Button } from '@myorg/ui'
</script>

<template>
  <Button tone="primary">送信</Button>
</template>
```

## Storybook について

`packages/docs`（Storybook）のコピーは任意です。コンポーネントの開発・確認に使う場合はコピーし、同様にパッケージ名を変更してください。

## 次のステップ

- トークン値をブランドカラーに差し替え — `packages/tokens/tokens/` 内の JSON ファイルを編集
- npm パッケージとして公開 — [デザインシステムの公開](./publishing-your-design-system.ja.md) を参照
