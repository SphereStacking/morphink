export const componentResize = {
  Textarea: ['none', 'vertical', 'horizontal', 'both'],
} as const

export type TextareaResize = (typeof componentResize.Textarea)[number]
