import type {
  CollectionMapping,
  CodeToUiMessage,
  DtcgGroup,
  DtcgToken,
  DtcgType,
  ExportFile,
  ModeMapping,
  UiToCodeMessage,
} from './types'

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function rgbToHex(r: number, g: number, b: number, a?: number): string {
  const toHex = (n: number) => {
    const clamped = Math.round(Math.max(0, Math.min(1, n)) * 255)
    return clamped.toString(16).padStart(2, '0')
  }
  const hex = `#${toHex(r)}${toHex(g)}${toHex(b)}`
  if (a !== undefined && a < 1) {
    return `${hex}${toHex(a)}`
  }
  return hex
}

// NOTE: 'height' is intentionally omitted to avoid matching 'lineHeight' before isLineHeight() runs.
// Use specific keywords like 'min-height'/'max-height' if standalone height support is needed.
const DIMENSION_KEYWORDS = [
  'space',
  'radius',
  'size',
  'border',
  'width',
  'min-height',
  'max-height',
  'gap',
  'offset',
  'font-size',
]

function isDimension(variableName: string): boolean {
  const lower = variableName.toLowerCase()
  return DIMENSION_KEYWORDS.some((kw) => lower.includes(kw))
}

const LINE_HEIGHT_KEYWORDS = ['lineheight', 'line-height']

function isLineHeight(variableName: string): boolean {
  const lower = variableName.toLowerCase()
  return LINE_HEIGHT_KEYWORDS.some((kw) => lower.includes(kw))
}

function figmaPathToDtcgRef(figmaPath: string): string {
  // figma uses "/" as path separator; DTCG uses "."
  return figmaPath.replace(/\//g, '.')
}

/** Set a nested value in a DTCG group using a path array */
function setNestedValue(group: DtcgGroup, pathParts: string[], token: DtcgToken): void {
  let current = group
  for (let i = 0; i < pathParts.length - 1; i++) {
    const key = pathParts[i]
    if (!(key in current)) {
      current[key] = {} as DtcgGroup
    }
    current = current[key] as DtcgGroup
  }
  const lastKey = pathParts[pathParts.length - 1]
  current[lastKey] = token
}

// ---------------------------------------------------------------------------
// Core conversion
// ---------------------------------------------------------------------------

async function buildDtcgGroup(
  variables: Variable[],
  modeId: string,
  allVariablesById: Map<string, Variable>,
): Promise<DtcgGroup> {
  const group: DtcgGroup = {}

  for (const variable of variables) {
    const rawValue = variable.valuesByMode[modeId]
    if (rawValue === undefined) continue

    const pathParts = variable.name.split('/')
    let token: DtcgToken

    if (isVariableAlias(rawValue)) {
      // Resolve reference name
      const referencedVar = allVariablesById.get(rawValue.id)
      if (!referencedVar) continue

      const refPath = figmaPathToDtcgRef(referencedVar.name)
      const $type = resolveType(variable.resolvedType, variable.name)
      token = { $value: `{${refPath}}`, $type }
    } else if (variable.resolvedType === 'COLOR') {
      const color = rawValue as RGBA
      token = {
        $value: rgbToHex(color.r, color.g, color.b, color.a),
        $type: 'color',
      }
    } else if (variable.resolvedType === 'FLOAT') {
      const num = rawValue as number
      if (isLineHeight(variable.name)) {
        // num > 10 is treated as a percentage value (e.g. 150 → 1.5); otherwise already unitless
        const unitless = num > 10 ? parseFloat((num / 100).toFixed(4)) : num
        token = { $value: String(unitless), $type: 'number' }
      } else if (isDimension(variable.name)) {
        const $value = `${parseFloat(num.toFixed(1))}px`
        token = { $value, $type: 'dimension' }
      } else {
        const rounded = parseFloat(num.toFixed(4))
        token = { $value: String(rounded), $type: 'number' }
      }
    } else if (variable.resolvedType === 'STRING') {
      token = { $value: String(rawValue), $type: 'string' }
    } else if (variable.resolvedType === 'BOOLEAN') {
      token = { $value: String(rawValue), $type: 'boolean' }
    } else {
      continue
    }

    setNestedValue(group, pathParts, token)
  }

  return group
}

function resolveType(resolvedType: VariableResolvedDataType, variableName: string): DtcgType {
  switch (resolvedType) {
    case 'COLOR':
      return 'color'
    case 'FLOAT':
      if (isLineHeight(variableName)) return 'number'
      return isDimension(variableName) ? 'dimension' : 'number'
    case 'STRING':
      return 'string'
    case 'BOOLEAN':
      return 'boolean'
    default:
      return 'string'
  }
}

function isVariableAlias(value: VariableValue): value is VariableAlias {
  return (
    typeof value === 'object' &&
    value !== null &&
    'type' in value &&
    (value as VariableAlias).type === 'VARIABLE_ALIAS'
  )
}

// ---------------------------------------------------------------------------
// Default mappings
// ---------------------------------------------------------------------------

const DEFAULT_FILE_NAMES: Record<string, Record<string, string>> = {
  Primitives: { default: 'primitives.json' },
  Semantic: { Light: 'semantic.json', Dark: 'semantic-dark.json' },
}

function buildDefaultMappings(
  collections: VariableCollection[],
): CollectionMapping[] {
  return collections.map((col) => {
    const colDefaults = DEFAULT_FILE_NAMES[col.name] ?? {}

    const modes: ModeMapping[] = col.modes.map((mode) => {
      let fileName =
        colDefaults[mode.name] ?? colDefaults['default'] ?? `${col.name}-${mode.name}.json`
      // If only one mode and no explicit per-mode mapping, use collection name
      if (col.modes.length === 1 && !colDefaults[mode.name] && colDefaults['default']) {
        fileName = colDefaults['default']
      }

      return {
        modeId: mode.modeId,
        modeName: mode.name,
        fileName,
        enabled: true,
      }
    })

    return {
      collectionId: col.id,
      collectionName: col.name,
      modes,
    }
  })
}

// ---------------------------------------------------------------------------
// Main export logic
// ---------------------------------------------------------------------------

async function runExport(mappings: CollectionMapping[]): Promise<ExportFile[]> {
  const [variables, collections] = await Promise.all([
    figma.variables.getLocalVariablesAsync(),
    figma.variables.getLocalVariableCollectionsAsync(),
  ])

  const allVariablesById = new Map<string, Variable>(variables.map((v) => [v.id, v]))
  const collectionById = new Map<string, VariableCollection>(
    collections.map((c) => [c.id, c]),
  )

  type PendingFile = {
    fileName: string
    groupPromise: Promise<DtcgGroup>
  }

  const pending: PendingFile[] = []

  for (const mapping of mappings) {
    const collection = collectionById.get(mapping.collectionId)
    if (!collection) continue

    const collectionVars = variables.filter(
      (v) => v.variableCollectionId === mapping.collectionId,
    )

    for (const modeMapping of mapping.modes) {
      if (!modeMapping.enabled) continue
      pending.push({
        fileName: modeMapping.fileName,
        groupPromise: buildDtcgGroup(collectionVars, modeMapping.modeId, allVariablesById),
      })
    }
  }

  const groups = await Promise.all(pending.map((p) => p.groupPromise))

  return groups.map((group, i) => ({
    fileName: pending[i].fileName,
    content: group,
    tokenCount: countTokens(group),
  }))
}

function countTokens(group: DtcgGroup): number {
  let count = 0
  for (const value of Object.values(group)) {
    if ('$value' in value) {
      count++
    } else {
      count += countTokens(value as DtcgGroup)
    }
  }
  return count
}

// ---------------------------------------------------------------------------
// Plugin entry point
// ---------------------------------------------------------------------------

figma.showUI(__html__, { width: 480, height: 600, themeColors: true })

figma.ui.onmessage = async (msg: UiToCodeMessage) => {
  if (msg.type === 'load-collections') {
    try {
      const [variables, collections] = await Promise.all([
        figma.variables.getLocalVariablesAsync(),
        figma.variables.getLocalVariableCollectionsAsync(),
      ])

      const mappings = buildDefaultMappings(collections)
      const totalTokenCount = variables.length

      const reply: CodeToUiMessage = {
        type: 'collections-loaded',
        mappings,
        totalTokenCount,
      }
      figma.ui.postMessage(reply)
    } catch (err) {
      const reply: CodeToUiMessage = {
        type: 'error',
        message: err instanceof Error ? err.message : String(err),
      }
      figma.ui.postMessage(reply)
    }
  } else if (msg.type === 'export') {
    try {
      const files = await runExport(msg.mappings)
      const reply: CodeToUiMessage = { type: 'export-ready', files }
      figma.ui.postMessage(reply)
    } catch (err) {
      const reply: CodeToUiMessage = {
        type: 'error',
        message: err instanceof Error ? err.message : String(err),
      }
      figma.ui.postMessage(reply)
    }
  }
}
