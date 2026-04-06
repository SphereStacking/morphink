[English](./choosing-utilities.md) | [日本語](./choosing-utilities.ja.md)

# Getting Started: CSS Setup

## Step 1: Import morphink (required)

One import to make all components work. Includes design tokens, base resets, component styles, and scoped utilities.

```css
@import "@myorg/ui/styles/morphink.css";
```

> **Note:** `morphink.css` bundles `tokens.css`, `tokens-dark.css`, `base.css`, `components.css`, and `ui.css` into a single file. Individual exports remain available if needed.

---

## Step 2: Layout styling (choose your approach)

morphink components work with the single import above. For styling your own layouts with design tokens, choose one of these approaches:

### Option A: `mi:` utility classes (no Tailwind required)

For projects that **do not use Tailwind CSS, cannot introduce it, or prefer not to add it as a dependency**. A pre-built CSS file provides token-based utility classes — no build pipeline changes needed.

```css
@import "@myorg/ui/styles/morphink.css";
@import "@myorg/tokens/utilities.css";
```

```html
<div class="mi:bg-primary mi:p-md mi:rounded-lg mi:text-foreground">
  Content with token-based styles
</div>
```

Responsive variants: `mi:sm:`, `mi:md:`, `mi:lg:`, etc.

### Option B: Tailwind integration (for Tailwind v4 projects)

For projects **already using Tailwind CSS v4**. Requires a Tailwind build pipeline on the consumer side — `tailwind-theme.css` uses `@theme` directives that are processed at build time.

Add the following to your Tailwind entry CSS:

```css
@import "tailwindcss";
@import "@myorg/ui/styles/morphink.css";
@import "@myorg/tokens/tailwind-theme.css";
```

```html
<div class="bg-primary p-md rounded-lg text-foreground">
  Content with token-based styles
</div>
```

Full Tailwind ecosystem: `hover:`, `focus:`, responsive breakpoints, plugins, IntelliSense, etc.

### Option C: CSS custom properties directly

No additional CSS needed. Use `--morphink-*` custom properties in your own stylesheets.

```css
@import "@myorg/ui/styles/morphink.css";
```

```css
.my-layout {
  padding: var(--morphink-space-lg);
  display: flex;
  gap: var(--morphink-space-md);
  color: var(--morphink-color-foreground);
}
```

Works with any CSS approach — plain CSS, SCSS, CSS Modules, etc.

---

## Dark mode

Dark-mode token overrides are included in `morphink.css`. Toggle the theme by setting `data-theme="dark"` on the `.mi-theme` element:

```html
<div class="mi-theme" data-morphink data-theme="dark">
  <!-- Dark theme applied -->
</div>
```

---

## Summary

| | Option A: utilities.css | Option B: tailwind-theme.css | Option C: CSS custom properties |
|---|---|---|---|
| Additional import | `@myorg/tokens/utilities.css` | `@myorg/tokens/tailwind-theme.css` | None |
| Requires Tailwind | No | Yes (v4) | No |
| Class prefix | `mi:` | None | N/A |
| Hover/focus variants | No (component responsibility) | Yes (standard Tailwind) | Write your own |
| Best for | Projects without Tailwind | Projects already using Tailwind v4 | Any project, full control |
