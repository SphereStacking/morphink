[English](./workflows.md) | [日本語](./workflows.ja.md)

# ワークフロー

## トークン更新

### Figma → トークン JSON

Figma プラグイン「DTCG Token Manager」は **Export**（Figma Variables → DTCG JSON）と **Import**（DTCG JSON → Figma Variables）の両方に対応しています。プラグイン UI の Export/Import タブを使い分けてください。

1. Figma でバリアブルを編集
2. DTCG Token Manager プラグインを実行 → Export タブ → DTCG JSON をエクスポート
3. エクスポートした JSON を `packages/tokens/tokens/` に保存
4. （任意）`pnpm --filter @morphink/tokens diff-check` で変更を検証

コード側のトークン変更を Figma に反映するには、Import タブで更新済み DTCG JSON を Figma Variables に読み込みます。

### ビルド

全パッケージを一括ビルド（tokens → ui → docs）:

```bash
pnpm run build
```

<details>
<summary>個別パッケージコマンド（参考）</summary>

```bash
pnpm --filter @morphink/tokens build   # トークン生成 → dist/css, json, ts
pnpm --filter @morphink/ui build       # UI ビルド → dist/morphink.css, index.mjs, types
pnpm --filter @morphink/ui build:css   # Tailwind コンパイルのみ → dist/ui.css
```

</details>

### トークンカスタマイズの流れ

| ファイル | 用途 | 編集内容 |
|---------|------|---------|
| `primitives.json` | 生のパレット、スペーシング、角丸 | 色スケール、基本値 |
| `semantic.json` | セマンティックマッピング（ライトテーマ） | どの primitive トークンが `primary`、`destructive` 等にマップされるか |
| `semantic-dark.json` | ダークテーマオーバーライド | ダークモードの色マッピング |

トークン編集後:

1. `pnpm run build` で全パッケージを再ビルド
2. Storybook を起動して変更を視覚的に確認:

```bash
pnpm run dev:docs    # 上流ビルド + Storybook（localhost:6006）
```

## UI 開発

### 新しいコンポーネントの追加

3 層構造（Public / Base / Props）と設計思想は [Architecture](architecture.ja.md) を参照してください。

1. **Base コンポーネントを作成** — `packages/ui/src/base/ui/{component-name}/`
2. **Public ラッパーを作成** — `packages/ui/src/components/{atoms|molecules|organisms}/`
3. **export を追加** — `packages/ui/src/index.ts`
4. **Storybook ストーリーを追加** — `packages/docs/src/stories/components/`

### Reka UI 統合チェックリスト

Reka UI プリミティブをラップする際:

- [ ] Reka UI コンポーネントに状態管理 props（`open`, `modelValue`）があるか → `useForwardPropsEmits` を使用
- [ ] サブコンポーネントへのコンテキスト伝播が必要か → `provide`/`inject` を使用
- [ ] Base 層と Public 層の両方でラッパーパターンを適用

### 例: シンプルな Atom の作成

```vue
<!-- packages/ui/src/base/ui/my-component/MyComponentBase.vue -->
<script setup lang="ts">
import { computed } from 'vue'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '../../lib/utils'

const myComponentVariants = cva('base-classes', {
  variants: {
    variant: {
      solid: '...',
      outline: '...',
    },
    size: {
      sm: '...',
      md: '...',
    },
  },
  defaultVariants: {
    variant: 'solid',
    size: 'md',
  },
})

type MyComponentVariants = VariantProps<typeof myComponentVariants>

const props = withDefaults(defineProps<{
  variant?: NonNullable<MyComponentVariants['variant']>
  size?: NonNullable<MyComponentVariants['size']>
  class?: string
}>(), {
  variant: 'solid',
  size: 'md',
})

const classes = computed(() =>
  cn(myComponentVariants({ variant: props.variant, size: props.size }), props.class),
)
</script>

<template>
  <div :class="classes">
    <slot />
  </div>
</template>
```

```vue
<!-- packages/ui/src/components/atoms/MyComponent.vue -->
<script setup lang="ts">
import MyComponentBase from '../../base/ui/my-component/MyComponentBase.vue'

defineProps<{
  variant?: 'solid' | 'outline'
  size?: 'sm' | 'md'
  class?: string
}>()
</script>

<template>
  <MyComponentBase v-bind="$props">
    <slot />
  </MyComponentBase>
</template>
```

## コンシューマー設定

### CSS インポート

```ts
import '@morphink/ui/styles/morphink.css'
```

## Storybook

```bash
pnpm run dev:docs    # 上流ビルド + Storybook（localhost:6006）
```

ストーリーは `packages/docs/src/stories/` に配置。

## Lint・フォーマット

```bash
pnpm run lint       # oxlint
pnpm run format     # oxfmt --write
```

## ビルド成果物

| 出力 | 用途 |
|-----|------|
| `packages/tokens/dist/css/tokens.css` | ライトモード CSS 変数 |
| `packages/tokens/dist/css/tokens-dark.css` | ダークモードオーバーライド |
| `packages/tokens/dist/css/utilities.css` | `mi:` プレフィックス付きユーティリティクラス |
| `packages/tokens/dist/css/tailwind-theme.css` | Tailwind v4 テーマプリセット |
| `packages/tokens/dist/json/tokens.json` | トークン値の JSON 形式 |
| `packages/tokens/dist/ts/tokens.ts` | トークン値の TypeScript 形式 |
| `packages/ui/dist/morphink.css` | コンパイル済み CSS バンドル |

> `dist/` 内のファイルは生成物です — 直接編集しないでください。
