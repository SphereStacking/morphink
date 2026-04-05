[English](./choosing-utilities.md) | [日本語](./choosing-utilities.ja.md)

# ユーティリティの選び方

デザインシステムのコンシューマ向けに、2 つのユーティリティ CSS 配布方式を提供しています。プロジェクトの Tailwind CSS 利用状況に応じて選択してください。

## 判断フロー

1. プロジェクトで **Tailwind CSS を使っている**？
   - **はい** → [オプション B: tailwind-theme.css](#オプション-b-tailwind-themecsstailwind-プロジェクト向け) を使用
   - **いいえ** → [オプション A: utilities.css](#オプション-a-utilitiescsstailwind-不要) を使用

## オプション A: utilities.css（Tailwind 不要）

Tailwind CSS のインストールやビルド設定なしで、トークンベースのユーティリティクラスを利用できます。

**CSS の読み込み:**

```css
@import "@myorg/tokens/tokens.css";
@import "@myorg/tokens/tokens-dark.css";
@import "@myorg/tokens/utilities.css";
@import "@myorg/ui/styles/base.css";
@import "@myorg/ui/styles/ui.css";
```

**クラスの使い方:**

`mi:` プレフィックス付きのクラスを使います。

```html
<div class="mi:bg-primary mi:p-md mi:rounded-lg mi:text-on-primary">
  トークンベースのスタイリング
</div>
```

**レスポンシブバリアント:**

```html
<div class="mi:p-sm mi:md:p-lg mi:lg:p-xl">
  画面幅に応じたパディング
</div>
```

**特徴:**

- Tailwind の知識やビルド設定は不要
- `mi:` プレフィックスにより既存クラスとの衝突を回避
- レスポンシブバリアント対応（`mi:sm:`, `mi:md:`, `mi:lg:` 等）
- hover / focus 等の状態バリアントはなし（コンポーネント側の責務）

## オプション B: tailwind-theme.css（Tailwind プロジェクト向け）

既存の Tailwind CSS 環境にトークンを統合し、標準の Tailwind クラスでトークン値を利用できます。

**CSS の読み込み:**

```css
@import "tailwindcss";
@import "@myorg/tokens/tokens.css";
@import "@myorg/tokens/tokens-dark.css";
@import "@myorg/tokens/tailwind-theme.css";
@import "@myorg/ui/styles/base.css";
```

**クラスの使い方:**

標準の Tailwind クラスをそのまま使います。

```html
<div class="bg-primary p-md rounded-lg text-on-primary">
  トークンベースのスタイリング
</div>
```

**状態バリアント:**

```html
<button class="bg-primary hover:bg-primary-hover focus:ring-2 focus:ring-accent">
  ホバー・フォーカス対応
</button>
```

**特徴:**

- 標準 Tailwind クラス名をそのまま使用（プレフィックスなし）
- Tailwind エコシステム全体（`hover:`, `focus:`, `group-*`, レスポンシブ等）が利用可能
- デフォルトの Tailwind カラー・スペーシングはリセットされ、トークンベースの値のみが有効になる

## ダークモード

どちらのオプションでも、ダークモードの仕組みは同じです。

1. `tokens-dark.css` を読み込む
2. `.mi-theme` 要素に `data-theme="dark"` 属性を付与して切り替え

```html
<!-- ライトテーマ -->
<div class="mi-theme">...</div>

<!-- ダークテーマ -->
<div class="mi-theme" data-morphink data-theme="dark">...</div>
```

## 比較表

| | utilities.css | tailwind-theme.css |
|---|---|---|
| Tailwind 必要 | 不要 | 必要 |
| クラスプレフィックス | `mi:` | なし |
| hover / focus バリアント | なし（コンポーネントの責務） | あり（標準 Tailwind） |
| レスポンシブバリアント | あり（`mi:md:` 等） | あり（`md:` 等） |
| カスタムプロパティ | `--morphink-*` 経由 | `--morphink-*` + `--color-*` 等 |
| 適した用途 | Tailwind を使わないプロジェクト | Tailwind プロジェクト |

両オプションは同じデザイントークンを参照します。入口が違うだけで、出力されるスタイルは同一です。
