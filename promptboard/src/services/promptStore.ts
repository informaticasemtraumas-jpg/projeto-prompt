import type { PromptDraft, PromptItem } from '../types'

const STORAGE_KEY = 'promptboard.prompts'
const hasWindow = typeof window !== 'undefined'

const byUpdatedAtDesc = (a: PromptItem, b: PromptItem): number =>
  new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()

const safeParse = (raw: string | null): PromptItem[] => {
  if (!raw) return []

  try {
    const parsed: unknown = JSON.parse(raw)
    if (!Array.isArray(parsed)) return []

    return parsed
      .filter((item): item is PromptItem => {
        if (!item || typeof item !== 'object') return false
        const candidate = item as PromptItem
        return (
          typeof candidate.id === 'string' &&
          typeof candidate.title === 'string' &&
          (typeof candidate.description === 'string' || candidate.description === undefined) &&
          typeof candidate.imageUrl === 'string' &&
          Array.isArray(candidate.tags) &&
          candidate.tags.every((tag) => typeof tag === 'string') &&
          typeof candidate.content === 'string' &&
          typeof candidate.createdAt === 'string' &&
          typeof candidate.updatedAt === 'string'
        )
      })
      .sort(byUpdatedAtDesc)
  } catch {
    return []
  }
}

const read = (): PromptItem[] => {
  if (!hasWindow) return []
  return safeParse(window.localStorage.getItem(STORAGE_KEY))
}

const write = (prompts: PromptItem[]): void => {
  if (!hasWindow) return
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(prompts))
}

const uid = (): string => `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`

export const loadPrompts = (): PromptItem[] => read()

export const getPromptById = (id: string): PromptItem | undefined => read().find((prompt) => prompt.id === id)

export const createPrompt = (draft: PromptDraft): PromptItem => {
  const now = new Date().toISOString()
  const nextPrompt: PromptItem = {
    id: uid(),
    ...draft,
    description: draft.description?.trim() || undefined,
    createdAt: now,
    updatedAt: now,
  }

  const next = [nextPrompt, ...read()].sort(byUpdatedAtDesc)
  write(next)
  return nextPrompt
}

export const updatePrompt = (id: string, draft: PromptDraft): PromptItem | null => {
  const existing = read()
  const index = existing.findIndex((prompt) => prompt.id === id)
  if (index < 0) return null

  const current = existing[index]
  const updated: PromptItem = {
    ...current,
    ...draft,
    description: draft.description?.trim() || undefined,
    updatedAt: new Date().toISOString(),
  }

  existing[index] = updated
  write(existing.sort(byUpdatedAtDesc))
  return updated
}

export const deletePrompt = (id: string): boolean => {
  const existing = read()
  const next = existing.filter((prompt) => prompt.id !== id)
  if (next.length === existing.length) return false

  write(next)
  return true
}

export const promptStore = {
  list: loadPrompts,
  getById: getPromptById,
  create: createPrompt,
  update: updatePrompt,
  remove: deletePrompt,
}
