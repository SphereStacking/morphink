[English](./architecture.md) | [日本語](./architecture.ja.md)

# Architecture

## Layer Structure

1. **Tokens**
   - Single source of truth for design
   - Managed by Tokens Studio, output via Style Dictionary

2. **UI**
   - Wrapper components with shadcn-based primitives kept internal
   - A11y-heavy parts use Reka UI primitives internally
   - References token CSS variables for unified styling

3. **Docs (Storybook)**
   - Visualization of tokens and UI components
   - Displays guidelines and usage examples

## Data Flow

```
Tokens Studio
  -> packages/tokens/tokens/*.json
  -> Style Dictionary (build)
  -> packages/tokens/dist (css/json/ts)
  -> packages/ui/src/styles/tokens.css (import)
  -> packages/ui/dist/ui.css
  -> Storybook
```

## Package Structure

```
packages/
  tokens/
    tokens/           # alias/semantic
    dist/             # build outputs
  ui/
    src/base/         # base components
    src/components/   # public wrappers
    dist/ui.css       # generated CSS
  docs/
    src/stories/      # Storybook stories
```

## Design Principles

- **Internal implementation is not exposed**
- **Prefer semantic tokens**
- **Products can only directly consume token outputs**

## Why Avoid Direct Dependencies

- **Consumer independence**: Products use only `@morphink/ui`, unaware of internal implementation
- **Swappable implementation**: Replacing Tailwind or other internals preserves the API
- **Stable operations**: Token changes are absorbed in the UI layer, minimizing product impact
