[English](./publishing-your-design-system.md) | [日本語](./publishing-your-design-system.ja.md)

# Publishing Your Design System

Publish your forked morphink design system as npm packages so your team or community can install them.

## Prerequisites

- A morphink fork with your custom tokens and components (see [Getting Started: Template](./getting-started-template.md))
- An npm account or private registry access
- Packages renamed to your organization scope (e.g., `@myorg/tokens`, `@myorg/ui`)

## Steps

### 1. Configure package.json for each package

**packages/tokens/package.json:**

```json
{
  "name": "@myorg/tokens",
  "version": "1.0.0",
  "files": ["dist"],
  "exports": {
    "./tokens.css": "./dist/css/tokens.css",
    "./tokens-dark.css": "./dist/css/tokens-dark.css",
    "./utilities.css": "./dist/css/utilities.css",
    "./tailwind-theme.css": "./dist/css/tailwind-theme.css",
    ".": "./dist/ts/index.ts"
  }
}
```

**packages/ui/package.json:**

```json
{
  "name": "@myorg/ui",
  "version": "1.0.0",
  "files": ["dist", "src"],
  "main": "./src/index.ts",
  "exports": {
    ".": "./src/index.ts",
    "./styles/morphink.css": "./dist/morphink.css"
  }
}
```

### 2. What gets published

| Package | Published contents | Purpose |
|---|---|---|
| `@myorg/tokens` | `dist/` | CSS variables, JSON tokens, TypeScript exports |
| `@myorg/ui` | `dist/` + `src/` | Compiled CSS and Vue SFC source for tree-shaking |

### 3. Build before publishing

```bash
pnpm run build
```

This runs the full pipeline: tokens → CSS variables → Tailwind compilation. Verify the `dist/` directories are populated.

### 4. Publish

**Public packages:**

```bash
cd packages/tokens && npm publish --access public
cd packages/ui && npm publish --access public
```

**Or with pnpm:**

```bash
pnpm --filter @myorg/tokens publish --access public
pnpm --filter @myorg/ui publish --access public
```

**Private registry:** Configure `.npmrc` with your registry URL before publishing.

### 5. Consumer installation

```bash
npm install @myorg/tokens @myorg/ui
```

### 6. Consumer CSS setup

```css
@import "@myorg/ui/styles/morphink.css";
```

This single import bundles design tokens, dark-mode overrides, base resets, component styles, and scoped utilities. See [Choosing Utilities](./choosing-utilities.md) for additional layout styling options (`utilities.css` or `tailwind-theme.css`).

### 7. Consumer component usage

```vue
<script setup>
import { Button } from '@myorg/ui'
</script>

<template>
  <Button tone="primary" variant="solid">Get started</Button>
</template>
```

## Tips

- Bump versions in both packages together to keep them in sync.
- The `packages/docs` (Storybook) package is for development only and typically should not be published.
- Consumers who use Tailwind CSS should also read [Choosing Utilities](./choosing-utilities.md) to pick the right integration path.
