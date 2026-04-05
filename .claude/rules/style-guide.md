---
globs:
  - packages/ui/src/**/*.vue
  - packages/ui/src/**/*.ts
  - packages/ui/src/**/*.css
  - packages/tokens/src/**
---

# コードスタイル

- Vue SFC: `<script setup lang="ts">` / `defineProps` + `withDefaults` / `defineEmits`
- import 順: Vue → サードパーティ → ローカル
- クラス合成: 必ず `cn()` (`packages/ui/src/base/lib/utils.ts`) = clsx + tailwind-merge
- スタイルバリアント: `cva` (class-variance-authority)
- CSS 変数プレフィックス: `--morphink-`
- テーマクラス: `.mi-theme` / ユーティリティクラスプレフィックス: `mi:`
- Tailwind v4 でのトークン参照: `bg-(--morphink-color-primary)`, `text-(--morphink-color-foreground)`
- ホバー透過: `bg-[color-mix(in_srgb,var(--morphink-color-destructive)_8%,transparent)]`
- semantic tokens を優先し、primitive tokens や色の直書きは避ける

