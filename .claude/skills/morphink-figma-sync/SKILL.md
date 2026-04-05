---
name: morphink-figma-sync
description: >
  morphink Figma ↔ Code 双方向同期ワークフロー。
  4 方向のフローをカバー: Figma→Code（デザイン実装）、Figma→Code（トークン同期）、
  Code→Figma（バリアント同期）、Code→Figma（Code Connect 更新）。
  「Figma 同期」「Code Connect」「バリアント追加」「Figma コンポーネント作成」
  「figma.ts 作成」「Figma 変数バインド」「Figma から実装」「トークン同期」
  「デザイン取得」「Figma 反映」等でトリガー。
---

# morphink Figma ↔ Code 双方向同期

## 概要

Props 定義（`packages/ui/src/base/lib/props/`）が Code と Figma の Single Source of Truth。
4 つの同期方向があり、それぞれ異なるワークフローとツールを使う。

---

## 方向 1: Figma → Code（デザイン実装）

Figma のデザインを morphink コンポーネントとして実装する。

### フロー

```
1. get_design_context でフレームの構造化表現を取得
2. get_screenshot でビジュアルリファレンスを取得
3. get_variable_defs でトークン情報を取得
4. morphink の Vue 3 + Tailwind v4 + トークン体系に変換して実装
5. Figma デザインとの 1:1 ビジュアルパリティを検証
```

### ルール

- Figma MCP の出力（React + Tailwind）はデザイン意図の表現であり、最終コードではない
- Tailwind ユーティリティクラスは morphink のトークン参照（`--morphink-*`）に置き換える
- 色・スペーシング・角丸・影は必ず semantic token を使い、ハードコードしない
- 既存コンポーネント（`packages/ui/src/components/`）を再利用し、重複実装しない
- Figma MCP が localhost ソースで画像/SVG を返した場合、そのソースを直接使用する
- アイコンパッケージを新規追加しない — アセットは Figma ペイロードに含まれる

---

## 方向 2: Figma → Code（トークン同期）

Figma Variables の変更をコードのデザイントークンに反映する。

### フロー

```
1. Figma Variables を編集
2. Figma プラグイン実行（packages/figma-plugin）
3. DTCG JSON エクスポート → packages/tokens/tokens/*.json に配置
4. pnpm --filter @morphink/tokens build
5. packages/tokens/dist/{css,json,ts} 生成
6. Storybook で検証
```

### デフォルトファイルマッピング

| Figma Collection | Mode | 出力ファイル |
|-----------------|------|-------------|
| Primitives | default | `primitives.json` |
| Semantic | Light | `semantic.json` |
| Semantic | Dark | `semantic-dark.json` |

### ルール

- トークン JSON は手動編集しない。Figma プラグインからの出力を正とする
- `packages/tokens/dist/*` は生成物。編集禁止
- 新規トークン追加時は Figma Variables → プラグインエクスポート → Style Dictionary ビルドの順

---

## 方向 3: Code → Figma（バリアント同期）

コードで追加したバリアントを Figma コンポーネントに反映する。

### フロー

```
1. コード props を監査（CVA バリアント定義を確認）
2. Figma の現状を確認（get_metadata / get_screenshot）
3. 不足バリアントを Figma に作成（use_figma）
4. Semantic Variables をバインド（setBoundVariableForPaint 等）
5. バリアント配置を整理（手動グリッドポジショニング）
6. スクリーンショットで検証（get_screenshot）
7. Code Connect ファイルを作成/更新（.figma.ts）
```

### ルール

- コードで props サブセットを変更したら、Figma 側のバリアントも同期する
- Figma バリアントの追加・削除は `use_figma` ツール経由で行う
- バリアント作成時は Semantic Variables をバインドすること（HEX 直書き禁止）

---

## 方向 4: Code → Figma（Code Connect 更新）

Public コンポーネントの変更を Code Connect に反映する。

### フロー

```
1. Public コンポーネントの props / テンプレートが変わった
2. *.figma.ts を更新
3. figma publish で反映（Figma Dev Mode → コードスニペット表示）
```

---

## Props 定義が Single Source of Truth

```
variant.ts  → componentVariants.Button   → CVA variants + figma.enum()
tone.ts     → componentTones.Button      → CVA variants + figma.enum()
size.ts     → componentSizes.Button      → CVA variants + figma.enum()
rounded.ts  → componentRounded.Button    → CVA variants + figma.enum()
shadow.ts   → componentShadow.Button     → CVA variants + figma.enum()
```

props 定数を変更すると CVA バリアント定義と Code Connect マッピングの両方に反映される。
Figma 側のバリアント追加・削除のみ手動同期が必要。

---

## 変更シナリオ別チェックリスト

### トークン値の変更（色、スペーシング等）

- [ ] Figma Variables を編集
- [ ] プラグインで DTCG JSON エクスポート
- [ ] `packages/tokens/tokens/` に配置
- [ ] `pnpm --filter @morphink/tokens build`
- [ ] Storybook で視覚確認

### 新規バリアント追加（例: Button に `link` variant 追加）

- [ ] `packages/ui/src/base/lib/props/variant.ts` の `componentVariants.Button` に追加
- [ ] `ButtonBase.vue` の CVA に variant スタイル定義
- [ ] `Button.vue`（Public）の props 型に反映確認
- [ ] Figma でバリアントを追加（`use_figma`）
- [ ] Semantic Variables バインド
- [ ] `Button.figma.ts` は props 定数参照なので自動反映
- [ ] Storybook ストーリー追加

### 新規 Tone 追加（例: 全コンポーネントに `brand` tone 追加）

- [ ] Figma Variables に `color/brand` を追加 → プラグインエクスポート → トークンビルド
- [ ] `packages/ui/src/base/lib/props/tone.ts` の `tones` に追加
- [ ] 対象コンポーネントの CVA tone variant にスタイル定義追加
- [ ] Figma で各コンポーネントにバリアント追加
- [ ] Semantic Variables バインド

### 新規コンポーネント追加

- [ ] Props 型定義（variant.ts, size.ts, tone.ts 等に追加）
- [ ] Base コンポーネント作成（CVA + data-morphink + Reka UI）
- [ ] Public コンポーネント作成
- [ ] `index.ts` に export 追加
- [ ] Figma にコンポーネント作成（バリアント + Variables バインド）
- [ ] `*.figma.ts` Code Connect ファイル作成
- [ ] Storybook ストーリー作成

---

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
| Select | `124:602` | variant(4)×tone(10)×size(5) |
| Tabs | `55:51` | variant(2)×size(5)×activeTab(3) |
| Tooltip | `55:60` | position(4) |
| Popover | `122:14` | side(4) |
| Accordion | `55:97` | state(2) |
| AlertDialog | `121:42` | size(5) |
| Breadcrumb | `56:10` | single |
| NavItem | `56:28` | state(3) |
| Toolbar | `125:72` | variant(2)×size(5) |
| SectionHeader | `126:17` | size(5) |
| EmptyState | `126:18` | single |
| Stat | `126:40` | trend(3) |
| Nav | `127:72` | variant(2)×size(5) |
| Card | `129:47` | variant(5) |
| Table | `130:126` | density(2)×striped(2) |
| Dialog | `131:72` | size(5) |
| SelectContent | `53:39` | single |
| DropdownContent | `55:2` | single |

---

## Code Connect テンプレート

### 基本パターン（props 定数参照）

```ts
import figma from '@figma/code-connect'
import { Button } from '@morphink/ui'
import { toEnumMap } from '../../base/lib/figma-utils'
import { componentSizes } from '../../base/lib/props/size'
import { componentTones } from '../../base/lib/props/tone'
import { componentVariants } from '../../base/lib/props/variant'

figma.connect(Button, 'https://figma.com/design/X8gSyqGQC7yghrfuc4GIdQ?node-id=15:7', {
  props: {
    variant: figma.enum('variant', toEnumMap(componentVariants.Button)),
    tone: figma.enum('tone', toEnumMap(componentTones.Button)),
    size: figma.enum('size', toEnumMap(componentSizes.Button)),
  },
  example: (props) =>
    `<Button variant="${props.variant}" tone="${props.tone}" size="${props.size}">Button</Button>`,
})
```

### boolean マッピング

```ts
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

---

## Figma Plugin API パターン

### バリアント作成（combineAsVariants）

```js
const page = figma.root.children.find(p => p.name === 'Molecules');
await figma.setCurrentPageAsync(page);

const variants = [];
for (const size of ['xs', 'sm', 'md', 'lg', 'xl']) {
  const comp = figma.createComponent();
  comp.name = `size=${size}`;
  comp.resize(width, height);
  variants.push(comp);
}

const componentSet = figma.combineAsVariants(variants, page);
componentSet.name = 'ComponentName';
```

### Semantic Variable バインド

```js
// 色バインド
const fills = JSON.parse(JSON.stringify(node.fills));
fills[0] = figma.variables.setBoundVariableForPaint(
  fills[0], 'color', 'VariableID:4:14' // primary
);
node.fills = fills;

// 角丸バインド
node.setBoundVariable('topLeftRadius', 'VariableID:5:16');
node.setBoundVariable('topRightRadius', 'VariableID:5:16');
node.setBoundVariable('bottomLeftRadius', 'VariableID:5:16');
node.setBoundVariable('bottomRightRadius', 'VariableID:5:16');
```

### バリアント配置（手動グリッド）

```js
componentSet.layoutMode = 'NONE';
const GAP_X = 20, GAP_Y = 20, BLOCK_GAP = 60;

for (const child of componentSet.children) {
  const props = parseVariantName(child.name);
  child.x = sizeIndex * (WIDTH + GAP_X);
  child.y = toneIndex * (HEIGHT + GAP_Y) + variantBlockIndex * BLOCK_Y;
}
componentSet.resize(totalWidth, totalHeight);
```

---

## よくある問題と対処

| 問題 | 原因 | 対処 |
|------|------|------|
| `Cannot use unloaded font` | テキスト操作前にフォント未読み込み | `await figma.loadFontAsync({ family: 'Inter', style: 'Medium' })` |
| `Invalid enum value 'FILL'` | `counterAxisSizingMode` に FILL | `'AUTO'` → `appendChild` 後に `layoutSizingHorizontal = 'FILL'` |
| バリアントが重なる | auto-layout で配置 | `layoutMode: "NONE"` + 手動 x/y 座標 |
| `setBoundVariableForPaint` が効かない | 戻り値を未代入 | `fills[0] = figma.variables.setBoundVariableForPaint(...)` |

## ファイル配置

```
packages/ui/
├── figma.config.json                    # Code Connect 設定
└── src/components/
    ├── atoms/*.figma.ts                 # Atoms の Code Connect（15 ファイル）
    └── molecules/*.figma.ts             # Molecules の Code Connect（28 ファイル）
```
