export const durations = ['instant', 'fast', 'normal', 'slow', 'slower'] as const
export type Duration = (typeof durations)[number]

export const easings = ['standard', 'decelerate', 'accelerate', 'emphasized-decelerate', 'emphasized-accelerate', 'linear', 'spring'] as const
export type Easing = (typeof easings)[number]

export const componentDurations = {
  Tabs: ['instant', 'fast', 'normal', 'slow', 'slower'],
  Switch: ['instant', 'fast', 'normal', 'slow', 'slower'],
  Checkbox: ['instant', 'fast', 'normal', 'slow', 'slower'],
  Radio: ['instant', 'fast', 'normal', 'slow', 'slower'],
  Accordion: ['instant', 'fast', 'normal', 'slow', 'slower'],
  Collapsible: ['instant', 'fast', 'normal', 'slow', 'slower'],
  Progress: ['instant', 'fast', 'normal', 'slow', 'slower'],
} as const

export const componentEasings = {
  Tabs: ['standard', 'decelerate', 'accelerate', 'emphasized-decelerate', 'emphasized-accelerate', 'linear', 'spring'],
  Switch: ['standard', 'decelerate', 'accelerate', 'emphasized-decelerate', 'emphasized-accelerate', 'linear', 'spring'],
  Checkbox: ['standard', 'decelerate', 'accelerate', 'emphasized-decelerate', 'emphasized-accelerate', 'linear', 'spring'],
  Radio: ['standard', 'decelerate', 'accelerate', 'emphasized-decelerate', 'emphasized-accelerate', 'linear', 'spring'],
  Accordion: ['standard', 'decelerate', 'accelerate', 'emphasized-decelerate', 'emphasized-accelerate', 'linear', 'spring'],
  Collapsible: ['standard', 'decelerate', 'accelerate', 'emphasized-decelerate', 'emphasized-accelerate', 'linear', 'spring'],
  Progress: ['standard', 'decelerate', 'accelerate', 'emphasized-decelerate', 'emphasized-accelerate', 'linear', 'spring'],
} as const

export type TabsDuration = (typeof componentDurations.Tabs)[number]
export type TabsEasing = (typeof componentEasings.Tabs)[number]
export type SwitchDuration = (typeof componentDurations.Switch)[number]
export type SwitchEasing = (typeof componentEasings.Switch)[number]
export type CheckboxDuration = (typeof componentDurations.Checkbox)[number]
export type CheckboxEasing = (typeof componentEasings.Checkbox)[number]
export type RadioDuration = (typeof componentDurations.Radio)[number]
export type RadioEasing = (typeof componentEasings.Radio)[number]
export type AccordionDuration = (typeof componentDurations.Accordion)[number]
export type AccordionEasing = (typeof componentEasings.Accordion)[number]
export type CollapsibleDuration = (typeof componentDurations.Collapsible)[number]
export type CollapsibleEasing = (typeof componentEasings.Collapsible)[number]
export type ProgressDuration = (typeof componentDurations.Progress)[number]
export type ProgressEasing = (typeof componentEasings.Progress)[number]
