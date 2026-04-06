export type DtcgType = 'color' | 'dimension' | 'fontFamily' | 'number' | 'string' | 'boolean'

export interface DtcgToken {
  $value: string
  $type: DtcgType
}

export type DtcgGroup = {
  [key: string]: DtcgGroup | DtcgToken
}

export interface CollectionMode {
  collectionId: string
  collectionName: string
  modeId: string
  modeName: string
}

export interface CollectionMapping {
  collectionId: string
  collectionName: string
  modes: ModeMapping[]
}

export interface ModeMapping {
  modeId: string
  modeName: string
  fileName: string
  enabled: boolean
}

export interface ExportPayload {
  files: ExportFile[]
}

export interface ExportFile {
  fileName: string
  content: DtcgGroup
  tokenCount: number
}

export interface ExportWarning {
  level: 'warning' | 'error'
  message: string
}

// ---------------------------------------------------------------------------
// Import types
// ---------------------------------------------------------------------------

export interface ImportFileEntry {
  fileName: string
  content: DtcgGroup
  collectionName: string
  modeName: string
}

export interface ImportResult {
  created: number
  updated: number
  skipped: number
  warnings: ExportWarning[]
}

// ---------------------------------------------------------------------------
// Messages
// ---------------------------------------------------------------------------

// Messages from code → ui
export type CodeToUiMessage =
  | { type: 'collections-loaded'; mappings: CollectionMapping[]; totalTokenCount: number }
  | { type: 'export-ready'; files: ExportFile[]; warnings: ExportWarning[] }
  | { type: 'import-complete'; result: ImportResult }
  | { type: 'error'; message: string }

// Messages from ui → code
export type UiToCodeMessage =
  | { type: 'load-collections' }
  | { type: 'export'; mappings: CollectionMapping[] }
  | { type: 'import'; files: ImportFileEntry[] }
