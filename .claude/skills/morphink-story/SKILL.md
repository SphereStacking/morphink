---
name: morphink-story
description: >
  morphink プロジェクトの Storybook ストーリー作成ガイド（.stories.vue / sb-addon-vue-csf 形式）。
  新規コンポーネントのストーリー追加、既存ストーリーの修正、ストーリー構成の設計時に使用。
  「ストーリー追加」「stories 作成」「Storybook」「ストーリー書いて」等でトリガー。
---

# morphink Storybook ストーリー作成ガイド

## 基本情報

- 形式: `.stories.vue`（sb-addon-vue-csf）
- 配置: `packages/docs/src/stories/components/{atoms|molecules|organisms}/`
- 起動: `pnpm run dev:docs`（localhost:6006）

## テンプレート: Atom / 単純コンポーネント

```vue
<script setup lang="ts">
import { ComponentName, Stack } from '@morphink/ui'
import {
  componentSizes,
  componentTones,
  componentVariants,
  componentRounded,
  componentShadow,
} from '@morphink/ui'
import { defineMeta } from 'sb-addon-vue-csf'

const { Story } = defineMeta({
  title: 'Components/Atoms/ComponentName',
  component: ComponentName,
  tags: ['autodocs'],
  argTypes: {
    variant: { control: { type: 'select' }, options: componentVariants.ComponentName },
    size: { control: { type: 'select' }, options: componentSizes.ComponentName },
    tone: { control: { type: 'select' }, options: componentTones.ComponentName },
    rounded: { control: { type: 'select' }, options: componentRounded.ComponentName },
    shadow: { control: { type: 'select' }, options: componentShadow.ComponentName },
    disabled: { control: 'boolean' },
    label: { control: 'text' },
  },
  args: {
    variant: 'solid',
    size: 'md',
    tone: 'base',
    rounded: 'md',
    shadow: 'md',
    disabled: false,
    label: 'Label',
  },
})
</script>

<template>
  <!-- Playground: args コントロール付き -->
  <Story name="Default">
    <template #template="{ args }">
      <ComponentName v-bind="args">{{ args.label }}</ComponentName>
    </template>
  </Story>

  <!-- バリアント一覧 -->
  <Story name="Variants" asChild>
    <Stack direction="row" gap="md" align="center" wrap>
      <ComponentName variant="solid">Solid</ComponentName>
      <ComponentName variant="outline">Outline</ComponentName>
      <ComponentName variant="ghost">Ghost</ComponentName>
      <ComponentName variant="soft">Soft</ComponentName>
    </Stack>
  </Story>

  <!-- トーン一覧 -->
  <Story name="Tones" asChild>
    <Stack direction="column" gap="md">
      <Stack direction="row" gap="md" align="center" wrap>
        <ComponentName tone="base">Base</ComponentName>
        <ComponentName tone="neutral">Neutral</ComponentName>
      </Stack>
      <Stack direction="row" gap="md" align="center" wrap>
        <ComponentName tone="primary">Primary</ComponentName>
        <ComponentName tone="secondary">Secondary</ComponentName>
        <ComponentName tone="tertiary">Tertiary</ComponentName>
        <ComponentName tone="accent">Accent</ComponentName>
      </Stack>
      <Stack direction="row" gap="md" align="center" wrap>
        <ComponentName tone="success">Success</ComponentName>
        <ComponentName tone="warning">Warning</ComponentName>
        <ComponentName tone="info">Info</ComponentName>
        <ComponentName tone="destructive">Destructive</ComponentName>
      </Stack>
    </Stack>
  </Story>

  <!-- サイズ比較 -->
  <Story name="Sizes" asChild>
    <Stack direction="row" gap="md" align="center">
      <ComponentName size="lg">Large</ComponentName>
      <ComponentName size="md">Medium</ComponentName>
      <ComponentName size="sm">Small</ComponentName>
    </Stack>
  </Story>
</template>
```

## テンプレート: Compound コンポーネント

```vue
<script setup lang="ts">
import {
  Dropdown, DropdownTrigger, DropdownContent, DropdownItem,
  DropdownSeparator, Button, Stack,
} from '@morphink/ui'
import { componentRounded, componentShadow, componentSizes } from '@morphink/ui'
import { defineMeta } from 'sb-addon-vue-csf'

const { Story } = defineMeta({
  title: 'Components/Molecules/Dropdown',
  component: Dropdown,
  tags: ['autodocs'],
  argTypes: {
    size: { control: { type: 'select' }, options: componentSizes.Dropdown },
    rounded: { control: { type: 'select' }, options: componentRounded.Dropdown },
    shadow: { control: { type: 'select' }, options: componentShadow.Dropdown },
  },
  args: { size: 'md', rounded: 'md', shadow: 'md' },
})
</script>

<template>
  <Story name="Playground">
    <template #template="{ args }">
      <Dropdown>
        <DropdownTrigger><Button>Open</Button></DropdownTrigger>
        <DropdownContent v-bind="args">
          <DropdownItem>Edit</DropdownItem>
          <DropdownItem>Duplicate</DropdownItem>
          <DropdownSeparator />
          <DropdownItem destructive>Delete</DropdownItem>
        </DropdownContent>
      </Dropdown>
    </template>
  </Story>

  <!-- 機能バリエーション: WithIcons, WithCheckbox, WithSubMenu 等 -->
  <!-- サイズ比較 -->
</template>
```

## テンプレート: Organism

```vue
<script setup lang="ts">
import { AppShell, AppHeader, AppSidebar /* ... */ } from '@morphink/ui'
import { defineMeta } from 'sb-addon-vue-csf'

const { Story } = defineMeta({
  title: 'Components/Organisms/AppShell',
  component: AppShell,
  tags: ['autodocs'],
})
</script>

<template>
  <Story name="Default" asChild>
    <!-- フルレイアウト構成 -->
  </Story>
</template>
```

## ルール

### defineMeta

| フィールド | 必須 | 説明 |
|-----------|------|------|
| `title` | Yes | `Components/{Atoms\|Molecules\|Organisms}/Name` |
| `component` | Yes | メインコンポーネント |
| `tags` | Yes | `['autodocs']` で API ドキュメント自動生成 |
| `argTypes` | Playground 時 | コントロール定義。componentSizes 等から options を取得 |
| `args` | Playground 時 | デフォルト値 |

### Story ブロック

| パターン | 用途 | 書き方 |
|---------|------|--------|
| Playground | args コントロール付き | `<Story name="Default"><template #template="{ args }">` |
| 静的展示 | バリアント/トーン/サイズ一覧 | `<Story name="Variants" asChild>` |
| 状態付き | ref で状態管理 | `<script setup>` 内で `ref()` を定義し template で使用 |

### asChild

- `asChild` を付けると Story のルート要素がそのまま描画される（余分な wrapper div なし）
- Playground（`#template` slot 使用）では `asChild` を付けない

### レイアウト用コンポーネント

ストーリー内のレイアウトには `Stack` / `Grid` を使用:

```vue
<Stack direction="row" gap="md" align="center" wrap>
  <!-- コンポーネント群 -->
</Stack>
```

### argTypes の options ソース

props 定義ファイルから export された定数を使う:

```ts
import { componentVariants, componentSizes, componentTones, componentRounded, componentShadow } from '@morphink/ui'

// argTypes での使用
variant: { control: { type: 'select' }, options: componentVariants.Button }
```

コンポーネントがサポートしていない prop の argTypes は定義しない。

### 標準ストーリー構成

| ストーリー名 | 内容 |
|-------------|------|
| Default (Playground) | 全 props をコントロール可能 |
| Variants | variant の一覧（該当する場合） |
| Tones | tone の一覧（該当する場合） |
| Sizes | size の横並び比較 |
| 機能バリエーション | コンポーネント固有の使用例 |

全 props がないコンポーネント（例: Divider）は該当するストーリーのみ作成する。
