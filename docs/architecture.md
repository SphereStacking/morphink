[English](./architecture.md) | [日本語](./architecture.ja.md)

# Architecture

> For the design philosophy behind these decisions, see [CONCEPT.md](../CONCEPT.md).

## Three-Layer Component Structure

```
Public (components/)  →  Base (base/ui/*/)  →  Reka UI
  Product API             CVA variants          Headless a11y
```

| Layer | Location | Naming | Role |
|-------|----------|--------|------|
| Public | `packages/ui/src/components/` | `Button.vue` | External API — thin wrapper over Base |
| Base | `packages/ui/src/base/ui/*/` | `ButtonBase.vue` | CVA variants + Reka UI integration |
| Props | `packages/ui/src/base/lib/props/` | `variant.ts`, `size.ts` | Shared prop type definitions |

All components are exported from `packages/ui/src/index.ts`.

For the rationale behind this layering, see [CONCEPT.md](../CONCEPT.md).

## Token Pipeline

```
Figma Variables
  → DTCG Token Manager (Figma plugin — DTCG JSON export)
  → packages/tokens/tokens/*.json (primitives / semantic / semantic-dark / motion)
  → Style Dictionary (build)
  → packages/tokens/dist (css / json / ts)
  → packages/ui/dist/morphink.css (unified CSS bundle)
  → Storybook
```

Build the entire pipeline with a single command:

```bash
pnpm run build    # builds all packages (tokens → ui → docs)
```

Individual package commands are available for targeted builds:

```bash
pnpm --filter @morphink/tokens build    # token generation → dist/css,json,ts
pnpm --filter @morphink/ui build        # UI build → dist/morphink.css, index.mjs, types
pnpm --filter @morphink/ui build:css    # Tailwind compile only → dist/ui.css
```

### Two-Tier Token Structure

```
primitives.json             semantic.json               CSS Variable                  Component
──────────────────────────  ──────────────────────────  ────────────────────────────  ──────────────
color.primary-500:          color.primary.base:         --morphink-color-primary:     bg-(--morphink-color-primary)
  oklch(65.96% 0.21 18)      refs {color.primary-500}    resolved to oklch(...)
```

- **Primitive tokens** — Raw palette, spacing scales, radii. Implementation details.
- **Semantic tokens** — Design intent (`primary`, `destructive`, `muted`). The vocabulary your design system speaks.

Components only reference semantic tokens. Swap `primitives.json` to change your entire visual identity.

## Package Structure

```
packages/
  tokens/
    tokens/           # primitives.json, semantic.json, semantic-dark.json
    dist/             # build outputs (css, json, ts)
  ui/
    src/base/ui/      # Base components (*Base.vue)
    src/base/lib/     # utilities (cn, cva variants, layout-utils, props)
    src/components/   # Public wrappers (atoms, molecules, organisms)
    src/styles/       # tokens.css, base.css (motion, keyframes)
    dist/morphink.css # unified CSS bundle (tokens + base + components)
  docs/
    src/stories/      # Storybook stories
```

## Props System

Components share a consistent props vocabulary defined in `packages/ui/src/base/lib/props/`.

| Prop | Values | Notes |
|------|--------|-------|
| `variant` | `solid`, `outline`, `ghost`, `soft`, `subtle`, `elevated` | Each component uses a subset |
| `size` | `xs`, `sm`, `md`, `lg`, `xl` | Each component uses a subset |
| `tone` | `primary`, `secondary`, `tertiary`, `base`, `accent`, `neutral`, `success`, `warning`, `info`, `destructive` | Alert and Toast use a subset |
| `rounded` | `none`, `sm`, `md`, `lg`, `xl`, `full` | Button/Badge/Avatar include `full` |
| `shadow` | `none`, `sm`, `md`, `lg` | Applied to Card, Panel, Dialog, Sheet, etc. |

### Component-Specific Variants

Some components define their own variant sets:

- **Card**: `elevated`, `outline`, `soft`, `interactive`
- **Tabs**: `pill`, `underline`
- **Nav**: `subtle`, `solid`
- **Toolbar**: `solid`, `subtle`
- **Accordion**: `outline`, `soft`
- **Pagination**: `outline`, `soft`
- **Toast**: `solid`, `soft`, `outline`

## Layout Components

Layout components use `SpaceToken` for consistent spacing:

```ts
type SpaceToken = '0' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl' | '6xl'
// xs→4px, sm→8px, md→12px, lg→16px, xl→24px, 2xl→32px, 3xl→40px, 4xl→48px, 5xl→64px, 6xl→80px
```

### Box

General-purpose container with padding, overflow, and sizing props.

```vue
<Box padding="lg" overflow="auto" position="relative">
  Content
</Box>
```

### Grid

CSS Grid layout with responsive `auto-fit`/`auto-fill` support.

```vue
<Grid columns="auto-fit" minWidth="240px" gap="lg" align="stretch">
  <Card>...</Card>
  <Card>...</Card>
</Grid>
```

Props: `columns` (number | `auto-fit` | `auto-fill` | string), `rows`, `minWidth`, `gap`, `rowGap`, `columnGap`, `align`, `justify`

### Stack

Flexbox layout container for linear arrangement.

```vue
<Stack direction="row" gap="md" align="center" justify="between">
  <Button>Cancel</Button>
  <Button tone="primary">Save</Button>
</Stack>
```

Props: `direction`, `gap`, `align`, `justify`, `wrap`, `grow`, `padding`, `paddingX`, `paddingY`

## Component Patterns

### Compound Components

Card, Dropdown, and Accordion use the compound component pattern with sub-components:

- **Card**: `CardHeader` / `CardBody` / `CardFooter` / `CardTitle` / `CardDescription` / `CardMedia`
- **Dropdown**: 12 sub-components (`DropdownTrigger`, `DropdownContent`, `DropdownItem`, `DropdownSeparator`, etc.) with `provide`/`inject` for size context propagation
- **Accordion**: `AccordionItem` sub-component with `provide`/`inject` for size and variant context propagation via `accordionContext.ts`

```vue
<Card variant="elevated" rounded="lg">
  <CardHeader>
    <CardTitle>Title</CardTitle>
    <CardDescription>Description</CardDescription>
  </CardHeader>
  <CardBody>Content</CardBody>
  <CardFooter>
    <Button>Action</Button>
  </CardFooter>
</Card>
```

### Reka UI Wrapper Pattern

Stateful Reka UI primitives (Dialog, Dropdown, Select, etc.) require `useForwardPropsEmits` from reka-ui to correctly handle controlled/uncontrolled mode.

**The problem:** Direct binding of optional props passes `undefined`, causing Reka UI to enter controlled mode unexpectedly. The component stops managing state internally.

**The solution:**

```vue
<script setup lang="ts">
import { DropdownMenuRoot, useForwardPropsEmits } from 'reka-ui'

const props = defineProps<{
  open?: boolean
  defaultOpen?: boolean
}>()

const emit = defineEmits<{
  (e: 'update:open', value: boolean): void
}>()

const forwarded = useForwardPropsEmits(props, emit)
</script>

<template>
  <DropdownMenuRoot v-bind="forwarded">
    <slot />
  </DropdownMenuRoot>
</template>
```

`useForwardPropsEmits` only includes defined props in the forwarded object — `undefined` values are omitted, so Reka UI stays in uncontrolled mode until the consumer explicitly provides a value.

**Requires this pattern:** Root/Sub (`open`), RadioGroup/CheckboxGroup (`modelValue`)
**Does not require:** Trigger, Content, Item, Separator (no state management props)

#### Public Layer: `open: undefined` Default

Vue 3 coerces optional Boolean props to `false` when no default is specified. This causes the Public layer to pass `open: false` to the Base layer, putting Reka UI into controlled mode and breaking uncontrolled behavior.

Public layer components with `open?: boolean` must set `open: undefined` in `withDefaults`:

```vue
withDefaults(
  defineProps<{ open?: boolean; defaultOpen?: boolean }>(),
  { open: undefined, defaultOpen: undefined }
)
```

`open` + `defaultOpen`: Collapsible, Dialog, Sheet, AlertDialog, Dropdown, DropdownSub
`open` only: Popover, Tooltip

## CSS Variable Naming

All CSS custom properties use the `--morphink-` prefix:

| Category | Pattern | Example |
|----------|---------|---------|
| Color | `--morphink-color-{name}` | `--morphink-color-primary` |
| Spacing | `--morphink-space-{scale}` | `--morphink-space-lg` |
| Radius | `--morphink-radius-{scale}` | `--morphink-radius-md` |
| Shadow | `--morphink-shadow-{scale}` | `--morphink-shadow-lg` |
| Duration | `--morphink-duration-{speed}` | `--morphink-duration-fast` |
| Easing | `--morphink-easing-{name}` | `--morphink-easing-standard` |

### Motion Shorthand Variables

Defined in `packages/ui/src/styles/base.css`, these combine duration and easing tokens:

| Variable | Duration | Easing | Use case |
|----------|----------|--------|----------|
| `--morphink-motion-interaction` | fast (100ms) | standard | hover, focus, press |
| `--morphink-motion-state` | normal (200ms) | standard | open/close, toggle |
| `--morphink-motion-enter` | slow (300ms) | emphasized-decelerate | overlay, dialog enter |
| `--morphink-motion-leave` | normal (200ms) | emphasized-accelerate | overlay, dialog exit |
| `--morphink-motion-emphasis` | normal (200ms) | spring | badge, notification |
| `--morphink-motion-layout` | slow (300ms) | standard | resize, reorder |

### Accessibility

`prefers-reduced-motion` is handled at the token level — all duration variables are set to `0ms`, so no per-component overrides are needed:

```css
@media (prefers-reduced-motion: reduce) {
  :root {
    --morphink-duration-fast: 0ms;
    --morphink-duration-normal: 0ms;
    --morphink-duration-slow: 0ms;
    --morphink-duration-slower: 0ms;
  }
}
```

## Design Principles

For the full design philosophy, see [CONCEPT.md](../CONCEPT.md).
