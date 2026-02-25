import { useMemo, useState, type ChangeEvent, type FormEvent } from 'react'
import type { PromptItem } from '../types'

type FormValue = {
  title: string
  description: string
  imageUrl: string
  tagsText: string
  content: string
}

function normalizeTags(tagsText: string) {
  return tagsText
    .split(',')
    .map((t) => t.trim())
    .filter(Boolean)
    .map((t) => t.toLowerCase())
}

type Props = {
  initial?: PromptItem | null
  onSubmit: (value: Omit<PromptItem, 'id' | 'createdAt' | 'updatedAt'>) => void
  submitLabel: string
}

export function PromptForm({ initial, onSubmit, submitLabel }: Props) {
  const init = useMemo<FormValue>(() => {
    return {
      title: initial?.title ?? '',
      description: initial?.description ?? '',
      imageUrl: initial?.imageUrl ?? '',
      tagsText: initial?.tags?.join(', ') ?? '',
      content: initial?.content ?? '',
    }
  }, [initial])

  const [v, setV] = useState<FormValue>(init)
  const [error, setError] = useState('')

  const handle = (k: keyof FormValue) => (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setV((old) => ({ ...old, [k]: e.target.value }))
  }

  const submit = (e: FormEvent) => {
    e.preventDefault()
    setError('')

    if (!v.title.trim()) return setError('Título é obrigatório.')
    if (!v.imageUrl.trim()) return setError('Imagem (URL) é obrigatória.')
    if (!v.content.trim()) return setError('Prompt completo é obrigatório.')

    onSubmit({
      title: v.title.trim(),
      description: v.description.trim() || undefined,
      imageUrl: v.imageUrl.trim(),
      tags: normalizeTags(v.tagsText),
      content: v.content,
    })
  }

  return (
    <form className="form" onSubmit={submit}>
      <div className="form__row">
        <label className="label">
          Título *
          <input className="input" value={v.title} onChange={handle('title')} placeholder="Ex.: Resumo em tópicos" />
        </label>

        <label className="label">
          Tags (vírgulas)
          <input className="input" value={v.tagsText} onChange={handle('tagsText')} placeholder="ex.: estudo, resumo" />
        </label>
      </div>

      <label className="label">
        URL da imagem *
        <input className="input" value={v.imageUrl} onChange={handle('imageUrl')} placeholder="https://..." />
      </label>

      <label className="label">
        Descrição (opcional)
        <input className="input" value={v.description} onChange={handle('description')} placeholder="Uma frase curta" />
      </label>

      <label className="label">
        Prompt completo *
        <textarea className="textarea" value={v.content} onChange={handle('content')} placeholder="Cole seu prompt aqui..." />
      </label>

      {error ? <div className="error">{error}</div> : null}

      <div className="form__actions">
        <button className="btn" type="submit">
          {submitLabel}
        </button>
      </div>
    </form>
  )
}

export default PromptForm
