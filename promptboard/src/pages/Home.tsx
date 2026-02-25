import { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { PromptCard } from '../components/PromptCard'
import { Toast } from '../components/Toast'
import { deletePrompt, loadPrompts } from '../services/promptStore'
import type { PromptItem } from '../types'

export function Home() {
  const nav = useNavigate()
  const [items, setItems] = useState<PromptItem[]>([])
  const [q, setQ] = useState('')
  const [tag, setTag] = useState<string>('')

  const [toast, setToast] = useState<{ msg: string; kind: 'success' | 'error' } | null>(null)
  const [copiedId, setCopiedId] = useState<string>('')

  useEffect(() => {
    setItems(loadPrompts())
  }, [])

  const tags = useMemo(() => {
    const s = new Set<string>()
    for (const it of items) it.tags.forEach((t) => s.add(t))
    return Array.from(s).sort()
  }, [items])

  const filtered = useMemo(() => {
    const qq = q.trim().toLowerCase()
    return items.filter((it) => {
      const matchQ =
        !qq ||
        it.title.toLowerCase().includes(qq) ||
        (it.description?.toLowerCase().includes(qq) ?? false) ||
        it.content.toLowerCase().includes(qq)

      const matchTag = !tag || it.tags.includes(tag)
      return matchQ && matchTag
    })
  }, [items, q, tag])

  const refresh = () => setItems(loadPrompts())

  const handleDelete = (id: string) => {
    const ok = window.confirm('Apagar este prompt?')
    if (!ok) return
    deletePrompt(id)
    refresh()
  }

  const handleCopy = (id: string, ok: boolean) => {
    if (ok) {
      setCopiedId(id)
      setToast({ msg: 'Prompt copiado!', kind: 'success' })
      window.setTimeout(() => setCopiedId(''), 1200)
    } else {
      setToast({ msg: 'Não foi possível copiar.', kind: 'error' })
    }
  }

  return (
    <div className="page">
      <header className="topbar">
        <div>
          <h1 className="h1">PromptBoard</h1>
          <p className="muted">Clique na imagem para copiar o prompt completo.</p>
        </div>
        <button className="btn" onClick={() => nav('/new')}>
          + Novo prompt
        </button>
      </header>

      <section className="filters">
        <input
          className="input"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Buscar por título ou conteúdo..."
        />

        <select className="input" value={tag} onChange={(e) => setTag(e.target.value)}>
          <option value="">Todas as tags</option>
          {tags.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>

        <button
          className="btn btn--ghost"
          onClick={() => {
            setQ('')
            setTag('')
          }}
        >
          Limpar
        </button>
      </section>

      <main className="grid">
        {filtered.map((it) => (
          <PromptCard
            key={it.id}
            item={it}
            copied={copiedId === it.id}
            onCopy={(ok) => handleCopy(it.id, ok)}
            onEdit={() => nav(`/edit/${it.id}`)}
            onDelete={() => handleDelete(it.id)}
          />
        ))}
      </main>

      {toast ? <Toast message={toast.msg} kind={toast.kind} onClose={() => setToast(null)} /> : null}
    </div>
  )
}

export default Home
