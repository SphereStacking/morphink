export type SpaceToken = '0' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl' | '6xl'

export const spaceTokenMap: Record<SpaceToken, string> = {
  '0': '0px',
  'xs': 'var(--morphink-space-xs)',
  'sm': 'var(--morphink-space-sm)',
  'md': 'var(--morphink-space-md)',
  'lg': 'var(--morphink-space-lg)',
  'xl': 'var(--morphink-space-xl)',
  '2xl': 'var(--morphink-space-2xl)',
  '3xl': 'var(--morphink-space-3xl)',
  '4xl': 'var(--morphink-space-4xl)',
  '5xl': 'var(--morphink-space-5xl)',
  '6xl': 'var(--morphink-space-6xl)',
}

export function resolveSpace(value: string): string {
  return spaceTokenMap[value as SpaceToken] ?? value
}
