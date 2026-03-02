[English](./README.md) | [日本語](./README.ja.md)

# morphink

<p align="center">
  <img src="docs/brand-showcase.png" alt="morphink brand showcase" width="600" />
</p>

**デザインシステムの「周辺の面倒」を、すでに片付けた状態で始められる Vue 3 ボイラープレート。**

トークンパイプライン、3層コンポーネント設計、Storybook——全部入りの状態でフォークして、自分のブランドに染めてください。

> [!NOTE]
> morphink は `npm install` して使う UI ライブラリではありません。リポジトリをフォークし、トークンを自社ブランドに差し替え、コードごと自分たちのものにする前提です。詳しくは [morphink でないもの](#morphink-でないもの) を参照。

## つらいのはコンポーネントじゃない

Vue 3 でデザインシステムを作ろうとすると、コンポーネント自体はそこまで難しくありません。本当に大変なのは、その土台を整えること。

- Tokens Studio のデザイントークンを Style Dictionary でコードに繋ぐ
- ビルド順序を正しく管理できるモノレポ構成
- ヘッドレスプリミティブと公開 API のレイヤー分離
- トークンで駆動するテーマ切り替え・ダークモード
- Storybook によるカタログとガイドラインの整備

全部を自力で組めないわけではありません。でも、morphink があればその工程を丸ごとスキップできます——理論から組み立てたものではなく、実際に作って壊してを繰り返した結果です。

## クイックスタート

```bash
# 1. GitHub で「Use this template」をクリック
# 2. 作成されたリポジトリをクローン
pnpm install
pnpm run build
pnpm run dev:docs
```

`http://localhost:6006/` で Storybook が起動します。

## 何が手に入るか

### トークンパイプライン

```
alias.json → semantic.json → Style Dictionary → CSS / JSON / TS → コンポーネント
```

**Alias トークン**が生のパレット（カラースケール、スペーシング、角丸）を定義し、**Semantic トークン**がそれに意味を与えます（`primary`、`destructive`、`muted`）。コンポーネントが参照するのは Semantic トークンだけ。`alias.json` を差し替えれば、コンポーネントのコードに一切触れずにビジュアルを一新できます。

### 3 層コンポーネント設計

```
Public (components/)  →  Base (base/ui/*/)  →  Reka UI
  プロダクト向け API      CVA スタイル定義       ヘッドレス a11y
```

アトミックデザインが「コンポーネント同士をどう組み合わせるか」を水平に分類するのに対し、morphink の 3 層は「ひとつのコンポーネントの内部をどう作るか」を垂直に分離します。公開 API・スタイリング・ヘッドレスプリミティブ、それぞれの責務を明確に切り分ける設計です。

この構造の利点は、依存ライブラリの変更を Base 層が吸収してくれること。Reka UI が別のライブラリに替わっても、Tailwind に破壊的変更が入っても、`<Button tone="primary">` はそのまま動きます。

### 収録コンポーネント

| Atoms | Molecules | Organisms |
|-------|-----------|-----------|
| Button, Input, Textarea, Checkbox, CheckboxGroup, Radio, RadioGroup, Switch, Badge, Avatar, Alert, Divider, Panel, Heading, Text | Card (compound), Dialog, AlertDialog, Dropdown (compound), Select, Tabs, Popover, Tooltip, Table, Toolbar, FormField, SearchInput, Breadcrumb, Nav, SectionHeader, Stat, EmptyState | AppShell, AppHeader, AppSidebar, DataTable, LoginForm, SettingsSection |

レイアウトプリミティブ: Box, Grid, Stack

すべて [Reka UI](https://reka-ui.com/) のヘッドレスプリミティブ上に構築。WAI-ARIA 準拠。

### モーションシステム

アニメーションもトークンで管理します。duration と easing の組み合わせを CSS カスタムプロパティとして定義し、Interaction・State・Enter/Leave・Emphasis・Layout の 5 カテゴリに整理。`prefers-reduced-motion` への対応も組み込み済みです。

### Tailwind は内部の話

morphink の内部では Tailwind を使っていますが、利用者側に Tailwind を強制しません。

| プロジェクトの状況 | 使うもの |
|---|---|
| Tailwind を導入していない | `utilities.css` — 独立した `mi:*` ユーティリティクラス |
| Tailwind を使っている | `tailwind-theme.css` — Tailwind テーマプリセット |

どちらも同じトークンを参照します。入口が違うだけです。

## カスタマイズ

1. `packages/tokens/tokens/` のトークン値を自社ブランドに差し替え
2. `pnpm run build` を実行
3. デザインシステムの完成

## 導入パターン

1. **テンプレートからフォーク**（推奨）— GitHub の「Use this template」で独立リポジトリを作成。npm パッケージとして社内配布も可能。
2. **モノレポに組み込み** — 既存の pnpm workspace に `packages/tokens` と `packages/ui` を追加。
3. **フラットに組み込み** — 既存プロジェクトの `src/` 配下に展開（モノレポ化不要）。

## パッケージ構成

| パッケージ | 役割 |
|-----------|------|
| `packages/tokens` | デザイントークンのソース（Tokens Studio JSON）と Style Dictionary ビルド |
| `packages/ui` | Vue 3 コンポーネント — Reka UI ヘッドレス + CVA スタイリング + 共通の Props 型定義 |
| `packages/docs` | Storybook — コンポーネントカタログ、トークンの可視化、デザインガイドライン |

## morphink でないもの

- **`npm install` するパッケージではありません。** フォークして、コードを自分たちで所有します。
- **shadcn/ui の代替ではありません。** shadcn のパターン（ヘッドレス + CVA）に影響を受けていますが、解決する問題が違います。morphink が提供するのは、shadcn がカバーしないインフラ層——トークンパイプライン、テーマ管理、モノレポ構成、レイヤード設計です。
- **ページの組み立て方には口を出しません。** コンポーネントの品質を担保し、それをどう並べるかは使う人に委ねます。
- **フォーク元への追従は想定していません。** フォークした時点で、独立したコードベースとして育ててください。

## ドキュメント

- [CONCEPT.ja.md](./CONCEPT.ja.md) — 設計思想と判断の背景
- [docs/architecture.ja.md](./docs/architecture.ja.md) — 技術アーキテクチャとデータフロー
- [docs/workflows.ja.md](./docs/workflows.ja.md) — 開発ワークフロー
- [docs/guides/](./docs/guides/) — 導入パターン別のはじめ方ガイド

## ライセンス

[MIT](./LICENSE)
