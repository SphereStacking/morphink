[English](./CONCEPT.md) | [日本語](./CONCEPT.ja.md)

# morphink — Design System Boilerplate for Vue 3

## What is morphink?

morphink is not a UI component library. It is a **boilerplate for building your own design system**.

When a team decides to build a design system with Vue 3, they inevitably face a series of structural decisions: how to design the token pipeline, how to structure the monorepo, how to architect components, how to set up Storybook, and how to connect design tools. morphink provides a **proven, working answer** to all of these at once.

Fork this repository, replace the tokens with your brand, and you have a design system that's ready to evolve with your product.

## Why morphink exists

Tools like shadcn/ui offer excellent component primitives that you can copy into your project. But building a design system requires more than components — it requires infrastructure:

- A token pipeline connecting design tools to code
- A layered component architecture that isolates internal implementation
- Theme switching (including dark mode) driven by tokens
- A monorepo structure with proper build orchestration
- Documentation with Storybook

You *can* assemble all of this yourself with shadcn + Tailwind + manual setup. morphink saves you that effort by providing a **validated starting point** — the result of real trial and error, not theory.

## Architecture: Vertical Layers, Not Atomic Design

morphink's component architecture consists of three vertical layers:

```
Public (components/)  →  Base (base/ui/*/)  →  Reka UI
  Product API             Style variants        Headless a11y
```

This is fundamentally different from Atomic Design. Atomic Design classifies components **horizontally** by composition granularity (Atom → Molecule → Organism). morphink's three layers classify **vertically** by abstraction depth within a single component.

| | Atomic Design | morphink 3-Layer |
|---|---|---|
| Axis | Horizontal (composition) | Vertical (abstraction) |
| Question answered | "How do components combine?" | "How is a component built internally?" |
| Scope | Inter-component relationships | Intra-component responsibility |

These two concepts do not conflict. You can use morphink's components and organize them following Atomic Design principles in your product. morphink handles how Atoms and Molecules are **built**; how you **compose** them is your decision.

### Why Three Layers?

The primary benefit is **dependency isolation**.

If Reka UI is discontinued, or a better headless library emerges — only the Base layer changes. The Public API (`<Button tone="primary">`) remains stable. If Tailwind ships breaking changes — only the Base layer absorbs them. Consumers of your design system don't need to know or care.

This same principle applies to your token pipeline. Token values flow through alias → semantic → CSS variables → components. When your design team updates a color, the change propagates automatically without touching component code.

### Why Reka UI?

morphink uses [Reka UI](https://reka-ui.com/) (formerly Radix Vue) as the headless a11y layer. The choice came down to Vue 3 ecosystem fit: Reka UI provides the widest range of WAI-ARIA compliant primitives (Dialog, Select, Dropdown, Tabs, Popover, Tooltip, etc.) with first-class Vue 3 support and `useForwardPropsEmits` for clean controlled/uncontrolled state management. Alternatives like Headless UI have a smaller primitive set, and Ark UI, while promising, had less community adoption at the time of selection. Since the Base layer isolates this dependency, the choice is not permanent — swapping to another headless library affects only Base, not your product code.

### The Public Layer: A Deliberate Extension Point

Currently, the Public layer is a thin wrapper over Base. This is intentional.

The Public layer is designed to become the place where **product-level design decisions are baked in** — for example, an Input component that bundles a label, error message, and helper text in a standardized layout. But those decisions should emerge from real product usage, not from speculation.

Until then, the layer stays thin, and the architecture stays ready.

## Token Pipeline

morphink's token system follows a two-tier structure, where raw values are assigned design intent before reaching components:

```
alias.json                  semantic.json               CSS Variable                  Component
──────────────────────────  ──────────────────────────  ────────────────────────────  ──────────────────────────
color.primary-500:          color.primary.base:         --morphink-color-primary:     bg-(--morphink-color-primary)
  oklch(65.96% 0.21 18)      refs {color.primary-500}    resolved to oklch(...)
```

**Alias tokens** define the raw palette — color scales, spacing values, radii. These are implementation details that designers and developers rarely reference directly.

**Semantic tokens** assign meaning — "primary", "destructive", "muted". These are the vocabulary your design system speaks. Components only reference semantic tokens, never alias values.

This separation means you can completely change your visual identity by swapping alias.json, without touching a single component file.

## What morphink Is Not

- **Not an npm package you install.** You fork the repository and own the code.
- **Not a replacement for shadcn/ui.** morphink is influenced by shadcn's component patterns (headless primitives + CVA styling), but solves a different problem — the infrastructure layer that shadcn doesn't provide: token pipelines, theme management, monorepo orchestration, and layered architecture.
- **Not opinionated about page composition.** It provides well-built components; how you assemble them into pages is up to you.

## Who is morphink for?

- **Teams** starting a new design system for their product and wanting a proven architecture instead of building from scratch
- **Individual developers** who want to learn design system construction through a working, documented codebase
- **Anyone** who has used shadcn/ui and thought "this is great, but I need token management, theming, and proper package structure on top of it"

## Getting Started

```bash
# 1. Use this template on GitHub
# 2. Clone your new repository
# 3. Install and start
pnpm install
pnpm run build
pnpm run dev:docs
```

Then make it yours:

1. Replace token values in `packages/tokens/tokens/` with your brand colors and scales
2. Rebuild: `pnpm run build`
3. Your design system is ready

## License

[MIT](./LICENSE)
