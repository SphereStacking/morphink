import type {
  CollectionMapping,
  CodeToUiMessage,
  DtcgGroup,
  DtcgToken,
  DtcgType,
  ExportFile,
  ExportWarning,
  ImportFileEntry,
  ImportResult,
  ModeMapping,
  UiToCodeMessage,
} from './types'

// ---------------------------------------------------------------------------
// Helpers — shared
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

function hexToRgba(hex: string): RGBA {
  const h = hex.replace('#', '')
  let r: number, g: number, b: number, a: number
  if (h.length === 3) {
    r = parseInt(h[0] + h[0], 16) / 255
    g = parseInt(h[1] + h[1], 16) / 255
    b = parseInt(h[2] + h[2], 16) / 255
    a = 1
  } else if (h.length === 6) {
    r = parseInt(h.slice(0, 2), 16) / 255
    g = parseInt(h.slice(2, 4), 16) / 255
    b = parseInt(h.slice(4, 6), 16) / 255
    a = 1
  } else if (h.length === 8) {
    r = parseInt(h.slice(0, 2), 16) / 255
    g = parseInt(h.slice(2, 4), 16) / 255
    b = parseInt(h.slice(4, 6), 16) / 255
    a = parseInt(h.slice(6, 8), 16) / 255
  } else {
    return { r: 0, g: 0, b: 0, a: 1 }
  }
  return { r, g, b, a }
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

const FONT_FAMILY_KEYWORDS = ['font-family', 'fontfamily', 'font/family']

function isFontFamily(variableName: string): boolean {
  const lower = variableName.toLowerCase()
  return FONT_FAMILY_KEYWORDS.some((kw) => lower.includes(kw))
}

function figmaPathToDtcgRef(figmaPath: string): string {
  return figmaPath.replace(/\//g, '.')
}

function dtcgRefToFigmaPath(dtcgRef: string): string {
  return dtcgRef.replace(/\./g, '/')
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
// Export — core conversion
// ---------------------------------------------------------------------------

interface BuildResult {
  group: DtcgGroup
  warnings: ExportWarning[]
}

async function buildDtcgGroup(
  variables: Variable[],
  modeId: string,
  allVariablesById: Map<string, Variable>
): Promise<BuildResult> {
  const group: DtcgGroup = {}
  const warnings: ExportWarning[] = []

  for (const variable of variables) {
    const rawValue = variable.valuesByMode[modeId]
    if (rawValue === undefined) continue

    const pathParts = variable.name.split('/')
    let token: DtcgToken

    if (isVariableAlias(rawValue)) {
      const referencedVar = allVariablesById.get(rawValue.id)
      if (!referencedVar) {
        warnings.push({
          level: 'error',
          message: `Broken alias: "${variable.name}" references a deleted variable`,
        })
        continue
      }

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
        const rounded = parseFloat(num.toFixed(4))
        token = { $value: String(rounded), $type: 'number' }
      } else if (isDimension(variable.name)) {
        const $value = `${parseFloat(num.toFixed(4))}px`
        token = { $value, $type: 'dimension' }
      } else {
        const rounded = parseFloat(num.toFixed(4))
        token = { $value: String(rounded), $type: 'number' }
      }
    } else if (variable.resolvedType === 'STRING') {
      const $type = isFontFamily(variable.name) ? 'fontFamily' : 'string'
      token = { $value: String(rawValue), $type } as DtcgToken
    } else if (variable.resolvedType === 'BOOLEAN') {
      token = { $value: String(rawValue), $type: 'boolean' }
    } else {
      continue
    }

    setNestedValue(group, pathParts, token)
  }

  return { group, warnings }
}

function resolveType(resolvedType: VariableResolvedDataType, variableName: string): DtcgType {
  switch (resolvedType) {
    case 'COLOR':
      return 'color'
    case 'FLOAT':
      if (isLineHeight(variableName)) return 'number'
      return isDimension(variableName) ? 'dimension' : 'number'
    case 'STRING':
      return isFontFamily(variableName) ? 'fontFamily' : 'string'
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
// Export — default mappings & orchestration
// ---------------------------------------------------------------------------

function buildDefaultMappings(collections: VariableCollection[]): CollectionMapping[] {
  return collections.map((col) => {
    const modes: ModeMapping[] = col.modes.map((mode) => {
      const fileName =
        col.modes.length === 1
          ? `${col.name.toLowerCase()}.json`
          : `${col.name.toLowerCase()}-${mode.name.toLowerCase()}.json`

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

interface ExportResult {
  files: ExportFile[]
  warnings: ExportWarning[]
}

async function runExport(mappings: CollectionMapping[]): Promise<ExportResult> {
  const [variables, collections] = await Promise.all([
    figma.variables.getLocalVariablesAsync(),
    figma.variables.getLocalVariableCollectionsAsync(),
  ])

  const allVariablesById = new Map<string, Variable>(variables.map((v) => [v.id, v]))
  const collectionById = new Map<string, VariableCollection>(collections.map((c) => [c.id, c]))

  type PendingFile = {
    fileName: string
    resultPromise: Promise<BuildResult>
  }

  const pending: PendingFile[] = []

  for (const mapping of mappings) {
    const collection = collectionById.get(mapping.collectionId)
    if (!collection) continue

    const collectionVars = variables.filter((v) => v.variableCollectionId === mapping.collectionId)

    for (const modeMapping of mapping.modes) {
      if (!modeMapping.enabled) continue
      pending.push({
        fileName: modeMapping.fileName,
        resultPromise: buildDtcgGroup(collectionVars, modeMapping.modeId, allVariablesById),
      })
    }
  }

  const results = await Promise.all(pending.map((p) => p.resultPromise))
  const allWarnings: ExportWarning[] = results.flatMap((r) => r.warnings)

  const files = results.map((result, i) => ({
    fileName: pending[i].fileName,
    content: result.group,
    tokenCount: countTokens(result.group),
  }))

  return { files, warnings: allWarnings }
}

// ---------------------------------------------------------------------------
// Import — helpers
// ---------------------------------------------------------------------------

const ALIAS_RE = /^\{(.+)\}$/

function isAliasValue(value: string): boolean {
  return ALIAS_RE.test(value)
}

function extractAliasPath(value: string): string {
  const m = value.match(ALIAS_RE)
  return m ? dtcgRefToFigmaPath(m[1]) : ''
}

function dtcgTypeToFigmaType(dtcgType: DtcgType): VariableResolvedDataType {
  switch (dtcgType) {
    case 'color':
      return 'COLOR'
    case 'dimension':
    case 'number':
      return 'FLOAT'
    case 'fontFamily':
    case 'string':
      return 'STRING'
    case 'boolean':
      return 'BOOLEAN'
  }
}

function parseDtcgValue(rawValue: string, dtcgType: DtcgType): VariableValue | null {
  switch (dtcgType) {
    case 'color':
      if (!rawValue.startsWith('#')) return null
      return hexToRgba(rawValue)
    case 'dimension': {
      const num = parseFloat(rawValue.replace(/px$/, ''))
      return isNaN(num) ? null : num
    }
    case 'number': {
      const num = parseFloat(rawValue)
      return isNaN(num) ? null : num
    }
    case 'fontFamily':
    case 'string':
      return rawValue
    case 'boolean':
      return rawValue === 'true'
  }
}

interface FlatToken {
  path: string
  token: DtcgToken
}

function flattenDtcgGroup(group: DtcgGroup, prefix: string[] = []): FlatToken[] {
  const result: FlatToken[] = []
  for (const [key, value] of Object.entries(group)) {
    if (key.startsWith('$')) continue
    const currentPath = [...prefix, key]
    if ('$value' in value && '$type' in value) {
      result.push({ path: currentPath.join('/'), token: value as DtcgToken })
    } else {
      result.push(...flattenDtcgGroup(value as DtcgGroup, currentPath))
    }
  }
  return result
}

// ---------------------------------------------------------------------------
// Import — orchestration
// ---------------------------------------------------------------------------

async function runImport(files: ImportFileEntry[]): Promise<ImportResult> {
  const warnings: ExportWarning[] = []
  let created = 0
  let updated = 0
  let skipped = 0

  // Load existing state
  const [existingVars, existingCollections] = await Promise.all([
    figma.variables.getLocalVariablesAsync(),
    figma.variables.getLocalVariableCollectionsAsync(),
  ])

  const collectionsByName = new Map<string, VariableCollection>()
  for (const col of existingCollections) {
    collectionsByName.set(col.name, col)
  }

  // Build a name→Variable map for alias resolution
  const varsByName = new Map<string, Variable>()
  for (const v of existingVars) {
    varsByName.set(v.name, v)
  }

  // Deferred alias assignments (pass 2)
  const deferredAliases: {
    variable: Variable
    modeId: string
    aliasPath: string
    tokenPath: string
  }[] = []

  for (const file of files) {
    const tokens = flattenDtcgGroup(file.content)
    if (tokens.length === 0) {
      warnings.push({ level: 'warning', message: `"${file.fileName}": no tokens found` })
      continue
    }

    // Find or create collection
    let collection = collectionsByName.get(file.collectionName)
    if (!collection) {
      collection = figma.variables.createVariableCollection(file.collectionName)
      collectionsByName.set(file.collectionName, collection)
    }

    // Find or create mode
    let modeId: string | undefined
    for (const mode of collection.modes) {
      if (mode.name === file.modeName) {
        modeId = mode.modeId
        break
      }
    }
    if (!modeId) {
      // New collections come with one default mode — rename it if it's the only one
      if (collection.modes.length === 1 && collection.modes[0].name === 'Mode 1') {
        collection.renameMode(collection.modes[0].modeId, file.modeName)
        modeId = collection.modes[0].modeId
      } else {
        try {
          modeId = collection.addMode(file.modeName)
        } catch {
          warnings.push({
            level: 'error',
            message: `"${file.fileName}": failed to add mode "${file.modeName}" (plan limit?)`,
          })
          continue
        }
      }
    }

    // Build a map of collection's existing variables by name
    const colVarsByName = new Map<string, Variable>()
    // Reload to include newly created vars from previous files
    const allVars = await figma.variables.getLocalVariablesAsync()
    for (const v of allVars) {
      if (v.variableCollectionId === collection.id) {
        colVarsByName.set(v.name, v)
      }
      varsByName.set(v.name, v)
    }

    // Pass 1: Create/update non-alias tokens
    for (const { path, token } of tokens) {
      if (isAliasValue(token.$value)) {
        // Defer to pass 2
        const figmaType = dtcgTypeToFigmaType(token.$type)
        let variable = colVarsByName.get(path)
        if (!variable) {
          variable = figma.variables.createVariable(path, collection.id, figmaType)
          colVarsByName.set(path, variable)
          varsByName.set(path, variable)
          created++
        }
        deferredAliases.push({
          variable,
          modeId,
          aliasPath: extractAliasPath(token.$value),
          tokenPath: path,
        })
        continue
      }

      const figmaType = dtcgTypeToFigmaType(token.$type)
      const parsedValue = parseDtcgValue(token.$value, token.$type)
      if (parsedValue === null) {
        warnings.push({
          level: 'warning',
          message: `"${path}": could not parse value "${token.$value}" as ${token.$type}`,
        })
        skipped++
        continue
      }

      let variable = colVarsByName.get(path)
      if (variable) {
        // Verify type matches
        if (variable.resolvedType !== figmaType) {
          warnings.push({
            level: 'error',
            message: `"${path}": type mismatch (existing: ${variable.resolvedType}, import: ${figmaType})`,
          })
          skipped++
          continue
        }
        variable.setValueForMode(modeId, parsedValue)
        updated++
      } else {
        variable = figma.variables.createVariable(path, collection.id, figmaType)
        variable.setValueForMode(modeId, parsedValue)
        colVarsByName.set(path, variable)
        varsByName.set(path, variable)
        created++
      }
    }
  }

  // Pass 2: Resolve aliases
  // Reload all variables to ensure we have the latest state
  const finalVars = await figma.variables.getLocalVariablesAsync()
  const finalVarsByName = new Map<string, Variable>()
  for (const v of finalVars) {
    finalVarsByName.set(v.name, v)
  }

  for (const { variable, modeId, aliasPath, tokenPath } of deferredAliases) {
    const referencedVar = finalVarsByName.get(aliasPath)
    if (!referencedVar) {
      warnings.push({
        level: 'error',
        message: `"${tokenPath}": alias target "${aliasPath}" not found`,
      })
      skipped++
      continue
    }
    try {
      variable.setValueForMode(modeId, {
        type: 'VARIABLE_ALIAS',
        id: referencedVar.id,
      })
    } catch (err) {
      warnings.push({
        level: 'error',
        message: `"${tokenPath}": failed to set alias → "${aliasPath}" (${err instanceof Error ? err.message : String(err)})`,
      })
      skipped++
    }
  }

  return { created, updated, skipped, warnings }
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
      const { files, warnings } = await runExport(msg.mappings)
      const reply: CodeToUiMessage = { type: 'export-ready', files, warnings }
      figma.ui.postMessage(reply)
    } catch (err) {
      const reply: CodeToUiMessage = {
        type: 'error',
        message: err instanceof Error ? err.message : String(err),
      }
      figma.ui.postMessage(reply)
    }
  } else if (msg.type === 'import') {
    try {
      const result = await runImport(msg.files)
      const reply: CodeToUiMessage = { type: 'import-complete', result }
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
