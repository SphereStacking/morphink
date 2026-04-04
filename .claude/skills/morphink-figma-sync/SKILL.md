---
name: morphink-figma-sync
description: >
  morphink Figma ↔ Code 同期ワークフローガイド。
  Figma コンポーネントのバリアント作成・変数バインド、Code Connect ファイルの作成・更新、
  コンポーネントセット内のバリアント配置パターンをカバー。
  「Figma 同期」「Code Connect」「バリアント追加」「Figma コンポーネント作成」
  「figma.ts 作成」「Figma 変数バインド」等でトリガー。
---

# morphink Figma ↔ Code 同期

## 概要

コードベースのコンポーネント props を正とし、Figma 側にバリアントを作成して同期する（code → Figma 方向）。

## ワークフロー

```
1. コード props を監査（CVA バリアント定義を確認）
2. Figma の現状を確認（get_metadata / get_screenshot）
3. 不足バリアントを Figma に作成（use_figma）
4. Semantic Variables をバインド（setBoundVariableForPaint 等）
5. バリアント配置を整理（手動グリッドポジショニング）
6. スクリーンショットで検証（get_screenshot）
7. Code Connect ファイルを作成/更新（.figma.ts）
```

## Figma ファイル情報

| 項目 | 値 |
|------|-----|
| fileKey | `X8gSyqGQC7yghrfuc4GIdQ` |
| Atoms ページ | id=`15:2` |
| Molecules ページ | id=`15:3` |

## Semantic Variable ID リファレンス

### Tone カラー

| Tone | color | fg |
|------|-------|----|
| primary | `VariableID:4:14` | `VariableID:4:15` |
| secondary | `VariableID:4:18` | `VariableID:4:19` |
| tertiary | `VariableID:4:22` | `VariableID:4:23` |
| base | `VariableID:4:26` | `VariableID:4:27` |
| accent | `VariableID:4:30` | `VariableID:4:31` |
| neutral | `VariableID:4:34` | `VariableID:4:35` |
| success | `VariableID:4:38` | `VariableID:4:39` |
| warning | `VariableID:4:42` | `VariableID:4:43` |
| info | `VariableID:4:46` | `VariableID:4:47` |
| destructive | `VariableID:4:50` | `VariableID:4:51` |

### その他

| 変数 | ID |
|------|----|
| background | `VariableID:4:3` |
| card | `VariableID:4:5` |
| muted | `VariableID:4:9` |
| muted-foreground | `VariableID:4:10` |
| border | `VariableID:4:11` |
| radius-sm | `VariableID:5:15` |
| radius-md | `VariableID:5:16` |
| radius-lg | `VariableID:5:17` |
| radius-xl | `VariableID:5:18` |

## コンポーネント node-id リファレンス

### Atoms

| コンポーネント | node-id | バリアント |
|--------------|---------|-----------|
| Button | `15:7` | variant×tone×size |
| Badge | `15:81` | variant×tone×size |
| Avatar | `15:139` | size×shape |
| Input | `15:113` | size |
| Textarea | `54:35` | size |
| Panel | `107:122` | variant |
| Radio | `15:146` | state |
| Checkbox | `15:150` | state |
| Switch | `15:153` | state |
| Alert | `15:93` | variant×tone |
| Heading | `111:14` | level(1-6) |
| Text | `112:50` | variant×weight×muted |
| Box | `113:27` | padding×rounded |
| Stack | `114:162` | direction×gap×align |
| Grid | `115:177` | columns×gap |

### Molecules

| コンポーネント | node-id | バリアント |
|--------------|---------|-----------|
| SearchInput | `54:26` | size(5) |
| FormField | `54:16` | state(3) |
| Select | `124:602` | variant(4)×tone(10)×size(5) = 200 |
| Tabs | `55:51` | variant(2)×size(5)×activeTab(3) = 30 |
| Tooltip | `55:60` | position(4) |
| Popover | `122:14` | side(4) |
| Accordion | `55:97` | state(2) |
| AlertDialog | `121:42` | size(5) |
| Breadcrumb | `56:10` | single |
| NavItem | `56:28` | state(3) |
| Toolbar | `125:72` | variant(2)×size(5) = 10 |
| SectionHeader | `126:17` | size(5) |
| EmptyState | `126:18` | single |
| Stat | `126:40` | trend(3) |
| Nav | `127:72` | variant(2)×size(5) = 10 |
| Card | `129:47` | variant(5) |
| Table | `130:126` | density(2)×striped(2) = 4 |
| Dialog | `131:72` | size(5) |
| SelectContent | `53:39` | single |
| DropdownContent | `55:2` | single |

## Code Connect ファイルテンプレート

### 基本パターン（.figma.ts）

```ts
import figma from '@figma/code-connect'
import { ComponentName } from '@morphink/ui'

figma.connect(
  ComponentName,
  'https://figma.com/design/X8gSyqGQC7yghrfuc4GIdQ?node-id=XX:YY',
  {
    props: {
      variant: figma.enum('variant', { solid: 'solid', outline: 'outline' }),
      size: figma.enum('size', { xs: 'xs', sm: 'sm', md: 'md', lg: 'lg', xl: 'xl' }),
      tone: figma.enum('tone', {
        primary: 'primary', secondary: 'secondary', tertiary: 'tertiary',
        base: 'base', accent: 'accent', neutral: 'neutral',
        success: 'success', warning: 'warning', info: 'info', destructive: 'destructive',
      }),
    },
    example: (props) =>
      `<ComponentName variant="${props.variant}" tone="${props.tone}" size="${props.size}" />`,
  }
)
```

### boolean マッピング

```ts
// Figma enum → boolean prop
active: figma.enum('state', { active: true, default: false, disabled: false }),
striped: figma.enum('striped', { true: true, false: false }),
```

### Slot / テンプレートを含む例

```ts
example: (props) =>
  `<Dialog size="${props.size}" title="Title" description="Description">
  <template #trigger>
    <Button>Open</Button>
  </template>
  <template #default>
    <p>Content here.</p>
  </template>
</Dialog>`,
```

## Figma Plugin API パターン

### バリアント作成（combineAsVariants）

```js
// 1. ページに移動
const page = figma.root.children.find(p => p.name === 'Molecules');
await figma.setCurrentPageAsync(page);

// 2. コンポーネントを作成
const variants = [];
for (const size of ['xs', 'sm', 'md', 'lg', 'xl']) {
  const comp = figma.createComponent();
  comp.name = `size=${size}`;
  comp.resize(width, height);
  // ... 子要素を構成
  variants.push(comp);
}

// 3. コンポーネントセットに統合
const componentSet = figma.combineAsVariants(variants, page);
componentSet.name = 'ComponentName';
```

### Semantic Variable バインド

```js
// 色バインド（setBoundVariableForPaint）
const fills = JSON.parse(JSON.stringify(node.fills));
fills[0] = figma.variables.setBoundVariableForPaint(
  fills[0], 'color', 'VariableID:4:14' // primary
);
node.fills = fills;

// 角丸バインド（setBoundVariable）
node.setBoundVariable('topLeftRadius', 'VariableID:5:16'); // radius-md
node.setBoundVariable('topRightRadius', 'VariableID:5:16');
node.setBoundVariable('bottomLeftRadius', 'VariableID:5:16');
node.setBoundVariable('bottomRightRadius', 'VariableID:5:16');
```

### コンポーネントセット内のバリアント配置（手動グリッド）

Button パターンに従い、`layoutMode: "NONE"` で手動配置する。

```js
// サイズ = X軸、トーン = Y軸、バリアント = ブロック
componentSet.layoutMode = 'NONE';

const GAP_X = 20;  // バリアント間の水平間隔
const GAP_Y = 20;  // バリアント間の垂直間隔
const BLOCK_GAP = 60; // バリアントブロック間の間隔

for (const child of componentSet.children) {
  const props = parseVariantName(child.name); // "variant=solid, tone=primary, size=sm"
  const x = sizeIndex * (WIDTH + GAP_X);
  const y = toneIndex * (HEIGHT + GAP_Y) + variantBlockIndex * BLOCK_Y;
  child.x = x;
  child.y = y;
}

// コンポーネントセットをコンテンツにフィット
componentSet.resize(totalWidth, totalHeight);
```

## よくある問題と対処

| 問題 | 原因 | 対処 |
|------|------|------|
| `Cannot use unloaded font` | テキスト操作前にフォント未読み込み | `await figma.loadFontAsync({ family: 'Inter', style: 'Medium' })` |
| `Invalid enum value 'FILL'` | `counterAxisSizingMode` に FILL を指定 | `'AUTO'` にして `appendChild` 後に `layoutSizingHorizontal = 'FILL'` |
| バリアントが重なる | auto-layout で配置 | `layoutMode: "NONE"` + 手動 x/y 座標 |
| `setBoundVariableForPaint` が効かない | 戻り値を再代入していない | `fills[0] = figma.variables.setBoundVariableForPaint(...)` で受け取る |
| ページコンテンツが空 | ページ切り替え未実施 | `await figma.setCurrentPageAsync(page)` |

## ファイル配置

```
packages/ui/src/components/
├── atoms/
│   ├── Button.figma.ts
│   ├── Badge.figma.ts
│   └── ...
└── molecules/
    ├── Select.figma.ts
    ├── Dialog.figma.ts
    └── ...
```

Code Connect ファイルはコンポーネントと同じディレクトリに `{ComponentName}.figma.ts` として配置する。
