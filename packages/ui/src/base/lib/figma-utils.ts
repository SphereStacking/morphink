/**
 * readonly string tuple を figma.enum() 用の identity Record に変換する。
 * ['solid', 'outline'] → { solid: 'solid', outline: 'outline' }
 */
export function toEnumMap<const T extends readonly string[]>(arr: T): { [K in T[number]]: K } {
  return Object.fromEntries(arr.map((v) => [v, v])) as { [K in T[number]]: K }
}
