[English](./getting-started-template.md) | [日本語](./getting-started-template.ja.md)

# クイックスタート: テンプレートからフォーク

morphink の GitHub テンプレートを使い、独自のデザインシステムを最速で立ち上げる方法です。

## 前提条件

- Node.js 18+
- pnpm 9+

## 手順

### 1. リポジトリを作成する

[morphink GitHub リポジトリ](https://github.com/SphereStacking/ink-ui) で **「Use this template」** をクリックし、自分のアカウントまたは Organization に新しいリポジトリを作成します。

### 2. クローンする

```bash
git clone https://github.com/your-org/your-design-system.git
cd your-design-system
```

### 3. パッケージ名を変更する

`@morphink` スコープをプロジェクト全体で自社スコープに置き換えます。

- `packages/tokens/package.json` — `"name": "@morphink/tokens"` → `"name": "@myorg/tokens"`
- `packages/ui/package.json` — `"name": "@morphink/ui"` → `"name": "@myorg/ui"`
- `packages/docs/package.json` — `"name": "@morphink/docs"` → `"name": "@myorg/docs"`
- 各 `package.json` の dependencies 内の `@morphink/*` 参照も同様に更新

### 4. トークン値をブランドカラーに差し替える

`packages/tokens/tokens/` 内のトークンファイルを編集します。

- `alias.json` — プリミティブカラーパレットと基本スケール
- `semantic.json` — セマンティックマッピング（ライトテーマ）
- `semantic-dark.json` — ダークテーマの上書き値

### 5. インストール & ビルド

```bash
pnpm install
pnpm run build
```

トークン → CSS 変数 → Tailwind コンパイルの完全なパイプラインが実行されます。

### 6. Storybook を起動する

```bash
pnpm run dev:docs
```

[http://localhost:6006/](http://localhost:6006/) を開き、新しいトークンが適用されたコンポーネントを確認します。

### 7. ディレクトリ構成

```
my-design-system/
  packages/
    tokens/     # デザイントークン（alias.json, semantic.json, semantic-dark.json）
    ui/         # Vue 3 コンポーネント
    docs/       # Storybook
  pnpm-workspace.yaml
```

## 次のステップ

- 既存コンポーネントのカスタマイズや新規コンポーネントの追加（3 層アーキテクチャ: Public → Base → Reka UI に従う）
- npm パッケージとして公開 — [デザインシステムの公開](./publishing-your-design-system.ja.md) を参照
- コンシューマ向けユーティリティの選択 — [ユーティリティの選び方](./choosing-utilities.ja.md) を参照
