# Morphink Token Exporter — Figma Plugin

Figma Variables を DTCG 標準形式の JSON としてエクスポートするカスタム Figma プラグイン。

---

## 目次

1. [セットアップ](#セットアップ)
2. [Figma へのインストール（ローカル読み込み）](#figma-へのインストールローカル読み込み)
3. [トークン更新フロー](#トークン更新フロー)
4. [Figma Variables のコレクション構造ガイドライン](#figma-variables-のコレクション構造ガイドライン)
5. [motion.json の手動更新手順](#motionjson-の手動更新手順)
6. [デフォルトのファイルマッピング](#デフォルトのファイルマッピング)
7. [出力フォーマット（DTCG）](#出力フォーマットdtcg)
8. [トラブルシューティング](#トラブルシューティング)

---

## セットアップ

```bash
# 依存インストール & プラグインビルド
pnpm --filter figma-plugin install
pnpm --filter figma-plugin build
```

ビルド成果物は `packages/figma-plugin/dist/` に生成される（`dist/code.js`, `dist/ui.html`）。

---

## Figma へのインストール（ローカル読み込み）

> Figma **デスクトップアプリ**が必要。ブラウザ版では開発プラグインを読み込めない。

1. Figma デスクトップアプリを起動する
2. 任意のファイルを開く
3. メニューバー → **Plugins** → **Development** → **Import plugin from manifest...**
4. ファイルダイアログで `packages/figma-plugin/manifest.json` を選択して開く
5. 以降は **Plugins** → **Development** → **Morphink Token Exporter** からプラグインを起動できる

> プラグインを更新した場合、`pnpm --filter figma-plugin build` を再実行するだけで自動的に反映される（Figma の再インポートは不要）。

---

## トークン更新フロー

Figma でトークンを変更してから PR を出すまでの標準フロー。

```
1. Figma でトークン編集
      ↓
2. プラグインで JSON をエクスポート
      ↓
3. エクスポートした JSON を packages/tokens/tokens/ に配置
      ↓
4. diff-check でトークン差分を確認
      ↓
5. Style Dictionary ビルドで CSS/TS を再生成
      ↓
6. Storybook で目視確認
      ↓
7. PR を作成してレビュー依頼
```

### 詳細手順

#### 2. プラグインで JSON をエクスポート

1. Figma でプラグインを起動（Plugins → Development → Morphink Token Exporter）
2. コレクション一覧が表示されるので、エクスポートするコレクション・モードを選択
3. 出力ファイル名を必要に応じて編集（デフォルトは下表を参照）
4. 「Export JSON」をクリック → ブラウザのダウンロードとして保存される

#### 3. JSON を配置

```bash
# ダウンロードしたファイルをトークンディレクトリに配置
cp ~/Downloads/primitives.json   packages/tokens/tokens/primitives.json
cp ~/Downloads/semantic.json     packages/tokens/tokens/semantic.json
cp ~/Downloads/semantic-dark.json packages/tokens/tokens/semantic-dark.json
```

#### 4. diff-check で差分確認

```bash
# 差分表示（color の変更は deltaE で評価）
pnpm --filter @morphink/tokens diff-check

# 閾値を変更する場合（デフォルト 1.0）
pnpm --filter @morphink/tokens diff-check -- --threshold 0.5

# 特定ディレクトリと比較する場合
pnpm --filter @morphink/tokens diff-check -- /path/to/new-tokens/
```

出力例：

```
▶ Morphink Token Diff Check
  threshold: deltaE < 1.0
  mode: git HEAD vs working tree

  ◆ semantic.json
    ✱ 変更 (1)
      ~ color.primary.500
          旧: oklch(62.8% 0.258 29.2)
          新: oklch(63.5% 0.261 28.8)
          OK (ΔE=0.412)

  ◀ サマリー
    追加:  0
    削除:  0
    変更:  1

  ! 差分あり（すべて閾値内）— exit 0
```

#### 5. ビルドと確認

```bash
# トークン CSS/TS を再生成
pnpm --filter @morphink/tokens build

# または diff-check + build をまとめて実行
pnpm --filter @morphink/tokens validate

# Storybook で目視確認
pnpm run dev:docs
```

#### 7. PR 作成

変更が確認できたら通常の git フローで PR を作成する。

```bash
git add packages/tokens/tokens/
git commit -m "tokens: update semantic color tokens"
gh pr create
```

---

## Figma Variables のコレクション構造ガイドライン

プラグインとビルドパイプラインが正しく機能するために、Figma Variables のコレクション構造を以下の規約に従って維持すること。

### コレクション

| コレクション名           | 役割                                         | 出力ファイル         |
| ------------------------ | -------------------------------------------- | -------------------- |
| `Primitives`             | 色の原値（パレット）、スペーシング、半径など | `primitives.json`    |
| `Semantic`               | ライトモードのセマンティックトークン         | `semantic.json`      |
| `Semantic` (Dark モード) | ダークモードのセマンティックトークン         | `semantic-dark.json` |

### 命名規則

- グループ区切りは `/`（Figma の Variable グループ機能を使う）
- ケバブケース（`primary-500`, `font-size-md`）
- セマンティックトークンから Primitives への参照は `{グループ名/トークン名}` 形式（コレクション名を含めない）

例：

```
Primitives コレクション:
  color/
    primary/
      500  →  #e84c1b

Semantic コレクション（Light モード）:
  color/
    primary  →  {color/primary/500}   ← Primitives を参照
```

### モード

- `Semantic` コレクションは必ず **Light** と **Dark** の 2 モードを持つこと
- エクスポート時にモードを選択して個別にエクスポートする

---

## motion.json の手動更新手順

`packages/tokens/tokens/motion.json` は Figma Variables で管理せず、**手動で編集**する。
Motion トークンはアニメーション仕様（duration / easing / stagger）であり、Figma Variables との連携には向かないため。

### 編集手順

1. `packages/tokens/tokens/motion.json` をエディタで開く
2. DTCG 形式に従って値を編集する

```json
{
  "motion": {
    "duration": {
      "fast": {
        "$value": "100ms",
        "$type": "duration"
      }
    },
    "easing": {
      "standard": {
        "$value": "cubic-bezier(0.2, 0, 0, 1)",
        "$type": "cubicBezier"
      }
    }
  }
}
```

3. ビルドして CSS に反映する

```bash
pnpm --filter @morphink/tokens build
```

4. `packages/ui/src/styles/base.css` の Motion Shorthand 変数も必要に応じて更新する（こちらも手書き管理）

> motion.json は diff-check の対象外（`primitives.json`, `semantic.json`, `semantic-dark.json` のみ対象）。

---

## デフォルトのファイルマッピング

| Figma Collection | Mode         | 出力ファイル         |
| ---------------- | ------------ | -------------------- |
| Primitives       | （全モード） | `primitives.json`    |
| Semantic         | Light        | `semantic.json`      |
| Semantic         | Dark         | `semantic-dark.json` |

---

## 出力フォーマット（DTCG）

```json
{
  "color": {
    "primary-500": {
      "$value": "#e84c1b",
      "$type": "color"
    }
  },
  "space": {
    "md": {
      "$value": "12px",
      "$type": "dimension"
    }
  }
}
```

- 色は hex 形式で出力（`build.mjs` の `value/to-oklch` トランスフォームが OKLCH に変換）
- 変数参照は `{group.token-name}` 形式
- セマンティックトークンが Primitives を参照する場合、コレクション名を含めない（例: `{color.primary-500}`）

---

## トラブルシューティング

### プラグインが Figma に表示されない

**原因:** ビルドが完了していない、または manifest.json の選択を間違えている。

**対処:**

1. `pnpm --filter figma-plugin build` を実行して `dist/` が生成されていることを確認
2. Figma でインポートする際に `manifest.json`（`dist/` 内ではなく `packages/figma-plugin/manifest.json`）を選択しているか確認

---

### エクスポートした JSON が diff-check でパースエラーになる

**原因:** JSON が不正な形式で出力されている（まれに Figma の変数名に特殊文字が含まれる場合など）。

**対処:**

1. エクスポートした JSON を `jq .` コマンドで検証する
2. Figma Variables に特殊文字（`"`, `\` など）が含まれていないか確認する
3. プラグインを再ビルドして再度エクスポートを試みる

---

### diff-check で deltaE が閾値超過になる

**原因:** 意図せず色値が変化している（Figma での編集ミスやプラグインのバグなど）。

**対処:**

1. diff-check の出力で変更されたトークンのキーを確認する
2. Figma でそのトークンの値を確認し、意図した変更かどうかを判断する
3. 意図しない変更であれば Figma 側で修正して再エクスポートする
4. 意図した変更で閾値を緩めたい場合は `--threshold` オプションで調整する（CI の設定も合わせて変更すること）

---

### build.mjs がエラーで失敗する

**原因:** JSON の参照関係が壊れている（Primitives のトークンを Semantic が参照しているが、Primitives 側が削除された場合など）。

**対処:**

1. エラーメッセージ内のトークンパスを確認する
2. `primitives.json` に参照先のトークンが存在するか確認する
3. Figma で参照が正しく設定されているかを確認し、再エクスポートする

---

### Storybook でトークンが反映されない

**原因:** `build.mjs` は実行されたが、Storybook のキャッシュが古い。

**対処:**

```bash
# Storybook のキャッシュをクリアして再起動
pnpm --filter @morphink/docs dev --no-cache
```

---

## ビルド（開発者向け）

プラグイン自体のソースを変更した場合：

```bash
pnpm --filter figma-plugin build
```

`dist/code.js` と `dist/ui.html` が生成される。Figma への再インポートは不要（ファイルを更新するだけで自動的に反映）。
