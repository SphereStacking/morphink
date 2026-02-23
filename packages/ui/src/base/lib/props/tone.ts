export const tones = [
  'primary',
  'secondary',
  'tertiary',
  'base',
  'accent',
  'neutral',
  'success',
  'warning',
  'info',
  'destructive',
] as const

export type Tone = (typeof tones)[number]

export const componentTones = {
  Button: tones,
  Badge: tones,
} as const

export type ButtonTone = (typeof componentTones.Button)[number]
export type BadgeTone = (typeof componentTones.Badge)[number]
