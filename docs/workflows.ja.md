[English](./workflows.md) | [日本語](./workflows.ja.md)

# ワークフロー

## トークン更新

1. `packages/tokens/tokens/` のトークンファイルを編集
2. トークン再ビルド:

```bash
pnpm --filter @morphink/tokens build
```

3. UI CSS 再ビルド:

```bash
pnpm --filter @morphink/ui build:css
```

または一括ビルド:

```bash
pnpm run build
```

### トークンカスタマイズの流れ

| ファイル | 用途 | 編集内容 |
|---------|------|---------|
| `alias.json` | 生のパレット、スペーシング、角丸 | 色スケール、基本値 |
| `semantic.json` | セマンティックマッピング（ライトテーマ） | どの alias トークンが `primary`、`destructive` 等にマップされるか |
| `semantic-dark.json` | ダークテーマオーバーライド | ダークモードの色マッピング |

トークン編集後:

1. `pnpm --filter @morphink/tokens build` を実行 — CSS 変数、JSON、TypeScript 出力を `dist/` に生成
2. `pnpm --filter @morphink/ui build:css` を実行 — 更新されたトークン値で Tailwind を再コンパイル
3. Storybook を起動（`pnpm run dev:docs`）して変更を視覚的に確認

## UI 開発

### 新しいコンポーネントの追加

1. **Base コンポーネントを作成** — `packages/ui/src/base/ui/{component-name}/`
   - `{Component}Base.vue` — CVA スタイル定義 + Reka UI 統合
   - `packages/ui/src/base/lib/props/` の共有 props を利用（variant, size, tone 等）
   - CVA（`cva()`）でスタイル定義、`cn()` でクラス合成

2. **Public ラッパーを作成** — `packages/ui/src/components/{atoms|molecules|organisms}/`
   - `{Component}.vue` — Base をラップして公開 API として提供
   - `defineProps` + `withDefaults` で公開インターフェースを定義

3. **export を追加** — `packages/ui/src/index.ts`

4. **Storybook ストーリーを追加** — `packages/docs/src/stories/components/`

### コンポーネント分類

| カテゴリ | 使い分け | 例 |
|---------|---------|---|
| Atom | 単体の UI プリミティブ、合成なし | Button, Input, Badge, Switch |
| Molecule | Atoms の組み合わせ、内部構造あり | Card (compound), Dialog, FormField |
| Organism | ひとまとまりの機能単位、カスタマイズ前提 | AppShell, DataTable, LoginForm |

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

## Storybook

```bash
pnpm run dev:docs
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
| `packages/ui/dist/ui.css` | コンパイル済み Tailwind CSS |

> `dist/` 内のファイルは生成物です — 直接編集しないでください。
