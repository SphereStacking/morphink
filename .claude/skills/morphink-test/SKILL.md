---
name: morphink-test
description: >
  morphink/ui コンポーネントの Vitest テスト生成ガイド。
  新規・既存コンポーネントのテスト作成、テストファイルの追加、テスト方針の確認時に使用。
  「テスト追加」「テスト書いて」「Button のテスト」「CheckboxGroup のテスト」
  「コンポーネントテスト」「Vitest」等でトリガー。
---

# morphink-test

morphink/ui の Vue 3 コンポーネントに対する Vitest テストの生成ガイド。

## テスト方針

| テストする | テストしない |
|---|---|
| API 契約（要素種類・デフォルト・slot） | CSS クラス断片（CVA 出力） |
| 振る舞い・状態管理（toggle, controlled/uncontrolled） | variant × tone のマトリクス |
| アクセシビリティ（role, aria-*, disabled） | CSS 変数バインド |
| 合成パターン（provide/inject 伝播） | shadow / rounded の全組み合わせ |
| attrs パススルー | compound variants |

見た目の検証は Storybook の責務。テストでは「コンポーネントが正しく機能するか」に集中する。

## 環境

- テストランナー: Vitest（`packages/ui/vitest.config.ts`）
- マウント: `@vue/test-utils`（`mount`）
- DOM: happy-dom
- パスエイリアス: `@` → `packages/ui/src`
- テストファイル配置: `packages/ui/src/__tests__/components/<ComponentName>.test.ts`
- 実行: `pnpm --filter @morphink/ui test`

## テストテンプレート

```ts
import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'

import ComponentName from '@/components/atoms/ComponentName.vue'

describe('ComponentName', () => {
  // 構造
  it('期待する要素がレンダリングされる', () => {
    const wrapper = mount(ComponentName)
    expect(wrapper.find('<selector>').exists()).toBe(true)
  })

  // slot
  it('default slot が表示される', () => {
    const wrapper = mount(ComponentName, { slots: { default: 'Label' } })
    expect(wrapper.text()).toBe('Label')
  })

  // props
  it('disabled 属性が反映される', () => {
    const wrapper = mount(ComponentName, { props: { disabled: true } })
    expect(wrapper.find('<selector>').attributes('disabled')).toBeDefined()
  })

  // attrs パススルー
  it('aria-label が伝播する', () => {
    const wrapper = mount(ComponentName, { attrs: { 'aria-label': 'test' } })
    expect(wrapper.find('<selector>').attributes('aria-label')).toBe('test')
  })

  // イベント
  it('click で emit される', async () => {
    const wrapper = mount(ComponentName)
    await wrapper.find('<selector>').trigger('click')
    expect(wrapper.emitted('click')).toBeTruthy()
  })
})
```

## パターン別ガイド

### 1. 単純なコンポーネント（Button, Badge 等）

Public 層を直接 mount してテスト。

チェック項目:
- 正しい HTML 要素がレンダリングされる
- default slot の表示
- disabled の反映
- attrs パススルー（aria-label, data-testid）
- カスタム class のマージ（CVA base class と共存確認、1 件のみ）
- click 等のイベント emit

### 2. Reka UI ラッパー（Checkbox, Switch, Radio 等）

`data-state` 属性で状態を検証。Reka UI は `name`/`value` を button 要素に出力しないため DOM attribute での検証は不可。

```ts
it('modelValue=true で checked', () => {
  const wrapper = mount(Checkbox, { props: { modelValue: true } })
  expect(wrapper.find('button').attributes('data-state')).toBe('checked')
})

it('role="checkbox" を持つ', () => {
  const wrapper = mount(Checkbox)
  expect(wrapper.find('button').attributes('role')).toBe('checkbox')
})
```

### 3. provide/inject グループ（CheckboxGroup, RadioGroup 等）

string slot では inject が動かないため、ラッパーコンポーネントを定義する。

```ts
import { defineComponent } from 'vue'
import CheckboxGroup from '@/components/atoms/CheckboxGroup.vue'
import Checkbox from '@/components/atoms/Checkbox.vue'

function createGroupWrapper(
  groupProps: Record<string, unknown> = {},
  items: string[] = ['a', 'b', 'c']
) {
  return defineComponent({
    components: { CheckboxGroup, Checkbox },
    setup() {
      return { groupProps, items }
    },
    template: `
      <CheckboxGroup v-bind="groupProps">
        <Checkbox v-for="item in items" :key="item" :value="item" />
      </CheckboxGroup>
    `,
  })
}
```

チェック項目:
- `role="group"` のレンダリング
- 子コンポーネントの数
- orientation の切り替え（flex-col / flex-row）
- modelValue による checked 状態反映
- defaultValue（uncontrolled モード）
- コンテキスト伝播の最小確認（size 1 種のみ）

### 4. toggle / 状態変更ロジック

Reka UI の `useEmitAsProps` は `emitProxy` オブジェクトを生成し、直接 click テストだと互換性問題がある。
`inject` で context を取得する Probe コンポーネントを使い、toggle 関数を直接呼ぶ。

```ts
import { defineComponent, inject, nextTick } from 'vue'
import { checkboxGroupKey, type CheckboxGroupContext } from '@/base/ui/checkbox/checkboxContext'
import CheckboxGroupBase from '@/base/ui/checkbox/CheckboxGroupBase.vue'

const ToggleProbe = defineComponent({
  setup() {
    const group = inject(checkboxGroupKey) as CheckboxGroupContext
    return { group }
  },
  template: '<div />',
})

it('toggle で値を追加する', async () => {
  const wrapper = mount(
    defineComponent({
      components: { CheckboxGroupBase, ToggleProbe },
      template: '<CheckboxGroupBase :model-value="[]"><ToggleProbe /></CheckboxGroupBase>',
    })
  )
  wrapper.findComponent(ToggleProbe).vm.group.toggle('a')
  await nextTick()
  const emitted = wrapper.findComponent(CheckboxGroupBase).emitted('update:modelValue')
  expect(emitted![0][0]).toEqual(['a'])
})
```

**注意**: controlled モード（`modelValue` 指定）では内部値が更新されないため、複数回 toggle のテストは uncontrolled モード（`modelValue` 未指定）で行う。

## 新コンポーネントのテストチェックリスト

1. `packages/ui/src/__tests__/components/<Name>.test.ts` を作成
2. 以下を検証（該当するもの）:
   - [ ] 正しい HTML 要素がレンダリングされる
   - [ ] default slot が表示される
   - [ ] disabled の反映（native attribute）
   - [ ] aria 属性（role, aria-checked, aria-expanded 等）
   - [ ] attrs パススルー（aria-label, data-testid）
   - [ ] カスタム class のマージ（1 件のみ）
   - [ ] イベント emit（click, update:modelValue 等）
   - [ ] data-state による状態反映（Reka UI ラッパーの場合）
   - [ ] provide/inject 伝播（グループコンポーネントの場合）
   - [ ] controlled / uncontrolled モード（該当する場合）
3. `pnpm --filter @morphink/ui test` で全テスト pass を確認
