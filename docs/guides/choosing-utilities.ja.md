[English](./choosing-utilities.md) | [日本語](./choosing-utilities.ja.md)

# はじめに: CSS セットアップ

## ステップ 1: morphink の読み込み（必須）

1 行の import ですべてのコンポーネントが動きます。デザイントークン、ベースリセット、コンポーネントスタイル、スコープ付きユーティリティを含みます。

```css
@import "@myorg/ui/styles/morphink.css";
```

> **Note:** `morphink.css` は `tokens.css`、`tokens-dark.css`、`base.css`、`components.css`、`ui.css` を 1 ファイルにバンドルしたものです。個別 import も引き続き可能です。

---

## ステップ 2: レイアウトのスタイリング（アプローチを選択）

上の 1 行だけで morphink コンポーネントは動きます。コンポーネントの**外側**（自分のページレイアウト等）でデザイントークンを使いたい場合、以下から選んでください:

### オプション A: `mi:` ユーティリティクラス（Tailwind 不要）

**Tailwind CSS を使っていない、導入できない、または依存に加えたくない**プロジェクト向け。ビルド済み CSS ファイルを読み込むだけで、トークンベースのユーティリティクラスが使えます。ビルドパイプラインの変更は不要です。

```css
@import "@myorg/ui/styles/morphink.css";
@import "@myorg/tokens/utilities.css";
```

```html
<div class="mi:bg-primary mi:p-md mi:rounded-lg mi:text-on-primary">
  トークンベースのスタイリング
</div>
```

レスポンシブバリアント: `mi:sm:`, `mi:md:`, `mi:lg:` 等

### オプション B: Tailwind 統合（Tailwind v4 プロジェクト向け）

**Tailwind CSS v4 を既に使っている**プロジェクト向け。消費者側に Tailwind のビルドパイプラインが必要です — `tailwind-theme.css` は `@theme` ディレクティブを含み、ビルド時に処理されます。

消費者側の Tailwind エントリ CSS に以下を追加します:

```css
@import "tailwindcss";
@import "@myorg/ui/styles/morphink.css";
@import "@myorg/tokens/tailwind-theme.css";
```

```html
<div class="bg-primary p-md rounded-lg text-on-primary">
  トークンベースのスタイリング
</div>
```

Tailwind エコシステム全体が利用可能: `hover:`, `focus:`, レスポンシブ、プラグイン、IntelliSense 等

### オプション C: CSS カスタムプロパティを直接使用

追加の CSS 読み込みは不要。`--morphink-*` カスタムプロパティを自分のスタイルシートで使います。

```css
@import "@myorg/ui/styles/morphink.css";
```

```css
.my-layout {
  padding: var(--morphink-space-lg);
  display: flex;
  gap: var(--morphink-space-md);
  color: var(--morphink-color-foreground);
}
```

CSS の書き方を問いません — プレーン CSS、SCSS、CSS Modules 等なんでも使えます。

---

## ダークモード

ダークモードのトークンオーバーライドは `morphink.css` に含まれています。`.mi-theme` 要素に `data-theme="dark"` 属性を付与して切り替えます:

```html
<div class="mi-theme" data-morphink data-theme="dark">
  <!-- ダークテーマ適用 -->
</div>
```

---

## 比較表

| | オプション A: utilities.css | オプション B: tailwind-theme.css | オプション C: CSS カスタムプロパティ |
|---|---|---|---|
| 追加 import | `@myorg/tokens/utilities.css` | `@myorg/tokens/tailwind-theme.css` | なし |
| Tailwind 必要 | 不要 | 必要（v4） | 不要 |
| クラスプレフィックス | `mi:` | なし | N/A |
| hover / focus バリアント | なし（コンポーネントの責務） | あり（標準 Tailwind） | 自分で記述 |
| 適した用途 | Tailwind なし（導入できない・したくない場合を含む） | Tailwind v4 を既に使っているプロジェクト | どんなプロジェクトでも、完全にコントロールしたい場合 |
