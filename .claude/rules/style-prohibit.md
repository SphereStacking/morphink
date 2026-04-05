---
globs:
  - packages/ui/src/**/*.vue
  - packages/ui/src/**/*.css
---

# 禁止: CSS 変数・スタイリング

| # | 禁止 | 代替 |
|---|------|------|
| 15 | 内部変数に `--morphink-` プレフィックス | `--btn-*` 等の短縮プレフィックス |
| 16 | `mi:` に `hover:` / `focus:` バリアント | コンポーネント props で対応 |
| 17 | `!important` | CVA バリアントまたは CSS 変数 |
| 18 | `cn()` を使わずクラスを文字列結合 | `cn()` で合成 |

# 禁止: AI 生成パターン

| # | 禁止 | 代替 |
|---|------|------|
| 19 | カラーバー（`border-t-4` + 色付き div） | tone prop で semantic にスタイリング |
| 20 | 派手なグラデーション / ネオンカラー | semantic token のみ |
| 21 | 過剰なアニメーション（常時ループ等） | Motion Shorthand（100〜300ms） |
| 22 | `shadow-lg` / `shadow-2xl` の多用 | `shadow` prop（none / sm / md / lg） |
| 23 | アイコンパッケージの新規追加 | 既存アセットまたは Figma ペイロード |
