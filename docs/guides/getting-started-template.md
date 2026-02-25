[English](./getting-started-template.md) | [日本語](./getting-started-template.ja.md)

# Getting Started: Fork the Template

The fastest way to start your own design system with morphink is to use the GitHub template.

## Prerequisites

- Node.js 18+
- pnpm 9+

## Steps

### 1. Create your repository

Click **"Use this template"** on the [morphink GitHub repository](https://github.com/SphereStacking/ink-ui) to create a new repository under your account or organization.

### 2. Clone your new repo

```bash
git clone https://github.com/your-org/your-design-system.git
cd your-design-system
```

### 3. Rename packages

Replace the `@morphink` scope with your own organization scope across the project:

- `packages/tokens/package.json` — change `"name": "@morphink/tokens"` to `"name": "@myorg/tokens"`
- `packages/ui/package.json` — change `"name": "@morphink/ui"` to `"name": "@myorg/ui"`
- `packages/docs/package.json` — change `"name": "@morphink/docs"` to `"name": "@myorg/docs"`
- Update any cross-references (e.g., `@morphink/tokens` in `packages/ui/package.json` dependencies)

### 4. Replace token values

Edit the token files in `packages/tokens/tokens/` with your brand colors and scales:

- `alias.json` — primitive color palette and base scales
- `semantic.json` — semantic mappings (light theme)
- `semantic-dark.json` — dark theme overrides

### 5. Install and build

```bash
pnpm install
pnpm run build
```

This runs the full pipeline: tokens → CSS variables → Tailwind compilation.

### 6. Start Storybook

```bash
pnpm run dev:docs
```

Open [http://localhost:6006/](http://localhost:6006/) to see your components with your new tokens applied.

### 7. Directory structure

```
my-design-system/
  packages/
    tokens/     # Design tokens (alias.json, semantic.json, semantic-dark.json)
    ui/         # Vue 3 components
    docs/       # Storybook
  pnpm-workspace.yaml
```

## Next steps

- Customize existing components or add new ones following the 3-layer architecture (Public → Base → Reka UI)
- Publish your design system as npm packages — see [Publishing Your Design System](./publishing-your-design-system.md)
- Choose between utilities.css and tailwind-theme.css for consumers — see [Choosing Utilities](./choosing-utilities.md)
