import { ref } from 'vue'

export interface ToastItem {
  id: string
  title?: string
  description?: string
  tone?: 'success' | 'warning' | 'info' | 'destructive' | 'neutral'
  variant?: 'solid' | 'soft' | 'outline'
  duration?: number
  action?: { label: string; onClick: () => void }
}

type AddToastInput = Omit<ToastItem, 'id'>

const toasts = ref<ToastItem[]>([])

let counter = 0

function add(input: AddToastInput): string {
  const id = `toast-${++counter}-${Date.now()}`
  toasts.value.push({ ...input, id })
  return id
}

function dismiss(id: string) {
  toasts.value = toasts.value.filter((t) => t.id !== id)
}

function dismissAll() {
  toasts.value = []
}

export function useToast() {
  return {
    toasts,
    add,
    dismiss,
    dismissAll,
  }
}
