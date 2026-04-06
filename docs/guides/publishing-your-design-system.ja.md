[English](./publishing-your-design-system.md) | [日本語](./publishing-your-design-system.ja.md)

# デザインシステムの公開

フォークしたデザインシステムを npm パッケージとして公開する手順です。

## 前提条件

- npm アカウント（Organization スコープを使う場合は Organization の作成も必要）
- `npm login` 済み

## 手順

### 1. パッケージ設定を確認する

各パッケージの `package.json` に以下のフィールドが正しく設定されていることを確認します。

**tokens パッケージ** (`packages/tokens/package.json`):

```json
{
  "name": "@myorg/tokens",
  "version": "0.1.0",
  "files": ["dist"],
  "exports": {
    "./tokens.css": "./dist/css/tokens.css",
    "./tokens-dark.css": "./dist/css/tokens-dark.css",
    "./utilities.css": "./dist/css/utilities.css",
    "./tailwind-theme.css": "./dist/css/tailwind-theme.css",
    ".": {
      "types": "./dist/ts/tokens.d.ts",
      "import": "./dist/ts/tokens.js"
    }
  }
}
```

**ui パッケージ** (`packages/ui/package.json`):

```json
{
  "name": "@myorg/ui",
  "version": "0.1.0",
  "files": ["dist", "src"],
  "exports": {
    ".": {
      "types": "./src/index.ts",
      "import": "./src/index.ts"
    },
    "./styles/morphink.css": "./dist/morphink.css"
  }
}
```

### 2. 公開対象を確認する

| パッケージ | 公開ディレクトリ | 内容 |
|-----------|-----------------|------|
| tokens | `dist/` | CSS 変数、JSON、TypeScript 定義 |
| ui | `dist/` + `src/` | コンパイル済み CSS + Vue SFC ソース |

### 3. ビルドする

```bash
pnpm run build
```

トークン → CSS 変数 → Tailwind コンパイルの完全なパイプラインが実行されます。

### 4. 公開する

```bash
# tokens パッケージ
cd packages/tokens
npm publish --access public

# ui パッケージ
cd ../ui
npm publish --access public
```

または pnpm を使う場合:

```bash
pnpm --filter @myorg/tokens publish --access public
pnpm --filter @myorg/ui publish --access public
```

> スコープ付きパッケージを初めて公開する場合は `--access public` が必要です（デフォルトは private）。

### 5. コンシューマ側での利用

**インストール:**

```bash
npm install @myorg/tokens @myorg/ui
```

**CSS の読み込み:**

```css
@import "@myorg/ui/styles/morphink.css";
```

この 1 行でデザイントークン、ダークモードオーバーライド、ベースリセット、コンポーネントスタイル、スコープ付きユーティリティがすべて読み込まれます。

**コンポーネントの利用:**

```vue
<script setup>
import { Button } from '@myorg/ui'
</script>

<template>
  <Button tone="primary" variant="solid">送信</Button>
</template>
```

### 6. ユーティリティ CSS の選択

コンシューマ側で `utilities.css` と `tailwind-theme.css` のどちらを使うかは、プロジェクトの Tailwind 利用状況によって異なります。詳しくは [ユーティリティの選び方](./choosing-utilities.ja.md) を参照してください。

## バージョン管理のヒント

- セマンティックバージョニングに従い、破壊的変更は major、機能追加は minor、バグ修正は patch で管理
- tokens と ui のバージョンは独立して管理可能（ただし互換性に注意）
- `CHANGELOG.md` を各パッケージに用意すると、コンシューマが変更内容を追いやすくなる
