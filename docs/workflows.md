[English](./workflows.md) | [日本語](./workflows.ja.md)

# Workflows

## Token Updates

### Figma → Token JSON

The Figma plugin "DTCG Token Manager" supports both **Export** (Figma Variables → DTCG JSON) and **Import** (DTCG JSON → Figma Variables). Use the Export/Import tabs in the plugin UI.

1. Edit variables in Figma
2. Run the DTCG Token Manager plugin → Export tab → export DTCG JSON
3. Save exported JSON to `packages/tokens/tokens/`
4. (Optional) Run `pnpm --filter @morphink/tokens diff-check` to validate changes

To sync code-side token changes back to Figma, use the Import tab to load updated DTCG JSON into Figma Variables.

### Build

Build all packages at once (tokens → ui → docs):

```bash
pnpm run build
```

<details>
<summary>Individual package commands (reference)</summary>

```bash
pnpm --filter @morphink/tokens build   # Token generation → dist/css, json, ts
pnpm --filter @morphink/ui build       # UI build → dist/morphink.css, index.mjs, types
pnpm --filter @morphink/ui build:css   # Tailwind compile only → dist/ui.css
```

</details>

### Token Customization Flow

| File | Purpose | What to edit |
|------|---------|-------------|
| `primitives.json` | Raw palette, spacing, radii | Color scales, base values |
| `semantic.json` | Semantic mappings (light theme) | Which primitive token maps to `primary`, `destructive`, etc. |
| `semantic-dark.json` | Dark theme overrides | Dark mode color mappings |

After editing tokens:

1. Run `pnpm run build` to rebuild all packages
2. Start Storybook to verify your changes visually:

```bash
pnpm run dev:docs    # upstream builds + Storybook on localhost:6006
```

## UI Development

### Adding a New Component

See [Architecture](architecture.md) for the three-layer structure (Public / Base / Props) and design rationale.

1. **Create Base component** in `packages/ui/src/base/ui/{component-name}/`
2. **Create Public wrapper** in `packages/ui/src/components/{atoms|molecules|organisms}/`
3. **Add export** to `packages/ui/src/index.ts`
4. **Add Storybook story** in `packages/docs/src/stories/components/`

### Reka UI Integration Checklist

When wrapping a Reka UI primitive:

- [ ] Does the Reka UI component have state management props (`open`, `modelValue`)? → Use `useForwardPropsEmits`
- [ ] Does it need context propagation to sub-components? → Use `provide`/`inject`
- [ ] Apply the wrapper pattern in both Base and Public layers

### Example: Creating a Simple Atom

```vue
<!-- packages/ui/src/base/ui/my-component/MyComponentBase.vue -->
<script setup lang="ts">
import { computed } from 'vue'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '../../lib/utils'

const myComponentVariants = cva('base-classes', {
  variants: {
    variant: {
      solid: '...',
      outline: '...',
    },
    size: {
      sm: '...',
      md: '...',
    },
  },
  defaultVariants: {
    variant: 'solid',
    size: 'md',
  },
})

type MyComponentVariants = VariantProps<typeof myComponentVariants>

const props = withDefaults(defineProps<{
  variant?: NonNullable<MyComponentVariants['variant']>
  size?: NonNullable<MyComponentVariants['size']>
  class?: string
}>(), {
  variant: 'solid',
  size: 'md',
})

const classes = computed(() =>
  cn(myComponentVariants({ variant: props.variant, size: props.size }), props.class),
)
</script>

<template>
  <div :class="classes">
    <slot />
  </div>
</template>
```

```vue
<!-- packages/ui/src/components/atoms/MyComponent.vue -->
<script setup lang="ts">
import MyComponentBase from '../../base/ui/my-component/MyComponentBase.vue'

defineProps<{
  variant?: 'solid' | 'outline'
  size?: 'sm' | 'md'
  class?: string
}>()
</script>

<template>
  <MyComponentBase v-bind="$props">
    <slot />
  </MyComponentBase>
</template>
```

## Consumer Setup

### CSS Import

```ts
import '@morphink/ui/styles/morphink.css'
```

## Storybook

```bash
pnpm run dev:docs    # upstream builds + Storybook on localhost:6006
```

Stories are located in `packages/docs/src/stories/`.

## Lint & Format

```bash
pnpm run lint       # oxlint
pnpm run format     # oxfmt --write
```

## Build Outputs

| Output | Purpose |
|--------|---------|
| `packages/tokens/dist/css/tokens.css` | Light mode CSS variables |
| `packages/tokens/dist/css/tokens-dark.css` | Dark mode overrides |
| `packages/tokens/dist/css/utilities.css` | `mi:` prefixed utility classes |
| `packages/tokens/dist/css/tailwind-theme.css` | Tailwind v4 theme preset |
| `packages/tokens/dist/json/tokens.json` | Token values as JSON |
| `packages/tokens/dist/ts/tokens.ts` | Token values as TypeScript |
| `packages/ui/dist/morphink.css` | Compiled CSS bundle |

> Files in `dist/` are generated — do not edit them directly.
