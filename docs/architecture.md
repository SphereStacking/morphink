# Architecture

## レイヤ構成

1. **Tokens**
   - デザインの single source of truth
   - Tokens Studio で管理し、Style Dictionary で出力

2. **UI**
   - shadcn を参考にした Base を内部に閉じたラップコンポーネント
   - A11yが重い部分は Reka UI の primitives を内部利用
   - Tokens の CSS Variables を参照して見た目を統一

3. **Docs (Storybook)**
   - Tokens と UI の可視化
   - ガイドラインや使用例を表示

## データフロー

```
Tokens Studio
  -> packages/tokens/tokens/*.json
  -> Style Dictionary (build)
  -> packages/tokens/dist (css/json/ts)
  -> packages/ui/src/styles/tokens.css (import)
  -> packages/ui/dist/ui.css
  -> Storybook
```

## パッケージ構成

```
packages/
  tokens/
    tokens/           # alias/semantic
    dist/             # build outputs
  ui/
    src/base/         # base components
    src/components/   # public wrappers
    dist/ui.css       # generated CSS
  docs/
    src/stories/      # Storybook stories
```

## 設計方針

- **内部実装は外部公開しない**
- **semantic tokens を優先**
- **プロダクトは tokens の出力のみを直接利用可能**

## 直接依存を避ける理由

- **使用側が直接依存しないため**: プロダクトは `@ink-ui/ui` のみを利用し、内部実装を意識しない
- **実装を入れ替えやすくするため**: Tailwind などを別実装に変えても API は維持できる
- **運用を安定させるため**: Tokens の変更を UI 側で吸収し、プロダクトへの影響を小さくする
