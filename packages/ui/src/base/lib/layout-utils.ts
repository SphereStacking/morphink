import { resolveSpace } from './props/space'

const alignMap: Record<string, string> = {
  start: 'flex-start',
  end: 'flex-end',
  center: 'center',
  stretch: 'stretch',
  baseline: 'baseline',
}

const gridAlignMap: Record<string, string> = {
  start: 'start',
  end: 'end',
  center: 'center',
  stretch: 'stretch',
  baseline: 'baseline',
}

const justifyFlexMap: Record<string, string> = {
  start: 'flex-start',
  end: 'flex-end',
  center: 'center',
  between: 'space-between',
  around: 'space-around',
  evenly: 'space-evenly',
}

const justifyGridMap: Record<string, string> = {
  start: 'start',
  end: 'end',
  center: 'center',
  stretch: 'stretch',
}

export function resolveAlign(value: string, isGrid: boolean): string {
  const map = isGrid ? gridAlignMap : alignMap
  return map[value] ?? value
}

export function resolveJustify(value: string, isGrid: boolean): string {
  const map = isGrid ? justifyGridMap : justifyFlexMap
  return map[value] ?? value
}

export function resolveColumns(columns: number | string, minWidth: string): string {
  if (typeof columns === 'number') {
    return `repeat(${columns}, minmax(0, 1fr))`
  }
  if (columns === 'auto-fit' || columns === 'auto-fill') {
    return `repeat(${columns}, minmax(${minWidth}, 1fr))`
  }
  return columns
}

export function resolveRows(rows: number | string): string {
  if (typeof rows === 'number') {
    return `repeat(${rows}, minmax(0, 1fr))`
  }
  return rows
}

export { resolveSpace }
