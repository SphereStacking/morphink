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
  Input: ['base', 'primary', 'destructive'],
  Textarea: ['base', 'primary', 'destructive'],
  Checkbox: ['base', 'primary', 'destructive'],
  Switch: ['base', 'primary'],
} as const

export type ButtonTone = (typeof componentTones.Button)[number]
export type BadgeTone = (typeof componentTones.Badge)[number]
export type InputTone = (typeof componentTones.Input)[number]
export type TextareaTone = (typeof componentTones.Textarea)[number]
export type CheckboxTone = (typeof componentTones.Checkbox)[number]
export type SwitchTone = (typeof componentTones.Switch)[number]
