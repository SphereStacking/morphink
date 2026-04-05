# Motion トークン

> MD3 / Carbon / WCAG 2.2 を参照基盤とする Motion Token System。

## 2 層構造

### Layer 1: Primitive Tokens（Style Dictionary 生成）

ソース: `packages/tokens/tokens/motion.json`

| カテゴリ | トークン | 値 |
|---|---|---|
| duration | instant | 0ms |
| duration | fast | 100ms |
| duration | normal | 200ms |
| duration | slow | 300ms |
| duration | slower | 500ms |
| easing | standard | cubic-bezier(0.2, 0, 0, 1) |
| easing | decelerate | cubic-bezier(0, 0, 0, 1) |
| easing | accelerate | cubic-bezier(0.3, 0, 1, 1) |
| easing | emphasized-decelerate | cubic-bezier(0.05, 0.7, 0.1, 1) |
| easing | emphasized-accelerate | cubic-bezier(0.3, 0, 0.8, 0.15) |
| easing | linear | linear |
| easing | spring | linear(...) 52 stops |
| stagger | item | 30ms |
| stagger | max-items | 8 |

### Layer 2: Animation Shorthand（base.css 手書き — keyframe animation 用）

ソース: `packages/ui/src/styles/base.css`

| 変数 | 値 | 用途 |
|---|---|---|
| `--morphink-motion-enter` | slow + emphasized-decelerate | overlay 出現 |
| `--morphink-motion-leave` | normal + emphasized-accelerate | overlay 退場 |
| `--morphink-motion-emphasis` | normal + spring | 注意喚起 |

## 使用例

```html
<!-- Transition: primitive トークン直接指定 -->
<div class="
  [transition-property:background-color,color]
  [transition-duration:var(--morphink-duration-fast)]
  [transition-timing-function:var(--morphink-easing-standard)]
">

<!-- Keyframe Animation: shorthand 変数 -->
<div class="data-[state=open]:animate-[mi-dialog-in_var(--morphink-motion-enter)_both]">

<!-- Keyframe Animation: 独自の組み合わせ -->
<div class="animate-[mi-radio-dot-in_var(--morphink-duration-fast)_var(--morphink-easing-spring)_both]">
```

## Motion Guide（場面別パターン）

| 場面 | Duration | Easing | 指定方法 |
|------|----------|--------|---------|
| hover / focus / press | fast (100ms) | standard | primitive 直接 |
| toggle / open-close | normal (200ms) | standard | primitive 直接 |
| resize / reorder | slow (300ms) | standard | primitive 直接 |
| overlay enter | slow (300ms) | emphasized-decelerate | `motion-enter` shorthand |
| overlay exit | normal (200ms) | emphasized-accelerate | `motion-leave` shorthand |
| attention / bounce | normal (200ms) | spring | `motion-emphasis` shorthand |

## prefers-reduced-motion

`@media (prefers-reduced-motion: reduce)` で duration 変数を 0ms に上書き。
shorthand は duration を参照しているため自動的に無効化される。
