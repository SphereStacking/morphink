---
globs:
  - packages/ui/src/**/*.vue
  - packages/ui/src/**/*.ts
  - packages/ui/src/**/*.css
  - packages/tokens/src/**
---

# 禁止: トークン・カラー

| # | 禁止 | 代替 |
|---|------|------|
| 10 | HEX / RGB の直書き | `var(--morphink-color-*)` |
| 11 | primitive token の直接使用 | semantic token を使用 |
| 12 | Tailwind デフォルト色（`bg-blue-500` 等） | `bg-(--morphink-color-primary)` 形式 |
| 13 | `text-black` | `text-(--morphink-color-foreground)` |
| 14 | 色だけで情報伝達 | アイコン・テキストを併用 |
