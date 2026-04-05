# トークンパイプライン

> Figma Variables からコンポーネントまでのトークン変換フロー。

## フロー

```
Figma Variables → カスタムプラグイン（DTCG JSON 出力）→ packages/tokens/tokens/*.json
  → Style Dictionary → packages/tokens/dist/{css,json,ts}
  → packages/ui/src/styles/tokens.css（CSS 変数として import）
  → Tailwind コンパイル → packages/ui/dist/ui.css
  → Storybook で表示
```

## ソースファイル

| ファイル | 役割 |
|---------|------|
| `packages/tokens/tokens/primitives.json` | 基盤トークン（色スケール、duration、easing） |
| `packages/tokens/tokens/motion.json` | モーショントークン |
| `packages/tokens/tokens/semantic.json` | ライトテーマ semantic トークン |
| `packages/tokens/tokens/semantic-dark.json` | ダークテーマ上書き |

## 生成物（編集禁止）

| 出力先 | 形式 |
|--------|------|
| `packages/tokens/dist/css/tokens.css` | CSS 変数（`:root`） |
| `packages/tokens/dist/css/tokens-dark.css` | ダークテーマ CSS |
| `packages/tokens/dist/css/tailwind-theme.css` | Tailwind `@theme` ブロック |
| `packages/tokens/dist/css/utilities.css` | mi:* ユーティリティ |
| `packages/tokens/dist/json/tokens.json` | JSON 形式 |
| `packages/tokens/dist/ts/tokens.ts` | TypeScript ES6 export |
