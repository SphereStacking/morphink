[English](./workflows.md) | [日本語](./workflows.ja.md)

# Workflows

## Token Updates

### Figma → Token JSON

1. Edit variables in Figma
2. Run the morphink token exporter plugin in Figma → export DTCG JSON
3. Save exported JSON to `packages/tokens/tokens/`
4. (Optional) Run `pnpm --filter @morphink/tokens diff-check` to validate changes

### Build

1. Edit token files in `packages/tokens/tokens/` (or use exported JSON from above)
2. Rebuild tokens:

```bash
pnpm --filter @morphink/tokens build
```

3. Rebuild UI CSS:

```bash
pnpm --filter @morphink/ui build:css
```

Or rebuild everything at once:

```bash
pnpm run build
```

### Token Customization Flow

| File | Purpose | What to edit |
|------|---------|-------------|
| `primitives.json` | Raw palette, spacing, radii | Color scales, base values |
| `semantic.json` | Semantic mappings (light theme) | Which primitive token maps to `primary`, `destructive`, etc. |
| `semantic-dark.json` | Dark theme overrides | Dark mode color mappings |

After editing tokens:

1. Run `pnpm --filter @morphink/tokens build` — generates CSS variables, JSON, and TypeScript outputs in `dist/`
2. Run `pnpm --filter @morphink/ui build:css` — recompiles Tailwind with updated token values
3. Start Storybook (`pnpm run dev:docs`) to verify your changes visually

## UI Development

### Adding a New Component

1. **Create Base component** in `packages/ui/src/base/ui/{component-name}/`
   - `{Component}Base.vue` — CVA variants + Reka UI integration
   - Use shared props from `packages/ui/src/base/lib/props/` (variant, size, tone, etc.)
   - Style with CVA (`cva()`) and compose classes with `cn()`

2. **Create Public wrapper** in `packages/ui/src/components/{atoms|molecules|organisms}/`
   - `{Component}.vue` — thin wrapper that re-exports Base with your product API
   - Use `defineProps` + `withDefaults` for the public interface

3. **Add export** to `packages/ui/src/index.ts`

4. **Add Storybook story** in `packages/docs/src/stories/components/`

### Component Classification

| Category | When to use | Examples |
|----------|-------------|---------|
| Atom | Single UI primitive, no composition | Button, Input, Badge, Switch |
| Molecule | Combines atoms or has internal structure | Card (compound), Dialog, FormField |
| Organism | Full feature block, customization expected | AppShell, DataTable, LoginForm |

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

## Storybook

```bash
pnpm run dev:docs
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
| `packages/ui/dist/ui.css` | Compiled Tailwind CSS |

> Files in `dist/` are generated — do not edit them directly.
