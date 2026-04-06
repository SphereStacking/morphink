[English](./getting-started-monorepo.md) | [日本語](./getting-started-monorepo.ja.md)

# Getting Started: Embed in an Existing Monorepo

Add morphink's tokens and UI packages into your existing pnpm, npm, or yarn workspace.

## Prerequisites

- An existing monorepo using pnpm, npm, or yarn workspaces
- Node.js 18+

## Steps

### 1. Copy packages into your workspace

Copy the `packages/tokens` and `packages/ui` directories from morphink into your workspace:

```bash
cp -r morphink/packages/tokens your-monorepo/packages/tokens
cp -r morphink/packages/ui your-monorepo/packages/ui
```

> **Note:** `packages/docs` (Storybook) is optional. Copy it if you want the component catalog for development.

### 2. Register in your workspace config

**pnpm** — add to `pnpm-workspace.yaml`:

```yaml
packages:
  - "packages/tokens"
  - "packages/ui"
  # ... your existing packages
```

**npm / yarn** — add to root `package.json`:

```json
{
  "workspaces": [
    "packages/tokens",
    "packages/ui"
  ]
}
```

### 3. Rename package names

Update `"name"` in each copied `package.json`:

- `packages/tokens/package.json` — `@morphink/tokens` → `@myorg/tokens`
- `packages/ui/package.json` — `@morphink/ui` → `@myorg/ui`
- Update cross-references: `@morphink/tokens` dependency in `packages/ui/package.json` → `@myorg/tokens`

### 4. Install dependencies

```bash
pnpm install
```

### 5. Build

```bash
pnpm run build
```

This runs the full pipeline: tokens → CSS variables → Tailwind compilation.

### 6. Import styles in your app

In your application's CSS entry point:

```css
@import '@myorg/ui/styles/morphink.css';
```

Or in JS/TS:

```ts
import '@myorg/ui/styles/morphink.css'
```

For layout styling options (mi:\* utilities, Tailwind integration, or CSS custom properties), see [Choosing Your CSS Approach](choosing-utilities.md).

### 7. Use components

```vue
<script setup>
import { Button } from '@myorg/ui'
</script>

<template>
  <Button tone="primary" variant="solid">Click me</Button>
</template>
```

## Tips

- If you copied Storybook (`packages/docs`), rename its package too and update its dependency references. Run `pnpm run dev:docs` to launch Storybook.
- See [Documentation Hub](../README.md) for all adoption patterns.
