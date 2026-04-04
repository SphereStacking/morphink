[English](./getting-started-flat.md) | [日本語](./getting-started-flat.ja.md)

# クイックスタート: 既存プロジェクトにフラット展開

モノレポ化せず、既存プロジェクトのソースツリー内にデザインシステムを直接配置する方法です。

## 前提条件

- Node.js 18+
- npm / pnpm / yarn（ワークスペース機能は不要）

## ディレクトリ構成例

```
my-project/
  src/
    app/                        # 既存アプリケーション
    design-system/
      tokens/
        tokens/                 # primitives.json, semantic.json, semantic-dark.json
        build.mjs
        style-dictionary.config.mjs
        dist/                   # ビルド出力
      ui/
        base/                   # Base 層
        components/             # Public 層
        styles/
        index.ts
  package.json
```

## 手順

### 1. ファイルをコピーする

morphink リポジトリから以下をコピーし、`src/design-system/` 配下に配置します。

- `packages/tokens/tokens/` → `src/design-system/tokens/tokens/`
- `packages/tokens/build.mjs` → `src/design-system/tokens/build.mjs`
- `packages/tokens/style-dictionary.config.mjs` → `src/design-system/tokens/style-dictionary.config.mjs`
- `packages/ui/src/` の内容 → `src/design-system/ui/`

### 2. import パスを相対パスに変更する

モノレポではパッケージ名（`@morphink/tokens`）で参照していた部分を、相対パスに書き換えます。

例: UI コンポーネント内のトークン CSS 参照

```css
/* 変更前 */
@import "@morphink/tokens/tokens.css";

/* 変更後 */
@import "../tokens/dist/tokens.css";
```

### 3. 依存パッケージをインストールする

devDependencies:

```bash
npm install -D style-dictionary @tokens-studio/sd-transforms @tailwindcss/cli tailwindcss
```

dependencies:

```bash
npm install reka-ui class-variance-authority clsx tailwind-merge
```

### 4. ビルドスクリプトをルート package.json に追加する

```json
{
  "scripts": {
    "build:tokens": "node src/design-system/tokens/build.mjs",
    "build:css": "npx @tailwindcss/cli -i src/design-system/ui/styles/tailwind.css -o src/design-system/ui/dist/ui.css",
    "build:ds": "npm run build:tokens && npm run build:css"
  }
}
```

### 5. ビルドして確認する

```bash
npm run build:ds
```

トークンと CSS のビルドが成功したら、アプリから直接 import して利用できます。

### 6. コンポーネントを利用する

```vue
<script setup>
import { Button } from '@/design-system/ui'
</script>

<template>
  <Button tone="primary">送信</Button>
</template>
```

## モノレポ方式との主な違い

| 項目 | モノレポ | フラット展開 |
|------|---------|-------------|
| import パス | パッケージ名（`@myorg/tokens`） | 相対パス（`../tokens/dist/`） |
| ビルド設定 | 各パッケージの `package.json` | ルートの `package.json` |
| 依存管理 | パッケージごとに分離 | ルートに集約 |
| npm 公開 | 容易 | 別途パッケージ化が必要 |

## 次のステップ

- トークン値をブランドカラーに差し替え — `src/design-system/tokens/tokens/` 内の JSON ファイルを編集
- 将来的にモノレポ化したい場合は [既存モノレポへの組み込み](./getting-started-monorepo.ja.md) を参照
