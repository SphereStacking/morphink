[English](./architecture.md) | [日本語](./architecture.ja.md)

# アーキテクチャ

## レイヤー構成

1. **Tokens**
   - デザインの唯一の信頼できるソース
   - Tokens Studio で管理し、Style Dictionary で出力

2. **UI**
   - shadcn ベースのプリミティブを内部に持つラッパーコンポーネント
   - A11y が重要な部分は Reka UI プリミティブを内部利用
   - トークン CSS 変数を参照して統一的にスタイリング

3. **Docs (Storybook)**
   - トークンと UI コンポーネントの可視化
   - ガイドラインと使用例を表示

## データフロー

```
Tokens Studio
  -> packages/tokens/tokens/*.json
  -> Style Dictionary (ビルド)
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
    dist/             # ビルド成果物
  ui/
    src/base/         # ベースコンポーネント
    src/components/   # 公開ラッパー
    dist/ui.css       # 生成 CSS
  docs/
    src/stories/      # Storybook ストーリー
```

## 設計原則

- **内部実装を公開しない**
- **セマンティックトークンを優先する**
- **プロダクトはトークン出力のみを直接利用できる**

## 直接依存を避ける理由

- **利用者の独立性**: プロダクトは `@morphink/ui` のみを使い、内部実装を知らない
- **実装の交換可能性**: Tailwind などの内部を差し替えても API は維持される
- **安定した運用**: トークン変更は UI レイヤーで吸収し、プロダクトへの影響を最小化
