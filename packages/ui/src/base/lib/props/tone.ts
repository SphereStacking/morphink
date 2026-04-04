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
  Input: tones,
  Textarea: tones,
  Checkbox: tones,
  Switch: tones,
  Select: tones,
  Alert: ['info', 'success', 'warning', 'destructive', 'neutral'],
  Radio: tones,
  Progress: tones,
  Slider: tones,
  Pagination: tones,
  Toast: ['success', 'warning', 'info', 'destructive', 'neutral'],
} as const

export type ButtonTone = (typeof componentTones.Button)[number]
export type BadgeTone = (typeof componentTones.Badge)[number]
export type InputTone = (typeof componentTones.Input)[number]
export type TextareaTone = (typeof componentTones.Textarea)[number]
export type CheckboxTone = (typeof componentTones.Checkbox)[number]
export type SwitchTone = (typeof componentTones.Switch)[number]
export type SelectTone = (typeof componentTones.Select)[number]
export type AlertTone = (typeof componentTones.Alert)[number]
export type RadioTone = (typeof componentTones.Radio)[number]
export type ProgressTone = (typeof componentTones.Progress)[number]
export type SliderTone = (typeof componentTones.Slider)[number]
export type PaginationTone = (typeof componentTones.Pagination)[number]
export type ToastTone = (typeof componentTones.Toast)[number]
