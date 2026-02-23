export type TokenType = 'color' | 'dimension' | 'number' | 'text'

export interface TokenEntry {
  cssVar: string
  label: string
  defaultValue: string
  type: TokenType
  min?: number
  max?: number
  step?: number
}

export interface TokenCategory {
  label: string
  tokens: TokenEntry[]
}

function color(cssVar: string, label: string, defaultValue: string): TokenEntry {
  return { cssVar, label, defaultValue, type: 'color' }
}

function dimension(
  cssVar: string,
  label: string,
  defaultValue: string,
  max = 64
): TokenEntry {
  return { cssVar, label, defaultValue, type: 'dimension', min: 0, max, step: 1 }
}

function num(
  cssVar: string,
  label: string,
  defaultValue: string,
  min: number,
  max: number,
  step: number
): TokenEntry {
  return { cssVar, label, defaultValue, type: 'number', min, max, step }
}

function text(cssVar: string, label: string, defaultValue: string): TokenEntry {
  return { cssVar, label, defaultValue, type: 'text' }
}

function intentColors(
  tone: string,
  base: string,
  foreground: string,
  hover: string,
  active: string
): TokenEntry[] {
  const cap = tone.charAt(0).toUpperCase() + tone.slice(1)
  return [
    color(`--color-${tone}`, `${cap}`, base),
    color(`--color-${tone}-foreground`, `${cap} FG`, foreground),
    color(`--color-${tone}-hover`, `${cap} Hover`, hover),
    color(`--color-${tone}-active`, `${cap} Active`, active),
  ]
}

export const tokenCategories: TokenCategory[] = [
  {
    label: 'Surface',
    tokens: [
      color('--color-background', 'Background', '#ffffff'),
      color('--color-foreground', 'Foreground', '#111111'),
      color('--color-card', 'Card', '#ffffff'),
      color('--color-card-foreground', 'Card FG', '#111111'),
      color('--color-muted', 'Muted', '#f5f5f5'),
      color('--color-muted-foreground', 'Muted FG', '#666666'),
      color('--color-border', 'Border', '#cccccc'),
      color('--color-input', 'Input', '#f5f5f5'),
    ],
  },
  {
    label: 'Primary',
    tokens: intentColors(
      'primary',
      'oklch(65.96% 0.2111 18.36)',
      '#ffffff',
      'oklch(56.46% 0.2005 18.36)',
      'oklch(46.96% 0.1794 18.36)'
    ),
  },
  {
    label: 'Secondary',
    tokens: intentColors(
      'secondary',
      'oklch(54.61% 0.2152 262.88)',
      '#ffffff',
      'oklch(45.11% 0.2044 262.88)',
      'oklch(35.65% 0.1826 263.16)'
    ),
  },
  {
    label: 'Tertiary',
    tokens: intentColors(
      'tertiary',
      'oklch(70.38% 0.1230 182.50)',
      '#ffffff',
      'oklch(61.25% 0.1098 181.89)',
      'oklch(51.96% 0.0934 181.39)'
    ),
  },
  {
    label: 'Base',
    tokens: intentColors(
      'base',
      'oklch(97.02% 0.0000 0.00)',
      '#111111',
      'oklch(87.52% 0.0000 0.00)',
      'oklch(78.02% 0.0000 0.00)'
    ),
  },
  {
    label: 'Accent',
    tokens: intentColors(
      'accent',
      'oklch(47.54% 0.2477 304.00)',
      '#ffffff',
      'oklch(40.60% 0.2142 302.13)',
      'oklch(32.98% 0.1757 300.33)'
    ),
  },
  {
    label: 'Neutral',
    tokens: intentColors('neutral', '#111111', '#ffffff', '#000000', '#000000'),
  },
  {
    label: 'Success',
    tokens: intentColors(
      'success',
      'oklch(62.71% 0.1699 149.21)',
      '#ffffff',
      'oklch(53.55% 0.1562 147.69)',
      'oklch(44.32% 0.1351 146.08)'
    ),
  },
  {
    label: 'Warning',
    tokens: intentColors(
      'warning',
      'oklch(76.86% 0.1647 70.08)',
      '#ffffff',
      'oklch(67.46% 0.1487 67.35)',
      'oklch(58.00% 0.1294 65.71)'
    ),
  },
  {
    label: 'Info',
    tokens: intentColors(
      'info',
      'oklch(68.47% 0.1479 237.32)',
      '#ffffff',
      'oklch(59.35% 0.1350 239.59)',
      'oklch(50.05% 0.1174 241.36)'
    ),
  },
  {
    label: 'Destructive',
    tokens: intentColors(
      'destructive',
      'oklch(57.71% 0.2152 27.33)',
      '#ffffff',
      'oklch(48.72% 0.1994 28.45)',
      'oklch(40.39% 0.1658 29.23)'
    ),
  },
  {
    label: 'Spacing',
    tokens: [
      dimension('--space-xs', 'XS', '4px'),
      dimension('--space-sm', 'SM', '8px'),
      dimension('--space-md', 'MD', '12px'),
      dimension('--space-lg', 'LG', '16px'),
      dimension('--space-xl', 'XL', '24px'),
      dimension('--space-2xl', '2XL', '32px'),
      dimension('--space-3xl', '3XL', '40px'),
    ],
  },
  {
    label: 'Radius',
    tokens: [
      dimension('--radius-none', 'None', '0px', 32),
      dimension('--radius-xs', 'XS', '2px', 32),
      dimension('--radius-sm', 'SM', '4px', 32),
      dimension('--radius-md', 'MD', '8px', 32),
      dimension('--radius-lg', 'LG', '12px', 32),
      dimension('--radius-xl', 'XL', '16px', 32),
    ],
  },
  {
    label: 'Font Size',
    tokens: [
      dimension('--font-size-label', 'Label', '11px', 32),
      dimension('--font-size-caption', 'Caption', '12px', 32),
      dimension('--font-size-body', 'Body', '14px', 32),
      dimension('--font-size-h6', 'H6', '14px', 48),
      dimension('--font-size-h5', 'H5', '16px', 48),
      dimension('--font-size-h4', 'H4', '18px', 48),
      dimension('--font-size-h3', 'H3', '20px', 48),
      dimension('--font-size-h2', 'H2', '24px', 48),
      dimension('--font-size-h1', 'H1', '28px', 48),
    ],
  },
  {
    label: 'Font Weight',
    tokens: [
      num('--font-weight-light', 'Light', '300', 100, 900, 100),
      num('--font-weight-regular', 'Regular', '400', 100, 900, 100),
      num('--font-weight-medium', 'Medium', '500', 100, 900, 100),
      num('--font-weight-semibold', 'Semibold', '600', 100, 900, 100),
      num('--font-weight-bold', 'Bold', '700', 100, 900, 100),
    ],
  },
  {
    label: 'Other',
    tokens: [
      num('--opacity-muted', 'Opacity Muted', '0.6', 0, 1, 0.05),
      num('--opacity-disabled', 'Opacity Disabled', '0.4', 0, 1, 0.05),
      text('--border-width-default', 'Border Default', '1px'),
      text('--border-width-strong', 'Border Strong', '2px'),
      text('--shadow-sm', 'Shadow SM', '0 1px 2px 0 rgba(0, 0, 0, 0.05)'),
      text('--shadow-md', 'Shadow MD', '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'),
      text('--shadow-lg', 'Shadow LG', '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)'),
    ],
  },
]
