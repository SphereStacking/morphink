---
globs:
  - packages/ui/src/**
---

# コンポーネントアーキテクチャ

## 3 層構造

| 層 | 場所 | 命名 | 役割 |
|---|---|---|---|
| Public/atoms | `packages/ui/src/components/atoms/` | `Button.vue` | Atom — 単体の UI プリミティブ |
| Public/molecules | `packages/ui/src/components/molecules/` | `FormField.vue` | Molecule — Atoms の組み合わせ |
| Public/organisms | `packages/ui/src/components/organisms/` | `AppShell.vue` | Organism — 参考実装（カスタマイズ前提） |
| Base | `packages/ui/src/base/ui/*/` | `ButtonBase.vue` | CVA バリアント + Reka UI 統合 |
| Props | `packages/ui/src/base/lib/props/` | `variant.ts` 等 | 共有 prop 定義（型 + 定数） |

すべて `packages/ui/src/index.ts` から export。

### 層間の責務ルール

- **Public 層**: エンドユーザー向け API。Base コンポーネントに props を転送する
- **Base 層**: CVA でスタイルバリアントを定義。Reka UI を統合し、`data-morphink` をルート要素に付与する
- **Props 層**: コンポーネント間で共有する型・定数を一元管理。コンポーネント別のサブセット型を export する

---

## CVA（class-variance-authority）パターン

### 基本構造

```ts
import { cva } from 'class-variance-authority'

const componentVariants = cva('ベースクラス', {
  variants: {
    variant: { solid: '...', outline: '...', ghost: '...', soft: '...' },
    tone:    { primary: '[--btn-color:var(--morphink-color-primary)]', ... },
    size:    { xs: '...', sm: '...', md: '...', lg: '...', xl: '...' },
    rounded: { none: '...', sm: '...', md: '...', lg: '...', xl: '...', full: '...' },
    shadow:  { none: '...', sm: '...', md: '...', lg: '...' },
  },
  compoundVariants: [
    // tone + variant の組み合わせで特殊スタイルが必要な場合
    { tone: 'neutral', variant: 'solid', class: '...' },
  ],
  defaultVariants: { variant: 'solid', tone: 'primary', size: 'md', rounded: 'md' },
})
```

### CVA ルール

- tone variant 内で `[--<abbr>-color:var(--morphink-color-*)]` 形式でコンポーネント内部変数を設定する
- variant 定義内で HEX / RGB を直書きしない。必ず semantic token を参照する
- `compoundVariants` は tone + variant の組み合わせで視覚的に異なるスタイルが必要な場合のみ使う
- `defaultVariants` は必ず指定する。tone のデフォルトは `primary`、size は `md`

### 内部 CSS 変数の命名

新規コンポーネントでは 2〜4 文字の略称をプレフィックスとし、`--morphink-` とは別の名前空間にする。

| プレフィックス | 対象 | 変数 |
|--------------|------|------|
| `--btn-*` | ButtonBase | color, fg, hover, active, accent |
| `--badge-*` | BadgeBase | color, fg, accent |
| `--ctl-*` | CheckboxBase, SwitchBase, RadioBase | color, fg |
| `--alert-*` | AlertBase | color, fg, accent |
| `--prog-*` | ProgressBase | color |
| `--sld-*` | SliderBase | color |
| `--pgn-*` | PaginationBase | color |
| `--tst-*` | ToastBase | color, fg, accent |
| `--field-*` | InputBase, TextareaBase, SelectBase | color |
| `--ring-color` | 複数コンポーネント共通 | focus ring 色 |

---

## Variant ルール

### セマンティクスと使い分け

| Variant | 視覚的特徴 | 用途 | 情報階層 |
|---------|-----------|------|---------|
| **solid** | 塗りつぶし背景 + 白テキスト | 主要アクション、強調要素 | 最高 |
| **outline** | ボーダーのみ + カラーテキスト | 副次アクション、選択可能な要素 | 高 |
| **ghost** | 背景なし + カラーテキスト + hover 時に背景やボーダーが現れる | 三次アクション、ナビゲーション内ボタン、インライン編集フィールド | 中 |
| **soft** | 薄い背景 + カラーテキスト | 情報表示、タグ、ステータスバッジ | 低〜中 |
| **subtle** | 極薄い背景 | 背景パネル、控えめなコンテナ | 低 |
| **elevated** | 影付き | 浮いて見せたいカード、パネル | 中 |
| **interactive** | hover/press で変化 | クリック可能なカード | 中 |

### コンポーネント別 Variant 対応表

| コンポーネント | solid | outline | ghost | soft | subtle | elevated | interactive | 固有 |
|--------------|-------|---------|-------|------|--------|----------|-------------|------|
| Button | ✅ | ✅ | ✅ | ✅ | | | | |
| Badge | ✅ | ✅ | ✅ | ✅ | | | | |
| Input / Textarea | ✅ | ✅ | ✅ | ✅ | | | | |
| Select | ✅ | ✅ | ✅ | ✅ | | | | |
| Checkbox / Switch / Radio | ✅ | ✅ | | ✅ | | | | |
| Alert / Toast | ✅ | ✅ | | ✅ | | | | |
| Accordion / Pagination | | ✅ | | ✅ | | | | |
| Card | | ✅ | | ✅ | | ✅ | ✅ | |
| Panel | ✅ | | | | ✅ | ✅ | | |
| Nav / Toolbar | ✅ | | | | ✅ | | | |
| Tabs | | | | | | | | pill, underline |

### Variant 選択ガイド

- **同一画面に複数ボタン** → 主要: `solid`、副次: `outline`、三次: `ghost`。同じ variant を並べない（neutral のペア使用は例外）
- **フォームコントロール** → デフォルト `outline`。ダーク背景上は `solid`
- **ステータス表示** → Badge/Alert は `soft` が標準。強い警告のみ `solid`
- **カード** → 通常 `elevated` か `outline`。クリック可能なら `interactive`

---

## Tone ルール

### セマンティクスと使い分け

| Tone | 意味 | 使用場面 |
|------|------|---------|
| **primary** | ブランドの主色。最も注目を集める | CTA ボタン、アクティブ状態、主要リンク |
| **secondary** | ブランドの副色 | 補助的なアクション、セカンダリナビ |
| **tertiary** | 第三の色 | 控えめな装飾、第三階層のアクション |
| **base** | ニュートラルなベース色 | デフォルト状態、標準 UI 要素 |
| **accent** | 特徴的なアクセント色 | 注目を引きたい非アクション要素 |
| **neutral** | グレー系 | 無彩色が適切な場面、無効化に近い表現 |
| **success** | 成功・完了・正常 | 成功メッセージ、完了状態、有効ステータス |
| **warning** | 警告・注意 | 警告メッセージ、期限切れ間近、要注意事項 |
| **info** | 情報提供 | 情報メッセージ、ヒント、補足説明 |
| **destructive** | 破壊的操作・エラー | 削除ボタン、エラー状態、危険な操作 |

### コンポーネント別 Tone 対応

| カテゴリ | コンポーネント | 対応 Tone |
|---------|--------------|----------|
| フル対応（10 tone） | Button, Badge, Input, Textarea, Checkbox, Switch, Radio, Select, Progress, Slider, Pagination | primary / secondary / tertiary / base / accent / neutral / success / warning / info / destructive |
| フィードバック系（5 tone） | Alert, Toast | info / success / warning / destructive / neutral |

### Tone 選択ガイド

- **デフォルトは `primary`** — 特に理由がなければ primary を使う
- **フィードバック系は意味で選ぶ** — success/warning/info/destructive を状況に応じて使い分ける
- **削除・破壊操作は必ず `destructive`** — 赤系のビジュアルで危険性を示す
- **`neutral` は「色がない」ことに意味がある場面のみ** — 例: キャンセルボタン、フィルターのリセット
- **tone を色の好みで選ばない** — semantic な意味に基づいて選択する

---

## Size ルール

| Size | 用途 |
|------|------|
| **xs** | インライン要素、密なリスト内、コンパクト UI |
| **sm** | サブメニュー、補助的な入力、小さめのボタン |
| **md** | 標準サイズ（デフォルト）。ほとんどの場面はこれ |
| **lg** | フォームの主要入力、モバイルタッチ操作 |
| **xl** | ヒーローセクション、特別に目立たせたい要素 |

- **デフォルトは `md`** — 指定しなければ md になる
- **タッチ操作を想定するなら `lg` 以上** — タップターゲット 44px 以上を確保
- **同一コンテキスト内でサイズを混在させない** — フォーム内のコントロールは統一する

---

## Compound Component パターン

### 現在の Compound Components

| Root | サブコンポーネント | Context |
|------|-------------------|---------|
| **Card** | CardHeader, CardBody, CardFooter, CardTitle, CardDescription, CardMedia | なし（スロットのみ） |
| **Dropdown** | DropdownTrigger, DropdownContent, DropdownItem, DropdownSeparator, DropdownGroup, DropdownLabel, DropdownCheckboxItem, DropdownRadioGroup, DropdownRadioItem, DropdownSub, DropdownSubTrigger, DropdownSubContent | `dropdownContext.ts`（size 伝播 + item counter） |
| **Accordion** | AccordionItem（内部に AccordionTrigger + AccordionContent） | `accordionContext.ts`（size + variant 伝播） |
| **CheckboxGroup** | Checkbox（子） | `checkboxContext.ts`（size + variant + tone + rounded + group state） |
| **RadioGroup** | Radio（子） | `radioContext.ts`（size + variant + tone 伝播） |

### Context 伝播ルール

- provide/inject で伝播するのは **スタイル props**（size, variant, tone, rounded）と **グループ状態**（modelValue, toggle）
- 子コンポーネントは `inject` で親のスタイルを受け取り、自身の props がある場合はそちらを優先する
- Context ファイルは `packages/ui/src/base/ui/{component}/{component}Context.ts` に配置

---

## data-morphink 属性

`ui.css` のユーティリティクラスは `[data-morphink]` セレクタでスコーピングされている。

- Base コンポーネントのルート要素に `data-morphink` を必ず付与する
- Portal コンポーネント（Dialog, Sheet, Dropdown, Popover, Tooltip, Select）の Overlay/Content には個別に `data-morphink` を付与する
- 消費者は `.mi-theme` ラッパーにも `data-morphink` を付与する必要がある

---

## 新規コンポーネント作成チェックリスト

1. **Props 型を定義** — `packages/ui/src/base/lib/props/` の該当ファイルにコンポーネント別サブセット型を追加
2. **Base コンポーネントを作成** — `packages/ui/src/base/ui/{name}/{Name}Base.vue`
   - CVA でバリアントを定義（必要な variant/tone/size/rounded/shadow のサブセット）
   - 内部 CSS 変数は 2〜4 文字略称プレフィックス
   - ルート要素に `data-morphink` 付与
   - Reka UI ラップ時は `useForwardPropsEmits` 使用
3. **Public コンポーネントを作成** — `packages/ui/src/components/{atoms|molecules|organisms}/{Name}.vue`
   - Base コンポーネントを import（`reka-ui` は import しない）
   - `open` 系 props は `withDefaults` で `undefined` 指定
4. **index.ts に export 追加** — `packages/ui/src/index.ts`
5. **Storybook ストーリー作成** — `packages/docs/src/stories/`

