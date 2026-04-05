---
globs:
  - packages/ui/src/components/**/*.figma.ts
  - packages/tokens/tokens/**
---

# Figma ↔ Code 同期ルール

詳細なワークフロー・リファレンスデータは `morphink-figma-sync` スキルを参照。

## Figma → Code ルール

- Figma MCP の出力（React + Tailwind）はデザイン意図の表現であり、最終コードではない
- Tailwind ユーティリティクラスは morphink のトークン参照（`--morphink-*`）に置き換える
- 色・スペーシング・角丸・影は必ず semantic token を使い、ハードコードしない
- 既存コンポーネントを再利用し、重複実装しない
- Figma MCP が localhost ソースで画像/SVG を返した場合、そのソースを直接使用する
- アイコンパッケージを新規追加しない

## Code → Figma ルール

- コードで props サブセットを変更したら Figma 側のバリアントも同期する
- Figma バリアント作成時は Semantic Variables をバインドする（HEX 直書き禁止）
- Code Connect は `toEnumMap()` + props 定数で enum マッピングする（ハードコードしない）

## トークン同期ルール

- トークン JSON（`packages/tokens/tokens/`）は手動編集しない。Figma プラグインの出力が正
- `packages/tokens/dist/*` は生成物。編集禁止

## Props 定義 = Single Source of Truth

`packages/ui/src/base/lib/props/` の定数が CVA と Code Connect の両方を駆動する。
props 定数を変更すれば Code Connect は自動反映。Figma 側のバリアント追加・削除のみ手動同期が必要。
