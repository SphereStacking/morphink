[English](./README.md) | [日本語](./README.ja.md)

# morphink

<p align="center">
  <img src="docs/brand-showcase.png" alt="morphink brand showcase" width="600" />
</p>

**Build your own Vue 3 design system — without building the infrastructure from scratch.**

morphink is a boilerplate that gives you a working token pipeline, layered component architecture, and Storybook — ready to fork and make yours.

> [!NOTE]
> morphink is not a UI library you install. You fork this repository, replace the tokens with your brand, and own the result. See [What morphink is not](#what-morphink-is-not) for details.

## The Problem

When a team decides to build a design system with Vue 3, the components are the easy part. The hard part is everything around them:

- Connecting design tools (Figma Variables) to code via Style Dictionary
- Structuring a monorepo with proper build orchestration
- Isolating headless primitives from your public API
- Setting up theme switching and dark mode driven by tokens
- Documenting everything in Storybook

You *can* wire all of this up from scratch. morphink saves you that effort — it's the result of real trial and error, not theory.

## Quick Start

```bash
# 1. Click "Use this template" on GitHub
# 2. Clone your new repository
pnpm install
pnpm run build
pnpm run dev:docs
```

Storybook opens at `http://localhost:6006/`

## What You Get

### Token Pipeline

Primitive → Semantic → CSS custom properties → Components. Swap `primitives.json` and your entire visual identity changes without touching a single component file. See [CONCEPT.md](./CONCEPT.md) for the full rationale.

### Three-Layer Component Architecture

Public API → Base (CVA styling) → Reka UI (headless a11y). Each component is split **vertically by abstraction depth** — so dependency changes only affect the Base layer, not your `<Button tone="primary">`. See [CONCEPT.md](./CONCEPT.md) for details.

### Included Components

| Atoms | Molecules | Organisms |
|-------|-----------|-----------|
| Button, Input, Textarea, Checkbox, CheckboxGroup, Radio, RadioGroup, Switch, Slider, Collapsible, Badge, Avatar, Alert, Progress, Divider, Panel, Heading, Text | Card (compound), Dialog, AlertDialog, Dropdown (compound), Accordion (compound), Select, Tabs, Popover, Tooltip, Pagination, Sheet, Toast/Toaster, Table, Toolbar, FormField, SearchInput, Breadcrumb, Nav, SectionHeader, Stat, EmptyState | AppShell, AppHeader, AppSidebar, DataTable, LoginForm, SettingsSection |

Layout primitives: Box, Grid, Stack

All built on [Reka UI](https://reka-ui.com/) headless primitives with full WAI-ARIA compliance.

### Motion System

Token-driven animation with `prefers-reduced-motion` support baked in. Interaction, state, enter/leave, emphasis, and layout motion categories — each combining duration and easing tokens into CSS custom properties.

### Tailwind as an Internal Detail

morphink uses Tailwind internally but does not force it on consumers. All consumers import a single `morphink.css` bundle for components. For layout styling, choose from `mi:*` utility classes, Tailwind theme integration, or plain CSS custom properties. See [Choosing Your CSS Approach](./docs/guides/choosing-utilities.md) for details.

## Customization

1. Replace token values in `packages/tokens/tokens/` with your brand
2. Run `pnpm run build`
3. Your design system is ready

## How to Adopt

1. **Fork from template** (recommended) — Click "Use this template" to create an independent repository. Optionally publish as an npm package for your organization.
2. **Embed in a monorepo** — Add `packages/tokens` and `packages/ui` to an existing pnpm workspace.
3. **Embed flat** — Place the design system under `src/` in an existing project.

## Package Structure

| Package | Role |
|---------|------|
| `packages/tokens` | Design tokens source (DTCG JSON) + Style Dictionary build |
| `packages/figma-plugin` | DTCG Token Manager — Figma Variables ↔ DTCG JSON (import & export) |
| `packages/ui` | Vue 3 components — Reka UI headless + CVA styling + shared prop types |
| `packages/docs` | Storybook — component catalog, token visualization, design guidelines |

## What morphink Is Not

- **Not an npm package you install.** You fork the repo and own the code.
- **Not a replacement for shadcn/ui.** morphink is influenced by shadcn's patterns (headless + CVA), but solves a different problem — the infrastructure that shadcn doesn't provide: token pipelines, theme management, monorepo orchestration, layered architecture.
- **Not opinionated about page composition.** It provides well-built components; how you assemble them is up to you.
- **Not tracking upstream updates.** Once you fork, the codebase is yours to evolve independently.

## Documentation

### Design & Architecture

- [CONCEPT.md](./CONCEPT.md) — Design philosophy and architecture decisions
- [docs/architecture.md](./docs/architecture.md) — Technical architecture and data flow
- [docs/workflows.md](./docs/workflows.md) — Development workflows

### Getting Started Guides

- [Fork from template](./docs/guides/getting-started-template.md) — Recommended: independent repository via "Use this template"
- [Embed in a monorepo](./docs/guides/getting-started-monorepo.md) — Add to an existing pnpm workspace
- [Embed flat](./docs/guides/getting-started-flat.md) — Place under `src/` without monorepo setup

### Styling & Customization

- [Choosing your CSS approach](./docs/guides/choosing-utilities.md) — `mi:*` utilities vs Tailwind theme vs plain CSS custom properties
- [Publishing your design system](./docs/guides/publishing-your-design-system.md) — npm packaging and distribution

### Figma Plugin

- [DTCG Token Manager](./packages/figma-plugin/README.md) — Figma Variables ↔ DTCG JSON (import & export)

## Figma

- [Figma Community Template](https://www.figma.com/community/file/1622631778767773475) — morphink design tokens and component library for Figma

## License

[MIT](./LICENSE)
