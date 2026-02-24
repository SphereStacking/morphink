[English](./architecture.md) | [日本語](./architecture.ja.md)

# アーキテクチャ

## コンポーネント 3 層構造

```
Public (components/)  →  Base (base/ui/*/)  →  Reka UI
  プロダクト API          CVA バリアント        ヘッドレス a11y
```

| 層 | 場所 | 命名 | 役割 |
|---|---|---|---|
| Public | `packages/ui/src/components/` | `Button.vue` | 外部公開 API — Base の薄いラッパー |
| Base | `packages/ui/src/base/ui/*/` | `ButtonBase.vue` | CVA バリアント + Reka UI 統合 |
| Props | `packages/ui/src/base/lib/props/` | `variant.ts`, `size.ts` | 共有 prop 型定義 |

すべてのコンポーネントは `packages/ui/src/index.ts` から export。

## トークンパイプライン

```
Tokens Studio
  → packages/tokens/tokens/*.json (alias / semantic / semantic-dark)
  → Style Dictionary (ビルド)
  → packages/tokens/dist (css / json / ts)
  → packages/ui/src/styles/tokens.css（CSS 変数として import）
  → Tailwind コンパイル → packages/ui/dist/ui.css
  → Storybook
```

## パッケージ構成

```
packages/
  tokens/
    tokens/           # alias.json, semantic.json, semantic-dark.json
    dist/             # ビルド成果物 (css, json, ts)
  ui/
    src/base/ui/      # Base コンポーネント (*Base.vue)
    src/base/lib/     # ユーティリティ (cn, CVA バリアント, layout-utils, props)
    src/components/   # Public ラッパー
    dist/ui.css       # 生成 CSS
  docs/
    src/stories/      # Storybook ストーリー
```

## コンポーネントパターン

### Compound Component

Card と Dropdown はサブコンポーネントを持つ compound component パターンを使用:

- **Card**: CardHeader / CardBody / CardFooter / CardTitle / CardDescription / CardMedia
- **Dropdown**: 12 サブコンポーネント（Trigger, Content, Item, Separator 等）+ provide/inject によるコンテキスト伝播

### Reka UI ラッパーパターン

状態管理が必要な Reka UI プリミティブ（Dialog, Dropdown, Select 等）は、reka-ui の `useForwardPropsEmits` を使ってラップする。optional props を直接バインドすると `undefined` が渡り、Reka UI が意図せず controlled モードに入る。

## 設計原則

- **内部実装を公開しない** — プロダクトは Public コンポーネントのみに依存
- **依存の隔離** — Reka UI や Tailwind の差し替えは Base 層のみに影響
- **セマンティックトークンを優先** — コンポーネントは `--morphink-color-primary` を参照し、生のパレット値は使わない
