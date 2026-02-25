[English](./getting-started-flat.md) | [日本語](./getting-started-flat.ja.md)

# Getting Started: Embed Without a Monorepo

Add morphink directly into an existing project as a local directory -- no workspace setup required.

## Prerequisites

- An existing Vue 3 project
- Node.js 18+

## Target directory structure

```
my-project/
  src/
    app/                        # Your existing app
    design-system/
      tokens/
        tokens/                 # alias.json, semantic.json, semantic-dark.json
        build.mjs
        style-dictionary.config.mjs
        dist/                   # Build output
      ui/
        base/                   # Base layer
        components/             # Public layer
        styles/
        index.ts
  package.json
```

## Steps

### 1. Copy source files

Copy the contents of `packages/tokens` and `packages/ui/src` into your project:

```bash
cp -r morphink/packages/tokens src/design-system/tokens
cp -r morphink/packages/ui/src/* src/design-system/ui/
```

Remove the individual `package.json` files from the copied directories -- all dependencies will live in your root `package.json`.

### 2. Install dependencies

Add the required packages to your root `package.json`:

**devDependencies:**

```bash
npm install -D style-dictionary @tokens-studio/sd-transforms @tailwindcss/cli tailwindcss
```

**dependencies:**

```bash
npm install reka-ui class-variance-authority clsx tailwind-merge
```

### 3. Update import paths

Since there are no workspace packages, change inter-package imports to relative paths. For example, in UI source files:

```diff
- @import "@morphink/tokens/tokens.css";
+ @import "../../tokens/dist/css/tokens.css";
```

Update all `@morphink/tokens` references in the UI styles and config files to point to the local `tokens/dist/` directory.

### 4. Add build scripts

Add these scripts to your root `package.json`:

```json
{
  "scripts": {
    "build:tokens": "node src/design-system/tokens/build.mjs",
    "build:css": "npx @tailwindcss/cli -i src/design-system/ui/styles/tailwind.css -o src/design-system/ui/dist/ui.css",
    "build:ds": "npm run build:tokens && npm run build:css"
  }
}
```

### 5. Build

```bash
npm run build:ds
```

### 6. Import in your app

In your application's CSS entry point:

```css
@import "./design-system/tokens/dist/css/tokens.css";
@import "./design-system/tokens/dist/css/tokens-dark.css";
@import "./design-system/ui/dist/ui.css";
```

### 7. Use components

```vue
<script setup>
import { Button } from '@/design-system/ui'
</script>

<template>
  <Button tone="primary" variant="solid">Click me</Button>
</template>
```

## Key differences from the monorepo approach

| Aspect | Monorepo | Flat |
|---|---|---|
| Import paths | `@myorg/tokens/...` | Relative paths (`../../tokens/dist/...`) |
| Build scripts | Per-package `package.json` | Root `package.json` |
| Dependencies | Split across packages | All in root `package.json` |
| Publishing | Each package publishable | Not designed for publishing |

## Tips

- Always run `build:tokens` before `build:css` -- the token build generates CSS variables consumed by Tailwind.
- You may need to adjust the `style-dictionary.config.mjs` build destination if your directory layout differs.
- If you later want to publish your design system, consider migrating to the monorepo structure. See [Publishing Your Design System](./publishing-your-design-system.md).
