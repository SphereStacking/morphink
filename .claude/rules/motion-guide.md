# Motion ルール

## 2 層構造

| 層 | 用途 | 参照方法 |
|---|---|---|
| **Primitive** | duration / easing 個別指定（transition 用） | `var(--morphink-duration-*)` / `var(--morphink-easing-*)` |
| **Animation Shorthand** | duration + easing 結合済み（keyframe animation 用） | `var(--morphink-motion-enter)` 等 |

## Transition パターン（primitive トークン直接指定）

| 場面 | Duration | Easing | 例 |
|------|----------|--------|-----|
| hover / focus / press | `duration-fast` (100ms) | `easing-standard` | Button hover, Input focus |
| toggle / open-close | `duration-normal` (200ms) | `easing-standard` | Accordion, Switch root, Chevron rotate |
| resize / reorder | `duration-slow` (300ms) | `easing-standard` | Layout shift |

## Animation Shorthand（keyframe animation 用）

| Shorthand | 値 | 用途 |
|---|---|---|
| `motion-enter` | 300ms + emphasized-decelerate | Dialog, Popover, Dropdown の出現 |
| `motion-leave` | 200ms + emphasized-accelerate | Dialog, Popover, Dropdown の退場 |
| `motion-emphasis` | 200ms + spring | Badge 出現, Input shake, Switch bounce |

## 原則

- **Enter > Leave**: 入場はゆっくり（300ms）、退場は素早く（200ms）
- **Keyframe の動き方はコンポーネント固有**: 何を動かすか（scale, opacity, translate, stroke）は自由
- **タイミング感はトークンで統一**: duration は 5 段階、easing は 7 種から選ぶ
- **decorative animation 禁止**: 状態変化・注意誘導の目的がない動きは入れない
