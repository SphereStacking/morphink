---
name: compound-component
description: Vue 3 UI ライブラリ向け Compound Component パターン。モノリシックなコンポーネントを合成可能なサブコンポーネントに分割する際に使用（例: Dropdown を DropdownTrigger/DropdownContent/DropdownItem に分割）。スロットベース API 設計、provide/inject による共有状態の実装をカバー。「コンポーネント分割」「サブコンポーネント」「compound component」「新しい複合 UI コンポーネント設計」等でトリガー。
---

# Compound Component パターン

モノリシックなコンポーネントを合成可能なスロットベースのサブコンポーネントに分割する。

## パターン概要

**変更前**（モノリシック）:
```vue
<Dropdown :items="[{label:'Edit'}, {label:'Delete', destructive:true}]" />
```

**変更後**（compound）:
```vue
<Dropdown>
  <DropdownTrigger>
    <Button>Menu</Button>
  </DropdownTrigger>
  <DropdownContent>
    <DropdownItem>Edit</DropdownItem>
    <DropdownItem destructive>Delete</DropdownItem>
  </DropdownContent>
</Dropdown>
```

## サブコンポーネント分解

ヘッドレスプリミティブの API からサブコンポーネントを特定する。DropdownMenu の例:

| プリミティブ | サブコンポーネント | 役割 |
|---|---|---|
| Root | Dropdown | 状態コンテナ |
| Trigger | DropdownTrigger | クリック対象（as-child） |
| Content + Portal | DropdownContent | ポップオーバーパネル（バリアント付き） |
| Item | DropdownItem | メニューアクション |
| Separator | DropdownSeparator | 区切り線 |
| Group | DropdownGroup | 論理グループ |
| Label | DropdownLabel | グループ見出し |
| CheckboxItem + Indicator | DropdownCheckboxItem | トグル可能な項目 |
| RadioGroup | DropdownRadioGroup | 排他選択コンテナ |
| RadioItem + Indicator | DropdownRadioItem | 排他選択オプション |
| Sub | DropdownSub | ネストメニュールート |
| SubTrigger | DropdownSubTrigger | ネストメニュートリガー（矢印付き） |
| SubContent + Portal | DropdownSubContent | ネストメニューパネル |

## コンテキスト伝播

provide/inject で親からの子孫にバリアント状態を共有する:

```ts
// dropdownContext.ts
import type { InjectionKey, Ref } from 'vue'
export const dropdownSizeKey: InjectionKey<Ref<DropdownSize>> = Symbol('dropdownSize')
```

**提供側**（ContentBase）:
```vue
provide(dropdownSizeKey, toRef(props, 'size'))
```

**消費側**（ItemBase）:
```vue
const size = inject(dropdownSizeKey, ref('md' as DropdownSize))
```

## バリアント所有権

| バリアント | 所有者 | 理由 |
|---|---|---|
| size | Content（子に provide） | 全子要素が統一的にスケール |
| rounded, shadow | Content | コンテナの外観 |
| destructive | Item | 項目ごとの振る舞い |
| disabled | Item, CheckboxItem | 項目ごとの状態 |

## スロットによる拡張性

名前付きスロットでオプション部分を提供する:

```vue
<!-- ItemBase.vue -->
<DropdownMenuItem :class="classes">
  <span v-if="$slots.icon" class="shrink-0">
    <slot name="icon" />
  </span>
  <slot />
</DropdownMenuItem>
```

## インジケーターパターン

CheckboxItem/RadioItem にインジケーター SVG を直接埋め込む:

```vue
<DropdownMenuCheckboxItem :class="classes">
  <DropdownMenuItemIndicator class="shrink-0">
    <svg :class="indicatorSizes[size]" viewBox="0 0 24 24" fill="none"
         stroke="currentColor" stroke-width="2">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  </DropdownMenuItemIndicator>
  <slot />
</DropdownMenuCheckboxItem>
```

## サブメニューパターン

SubTrigger に右向き矢印を含める:

```vue
<DropdownMenuSubTrigger :class="classes">
  <slot />
  <svg class="ml-auto size-4" viewBox="0 0 24 24" fill="none"
       stroke="currentColor" stroke-width="2">
    <path d="m9 18 6-6-6-6" />
  </svg>
</DropdownMenuSubTrigger>
```
