[English](./choosing-utilities.md) | [日本語](./choosing-utilities.ja.md)

# Choosing Utilities: utilities.css vs tailwind-theme.css

When consuming a morphink-based design system, you have two options for applying token-based utility classes. Both reference the same underlying design tokens -- only the entry point differs.

## Decision flow

**Does your project use Tailwind CSS?**

- **Yes** → Use `tailwind-theme.css`
- **No** → Use `utilities.css`

---

## Option A: utilities.css (no Tailwind required)

Best for projects that do not use Tailwind CSS or want a lightweight, standalone utility layer.

### Setup

```css
@import "@myorg/tokens/tokens.css";
@import "@myorg/tokens/tokens-dark.css";
@import "@myorg/tokens/utilities.css";
```

### Usage

All classes use the `mi:` prefix:

```html
<div class="mi:bg-primary mi:p-md mi:rounded-lg mi:text-foreground">
  Content with token-based styles
</div>
```

### Responsive variants

```html
<div class="mi:p-sm mi:md:p-lg">
  Responsive padding
</div>
```

### Characteristics

- No Tailwind knowledge or build setup needed
- Self-contained CSS file with all utility classes
- `mi:` prefix avoids collisions with existing styles

---

## Option B: tailwind-theme.css (for Tailwind projects)

Best for projects already using Tailwind CSS, providing seamless integration with the Tailwind ecosystem.

### Setup

```css
@import "tailwindcss";
@import "@myorg/tokens/tokens.css";
@import "@myorg/tokens/tokens-dark.css";
@import "@myorg/tokens/tailwind-theme.css";
```

### Usage

Standard Tailwind classes -- no prefix needed:

```html
<div class="bg-primary p-md rounded-lg text-foreground">
  Content with token-based styles
</div>
```

### Characteristics

- Full Tailwind ecosystem: `hover:`, `focus:`, responsive breakpoints, etc.
- Default Tailwind colors and spacing are reset -- only token-based values are available
- Works with Tailwind plugins and tooling (IntelliSense, etc.)

---

## Dark mode

Both options support dark mode. Include `tokens-dark.css` and toggle the theme by setting `data-theme="dark"` on the `.mi-theme` element:

```html
<div class="mi-theme" data-theme="dark">
  <!-- Dark theme applied -->
</div>
```

---

## Summary

| | utilities.css | tailwind-theme.css |
|---|---|---|
| Requires Tailwind | No | Yes |
| Class prefix | `mi:` | None |
| Hover/focus variants | No (component responsibility) | Yes (standard Tailwind) |
| Custom properties | Via `--morphink-*` | Via `--morphink-*` + `--color-*` etc. |
| Best for | Non-Tailwind projects | Tailwind projects |

Both options produce the same visual result -- choose based on your project's existing toolchain.
