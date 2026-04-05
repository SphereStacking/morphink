---
globs:
  - packages/tokens/dist/**
  - packages/ui/dist/ui.css
  - packages/ui/dist/utilities.css
---

# 生成物 — 編集禁止

このファイルはビルドパイプラインの生成物です。手動で編集しないでください。

- `packages/tokens/dist/*` → `pnpm --filter @morphink/tokens build` で生成
- `packages/ui/dist/ui.css` → `pnpm --filter @morphink/ui build:css` で生成
- `packages/ui/dist/utilities.css` → `pnpm --filter @morphink/tokens build` で生成
